# 탭 화면 워크드 예시 — 2탭(전체/유형별)

`references/components.md` §4.4의 규칙을 실제로 적용한 예시. BK 페이즈03 `매입매출전표입력(SA-JNL-02)` 화면으로, 탭이 「전체」·「유형별」 2개다. 요점:

- `.tabbar` 뒤에 `.mock`의 직속 자식으로 `.tabpane`을 탭 수(2)만큼 나열한다.
- 첫 패널만 `class="tabpane on"`(노출), 둘째는 `class="tabpane"`(숨김).
- 두 패널의 부품 구성이 서로 달라도 된다(전체=전표 2계층 grid, 유형별=과세유형 집계 grid). 각 패널은 그 탭의 규칙을 증명하는 대표 데이터로 채운다.
- 이 마크업만 맞추면 `assets/template.html`의 탭 전환 JS가 인덱스로 패널을 토글한다(별도 JS 불필요).

아래는 `.mock` 전체(6칸 설계 카드 `screen-desc-list`는 생략, 그 앞까지)를 그대로 옮긴 것이다.

```html
<div class="mock">
    <div class="mock-cap">SA-JNL-02 (WPV-01) — 과세유형 11(과세·빨강) 입력 → 부가세예수금 <b>자동라인</b> 잠금 생성 · 상단 세무헤더가 하단 분개를 구동 · 번호 50001~</div>
    <div class="titlebar"><span class="tb-crumb">전표/장부</span><span class="tb-sep">&#8250;</span><span class="tb-title">매입매출전표입력</span><span class="tb-star">&#9734;</span><span class="tb-id">SA-JNL-02</span><span class="tb-right">7기(2026) &middot; <span class="badge b-gray">DRAFT</span> &middot; &#128100; 홍길동</span></div>
    <div class="tabbar"><div class="tab on">전체 <span class="tno">1</span></div><div class="tab">유형별 <span class="tno">2</span></div></div>
    <div class="tabpane on">
    <div class="qbar">
      <span class="qlabel">기간/월별</span><span class="seg"><span class="on">월별</span><span>기간</span></span>
      <span class="qlabel">회계월</span><span class="qv">2026-06 <span class="lens">&#9662;</span></span>
      <span class="qlabel">전자상태</span><span class="qv">전체 <span class="lens">&#9662;</span></span>
      <span class="qright"><button class="abtn">조건검색</button><button class="abtn yellow" style="padding:3px 18px">&#128269; 조회</button></span>
    </div>
    <div class="actionbar"><div class="ab-right">
      <button class="abtn ghost">일괄분개</button><button class="abtn ghost">복수거래(최대99)</button><button class="abtn ghost">엑셀 자료반영</button><button class="abtn yellow">전자발행</button><button class="abtn dark">저장</button>
    </div></div>
    <div class="mock-flex">
      <div class="mock-main">
        <div class="mock-cap" style="border-top:1px solid #E1E1E6">① 상단부 — 세무헤더 (journal_tax_line)</div>
        <table class="grid">
          <tr><th>일 N/U</th><th>거래처(사업자번호)</th><th>유형</th><th>품명</th><th class="c">공급가액</th><th class="c">부가세</th><th class="c">전자</th></tr>
          <tr class="sel"><td class="c">18 N</td><td>(주)가나상사 (128-81-12345)</td><td><span class="red">11 과세</span></td><td>제품 A 외</td><td class="num">5,000,000</td><td class="num">500,000</td><td class="c"><span class="badge b-ok">전자발행</span></td></tr>
        </table>
        <div class="mock-cap" style="border-top:1px solid #E1E1E6">② 하단부 — 분개라인 (분개유형 2.외상) · 부가세예수금 자동 잠금</div>
        <table class="grid">
          <tr><th>구분</th><th>계정과목</th><th class="c">차변</th><th class="c">대변</th><th>거래처</th><th>적요</th></tr>
          <tr><td class="c"><span class="badge b-gray">차</span></td><td>108 외상매출금 <span class="badge b-warn">2.외상 수정불가</span></td><td class="num">5,500,000</td><td class="num">—</td><td>(주)가나상사</td><td>제품 A 외</td></tr>
          <tr><td class="c"><span class="badge b-gray">대</span></td><td>404 제품매출</td><td class="num">—</td><td class="num">5,000,000</td><td>(주)가나상사</td><td>제품 A 외</td></tr>
          <tr><td class="c"><span class="badge b-gray">대</span></td><td>255 부가세예수금 <span class="badge b-block">자동 &#128274;</span></td><td class="num">—</td><td class="num">500,000</td><td>(주)가나상사</td><td>&rarr; vat_account_rule 생성</td></tr>
          <tr class="tot"><td colspan="2">합계</td><td class="num">5,500,000</td><td class="num">5,500,000</td><td class="blue" colspan="2">차액 0 · 상·하단 금액 일치</td></tr>
        </table>
        <div class="statusbar"><span class="okmsg">&#10003; taxType=11 → 부가세예수금 자동라인(세액 500,000) 생성·잠금</span><span class="cnt">채번 50001~ · 세금계산서합계표 집계 대상</span></div>
      </div>
      <div class="rpanel">
        <div class="rp-box"><div class="rp-t">과세유형 라우팅 (25.4.2.2)</div><div class="rp-b">
          11 과세 &rarr; 부가세신고서 과세<br>+ 세금계산서합계표<br><span class="badge b-block">11 발급 후 17 추가 금지</span> (매출 이중신고 방지)</div></div>
        <div class="rp-box"><div class="rp-t">자동라인 규칙 (25.4.2.3)</div><div class="rp-b">
          매출 과세 &rarr; 대변 부가세예수금<br>매입 과세 &rarr; 차변 부가세대급금<br>영세·면세·불공(54) &rarr; 미생성</div></div>
        <div class="rp-box"><div class="rp-t">검증 (25.4.2.5)</div><div class="rp-b">
          · 사업자번호 누락 <span class="badge b-block">합계표 마감오류</span><br>· 과세유형 정확성 <span class="badge b-block">차단</span><br>· 상·하단 차액 &rarr; 「과표/수입금액제외」</div></div>
        <div class="rp-box"><div class="rp-t">전자발행·비고 (25.4.2.6)</div><div class="rp-b">
          etax_status 상태머신 · 비고=발행 메타(신고·분개 미반영, <code>etax_issue.remark</code>)</div></div>
      </div>
    </div>
    </div>
    <div class="tabpane">
      <div class="qbar">
        <span class="qlabel">기간/월별</span><span class="seg"><span class="on">월별</span><span>기간</span></span>
        <span class="qlabel">회계월</span><span class="qv">2026-06 <span class="lens">&#9662;</span></span>
        <span class="qlabel">유형그룹</span><span class="qv">전체(매출11~25·매입51~64) <span class="lens">&#9662;</span></span>
        <span class="qright"><button class="abtn">조건검색</button><button class="abtn yellow" style="padding:3px 18px">&#128269; 조회</button></span>
      </div>
      <div class="actionbar"><div class="ab-right">
        <button class="abtn ghost">유형펼치기</button><button class="abtn ghost">엑셀</button><button class="abtn yellow">전자발행</button><button class="abtn dark">저장</button>
      </div></div>
      <div class="mock-flex">
        <div class="mock-main">
          <div class="mock-cap" style="border-top:1px solid #E1E1E6">유형별 그룹 집계 — 과세유형(taxType) 기준 소계 · 세금계산서합계표 사전 검토용</div>
          <table class="grid">
            <tr><th>유형</th><th class="c">건수</th><th class="c">공급가액</th><th class="c">부가세</th><th class="c">합계</th><th>비고</th></tr>
            <tr class="sel"><td><span class="red">11 과세매출</span></td><td class="c">42</td><td class="num">128,400,000</td><td class="num">12,840,000</td><td class="num">141,240,000</td><td>세금계산서합계표(매출)</td></tr>
            <tr><td><span class="red">12 영세매출</span></td><td class="c">6</td><td class="num">18,000,000</td><td class="num">—</td><td class="num">18,000,000</td><td>영세율 첨부</td></tr>
            <tr><td><span class="red">13 면세매출</span></td><td class="c">3</td><td class="num">4,200,000</td><td class="num">—</td><td class="num">4,200,000</td><td>계산서합계표(매출)</td></tr>
            <tr><td><span class="red">17 카드매출</span></td><td class="c">28</td><td class="num">9,600,000</td><td class="num">960,000</td><td class="num">10,560,000</td><td>신용카드매출전표</td></tr>
            <tr><td><span class="blue">51 과세매입</span></td><td class="c">37</td><td class="num">86,300,000</td><td class="num">8,630,000</td><td class="num">94,930,000</td><td>세금계산서합계표(매입)</td></tr>
            <tr><td><span class="blue">54 불공제</span></td><td class="c">4</td><td class="num">7,100,000</td><td class="num">710,000</td><td class="num">7,810,000</td><td>매입세액 불공제(자동라인 미생성)</td></tr>
            <tr><td><span class="blue">57 카드매입</span></td><td class="c">19</td><td class="num">5,400,000</td><td class="num">540,000</td><td class="num">5,940,000</td><td>신용카드매입 공제</td></tr>
            <tr class="tot"><td>합계</td><td class="c">139</td><td class="num">259,000,000</td><td class="num">24,680,000</td><td class="num">283,680,000</td><td class="blue">부가세신고서 예정 집계</td></tr>
          </table>
          <div class="statusbar"><span class="okmsg">&#10003; 유형별 소계 = 전체 목록 합계 일치 · 54 불공제는 부가세대급금 자동라인 미생성</span><span class="cnt">7개 유형 · 139건</span></div>
        </div>
        <div class="rpanel">
          <div class="rp-box"><div class="rp-t">매출 유형 (11~25)</div><div class="rp-b">
            11 과세 &middot; 12 영세 &middot; 13 면세<br>14 건별 &middot; 16 수출 &middot; 17 카드<br>&rarr; 세금계산서/계산서 합계표 분기</div></div>
          <div class="rp-box"><div class="rp-t">매입 유형 (51~64)</div><div class="rp-b">
            51 과세 &middot; 52 영세 &middot; 53 면세<br>54 불공제 &middot; 55 수입 &middot; 57 카드<br><span class="badge b-block">54 불공제 자동라인 미생성</span></div></div>
          <div class="rp-box"><div class="rp-t">합계표 대조</div><div class="rp-b">
            유형별 소계 &rarr; 부가세신고서 라인<br>세금계산서합계표 사업자별 재집계<br><span class="badge b-warn">사업자번호 누락 시 마감오류</span></div></div>
          <div class="rp-box"><div class="rp-t">활용</div><div class="rp-b">
            신고 전 유형 편중·오분류 조기 발견<br>전체 탭에서 개별 전표로 드릴다운</div></div>
        </div>
      </div>
    </div>
  </div>
```
