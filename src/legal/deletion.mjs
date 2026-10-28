// Account & data deletion page (Google Play "Delete account URL" / App Store 5.1.1(v)).
const T = {
  ko: {
    h1: "계정 및 데이터 삭제 요청",
    intro: (n) => `${n}에서 사용하는 계정과 관련 데이터의 삭제를 요청하는 방법입니다.`,
    inApp: "게임 안에서 삭제하기",
    inAppText: "게임 설정 화면에 계정 삭제 메뉴가 있는 경우 그곳에서 바로 삭제할 수 있습니다. 메뉴가 없다면 아래 이메일로 요청해 주세요.",
    email: "이메일로 요청하기",
    emailText: (e) => `<a href="mailto:${e}">${e}</a> 로 아래 양식을 보내 주세요. 본인 확인 후 접수일로부터 <strong>10일 이내</strong>에 처리하고 결과를 회신합니다.`,
    template: (g) => `[계정 삭제 요청]\n게임: ${g}\n로그인 방식: (Google / 게스트)\n로그인 이메일: \n사용자 ID(UID): (게임 설정 화면에서 확인)`,
    copy: "양식 복사",
    deleted: "삭제되는 데이터",
    deletedList: [
      "계정 식별자(UID), 로그인 이메일·이름·프로필 사진",
      "서버에 저장된 게임 진행 데이터, 순위표 기록",
      "푸시 알림 토큰 등 계정과 연결된 기기 식별 정보",
    ],
    kept: "보관될 수 있는 데이터",
    keptList: [
      "인앱 결제 기록: 「전자상거래 등에서의 소비자보호에 관한 법률」에 따라 대금결제 및 재화 등의 공급에 관한 기록 5년 보관",
      "관계 법령상 보관 의무가 있거나 부정 이용 조사 중인 경우 해당 기간 동안 보관",
      "익명·통계 처리되어 개인을 식별할 수 없는 데이터",
    ],
    warn: "삭제된 계정과 게임 데이터, 구매한 아이템은 복구할 수 없습니다.",
    guest: "게스트로만 플레이한 경우 데이터는 기기에 저장되므로, 앱을 삭제하거나 앱 데이터를 지우면 함께 삭제됩니다.",
    allGames: "게임별 삭제 안내",
  },
  en: {
    h1: "Request account and data deletion",
    intro: (n) => `How to request deletion of your account and related data for ${n}.`,
    inApp: "Delete in the game",
    inAppText: "If the game settings have a Delete account option, you can delete your account there directly. Otherwise, email us.",
    email: "Request by email",
    emailText: (e) => `Send the form below to <a href="mailto:${e}">${e}</a>. After verifying the request, we will complete it <strong>within 10 days</strong> and reply to you.`,
    template: (g) => `[Account deletion request]\nGame: ${g}\nSign-in method: (Google / Guest)\nSign-in email: \nUser ID (UID): (shown in the game's settings)`,
    copy: "Copy form",
    deleted: "Data that is deleted",
    deletedList: [
      "Account identifier (UID), sign-in email, name and profile picture",
      "Game progress stored on our servers and leaderboard records",
      "Push tokens and other device identifiers linked to the account",
    ],
    kept: "Data that may be kept",
    keptList: [
      "In-app purchase records: kept for 5 years as required by the Korean Act on Consumer Protection in Electronic Commerce",
      "Data we are legally required to keep, or that is part of an ongoing fraud investigation, for that period",
      "Anonymized or aggregated data that cannot identify you",
    ],
    warn: "Deleted accounts, game data and purchased items cannot be restored.",
    guest: "If you only played as a guest, your data is stored on your device and is removed when you uninstall the app or clear its data.",
    allGames: "Deletion by game",
  },
};

export function deletion(lang, { studio, game, games, root }) {
  const t = T[lang];
  const subject = game ? game.name[lang] : lang === "ko" ? "Hansol Creative 게임" : "Hansol Creative games";
  const anyIap = games.some((g) => g.iap);
  const keptList = anyIap ? t.keptList : t.keptList.slice(1);
  const tmplId = `tmpl-${lang}`;
  const perGame = game
    ? ""
    : `<h2>${t.allGames}</h2>
<ul class="game-list-inline">${games
        .map((g) => `<li><strong>${g.name[lang]}</strong><a href="${root}games/${g.slug}/delete-account.html">${t.h1}</a></li>`)
        .join("")}</ul>`;
  return `<h1>${t.h1}</h1>
<p class="meta">${t.intro(subject)}</p>
<div class="note warn">${t.warn}</div>
<h2>${t.inApp}</h2>
<p>${t.inAppText}</p>
<h2>${t.email}</h2>
<p>${t.emailText(studio.email)}</p>
<pre id="${tmplId}">${t.template(game ? game.name[lang] : "")}</pre>
<button class="btn" type="button" onclick="navigator.clipboard.writeText(document.getElementById('${tmplId}').innerText).then(()=>{this.textContent='✓'})">${t.copy}</button>
<h2>${t.deleted}</h2>
<ul>${t.deletedList.map((x) => `<li>${x}</li>`).join("")}</ul>
<h2>${t.kept}</h2>
<ul>${keptList.map((x) => `<li>${x}</li>`).join("")}</ul>
<p class="note">${t.guest}</p>
${perGame}`;
}
