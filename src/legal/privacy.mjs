// Privacy policy. Structure follows 개인정보 보호법 제30조 / 시행령 제31조 and the PIPC
// 「개인정보 처리방침 작성지침」, with CalOPPA/CCPA (Regs §7011) and GDPR Art. 13 additions,
// and the Google Play User Data / Apple 5.1.1 requirements.
import { PROCESSORS } from "./processors.mjs";

const pick = (lang) => (o) => (typeof o === "string" ? o : o[lang]);
const ul = (items) => `<ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;
const table = (head, rows) =>
  `<div class="table-scroll"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;

export function privacy(lang, { studio, game, games }) {
  const L = pick(lang);
  const ko = lang === "ko";
  const has = (k) => games.some((g) => g[k]);
  const procKeys = [...new Set(games.flatMap((g) => g.processors))];
  const usesProc = (...ks) => ks.some((k) => procKeys.includes(k));
  const effective = games.map((g) => g.effective).sort().at(-1);
  const subject = game ? `「${game.name[lang]}」` : ko ? "회사가 제공하는 모든 게임" : "all games published by us";
  const gc = has("gameCenterLogin");
  const signIn = has("googleLogin") && gc
    ? { ko: "Google 로그인(Android) 또는 Game Center 로그인(iOS)", en: "Google Sign-In (Android) or Game Center sign-in (iOS)" }
    : gc ? { ko: "Game Center 로그인", en: "Game Center sign-in" } : { ko: "Google 로그인", en: "Google Sign-In" };
  const adPartners = [["unity-ads", "Unity Ads"], ["liftoff", "Liftoff (Vungle)"]].filter(([k]) => procKeys.includes(k)).map(([, n]) => n);
  const appStore = usesProc("app-store-iap");
  const gameNames = games.map((g) => (ko ? `「${g.name.ko}」` : g.name.en)).join(", ");

  const sections = [];
  const add = (id, title, html) => sections.push({ id, title, html });

  // 1. Overview
  add(
    "overview",
    ko ? "개요" : "Overview",
    ko
      ? `<p>${L(studio.legalName)}(이하 "회사")는 ${subject}(이하 "게임")의 이용자 개인정보를 「개인정보 보호법」 등 관련 법령에 따라 처리합니다. 이 처리방침은 회사가 어떤 개인정보를 왜, 얼마나 오래 처리하는지, 그리고 이용자가 어떤 권리를 가지는지 설명합니다.</p>
<p>적용 대상 게임: ${gameNames}</p>
<p>회사는 대한민국, 미국을 포함한 전 세계 이용자에게 게임을 제공합니다. 거주 지역별 추가 안내는 <a href="#us">미국 거주자</a>, <a href="#eu">EEA·영국 거주자</a> 항목을 참고하세요.</p>`
      : `<p>${L(studio.legalName)} ("we", "us") processes the personal information of players of ${subject} (the "Game") in accordance with applicable laws, including the Personal Information Protection Act of Korea. This policy explains what we collect, why, how long we keep it, and the rights you have.</p>
<p>Games covered: ${gameNames}</p>
<p>We offer our games worldwide, including Korea and the United States. See <a href="#us">US residents</a> and <a href="#eu">EEA & UK residents</a> for region-specific information.</p>`,
  );

  // 2. Purposes, items, legal basis
  const rows = [];
  if (has("googleLogin"))
    rows.push([
      ko ? "회원 식별 및 로그인, 계정 관리" : "Sign-in, account identification and management",
      ko ? "Google 계정 이메일, 이름(표시 이름), 프로필 사진, 계정 식별자(UID)" : "Google account email, display name, profile picture, account identifier (UID)",
      ko ? "계약 이행(제15조①4호) / GDPR 6(1)(b)" : "Performance of contract (KR PIPA Art. 15(1)4; GDPR Art. 6(1)(b))",
    ]);
  if (gc)
    rows.push([
      ko ? "Game Center 로그인(iOS, 선택) 및 클라우드 저장 계정 식별" : "Optional Game Center sign-in (iOS) and identifying your cloud save",
      ko ? "Game Center 플레이어 ID, 닉네임, 계정 식별자(UID)" : "Game Center player ID, nickname, account identifier (UID)",
      ko ? "계약 이행(제15조①4호) / GDPR 6(1)(b)" : "Performance of contract (KR PIPA Art. 15(1)4; GDPR Art. 6(1)(b))",
    ]);
  rows.push([
    ko ? "게임 제공, 진행 데이터 저장·동기화" : "Providing the Game, saving and syncing progress",
    ko
      ? "게임 진행 데이터(레벨, 재화, 아이템, 설정), 게스트 식별자, 설치 ID" + (usesProc("ugs", "google-play-games") ? ", 순위표 닉네임·점수" : "")
      : "Game progress (levels, currencies, items, settings), guest identifier, installation ID" + (usesProc("ugs", "google-play-games") ? ", leaderboard name and score" : ""),
    ko ? "계약 이행(제15조①4호) / GDPR 6(1)(b)" : "Performance of contract (PIPA Art. 15(1)4; GDPR Art. 6(1)(b))",
  ]);
  if (has("iap"))
    rows.push([
      ko ? "인앱 결제 처리·검증, 환불, 법정 기록 보관" : "Processing and verifying purchases, refunds, legally required records",
      ko ? (appStore ? "주문 번호·거래 ID, 구매 토큰, 상품 ID, 구매 일시 (결제수단 정보는 받지 않음)" : "주문 번호, 구매 토큰, 상품 ID, 구매 일시 (결제수단 정보는 받지 않음)") : (appStore ? "Order or transaction ID, purchase token, product ID, purchase time (we never receive payment card details)" : "Order ID, purchase token, product ID, purchase time (we never receive payment card details)"),
      ko ? "계약 이행·법령상 의무(제15조①2호·4호) / GDPR 6(1)(b)·(c)" : "Contract and legal obligation (PIPA Art. 15(1)2, 4; GDPR Art. 6(1)(b), (c))",
    ]);
  rows.push([
    ko ? "오류 진단, 이용 통계 분석, 서비스 개선, 부정 이용 방지" : "Crash diagnosis, usage analytics, improvement, fraud prevention",
    ko ? "기기 모델·OS 버전, 앱 버전, 앱 인스턴스 ID, IP 주소, 국가·언어, 앱 이용 기록, 오류 기록" : "Device model, OS version, app version, app instance ID, IP address, country and language, in-app usage events, crash logs",
    ko ? "정당한 이익(제15조①6호) / GDPR 6(1)(f)" : "Legitimate interests (PIPA Art. 15(1)6; GDPR Art. 6(1)(f))",
  ]);
  if (has("ads"))
    rows.push([
      ko ? "광고 표시 및 성과 측정 (동의 시 맞춤형 광고)" : "Showing ads and measuring them (personalized ads only with consent)",
      ko ? "광고 ID(AAID/IDFA), IP 주소, 기기 정보, 광고 노출·클릭 기록, 동의 상태" : "Advertising ID (AAID/IDFA), IP address, device info, ad impressions and clicks, consent status",
      ko ? "동의(제15조①1호) / GDPR 6(1)(a) — 비맞춤형 광고는 정당한 이익" : "Consent (PIPA Art. 15(1)1; GDPR Art. 6(1)(a)); non-personalized ads: legitimate interests",
    ]);
  if (usesProc("fcm"))
    rows.push([
      ko ? "푸시 알림 발송" : "Push notifications",
      ko ? "푸시 토큰" : "Push token",
      ko ? "동의(기기 알림 권한) / GDPR 6(1)(a)" : "Consent via device notification permission (GDPR Art. 6(1)(a))",
    ]);
  rows.push([
    ko ? "문의 응대, 권리 행사 처리" : "Support and handling privacy requests",
    ko ? "이메일 주소, 문의 내용, 이용자가 제공한 UID" : "Email address, message contents, UID you provide",
    ko ? "계약 이행·법령상 의무 / GDPR 6(1)(b)·(c)" : "Contract and legal obligation (GDPR Art. 6(1)(b), (c))",
  ]);
  add(
    "purposes",
    ko ? "처리 목적, 항목 및 법적 근거" : "What we collect, why, and our legal basis",
    `${table(ko ? ["처리 목적", "처리 항목", "법적 근거"] : ["Purpose", "Data", "Legal basis"], rows)}
${
  ko
    ? `<p>게임은 로그인 없이 게스트로 이용할 수 있으며, ${signIn.ko}은 선택 사항입니다. 로그인하지 않으면 진행 데이터가 기기에만 저장되어 기기 변경 시 이어서 플레이할 수 없습니다.</p>
<p>회사는 민감정보, 고유식별정보(주민등록번호 등), 정밀 위치정보를 수집하지 않으며, 별도의 회원가입 절차를 운영하지 않습니다. 회사는 인공지능을 이용한 자동화된 결정을 하지 않습니다.</p>`
    : `<p>You can play as a guest without signing in; ${signIn.en} is optional. Without signing in, your progress is stored only on your device and cannot be carried to a new device.</p>
<p>We do not collect sensitive data, government identifiers, or precise location, and we do not run a separate registration system. We do not make automated decisions with legal or similarly significant effects.</p>`
}`,
  );

  // 3. Retention
  const keep = [
    ko ? "계정 정보 및 게임 데이터: 계정 삭제(탈퇴) 요청 시까지." : "Account information and game data: until you delete your account.",
    ko ? "기기에만 저장된 게스트 데이터: 앱 삭제 또는 앱 데이터 삭제 시까지" : "Guest data stored only on your device: until you uninstall the app or clear its data",
    ko ? "분석·오류 데이터: 각 서비스의 보관 설정에 따름 (Google Analytics for Firebase 최대 14개월, Crashlytics 90일)" : "Analytics and crash data: per each service's retention settings (Google Analytics for Firebase up to 14 months, Crashlytics 90 days)",
    ko ? "문의 기록: 처리 완료 후 3년 (「전자상거래법」 소비자 불만·분쟁처리 기록)" : "Support records: 3 years after resolution (consumer complaint records, Korean E-Commerce Act)",
  ];
  if (has("iap"))
    keep.push(
      ko ? "결제 기록: 5년 (「전자상거래 등에서의 소비자보호에 관한 법률」 대금결제 및 재화 등의 공급에 관한 기록)" : "Purchase records: 5 years (Korean Act on Consumer Protection in Electronic Commerce)",
    );
  add("retention", ko ? "보유 및 이용 기간" : "How long we keep data", ul(keep));

  // 4. Third-party provision
  add(
    "sharing",
    ko ? "개인정보의 제3자 제공" : "Sharing with third parties",
    ko
      ? `<p>회사는 이용자의 개인정보를 판매하지 않으며, 이용자의 동의가 있거나 법률에 특별한 규정이 있는 경우(수사기관의 적법한 요청 등) 외에는 제3자에게 제공하지 않습니다. 게임 운영에 필요한 외부 서비스는 아래 <a href="#transfer">처리위탁 및 국외 이전</a>에 안내합니다.</p>`
      : `<p>We do not sell your personal information in exchange for money. We do not disclose it to third parties except with your consent or where required by law (for example, a valid legal request). The service providers we use to run the Game are listed under <a href="#transfer">Service providers & international transfers</a>. For how advertising data is treated under US state law, see <a href="#us">US residents</a>.</p>`,
  );

  // 5. Processors & cross-border transfer (제26조, 제28조의8)
  const procRows = procKeys.map((k) => {
    const p = PROCESSORS[k];
    return [
      `${L(p.company)}<br><small>${L(p.name)}</small><br><small><a href="${p.policy}" target="_blank" rel="noopener">${ko ? "개인정보 처리방침" : "Privacy policy"}</a></small>`,
      L(p.country),
      L(p.data),
      L(p.purpose),
    ];
  });
  add(
    "transfer",
    ko ? "처리위탁 및 개인정보의 국외 이전" : "Service providers & international transfers",
    ko
      ? `<p>회사는 원활한 게임 제공을 위해 아래와 같이 개인정보 처리업무를 위탁하며, 이 과정에서 개인정보가 국외로 이전됩니다. 이는 「개인정보 보호법」 제28조의8 제1항 제3호(계약 이행을 위한 처리위탁·보관으로서 처리방침에 공개)에 근거합니다.</p>
${table(["이전받는 자 (수탁자)", "이전 국가", "이전 항목", "이전 목적·위탁 업무"], procRows)}
${ul([
  "이전 일시 및 방법: 게임 이용 시점에 정보통신망을 통해 수시로 전송",
  "보유 및 이용 기간: 위탁 계약 종료 또는 이용자의 계정 삭제 시까지 (각 사의 처리방침 및 법령상 보관 의무에 따름)",
  "연락처: 각 사의 개인정보 처리방침 페이지에 안내된 문의 창구",
  "거부 방법 및 효과: 국외 이전을 원하지 않으면 게임 이용을 중단하고 계정 삭제를 요청할 수 있습니다. 이 경우 로그인·클라우드 저장 등 해당 기능을 이용할 수 없습니다. 맞춤형 광고는 아래 <a href=\"#ads\">광고 및 자동 수집 장치</a>에서 따로 거부할 수 있습니다.",
])}
<p>회사는 수탁자가 개인정보를 안전하게 처리하도록 각 사의 데이터 처리 약관을 통해 관리합니다.</p>`
      : `<p>We use the following providers to operate the Game. Your data is transferred to and processed in the countries listed. Under Korean law, this is processing entrusted for the performance of our contract with you (PIPA Art. 28-8(1)3).</p>
${table(["Recipient", "Country", "Data", "Purpose"], procRows)}
${ul([
  "When and how: sent over the network as you use the Game",
  "Retention: until our agreement with the provider ends or you delete your account, subject to each provider's policy and legal retention duties",
  "Contact: see each provider's privacy policy",
  "How to refuse: stop using the Game and request account deletion. Sign-in and cloud save will then be unavailable. You can opt out of personalized ads separately (see <a href=\"#ads\">Advertising & device identifiers</a>).",
])}
<p>Each provider is bound by its data processing terms. For transfers out of the EEA/UK, these providers rely on the EU-US Data Privacy Framework and/or Standard Contractual Clauses.</p>`,
  );

  // 6. Ads & automatic collection
  if (has("ads"))
    add(
      "ads",
      ko ? "광고 및 자동 수집 장치(광고 ID)" : "Advertising & device identifiers",
      ko
        ? `<p>게임은 Google AdMob을 통해 광고를 표시합니다${adPartners.length ? ` (AdMob 미디에이션으로 ${adPartners.join(", ")} 광고도 표시)` : ""}. ${adPartners.length ? "이들 광고 사업자는" : "AdMob은"} 앱 안에서 광고 ID 등 행태정보를 수집할 수 있습니다.</p>
${table(["수집 도구", "수집 사업자", "수집 항목", "목적"], [["Google Mobile Ads SDK (AdMob)", "Google LLC", "광고 ID, IP 주소, 기기 정보, 광고 노출·클릭 기록", "광고 표시, 맞춤형 광고(동의 시), 광고 성과 측정, 부정 클릭 방지"], ...(procKeys.includes("unity-ads") ? [["Unity Ads SDK", "Unity Technologies", "광고 ID, IP 주소, 기기 정보, 광고 노출·클릭 기록", "광고 표시, 맞춤형 광고(동의 시), 성과 측정"]] : []), ...(procKeys.includes("liftoff") ? [["Liftoff Monetize SDK (Vungle)", "Liftoff Mobile, Inc.", "광고 ID, IP 주소, 기기 정보, 광고 노출·클릭 기록", "광고 표시, 맞춤형 광고(동의 시), 성과 측정"]] : [])])}
<p>EEA·영국·스위스, 미국 일부 주 등에서는 게임 첫 실행 시 Google 사용자 메시지 플랫폼(UMP)을 통해 동의 여부를 묻고, 동의하지 않으면 비맞춤형 광고만 표시합니다. 게임 설정의 개인정보 옵션(제공되는 경우)에서 언제든 선택을 바꿀 수 있습니다.</p>${gc ? `
<p>iOS에서는 광고를 요청하기 전에 Apple 앱 추적 투명성(ATT) 창으로 추적 허용 여부를 묻습니다. 허용하지 않으면 광고 ID(IDFA)를 사용하지 않으며, 광고는 계속 표시되지만 맞춤형이 아닙니다.</p>` : ""}
<p><strong>광고 ID 거부 방법</strong></p>
${ul([
  "Android: 설정 → 보안 및 개인정보 보호(또는 Google) → 개인정보 보호 → 광고 → 광고 ID 삭제",
  "iOS: 설정 → 개인정보 보호 및 보안 → 추적 → 앱이 추적을 요청하도록 허용 끄기",
])}
<p>광고 ID를 삭제하거나 추적을 거부해도 광고는 표시되지만 맞춤형 광고가 아닌 일반 광고가 표시됩니다. Google의 데이터 이용 방식은 <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">Google 파트너 사이트·앱 정책</a>에서 확인할 수 있습니다.</p>`
        : `<p>The Game shows ads through Google AdMob${adPartners.length ? ` (including ads from ${adPartners.join(" and ")} through AdMob mediation)` : ""}. ${adPartners.length ? "These ad providers" : "AdMob"} may collect device identifiers and usage data inside the app.</p>
${table(["Tool", "Company", "Data", "Purpose"], [["Google Mobile Ads SDK (AdMob)", "Google LLC", "Advertising ID, IP address, device info, ad impressions and clicks", "Serving ads, personalized ads (with consent), measurement, fraud prevention"], ...(procKeys.includes("unity-ads") ? [["Unity Ads SDK", "Unity Technologies", "Advertising ID, IP address, device info, ad impressions and clicks", "Serving ads, personalized ads (with consent), measurement"]] : []), ...(procKeys.includes("liftoff") ? [["Liftoff Monetize SDK (Vungle)", "Liftoff Mobile, Inc.", "Advertising ID, IP address, device info, ad impressions and clicks", "Serving ads, personalized ads (with consent), measurement"]] : [])])}
<p>In the EEA, UK, Switzerland and certain US states, the Game asks for your choice through Google's User Messaging Platform (UMP) on first launch. If you decline, only non-personalized ads are shown. You can change your choice at any time from the privacy option in the game settings, where available.</p>${gc ? `
<p>On iOS, the Game asks for permission through Apple's App Tracking Transparency prompt before requesting ads. If you do not allow tracking, your advertising identifier (IDFA) is not used; you will still see ads, but they will not be personalized.</p>` : ""}
<p><strong>How to opt out of ad tracking</strong></p>
${ul([
  "Android: Settings → Security & privacy (or Google) → Privacy → Ads → Delete advertising ID",
  "iOS: Settings → Privacy & Security → Tracking → turn off Allow Apps to Request to Track",
])}
<p>You will still see ads, but they will not be personalized. Learn how Google uses data at <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">How Google uses information from sites or apps that use our services</a>.</p>`,
    );

  // 7. App permissions
  const perms = ko
    ? ["인터넷·네트워크 상태 확인 (필수): 게임 데이터 저장·광고 표시", "진동 (선택적 기능): 게임 효과", "절전 모드 방지: 게임 플레이 중 화면 유지"]
    : ["Internet and network state (required): saving data, showing ads", "Vibration: in-game feedback", "Prevent sleep: keep the screen on during play"];
  if (usesProc("fcm")) perms.push(ko ? "알림 (선택): 푸시 알림. 허용하지 않아도 게임을 이용할 수 있습니다." : "Notifications (optional): push notifications. The Game works without it.");
  if (has("iap")) perms.push(appStore ? (ko ? "Google Play 결제 / App Store 인앱 구매: 인앱 구매" : "Google Play billing / App Store in-app purchase: in-app purchases") : (ko ? "Google Play 결제 (필수): 인앱 구매" : "Google Play billing (required): in-app purchases"));
  if (gc) perms.push(ko ? "앱 추적 투명성 (iOS, 선택): 맞춤형 광고용 광고 ID 사용. 허용하지 않아도 게임을 이용할 수 있습니다." : "App Tracking Transparency (iOS, optional): use of the advertising identifier for personalized ads. The Game works without it.");
  if (gc) perms.push(ko ? "Game Center (iOS, 선택): 로그인 및 클라우드 저장" : "Game Center (iOS, optional): sign-in and cloud save");
  add("permissions", ko ? "앱 접근 권한" : "App permissions", ul(perms));

  // 8. Destruction
  add(
    "destruction",
    ko ? "개인정보의 파기 절차 및 방법" : "How data is deleted",
    ko
      ? `<p>회사는 보유 기간이 지나거나 처리 목적이 달성된 개인정보를 지체 없이(5일 이내) 파기합니다. 전자 파일은 복구할 수 없는 방법으로 삭제하고, 종이 문서는 분쇄하거나 소각합니다. 다른 법령에 따라 보관해야 하는 정보(결제 기록 등)는 별도로 분리하여 해당 기간 동안만 보관한 뒤 파기합니다.</p>`
      : `<p>When the retention period ends or the purpose is fulfilled, we delete the data without delay. Electronic records are deleted so that they cannot be recovered. Data we must keep under other laws (such as purchase records) is stored separately for the required period only and then deleted.</p>`,
  );

  // 9. Rights
  add(
    "rights",
    ko ? "이용자의 권리와 행사 방법" : "Your rights",
    ko
      ? `<p>이용자(만 14세 미만 아동은 법정대리인)는 언제든지 개인정보 열람, 정정·삭제, 처리정지, 동의 철회를 요구할 수 있습니다. <a href="mailto:${studio.email}">${studio.email}</a> 로 요청하면 본인 확인 후 10일 이내에 조치하고 결과를 알려 드립니다. 대리인을 통해 요청하는 경우 위임장을 함께 제출해야 합니다.</p>
<p>계정 삭제는 <a href="delete-account.html">계정 삭제 안내</a>에서 요청할 수 있습니다. 법령에 따라 보관해야 하는 정보는 삭제 요구가 제한될 수 있으며, 이 경우 그 사유를 알려 드립니다.</p>`
      : `<p>You may ask us to access, correct, delete, or restrict processing of your personal information, or withdraw consent, at any time. Email <a href="mailto:${studio.email}">${studio.email}</a>. We will verify your request and respond within 10 days (and within the deadlines required by the law that applies to you). An authorized agent must provide written authorization.</p>
<p>To delete your account, see <a href="delete-account.html">Account deletion</a>. Where the law requires us to keep certain data, we will tell you why we cannot delete it.</p>`,
  );

  // 10. Children
  add(
    "children",
    ko ? "아동의 개인정보" : "Children",
    ko
      ? `<p>게임은 아동을 주 대상으로 하지 않습니다. 회사는 만 14세 미만 아동(미국은 13세 미만)의 개인정보를 법정대리인의 동의 없이 알면서 수집하지 않으며, 그러한 정보가 수집된 사실을 알게 되면 즉시 삭제합니다. 법정대리인은 <a href="mailto:${studio.email}">${studio.email}</a> 로 열람·삭제를 요청할 수 있습니다.</p>`
      : `<p>The Game is not directed to children. We do not knowingly collect personal information from children under 13 (under 14 in Korea, under 16 where local law requires) without verified parental consent. If we learn we have, we delete it promptly. Parents or guardians can contact <a href="mailto:${studio.email}">${studio.email}</a>.</p>`,
  );

  // 11. Security
  add(
    "security",
    ko ? "안전성 확보 조치" : "Security",
    ko
      ? ul([
          "관리적 조치: 개인정보 처리 담당자를 대표자 1인으로 최소화",
          "기술적 조치: 전송 구간 암호화(HTTPS/TLS), 클라우드 관리 콘솔의 접근 권한 최소화, 보안 업데이트 적용",
          "물리적 조치: 개인정보를 처리하는 서버는 수탁자의 보안 인증을 받은 데이터센터에서 운영",
        ])
      : ul([
          "Access to personal data is limited to the studio owner",
          "Data is encrypted in transit (HTTPS/TLS); access to cloud consoles is restricted",
          "Servers are operated by our providers in certified data centers",
        ]) + `<p>No method of transmission or storage is completely secure, but we take reasonable measures to protect your data.</p>`,
  );

  // 12. US
  const ccpaCats = [
    [ko ? "식별자" : "Identifiers", ko ? "이메일, 계정 ID, 광고 ID, IP 주소" : "Email, account ID, advertising ID, IP address", ko ? "이용자, 기기" : "You, your device", ko ? `광고 파트너(Google${adPartners.length ? " 및 미디에이션 광고 사업자" : ""})와 공유 — 맞춤형 광고 동의 시` : `Shared with ad partners (Google${adPartners.length ? " and mediation ad networks" : ""}) for personalized ads, if you allow`],
    [ko ? "인터넷 및 기타 네트워크 활동" : "Internet or other network activity", ko ? "앱 이용 기록, 광고 상호작용, 오류 기록" : "In-app usage, ad interactions, crash logs", ko ? "기기" : "Your device", ko ? "광고 파트너와 공유 — 동의 시" : "Shared with ad partner, if you allow"],
    [ko ? "대략적 위치" : "Approximate geolocation", ko ? "IP 기반 국가·지역" : "Country/region from IP", ko ? "기기" : "Your device", ko ? "판매·공유하지 않음" : "Not sold or shared"],
  ];
  if (has("iap")) ccpaCats.push([ko ? "상업 정보" : "Commercial information", ko ? "구매 내역" : "Purchase history", appStore ? "Google Play, App Store" : "Google Play", ko ? "판매·공유하지 않음" : "Not sold or shared"]);
  add(
    "us",
    ko ? "미국 거주자를 위한 추가 안내" : "US residents (including California)",
    ko
      ? `<p>캘리포니아 소비자 개인정보 보호법(CCPA/CPRA) 및 기타 미국 주법에 따른 추가 안내입니다. 지난 12개월간 회사가 수집한 개인정보의 범주는 다음과 같습니다. 출처·목적은 위 <a href="#purposes">처리 목적</a>을, 범주별 보유 기간은 <a href="#retention">보유 기간</a>을 참고하세요.</p>
${table(["범주", "예시", "출처", "판매·공유 여부"], ccpaCats)}
${ul([
  "회사는 금전을 받고 개인정보를 판매하지 않습니다. 다만 AdMob(미디에이션 포함)을 통한 맞춤형 광고는 CCPA상 교차 맥락 행동 광고를 위한 '공유'에 해당할 수 있습니다.",
  "판매·공유 거부(Do Not Sell or Share): 게임 내 개인정보 옵션(미국 주 개인정보 메시지)에서 거부하거나, 기기 설정에서 광고 ID를 삭제하거나, 이메일로 요청할 수 있습니다. 인식 가능한 거부 신호(Global Privacy Control 등)를 받으면 거부 요청으로 처리합니다.",
  "민감한 개인정보는 수집하지 않습니다. 16세 미만 소비자의 개인정보를 판매·공유한다는 사실을 알지 못합니다.",
  "권리: 알 권리(열람), 삭제권, 정정권, 판매·공유 거부권, 권리 행사를 이유로 차별받지 않을 권리. 요청 시 계정 이메일 또는 UID로 본인을 확인하며, 대리인은 서면 위임을 제출해야 합니다. 요청을 거절한 경우 이메일로 이의를 제기할 수 있습니다.",
  "Do Not Track: 게임은 웹 브라우저의 DNT 신호에 별도로 반응하지 않습니다. 제3자(Google 등 광고 사업자)는 다른 앱·서비스에 걸쳐 시간 경과에 따라 정보를 수집할 수 있습니다.",
])}`
      : `<p>This section supplements the policy for residents of California (CCPA/CPRA, CalOPPA) and other US states with comprehensive privacy laws. In the past 12 months we collected the categories below. For sources and purposes see <a href="#purposes">What we collect</a>; for retention by category see <a href="#retention">How long we keep data</a>.</p>
${table(["Category", "Examples", "Source", "Sold or shared?"], ccpaCats)}
${ul([
  "We do not sell personal information for money. Personalized ads through AdMob (including mediation) may count as \"sharing\" for cross-context behavioral advertising.",
  "Do Not Sell or Share: opt out through the in-game privacy option (US state privacy message), by deleting your advertising ID in device settings, or by emailing us. We treat a recognized opt-out preference signal (such as Global Privacy Control) as an opt-out request.",
  "We do not collect sensitive personal information. We have no actual knowledge of selling or sharing the personal information of consumers under 16.",
  "Your rights: to know/access, delete, correct, opt out of sale/sharing and targeted advertising, and not to be discriminated against for exercising them. We verify requests using your account email or UID. Authorized agents must provide written permission. If we deny your request, you may appeal by replying to our decision email.",
  "Do Not Track: the Game does not respond to browser DNT signals. Third parties (Google and other ad providers) may collect information about your activity over time and across apps.",
])}`,
  );

  // 13. EEA/UK
  add(
    "eu",
    ko ? "EEA·영국 거주자를 위한 추가 안내" : "EEA & UK residents",
    ko
      ? `<p>EU·영국 일반개인정보보호규정(GDPR)에 따른 개인정보 처리자는 ${L(studio.legalName)}이며 연락처는 <a href="mailto:${studio.email}">${studio.email}</a> 입니다. 처리 목적별 법적 근거는 위 <a href="#purposes">표</a>와 같습니다.</p>
${ul([
  "권리: 열람, 정정, 삭제, 처리 제한, 처리 반대(정당한 이익에 근거한 처리 포함), 데이터 이동, 동의 철회(철회 전 처리의 적법성에는 영향 없음)",
  "거주 국가의 개인정보 감독기관에 민원을 제기할 권리가 있습니다.",
  "국외 이전: 대한민국은 EU 적정성 결정(2021) 및 영국 데이터 브리지(2022) 대상국입니다. 미국 수탁자로의 이전은 EU-미국 데이터 프라이버시 프레임워크 또는 표준계약조항에 근거합니다.",
  "개인정보 제공은 법적 의무가 아니지만, 로그인·저장 기능에 필요한 정보를 제공하지 않으면 해당 기능을 이용할 수 없습니다.",
])}`
      : `<p>For the purposes of the EU and UK GDPR, the controller is ${L(studio.legalName)}, contact <a href="mailto:${studio.email}">${studio.email}</a>. The legal basis for each purpose is shown in the <a href="#purposes">table above</a>.</p>
${ul([
  "Your rights: access, rectification, erasure, restriction, objection (including to processing based on legitimate interests), data portability, and withdrawal of consent at any time (without affecting prior processing).",
  "You have the right to lodge a complaint with the data protection authority in your country.",
  "Transfers: Korea is covered by an EU adequacy decision (2021) and a UK data bridge (2022). Transfers to US providers rely on the EU-US Data Privacy Framework or Standard Contractual Clauses.",
  "Providing data is not a legal requirement, but sign-in and cloud save cannot work without the data they need.",
])}`,
  );

  // 14. Officer & remedies
  add(
    "contact",
    ko ? "개인정보 보호책임자 및 권익침해 구제" : "Contact",
    ko
      ? `<p><strong>개인정보 보호책임자</strong>: ${studio.privacyOfficer.ko.replace(/^개인정보 보호책임자:\s*/, "")} · <a href="mailto:${studio.email}">${studio.email}</a></p>
<p>개인정보 침해에 대한 신고나 상담이 필요하면 아래 기관에 문의할 수 있습니다.</p>
${ul([
  '개인정보분쟁조정위원회: 1833-6972 (<a href="https://www.kopico.go.kr" target="_blank" rel="noopener">www.kopico.go.kr</a>)',
  '개인정보침해신고센터: 118 (<a href="https://privacy.kisa.or.kr" target="_blank" rel="noopener">privacy.kisa.or.kr</a>)',
  "대검찰청: 1301",
  '경찰청: 182 (<a href="https://ecrm.police.go.kr" target="_blank" rel="noopener">ecrm.police.go.kr</a>)',
])}`
      : `<p>Questions or requests about this policy: <a href="mailto:${studio.email}">${studio.email}</a> (${L(studio.privacyOfficer)}).</p>
<p>${L(studio.legalName)}, ${L(studio.country)}.</p>`,
  );

  // 15. Changes
  add(
    "changes",
    ko ? "처리방침의 변경" : "Changes to this policy",
    ko
      ? `<p>이 처리방침을 변경하는 경우 시행 7일 전(이용자에게 불리하거나 중요한 변경은 30일 전)부터 이 페이지와 게임 내 공지로 알립니다.</p>`
      : `<p>We will post changes on this page and in the Game at least 7 days before they take effect (30 days for material changes) and update the effective date below.</p>`,
  );

  const toc = `<nav class="toc"><ol>${sections.map((s) => `<li><a href="#${s.id}">${s.title}</a></li>`).join("")}</ol></nav>`;
  return `<h1>${ko ? "개인정보 처리방침" : "Privacy Policy"}</h1>
<p class="meta">${ko ? "시행일" : "Effective"} ${effective}</p>
${toc}
${sections.map((s, i) => `<section><h2 id="${s.id}">${i + 1}. ${s.title}</h2>${s.html}</section>`).join("\n")}`
    // Both language versions live in one page, so anchors are prefixed with the language.
    .replace(/(href="#|id=")([a-z]+)"/g, `$1${lang}-$2"`);
}
