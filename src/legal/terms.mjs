// Terms of Service. Structure and wording follow the KFTC 모바일게임 표준약관 (제10078호),
// with 전자상거래법 제17조 withdrawal rules, 게임산업법 확률형 아이템 disclosure, and the
// Apple custom EULA minimum terms for iOS players.

const ol = (items) => `<ol>${items.map((x) => `<li>${x}</li>`).join("")}</ol>`;

export function terms(lang, { studio, game, games, root }) {
  const ko = lang === "ko";
  const iap = games.some((g) => g.iap);
  const ads = games.some((g) => g.ads);
  const effective = games.map((g) => g.effective).sort().at(-1);
  const subject = game ? (ko ? `「${game.name.ko}」` : game.name.en) : ko ? "회사가 제공하는 게임" : "the games we publish";
  const privacyHref = game ? "privacy.html" : "privacy-policy.html";
  const deleteHref = "delete-account.html";
  const biz = studio.business || {};
  const bizRows = [
    [ko ? "상호" : "Business name", studio.legalName[lang]],
    [ko ? "대표자" : "Representative", biz.representative],
    [ko ? "주소" : "Address", biz.address?.[lang]],
    [ko ? "전화" : "Phone", biz.phone],
    [ko ? "이메일" : "Email", `<a href="mailto:${studio.email}">${studio.email}</a>`],
    [ko ? "사업자등록번호" : "Business registration no.", biz.registrationNo],
    [ko ? "통신판매업 신고번호" : "Mail-order business report no.", biz.mailOrderNo],
  ].filter(([, v]) => v);

  const arts = [];
  const art = (title, html) => arts.push({ title, html });

  if (ko) {
    art("목적", `<p>이 약관은 ${studio.legalName.ko}(이하 "회사")가 모바일 기기 등을 통해 제공하는 ${subject} 및 이에 부수하는 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자의 권리·의무 및 책임사항, 기타 필요한 사항을 정합니다.</p>`);
    art("용어의 정의", ol([
      '"이용자"란 이 약관에 따라 서비스를 이용하는 사람을 말하며, 게스트 이용자와 Google 계정으로 로그인한 이용자를 포함합니다.',
      '"계정"이란 이용자를 식별하기 위해 서비스가 부여하는 식별자(UID) 및 이와 연결된 로그인 정보를 말합니다.',
      '"게임 데이터"란 이용자가 서비스를 이용하며 생성·획득한 진행 기록, 재화, 아이템, 설정 등을 말합니다.',
      ...(iap ? ['"유료 콘텐츠"란 이용자가 앱 마켓 결제를 통해 구매하는 재화·아이템·광고 제거 등 서비스 내 콘텐츠를 말합니다.', '"앱 마켓"이란 Google Play, App Store 등 게임을 배포하고 결제를 처리하는 플랫폼을 말합니다.'] : []),
    ]));
    art("회사정보 등의 제공", `<p>회사는 다음 사항을 이용자가 알아보기 쉽도록 서비스 내 또는 그 연결화면에 표시합니다.</p>
<div class="table-scroll"><table><tbody>${bizRows.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}</tbody></table></div>
<p><a href="${privacyHref}">개인정보 처리방침</a> · 이용약관(본 문서)</p>`);
    art("약관의 효력 및 변경", ol([
      "회사는 이 약관을 서비스 내 또는 그 연결화면에 게시하며, 서비스 중단, 청약철회, 환급, 계약 해지, 회사의 면책 등 중요한 내용은 <strong>굵은 글씨</strong>로 표시합니다.",
      "회사가 약관을 개정할 경우 적용일자, 개정 내용 및 사유를 명시하여 적용일 7일 전부터 공지합니다. <strong>이용자에게 불리하거나 중대한 변경은 적용일 30일 전부터 공지하고 개별 통지</strong>하며, 개정 전후 내용을 비교하여 표시합니다.",
      "공지 시 적용일까지 거부 의사를 표시하지 않으면 동의한 것으로 본다는 내용을 함께 알리며, 이용자가 적용일까지 거부 의사를 표시하지 않으면 개정약관에 동의한 것으로 봅니다. 동의하지 않는 이용자는 이용계약을 해지할 수 있습니다.",
      "회사는 관련 법령을 위반하지 않는 범위에서 이 약관을 개정할 수 있으며, 약관에 관한 질의는 이메일로 받습니다.",
    ]));
    art("이용계약의 체결", ol([
      "이용계약은 이용자가 게임을 설치·실행하여 이 약관에 동의하고 서비스 이용을 시작할 때 체결됩니다. Google 로그인은 선택 사항이며, 게스트로도 이용할 수 있습니다.",
      "만 14세 미만 아동은 법정대리인의 동의를 받아 이용해야 합니다.",
      "서비스 이용 중 데이터 통신 요금이 발생할 수 있으며, 이는 이용자가 가입한 통신사의 요금 정책에 따릅니다.",
    ]));
    art("약관 외 준칙", `<p>이 약관에서 정하지 않은 사항은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「게임산업진흥에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「콘텐츠산업진흥법」 등 관련 법령과 상관례에 따릅니다.</p>`);
    art("개인정보 보호", `<p>회사는 관련 법령에 따라 이용자의 개인정보를 보호하며, 자세한 내용은 <a href="${privacyHref}">개인정보 처리방침</a>에 따릅니다.</p>`);
    art("회사의 의무", ol([
      "회사는 관련 법령과 이 약관을 성실히 지키며, 계속적이고 안정적으로 서비스를 제공하기 위해 노력합니다.",
      "회사는 이용자의 의견이나 불만이 정당하다고 인정되면 신속히 처리하고, 처리 결과를 알립니다.",
    ]));
    art("이용자의 의무", `<p>이용자는 다음 행위를 해서는 안 됩니다.</p>${ol([
      "타인의 계정이나 결제 정보를 도용하는 행위",
      "회사가 제공하지 않은 프로그램(핵, 매크로, 변조 클라이언트 등)으로 서비스를 이용하거나, 버그를 악용하는 행위",
      "서비스의 소스코드를 역설계·디컴파일하거나 서버에 비정상적으로 접근하는 행위",
      "게임 데이터, 계정, 유료 콘텐츠를 회사의 동의 없이 현금 등으로 매매·양도하는 행위",
      "회사 또는 제3자의 저작권 등 지적재산권, 명예를 침해하는 행위",
      ...(ads ? ["광고를 비정상적으로 클릭하거나 노출시키는 행위"] : []),
      "기타 관련 법령에 위반되는 행위",
    ])}`);
    art("서비스의 제공, 변경 및 중단", ol([
      "회사는 운영상·기술상 필요에 따라 서비스를 변경할 수 있으며 변경 전에 서비스 내에 공지합니다. 다만 버그 수정, 긴급 업데이트 등 부득이한 경우에는 사후에 공지할 수 있습니다.",
      "<strong>회사는 경영상의 중대한 사유로 서비스를 지속하기 어려운 경우 서비스를 종료할 수 있으며, 이 경우 종료일 30일 전까지 종료일자, 사유, 보상 조건을 서비스 내에 공지하고 이용자에게 통지합니다.</strong>",
      ...(iap ? ["<strong>서비스 종료 시 사용하지 않았거나 사용 기간이 남은 유료 콘텐츠는 「콘텐츠이용자보호지침」에 따라 환급하며, 종료 후 30일 이상 환급 문의 창구를 운영합니다.</strong>"] : []),
      "서비스는 연중무휴 제공을 원칙으로 하나, 점검·장애 등으로 일시 중단될 수 있습니다.",
    ]));
    if (ads) art("광고의 게재", `<p>회사는 서비스 내에 광고를 게재할 수 있습니다. 광고성 푸시 알림은 수신에 동의한 이용자에게만 보내며, 이용자는 언제든 수신을 거부할 수 있습니다. 광고에 이용되는 정보는 <a href="${privacyHref}">개인정보 처리방침</a>에 따릅니다.</p>`);
    art("저작권 및 이용 허락", ol([
      "서비스 내 콘텐츠에 대한 저작권과 지적재산권은 회사(또는 정당한 권리자)에 귀속합니다.",
      "회사는 이용자에게 서비스를 개인적·비상업적으로 이용할 수 있는 양도 불가능한 비독점적 권리를 부여합니다. 게임 데이터와 유료 콘텐츠는 서비스 내에서 이용할 수 있는 권리이며, 소유권이나 현금 가치를 갖지 않습니다.",
    ]));
    if (iap) {
      art("유료 콘텐츠의 구매 및 이용", ol([
        "유료 콘텐츠의 대금 부과·결제는 앱 마켓이 정하는 정책과 방법에 따릅니다.",
        "유료 콘텐츠의 이용 기간은 구매 시 표시된 기간에 따르며, 기간의 정함이 없는 유료 콘텐츠는 서비스 종료 시 공지된 종료일까지 이용할 수 있습니다.",
        "게스트로 구매한 유료 콘텐츠는 기기 변경·앱 삭제 시 복구되지 않을 수 있으므로, Google 로그인을 권장합니다. 앱 마켓의 구매 복원 기능으로 복원 가능한 상품은 복원할 수 있습니다.",
      ]));
      art("확률형 아이템 정보의 표시", `<p>회사는 「게임산업진흥에 관한 법률」 등에 따라 표시 의무가 있는 확률형 아이템의 종류와 확률 정보를 서비스 내 구매 화면 또는 그 연결화면에 표시합니다.</p>`);
    }
    art("이용 제한 및 이의 신청", ol([
      "회사는 이용자가 제9조를 위반한 경우 위반의 정도에 따라 경고, 일시 정지, 영구 이용 제한, 부정하게 얻은 게임 데이터의 회수 등의 조치를 할 수 있으며, 그 사유와 기간을 이용자에게 알립니다.",
      "이용자는 조치 통지를 받은 날부터 14일 이내에 이메일로 이의를 신청할 수 있으며, 회사는 접수일부터 15일 이내에 답변합니다(기간 내 답변이 어려우면 사유와 일정을 알립니다).",
    ]));
    if (iap) {
      art("청약철회", ol([
        "<strong>유료 콘텐츠를 구매한 이용자는 구매일 또는 콘텐츠 이용 가능일 중 늦은 날부터 7일 이내에 별도의 수수료 없이 청약철회를 할 수 있습니다.</strong>",
        `<strong>다음 경우에는 청약철회가 제한됩니다.</strong> 다만 여러 개로 나눌 수 있는 상품은 사용하지 않은 부분에 대해 철회할 수 있습니다.${ol([
          "구매 즉시 사용되거나 적용되는 유료 콘텐츠",
          "추가 혜택이 제공되는 경우 그 추가 혜택이 사용된 콘텐츠",
          "개봉 행위를 사용으로 볼 수 있거나 개봉 시 효용이 결정되는 콘텐츠(확률형 아이템 등)를 개봉한 경우",
        ])}`,
        "회사는 청약철회가 제한되는 콘텐츠에 그 사실을 구매 화면에 명확히 표시하고 콘텐츠 정보를 제공합니다. 회사가 이 조치를 하지 않은 경우 제한 사유에도 불구하고 청약철회를 할 수 있습니다.",
        "구매한 콘텐츠가 표시·광고 내용과 다르거나 계약 내용과 다르게 이행된 경우, 이용 가능일부터 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약철회를 할 수 있습니다.",
        `청약철회는 이메일(<a href="mailto:${studio.email}">${studio.email}</a>) 또는 앱 마켓의 환불 절차로 신청할 수 있으며, 회사는 앱 마켓을 통해 구매 내역을 확인합니다. 철회가 이루어지면 회사는 지체 없이 콘텐츠를 회수하고 3영업일 이내에 환급(또는 앱 마켓에 환급 요청)합니다.`,
        "<strong>미성년자가 법정대리인의 동의 없이 구매한 경우 미성년자 본인 또는 법정대리인은 그 계약을 취소할 수 있습니다.</strong> 다만 법정대리인이 처분을 허락한 재산으로 구매했거나, 미성년자가 속임수로 성년자 또는 동의가 있는 것으로 믿게 한 경우에는 취소할 수 없습니다. 회사는 확인을 위해 증빙 서류를 요청할 수 있습니다.",
      ]));
      art("과오납금의 환급", ol([
        "회사는 과오납금이 발생한 경우 이를 환급합니다. 다만 이용자의 과실로 발생한 경우 환급에 드는 실제 비용은 합리적인 범위에서 이용자가 부담합니다.",
        "앱 결제는 앱 마켓의 결제 방식에 따르며, 과오납금은 회사 또는 앱 마켓에 환급을 요청할 수 있습니다. 환급은 각 앱 마켓 또는 회사의 환급 정책에 따라 진행되며, 회사는 필요한 정보를 받은 날부터 3영업일 이내에 환급합니다.",
      ]));
    }
    art("계약 해지", ol([
      `이용자는 언제든지 <a href="${deleteHref}">계정 삭제</a>를 통해 이용계약을 해지할 수 있습니다. <strong>계정을 삭제하면 게임 데이터${iap ? "와 유료 콘텐츠" : ""}가 모두 삭제되어 복구할 수 없습니다.</strong>`,
      "회사는 이용자가 이 약관에서 금지하는 행위를 하는 등 계약을 유지할 수 없는 중대한 사유가 있으면 상당한 기간을 정해 미리 알린 뒤 이용계약을 해지할 수 있습니다.",
      ...(iap ? ["해지에 따른 환급 및 손해배상은 「콘텐츠이용자보호지침」에 따릅니다."] : []),
    ]));
    art("손해배상", `<p>회사 또는 이용자가 이 약관을 위반하여 상대방에게 손해를 입힌 경우 그 손해를 배상할 책임이 있습니다. 다만 고의 또는 과실이 없는 경우에는 그러하지 않습니다.</p>`);
    art("회사의 면책", ol([
      "<strong>회사는 천재지변 등 불가항력으로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.</strong>",
      "<strong>회사는 설비 점검·교체 등 부득이한 사유로 발생한 손해, 이용자의 귀책사유로 인한 서비스 이용 장애, 이용자 간 또는 이용자와 제3자 간 분쟁에 대해 책임을 지지 않습니다.</strong>",
      "다만 위 각 호에도 불구하고 회사의 고의 또는 중대한 과실로 인한 손해에 대해서는 책임이 면제되지 않습니다.",
    ]));
    art("이용자에 대한 통지", `<p>회사는 이용자에게 이메일, 서비스 내 알림 등으로 통지할 수 있으며, 이용자 전체에 대한 통지는 7일 이상 서비스 내에 게시하는 것으로 갈음할 수 있습니다.</p>`);
    art("준거법 및 재판관할", `<p>이 약관은 대한민국 법률에 따라 규율되고 해석됩니다. 회사와 이용자 간 분쟁으로 소송이 제기되는 경우 「민사소송법」 등 법령에 정한 절차에 따른 법원을 관할 법원으로 합니다. 이용자가 거주하는 국가의 강행법규가 이용자에게 더 유리한 보호를 정하는 경우 그 법규가 적용됩니다.</p>`);
    art("고충 처리 및 분쟁 해결", `<p>이용자의 의견이나 불만은 <a href="mailto:${studio.email}">${studio.email}</a> 로 접수하며, 회사는 정당한 의견이나 불만을 신속히 처리합니다. 처리에 오래 걸리는 경우 그 사유와 일정을 알립니다. 분쟁이 원만히 해결되지 않으면 이용자는 콘텐츠분쟁조정위원회(<a href="https://www.kcdrc.kr" target="_blank" rel="noopener">www.kcdrc.kr</a>) 등에 조정을 신청할 수 있습니다.</p>`);
    art("iOS 이용자에 관한 특칙", ol([
      "이 약관은 회사와 이용자 사이에 체결되며 Apple Inc.는 당사자가 아닙니다. 서비스와 그 콘텐츠에 대한 책임은 회사에 있습니다.",
      "이용자에게 부여되는 이용 허락은 이용자가 소유하거나 관리하는 Apple 기기에서 App Store 이용 규칙(가족 공유 포함)에 따라 앱을 이용할 수 있는 양도 불가능한 권리입니다.",
      "앱의 유지보수와 지원은 회사가 제공하며 Apple은 그 의무를 지지 않습니다.",
      "앱이 적용 가능한 보증에 부합하지 않는 경우 이용자는 Apple에 알려 구매 금액을 환불받을 수 있으며, Apple은 법이 허용하는 범위에서 그 외의 보증 책임을 지지 않습니다.",
      "앱과 관련한 제조물 책임, 법령 위반, 소비자 보호·개인정보 관련 청구, 제3자의 지적재산권 침해 청구는 Apple이 아닌 회사가 처리합니다.",
      "이용자는 미국 정부의 금수 조치 대상 국가에 있지 않으며, 미국 정부의 거래 제한 대상자 명단에 포함되지 않았음을 보증합니다.",
      "이용자는 앱 이용 시 관련 제3자 약관(통신사 약관 등)을 준수해야 합니다.",
      "Apple 및 그 자회사는 이 약관의 제3자 수익자이며, 이용자가 약관에 동의하면 Apple은 이용자에게 이 약관을 집행할 권리를 갖습니다.",
    ]));
    art("언어", `<p>이 약관은 한국어와 영어로 제공되며, 두 버전의 내용이 다를 경우 법령이 허용하는 범위에서 한국어 버전이 우선합니다.</p>`);
  } else {
    art("Purpose", `<p>These Terms govern your use of ${subject} and related services (the "Service") provided by ${studio.legalName.en} ("we", "us"), and set out the rights and responsibilities of you and us.</p>`);
    art("Definitions", ol([
      '"You" means anyone who uses the Service, whether as a guest or signed in with a Google account.',
      '"Account" means the identifier (UID) assigned to you by the Service and any sign-in information linked to it.',
      '"Game data" means progress, currencies, items, settings and other data you create or obtain in the Service.',
      ...(iap ? ['"Paid content" means currencies, items, ad removal and other content you buy through an app store.', '"App store" means Google Play, the App Store or another platform that distributes the game and processes payments.'] : []),
    ]));
    art("Company information", `<div class="table-scroll"><table><tbody>${bizRows.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}</tbody></table></div>
<p><a href="${privacyHref}">Privacy Policy</a> · Terms of Service (this page)</p>`);
    art("Changes to these Terms", ol([
      "We post these Terms in the Service or on a linked page. Important terms (service termination, withdrawal, refunds, termination, limitation of liability) are shown in <strong>bold</strong>.",
      "We will announce changes, with the effective date and reasons, at least 7 days in advance. <strong>Changes that are unfavorable to you or material will be announced at least 30 days in advance and notified to you individually.</strong>",
      "If you do not object before the effective date, you will be treated as having accepted the change. If you do not agree, you may stop using the Service and delete your account.",
    ]));
    art("Using the Service", ol([
      "By installing and using the game you agree to these Terms. Google Sign-In is optional; you may play as a guest.",
      "If you are a minor, you must have permission from a parent or legal guardian (in Korea, users under 14 need their consent).",
      "Your mobile carrier's data charges may apply.",
    ]));
    art("Privacy", `<p>Our handling of personal information is described in the <a href="${privacyHref}">Privacy Policy</a>.</p>`);
    art("Our responsibilities", `<p>We will comply with applicable laws and these Terms, make reasonable efforts to provide the Service reliably, and respond promptly to legitimate concerns.</p>`);
    art("Prohibited conduct", `<p>You must not:</p>${ol([
      "use another person's account or payment information;",
      "use cheats, bots, macros, modified clients, or exploit bugs;",
      "reverse engineer, decompile, or gain unauthorized access to the Service or its servers;",
      "sell or transfer accounts, game data, or paid content for money or other value without our consent;",
      "infringe our or others' intellectual property or other rights;",
      ...(ads ? ["generate fraudulent ad impressions or clicks;"] : []),
      "violate any applicable law.",
    ])}`);
    art("Changes to and termination of the Service", ol([
      "We may update the Service and will announce changes in advance, except for bug fixes and urgent updates, which may be announced afterwards.",
      "<strong>If we must end the Service for serious business reasons, we will announce the end date, reason and any compensation at least 30 days in advance.</strong>",
      ...(iap ? ["<strong>When the Service ends, we will refund unused paid content or paid content with remaining usage time as required by law, and keep a refund contact open for at least 30 days afterwards.</strong>"] : []),
      "The Service may be temporarily unavailable for maintenance or outages.",
    ]));
    if (ads) art("Advertising", `<p>The Service shows ads. We send promotional push notifications only if you opt in, and you can opt out at any time. See the <a href="${privacyHref}">Privacy Policy</a> for how ad data is handled.</p>`);
    art("License and intellectual property", ol([
      "The Service and its content belong to us or our licensors.",
      "We grant you a personal, non-commercial, non-transferable, non-exclusive, revocable license to use the Service. Game data and paid content are a license to use content within the Service; they are not your property and have no cash value.",
    ]));
    if (iap) {
      art("Paid content", ol([
        "Prices and payment are handled by the app store under its policies.",
        "Paid content is available for the period stated at purchase. Content without a stated period remains available until the Service ends.",
        "Purchases made as a guest may be lost if you change devices or uninstall the game, so we recommend signing in. Products supported by the app store's restore function can be restored.",
      ]));
      art("Randomized items", `<p>Where the game offers randomized items (loot boxes), we show the item types and their probabilities on the purchase screen or a linked page before purchase.</p>`);
    }
    art("Suspension and appeals", ol([
      "If you breach the prohibited conduct rules, we may warn you, suspend or permanently restrict your account, or remove improperly obtained game data, and we will tell you why.",
      "You may appeal by email within 14 days of the notice. We will reply within 15 days, or tell you why we need more time.",
    ]));
    if (iap) {
      art("Cancellations and refunds", ol([
        "<strong>You may cancel a purchase within 7 days of the purchase date or the date the content became available, whichever is later, at no charge.</strong>",
        `<strong>Cancellation is not available for:</strong> (a) content used or applied immediately on purchase, (b) bonus content that has been used, or (c) randomized content that has been opened. Unused parts of divisible bundles can still be cancelled.`,
        "We clearly mark non-refundable content on the purchase screen. If we fail to do so, you may cancel despite the above.",
        "If content differs from its description or advertising, you may cancel within 3 months of availability or 30 days of discovering the difference.",
        `Request cancellations by email (<a href="mailto:${studio.email}">${studio.email}</a>) or through the app store's refund process. After a valid cancellation we will revoke the content and refund (or ask the app store to refund) within 3 business days.`,
        "<strong>A purchase made by a minor without a guardian's consent may be cancelled by the minor or the guardian</strong>, except where Korean law provides otherwise.",
        "Nothing in these Terms limits refund rights you have under the consumer laws of your country or the app store's policies.",
      ]));
    }
    art("Account deletion", ol([
      `You can end this agreement at any time by <a href="${deleteHref}">deleting your account</a>. <strong>Deleting your account permanently removes your game data${iap ? " and paid content" : ""}.</strong>`,
      "We may terminate your account after reasonable notice if you seriously breach these Terms.",
    ]));
    art("Disclaimers and limitation of liability", ol([
      "Each party is liable for damage it causes by breaching these Terms, unless it was not at fault.",
      "<strong>To the extent permitted by law, the Service is provided \"as is\", and we are not liable for force majeure, scheduled maintenance, problems caused by you, or disputes between users or with third parties.</strong>",
      "Nothing in these Terms excludes our liability for intentional misconduct or gross negligence, or any liability that cannot be excluded by law.",
    ]));
    art("Notices", `<p>We may contact you by email or in-game notice. Notices to all users may be given by posting in the Service for at least 7 days.</p>`);
    art("Governing law and disputes", `<p>These Terms are governed by the laws of the Republic of Korea. Disputes will be resolved by the court with jurisdiction under applicable procedural law. If you are a consumer, you keep the protection of the mandatory laws of your country of residence. Contact us first at <a href="mailto:${studio.email}">${studio.email}</a>; Korean users may also apply to the Content Dispute Resolution Committee (<a href="https://www.kcdrc.kr" target="_blank" rel="noopener">kcdrc.kr</a>).</p>`);
    art("Additional terms for iOS users", ol([
      "These Terms are between you and us, not Apple Inc. We, not Apple, are responsible for the app and its content.",
      "Your license is a non-transferable right to use the app on Apple-branded devices you own or control, as permitted by the App Store Usage Rules (including Family Sharing).",
      "We, not Apple, provide maintenance and support for the app.",
      "If the app fails to conform to any applicable warranty, you may notify Apple for a refund of the purchase price. To the extent permitted by law, Apple has no other warranty obligation.",
      "We, not Apple, are responsible for any claims relating to the app, including product liability, legal or regulatory compliance, consumer protection, privacy, and third-party intellectual property claims.",
      "You represent that you are not located in a country subject to a US government embargo or designated as \"terrorist supporting\", and are not on any US government list of prohibited or restricted parties.",
      "You must comply with applicable third-party terms (such as your carrier's) when using the app.",
      "Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce them against you.",
    ]));
    art("Language", `<p>These Terms are available in Korean and English. If they conflict, the Korean version prevails to the extent permitted by law.</p>`);
  }

  const body = arts
    .map((a, i) => `<section><h2 id="${lang}-a${i + 1}">${ko ? `제${i + 1}조 (${a.title})` : `${i + 1}. ${a.title}`}</h2>${a.html}</section>`)
    .join("\n");
  return `<h1>${ko ? "이용약관" : "Terms of Service"}</h1>
<p class="meta">${ko ? "시행일" : "Effective"} ${effective}</p>
${body}
<p class="meta">${ko ? `부칙: 이 약관은 ${effective}부터 시행합니다.` : `These Terms take effect on ${effective}.`}</p>`;
}
