#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const works = [
	{
		slug: "the-king-in-yellow",
		title: "The King in Yellow",
		author: "Robert W. Chambers",
		authorSlug: "robert-w-chambers",
		url: "https://www.gutenberg.org/cache/epub/8492/pg8492.txt",
		outDir: "content/books/the-king-in-yellow",
		type: "chapter",
		category: "book",
		chapters: [
			"THE REPAIRER OF REPUTATIONS",
			"THE MASK",
			"IN THE COURT OF THE DRAGON",
			"THE YELLOW SIGN",
			"THE DEMOISELLE D'YS",
			"THE PROPHETS' PARADISE",
			"THE STREET OF THE FOUR WINDS",
			"THE STREET OF THE FIRST SHELL",
			"THE STREET OF OUR LADY OF THE FIELDS",
			"RUE BARREE",
		],
	},
	{
		slug: "the-yellow-wallpaper",
		title: "The Yellow Wallpaper",
		author: "Charlotte Perkins Gilman",
		authorSlug: "charlotte-perkins-gilman",
		url: "https://www.gutenberg.org/cache/epub/1952/pg1952.txt",
		outDir: "content/case-files/the-yellow-wallpaper",
		type: "case-file-entry",
		category: "case-file",
		chapters: ["THE YELLOW WALLPAPER"],
	},
];

function printHelp() {
	const commandName = path.basename(process.argv[1] ?? "import-public-domain-content.mjs");
	console.log(`Usage: node scripts/${commandName} [--help]\n\nDownloads public-domain Project Gutenberg texts and writes GoHugo Markdown files.\n\nOptions:\n  --help  Show this help message.\n`);
}

function slugify(value) {
	return value.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function titleCase(value) {
	const small = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "of", "on", "or", "the", "to", "with"]);
	return value.toLowerCase().split(/\s+/).map((word, index) => index > 0 && small.has(word) ? word : `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`).join(" ");
}

function frontMatter(data) {
	const lines = ["---"];
	for (const [key, value] of Object.entries(data)) {
		if (Array.isArray(value)) {
			lines.push(`${key}:`);
			for (const item of value) lines.push(`  - ${JSON.stringify(item)}`);
		} else {
			lines.push(`${key}: ${typeof value === "string" ? JSON.stringify(value) : String(value)}`);
		}
	}
	lines.push("---", "");
	return `${lines.join("\n")}\n`;
}

function stripBoilerplate(text) {
	const clean = text.replace(/\r\n/g, "\n");
	const start = clean.search(/\*\*\* START OF (THE|THIS) PROJECT GUTENBERG EBOOK/i);
	const end = clean.search(/\*\*\* END OF (THE|THIS) PROJECT GUTENBERG EBOOK/i);
	const bodyStart = start >= 0 ? clean.indexOf("\n", start) + 1 : 0;
	const bodyEnd = end >= 0 ? end : clean.length;
	return clean.slice(bodyStart, bodyEnd).trim();
}

function markdownify(text) {
	return text
		.replace(/[ \t]+\n/g, "\n")
		.replace(/\n{3,}/g, "\n\n")
		.split(/\n\s*\n/)
		.map((paragraph) => paragraph.replace(/\n/g, " ").replace(/\s+/g, " ").trim())
		.filter(Boolean)
		.join("\n\n");
}

function splitChapters(body, titles) {
	const found = titles.map((title) => {
		const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const match = new RegExp(`(^|\\n)\\s*${escaped}\\s*(\\n|$)`, "i").exec(body);
		return match?.index === undefined ? undefined : { title, index: match.index };
	}).filter(Boolean);

	if (found.length === 0) return [{ title: titleCase(titles[0] ?? "Text"), slug: slugify(titles[0] ?? "text"), body, weight: 10 }];

	return found.map((item, index) => {
		const next = found[index + 1];
		const chunk = body.slice(item.index, next?.index ?? body.length).trim();
		const headingPattern = new RegExp(`^\\s*${item.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*`, "i");
		return {
			title: titleCase(item.title),
			slug: slugify(item.title),
			body: chunk.replace(headingPattern, "").trim(),
			weight: (index + 1) * 10,
		};
	});
}

async function writeMarkdown(relativePath, data, body) {
	const fullPath = path.join(process.cwd(), relativePath);
	await mkdir(path.dirname(fullPath), { recursive: true });
	await writeFile(fullPath, `${frontMatter(data)}${body.trim()}\n`, "utf8");
}

async function importWork(work) {
	console.log(`Downloading ${work.title}...`);
	const response = await fetch(work.url, { headers: { "user-agent": "ananke-asylum-content-importer/1.0" } });
	if (!response.ok) throw new Error(`Failed to download ${work.url}: ${response.status} ${response.statusText}`);
	const body = stripBoilerplate(await response.text());
	const chapters = splitChapters(body, work.chapters);

	for (const chapter of chapters) {
		await writeMarkdown(`${work.outDir}/${chapter.slug}.md`, {
			title: chapter.title,
			description: `${chapter.title}, from ${work.title} by ${work.author}.`,
			type: work.type,
			authors: [work.authorSlug],
			sources: ["project-gutenberg"],
			works: [work.slug],
			categories: ["literature", "asylum-test-content", work.category],
			tags: ["public-domain", "fixture-content", "asylum"],
			weight: chapter.weight,
			draft: false,
		}, markdownify(chapter.body));
	}
}

async function main() {
	if (process.argv.includes("--help")) {
		printHelp();
		return;
	}

	for (const work of works) await importWork(work);
	console.log("Public-domain content import complete.");
}

main().catch((error) => {
	const message = error instanceof Error ? error.message : String(error);
	console.error(`Import failed: ${message}`);
	process.exitCode = 1;
});
