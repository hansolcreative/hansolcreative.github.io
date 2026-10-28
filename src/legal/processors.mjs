// Third-party services a game can use. Each game lists the keys it uses in games.json.
// `company` / `country` / `policy` feed the processor and cross-border transfer tables.
const GOOGLE = { ko: "Google LLC", en: "Google LLC" };
const UNITY = { ko: "Unity Technologies", en: "Unity Technologies" };
const US = { ko: "미국", en: "United States" };

export const PROCESSORS = {
  "google-signin": {
    name: { ko: "Google 로그인", en: "Google Sign-In" },
    company: GOOGLE,
    country: US,
    policy: "https://policies.google.com/privacy",
    data: {
      ko: "Google 계정 이메일, 이름(표시 이름), 프로필 사진, 계정 식별자",
      en: "Google account email, display name, profile picture, account identifier",
    },
    purpose: { ko: "로그인 및 본인 계정 식별", en: "Sign-in and account identification" },
  },
  "google-play-games": {
    name: { ko: "Google Play 게임즈 서비스", en: "Google Play Games Services" },
    company: GOOGLE,
    country: US,
    policy: "https://policies.google.com/privacy",
    data: {
      ko: "Play 게임즈 플레이어 ID, 게이머 이름(닉네임), 프로필 이미지",
      en: "Play Games player ID, gamer name, profile image",
    },
    purpose: { ko: "로그인, 업적·순위표 연동", en: "Sign-in, achievements and leaderboards" },
  },
  "firebase-auth": {
    name: { ko: "Firebase Authentication", en: "Firebase Authentication" },
    company: GOOGLE,
    country: US,
    policy: "https://firebase.google.com/support/privacy",
    data: {
      ko: "사용자 UID, 로그인 제공자 정보, 이메일, IP 주소, 사용자 에이전트",
      en: "User UID, sign-in provider info, email, IP address, user agent",
    },
    purpose: { ko: "계정 인증 및 게임 데이터 저장·동기화", en: "Authentication and saving/syncing game data" },
  },
  "firebase-analytics": {
    name: { ko: "Google Analytics for Firebase", en: "Google Analytics for Firebase" },
    company: GOOGLE,
    country: US,
    policy: "https://firebase.google.com/support/privacy",
    data: {
      ko: "앱 인스턴스 ID, 광고 ID, 기기·OS 정보, 앱 이용 기록(이벤트), 대략적 지역",
      en: "App instance ID, advertising ID, device/OS info, in-app usage events, approximate region",
    },
    purpose: { ko: "이용 통계 분석 및 서비스 개선", en: "Usage analytics and service improvement" },
  },
  "firebase-crashlytics": {
    name: { ko: "Firebase Crashlytics", en: "Firebase Crashlytics" },
    company: GOOGLE,
    country: US,
    policy: "https://firebase.google.com/support/privacy",
    data: {
      ko: "오류(크래시) 기록, 설치 UUID, 기기 상태·OS 정보",
      en: "Crash traces, installation UUID, device state and OS info",
    },
    purpose: { ko: "오류 진단 및 안정성 개선", en: "Crash diagnosis and stability" },
  },
  admob: {
    name: { ko: "Google AdMob · User Messaging Platform", en: "Google AdMob · User Messaging Platform" },
    company: GOOGLE,
    country: US,
    policy: "https://policies.google.com/technologies/partner-sites",
    data: {
      ko: "광고 ID(AAID/IDFA), IP 주소, 기기 정보, 광고 노출·클릭 기록, 동의 상태",
      en: "Advertising ID (AAID/IDFA), IP address, device info, ad impressions/clicks, consent status",
    },
    purpose: {
      ko: "광고 표시(동의 시 맞춤형 광고), 광고 성과 측정, 부정행위 방지, 동의 관리",
      en: "Serving ads (personalized only with consent), ad measurement, fraud prevention, consent management",
    },
  },
  ugs: {
    name: {
      ko: "Unity Gaming Services (Authentication, Cloud Save, Analytics, Leaderboards, Remote Config, Cloud Code)",
      en: "Unity Gaming Services (Authentication, Cloud Save, Analytics, Leaderboards, Remote Config, Cloud Code)",
    },
    company: UNITY,
    country: US,
    policy: "https://unity.com/legal/game-player-and-app-user-privacy-policy",
    data: {
      ko: "플레이어 ID, 연동 계정 식별자, 게임 진행 데이터, 순위표 닉네임·점수, 설치 ID, 기기·OS 정보, IP 주소, 앱 이용 기록",
      en: "Player ID, linked account identifier, game progress, leaderboard name and score, installation ID, device/OS info, IP address, in-app usage events",
    },
    purpose: {
      ko: "계정 인증, 게임 데이터 저장·동기화, 순위표, 서버 기능, 이용 통계",
      en: "Authentication, saving/syncing game data, leaderboards, server features, analytics",
    },
  },
  fcm: {
    name: { ko: "Firebase Cloud Messaging (푸시 알림)", en: "Firebase Cloud Messaging (push notifications)" },
    company: GOOGLE,
    country: US,
    policy: "https://firebase.google.com/support/privacy",
    data: { ko: "푸시 토큰, 기기 정보", en: "Push token, device info" },
    purpose: { ko: "푸시 알림 발송(동의 시)", en: "Sending push notifications (with permission)" },
  },
  "google-play-billing": {
    name: { ko: "Google Play 결제", en: "Google Play Billing" },
    company: GOOGLE,
    country: US,
    policy: "https://policies.google.com/privacy",
    data: {
      ko: "주문 번호, 구매 토큰, 상품 ID, 구매 일시 (카드 등 결제수단 정보는 Google이 처리하며 회사는 받지 않음)",
      en: "Order ID, purchase token, product ID, purchase time (payment card details are handled by Google and never received by us)",
    },
    purpose: { ko: "인앱 결제 처리·검증, 환불 처리", en: "Processing and verifying in-app purchases, refunds" },
  },
};
