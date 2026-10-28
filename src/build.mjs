// Generates the static site from src/games.json.
// Usage: node src/build.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { privacy } from "./legal/privacy.mjs";
import { terms } from "./legal/terms.mjs";
import { deletion } from "./legal/deletion.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(ROOT, "src/games.json"), "utf8"));
const { studio, games } = data;
const LANGS = ["ko", "en"];
// Cache-busting token for the stylesheet: changes whenever site.css changes.
const CSS_VER = createHash("sha1").update(readFileSync(join(ROOT, "css/site.css"))).digest("hex").slice(0, 8);

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const bi = (obj, tag = "span") => LANGS.map((l) => `<${tag} data-l="${l}">${obj[l]}</${tag}>`).join("");

const langScript = `<script>(function(){var d=document.documentElement,l;try{l=new URLSearchParams(location.search).get("lang")||localStorage.getItem("lang")}catch(e){}if(l!=="ko"&&l!=="en")l=/^ko/i.test(navigator.language||"")?"ko":"en";d.setAttribute("data-lang",l);d.lang=l;window.setLang=function(x){d.setAttribute("data-lang",x);d.lang=x;try{localStorage.setItem("lang",x)}catch(e){}document.querySelectorAll(".lang button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.v===x)})};document.addEventListener("DOMContentLoaded",function(){setLang(l)})})();</script>`;

function layout({ root, title, description, body }) {
  return `<!doctype html>
<html lang="ko" data-lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="stylesheet" href="${root}css/site.css?v=${CSS_VER}">
${langScript}
</head>
<body>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="${root}index.html">Hansol Creative</a>
    <div class="lang" role="group" aria-label="Language">
      <button type="button" data-v="ko" aria-pressed="true" onclick="setLang('ko')">KO</button>
      <button type="button" data-v="en" aria-pressed="false" onclick="setLang('en')">EN</button>
    </div>
  </div>
</header>
${body}
<footer class="site-footer">
  <div class="wrap">
    <nav>
      <a href="${root}privacy-policy.html">${bi({ ko: "개인정보 처리방침", en: "Privacy Policy" })}</a>
      <a href="${root}terms.html">${bi({ ko: "이용약관", en: "Terms of Service" })}</a>
      <a href="${root}delete-account.html">${bi({ ko: "계정 삭제", en: "Delete Account" })}</a>
      <a href="mailto:${studio.email}">${studio.email}</a>
    </nav>
    <span>© ${new Date().getFullYear()} Hansol Creative</span>
  </div>
</footer>
</body>
</html>
`;
}

function legalLinks(game) {
  const base = `games/${game.slug}/`;
  return `<div class="legal-links">
      <a href="${base}privacy.html">${bi({ ko: "개인정보", en: "Privacy" })}</a>
      <a href="${base}terms.html">${bi({ ko: "이용약관", en: "Terms" })}</a>
      <a href="${base}delete-account.html">${bi({ ko: "계정 삭제", en: "Delete account" })}</a>
    </div>`;
}

const storeLink = (game) =>
  game.stores.googlePlay
    ? `<a class="store-link" href="${game.stores.googlePlay}" target="_blank" rel="noopener">Google Play ↗</a>`
    : "";

const statusTag = (game) =>
  game.status === "upcoming" ? `<span class="tag">${bi({ ko: "출시 예정", en: "Coming soon" })}</span>` : "";

// Key visual for a featured game: the title logo (per language when there is one),
// or a stand-in cover until the game has a logo.
function featureArt(game) {
  if (game.logo) {
    const imgs = game.logoKo
      ? `<img data-l="ko" src="${game.logoKo}" alt="${esc(game.name.ko)}"><img data-l="en" src="${game.logo}" alt="${esc(game.name.en)}">`
      : `<img src="${game.logo}" alt="${esc(game.name.en)}">`;
    return `<div class="feature-art feature-art--${game.slug}">${imgs}</div>`;
  }
  return `<div class="feature-art feature-art--${game.slug}">
    <div class="passport" aria-hidden="true">
      <span class="passport-top">PASSPORT · 여권</span>
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2"><circle cx="32" cy="32" r="26"/><ellipse cx="32" cy="32" rx="11" ry="26"/><path d="M6 32h52M10 19h44M10 45h44"/></svg>
      <span class="passport-title">${esc(game.name.en)}</span>
    </div>
  </div>`;
}

function featureCard(game) {
  return `<article class="feature">
  ${featureArt(game)}
  <div class="feature-body">
    <div class="feature-meta"><span class="genre">${bi(game.genre)}</span>${statusTag(game)}</div>
    <h2>${bi(game.name)}</h2>
    <p>${bi(game.tagline)}</p>
    ${storeLink(game)}
    ${legalLinks(game)}
  </div>
</article>`;
}

function moreGameRow(game) {
  return `<li class="more-game">
    <img src="${game.logo}" alt="" width="56" height="56">
    <div class="more-game-name"><strong>${bi(game.name)}</strong>${storeLink(game)}</div>
    ${legalLinks(game)}
  </li>`;
}

function homePage() {
  const featured = games.filter((g) => g.featured);
  const others = games.filter((g) => !g.featured);
  const body = `<main class="wrap">
  <section class="intro">
    <p>${bi({ ko: "Hansol Creative는 1인 인디 게임 스튜디오입니다.", en: "Hansol Creative is a one-person indie game studio." })}</p>
  </section>
  <section class="features">
    ${featured.map(featureCard).join("\n    ")}
  </section>
  ${
    others.length
      ? `<section class="more">
    <h2>${bi({ ko: "다른 게임", en: "More games" })}</h2>
    <ul class="more-list">
      ${others.map(moreGameRow).join("\n      ")}
    </ul>
  </section>`
      : ""
  }
</main>`;
  return layout({
    root: "",
    title: "Hansol Creative",
    description: "Hansol Creative — indie game studio. Games, privacy policies and terms of service.",
    body,
  });
}

// A document page that holds a Korean and an English version side by side in the DOM.
function docPage({ root, game, kind, render }) {
  const titles = {
    privacy: { ko: "개인정보 처리방침", en: "Privacy Policy" },
    terms: { ko: "이용약관", en: "Terms of Service" },
    deletion: { ko: "계정 및 데이터 삭제", en: "Account & Data Deletion" },
  };
  const files = { privacy: "privacy.html", terms: "terms.html", deletion: "delete-account.html" };
  const subject = game ? game.name : { ko: "Hansol Creative 전체 게임", en: "All Hansol Creative games" };
  const crumbImg = game?.logo
    ? `<img src="${root}${game.logo}" alt="" class="${game.logoType === "wordmark" ? "wordmark" : ""}">`
    : "";
  const tabs = Object.keys(files)
    .map(
      (k) =>
        `<a href="${k === kind ? "#" : game ? files[k] : rootFile(k)}"${k === kind ? ' aria-current="page"' : ""}>${bi(titles[k])}</a>`,
    )
    .join("");
  const versions = LANGS.map((lang) => `<article data-l="${lang}" lang="${lang}">${render(lang)}</article>`).join("\n");
  const body = `<main class="wrap doc">
  <div class="crumb">${crumbImg}<span>${bi(subject)}</span></div>
  <nav class="tabs">${tabs}</nav>
  ${versions}
</main>`;
  return layout({
    root,
    title: `${titles[kind].en} — ${subject.en}`,
    description: `${titles[kind].en} for ${subject.en} by Hansol Creative.`,
    body,
  });
}

function rootFile(kind) {
  return { privacy: "privacy-policy.html", terms: "terms.html", deletion: "delete-account.html" }[kind];
}

function write(rel, html) {
  const out = join(ROOT, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log("wrote", rel);
}

if (existsSync(join(ROOT, "games"))) rmSync(join(ROOT, "games"), { recursive: true });

write("index.html", homePage());

for (const game of games) {
  const root = "../../";
  const ctx = { studio, game, games: [game], root };
  write(`games/${game.slug}/privacy.html`, docPage({ root, game, kind: "privacy", render: (l) => privacy(l, ctx) }));
  write(`games/${game.slug}/terms.html`, docPage({ root, game, kind: "terms", render: (l) => terms(l, ctx) }));
  write(`games/${game.slug}/delete-account.html`, docPage({ root, game, kind: "deletion", render: (l) => deletion(l, ctx) }));
}

// Studio-wide pages. privacy-policy.html and delete-account.html are the URLs already
// registered in the stores, so they keep working and cover every game.
const all = { studio, game: null, games, root: "" };
write("privacy-policy.html", docPage({ root: "", game: null, kind: "privacy", render: (l) => privacy(l, all) }));
write("terms.html", docPage({ root: "", game: null, kind: "terms", render: (l) => terms(l, all) }));
write("delete-account.html", docPage({ root: "", game: null, kind: "deletion", render: (l) => deletion(l, all) }));
