# 컴포넌트 카탈로그 — EY 페이즈 화면설계 (copy-paste 스니펫)

`assets/template.html`의 CSS에 정의된 클래스를 조합해 섹션을 만든다. 아래 스니펫을 그대로 복사한 뒤 텍스트만 개발설계 내용으로 교체하면 gold reference(페이즈01·02)와 동일한 룩이 나온다. **CSS는 절대 재작성하지 말고 템플릿을 그대로 쓴다** — 값(색·간격·폰트)은 이미 픽셀 단위로 맞춰져 있어 손대면 어긋난다.

## 목차
1. 사이드바 메뉴 그룹
2. #home 개요 섹션
3. 화면 섹션 (핵심 반복 단위) / 참조 HTML 원형 이식
4. 목업 내부 부품 (titlebar/qbar/actionbar/tabbar/mock-flex/tree/grid/form/rpanel/statusbar/modal)
5. 공통 섹션 (게이트·업로드·데이터모델 등)
6. 배지·플로우·기타 인라인 요소

---

## 1. 사이드바 메뉴 그룹

첫 강조 그룹은 `.mgroup`(노란 bar), 이후 교차로 `.mgroup.plain`(회색 bar)을 섞어 시각적 리듬을 준다. `data-sec` 값은 해당 섹션의 `id`와 **정확히 일치**해야 링크가 작동한다. `.mid`는 화면 ID나 차수 뱃지.

```html
<div class="mgroup">
  <div class="gtitle"><span class="bar"></span>그룹명(업무 묶음)</div>
  <a class="mitem" data-sec="xxx01">화면명 <span class="mid">XXX-01</span></a>
  <a class="mitem" data-sec="xxx02">화면명 <span class="mid">XXX-02</span></a>
</div>
<div class="mgroup plain">
  <div class="gtitle"><span class="bar"></span>2차 화면</div>
  <a class="mitem" data-sec="xxx10">화면명 <span class="mid">2차</span></a>
</div>
```

---

## 2. #home 개요 섹션

페이즈 첫 화면. 구성: `page-title` → `crumb` → `src`(범위 요약) → `h2.sec 업무 흐름` + `.flow` → `h2.sec 화면 인벤토리` + `table.spec` → `h2.sec 선행조건` + `table.spec`. **`class="section visible"`로 시작 시 노출되는 유일한 섹션.**

```html
<section class="section visible" id="home">
  <div class="page-title"><h1>페이즈 NN — 업무영역</h1><span class="chip-id">XX-XXX</span><span class="badge b-new">1차 YYMM~YYMM</span></div>
  <div class="crumb">개발설계 › 소스.md 기반 화면설계 · 레이아웃 준거: 페이즈01_화면.HTML (EY 레이아웃) · 기준문서 bk_설계서_v1.1.md</div>
  <div class="src"><b>범위</b>: XX-XXX-01~NN (N화면 — <b>1차 x</b> / <b>2차 y</b>). 한 문단으로 페이즈 목적·핵심 메커니즘·선행/후행 관계 요약.</div>

  <h2 class="sec">업무 흐름 — End-to-End</h2>
  <div class="flow">
    <span class="st">선행 페이즈<br><small>산출물</small></span><span class="ar">→</span>
    <span class="st hl">핵심 화면<br><small>핵심 규칙</small></span><span class="ar">→</span>
    <span class="st end">관문/종료<br><small>다음 페이즈로</small></span>
  </div>
  <p class="note">경로/변형이 있으면 여기 서술.</p>

  <h2 class="sec">화면 인벤토리 · 차수</h2>
  <table class="spec">
    <tr><th>#</th><th>화면 ID</th><th>명칭</th><th class="c">차수</th><th>설계서 근거</th><th>본 문서 메뉴</th></tr>
    <tr><td>1</td><td>XX-XXX-01</td><td>화면명</td><td class="c">1차</td><td>§x.x</td><td>그룹 › 화면</td></tr>
    <tr><td>2</td><td>XX-XXX-02</td><td>화면명</td><td class="c"><span class="badge b-gray">2차</span></td><td>§x.x</td><td>그룹 › 화면</td></tr>
  </table>

  <h2 class="sec">선행조건 · MVP 연관</h2>
  <table class="spec">
    <tr><th>선행</th><th>내용</th><th>근거</th></tr>
    <tr><td>선행항목</td><td>내용</td><td>§x.x</td></tr>
  </table>
</section>
```

---

## 3. 화면 섹션 (핵심 반복 단위)

개발설계의 화면 하나 = 이 섹션 하나. 항상 두 블록으로 구성한다:
1. **`.mock`** — 와이어프레임(실제 화면처럼 보이는 목업). 대표 데이터를 채워 화면의 핵심 동작을 눈으로 보이게 한다.
2. **`.screen-details > .screen-desc-list`** — 6개 설계 항목 카드(목적/입력 필드/기능/검증/산출물/연계). 개발설계 md의 해당 화면 소절을 이 6칸에 매핑한다.

`class="section"`(visible 없음)으로 시작 → 사이드바 클릭 시 노출.

```html
<section class="section" id="xxx01">
  <div class="page-title"><h1>화면명</h1><span class="chip-id">XX-XXX-01</span><span class="badge b-new">1차</span></div>
  <div class="crumb">대분류 › 중분류 › 화면명 &nbsp;|&nbsp; 한 줄 요약 · 핵심 성격 (§근거)</div>
  <div class="mock">
    <div class="mock-cap">XX-XXX-01 — 목업이 무엇을 보여주는지 한 줄 캡션(핵심 규칙/동작 포함)</div>
    <!-- titlebar → qbar → actionbar → (tabbar) → mock-flex[lpane? · mock-main · rpanel?] → statusbar -->
  </div>
  <div class="screen-details">
    <div class="screen-desc-list">
      <div class="screen-desc-item"><span class="desc-label">목적</span><span class="desc-body">...</span></div>
      <div class="screen-desc-item"><span class="desc-label">입력 필드</span><span class="desc-body">...</span></div>
      <div class="screen-desc-item"><span class="desc-label">기능</span><span class="desc-body">...</span></div>
      <div class="screen-desc-item"><span class="desc-label">검증</span><span class="desc-body">...</span></div>
      <div class="screen-desc-item"><span class="desc-label">산출물</span><span class="desc-body">...</span></div>
      <div class="screen-desc-item"><span class="desc-label">연계</span><span class="desc-body">...</span></div>
    </div>
  </div>
</section>
```

화면 성격에 맞는 라벨을 쓴다(예: 조회 화면이면 "검증" 대신 "필터·정렬", 배치 화면이면 "산출물" 대신 "처리 결과"). 6칸을 유지하되 내용은 개발설계에 맞춘다.

### 3.1 참조 화면 HTML 원형 이식 패턴

사용자가 기존 화면설계 HTML을 지목하면서 "같은 형태", "상단 메뉴바 타이틀도 같은 형태", "그리드와 폰트도 같게"라고 요청하면, 새로 조합하지 말고 기준 HTML의 해당 화면 섹션을 추출해 이식한다.

규칙:
- 기준 화면 섹션 전체를 복사한다. 예: `구현_화면_전표_v1.1.html`의 `<section class="section visible" id="jv-input"> ... </section>`.
- 대상 페이즈의 사이드바 연결을 위해 `id`만 대상 값으로 바꾼다. 필요하면 출처 식별 클래스만 추가한다. 예: `<section class="section source-wjv" id="jnl01">`.
- 내부의 `page-title`, `src`, `h2.sec`, `mock-cap`, `titlebar`, `qbar`, `actionbar`, `fnbar`, `table.grid`, `rpanel`, `statusbar`, 상세 설명 절을 단순화하거나 재작성하지 않는다.
- 원본이 `.toggle`, `.sumbox`, `.dropzone`, `.file`, `.twocol`, `.dr`, `.cr`, `.dim` 같은 보조 클래스를 쓰면 템플릿 CSS에 정의된 클래스를 그대로 사용한다.
- 교체 후에는 "원본 섹션에서 id/class만 치환한 문자열"과 대상 섹션을 비교해 동일성을 확인한다.

예시:
```html
<!-- source: 구현_화면_전표_v1.1.html / WJV-01 일반전표 -->
<section class="section source-wjv" id="jnl01">
  <!-- 원본 WJV-01 섹션의 page-title, src, mock, 상세 설명을 그대로 유지 -->
</section>
```

`구현_매입매출_전표_v1.0.html`처럼 EY 페이즈 템플릿이 아닌 자체 와이어프레임 문서라면, 해당 화면의 업무 내용만 추출하고 화면은 EY 페이즈 컴포넌트로 다시 그린다. 특히 페이즈03 매입매출전표입력은 일반전표입력과 같은 `source-wjv` 고밀도 그리드 구조를 사용한다.

```html
<!-- source: 구현_매입매출_전표_v1.0.html / WPV-01 매입매출전표입력 -->
<section class="section source-wjv" id="jnl02">
  <div class="page-title"><h1>매입매출전표입력</h1><span class="chip-id">SA-JNL-02 · WPV-01</span></div>
  <div class="mock">
    <div class="titlebar">전표관리 › 매입매출전표입력 ...</div>
    <div class="qbar">전체/유형별 · 월/기간 · taxType 조회조건 ...</div>
    <div class="actionbar">저장 · 전자발행 · 자동전표검증 · 더보기 ...</div>
    <div class="fnbar">세무헤더 입력 · 분개라인 자동생성 · 부가세 자동라인 ON ...</div>
    <div class="mock-flex">
      <div class="mock-main">
        <table class="grid">상단 세무헤더(journal_tax_line) ...</table>
        <table class="grid">하단 분개라인(journal_line) ...</table>
      </div>
      <div class="rpanel">과세유형 라우팅 · 자동분개 규칙 · 검증 ...</div>
    </div>
  </div>
</section>
```

---

## 4. 목업 내부 부품

`.mock` 안에 위→아래 순서로 쌓는다. 화면 성격에 따라 필요한 것만 골라 쓴다.

### 4.1 titlebar (다크 타이틀) — 거의 항상 포함
```html
<div class="titlebar"><span class="tb-crumb">중분류</span><span class="tb-sep">›</span><span class="tb-title">화면명</span><span class="tb-star">☆</span><span class="tb-id">XX-XXX-01</span><span class="tb-right">7기(2026) · 👤 홍길동</span></div>
```

### 4.2 qbar (조회조건 바) — 조회/입력 화면
`.seg`=세그먼트 토글, `.qv`=값 필드, `.qright`=우측 조회 버튼.
```html
<div class="qbar">
  <span class="qlabel">기준연도</span><span class="seg"><span class="on">전기</span><span>전전기</span></span>
  <span class="qlabel">기간</span><span class="qv">2025-01-01 ~ 2025-12-31 <span class="lens">📅</span></span>
  <span class="qright"><button class="abtn yellow" style="padding:3px 18px">🔍 조회</button><button class="abtn">항목보기</button></span>
</div>
```

### 4.3 actionbar (액션 버튼) — 우측 정렬
`.abtn` 변형: `.dark`(주 액션 저장) · `.yellow`(강조/검증) · `.red`(위험) · `.ghost`(보조).
```html
<div class="actionbar"><div class="ab-right">
  <button class="abtn dark">저장 (F3)</button><button class="abtn ghost">엑셀 업로드</button><button class="abtn yellow">정합성 검사</button>
</div></div>
```

### 4.4 tabbar + tabpane (탭) — 하위 뷰가 여러 개일 때
**탭이 있으면 모든 탭의 화면을 각각 그린다.** 첫 탭만 그리고 나머지를 비워두지 않는다 — 「전체」만 있고 「유형별」이 빈 화면이면 안 된다. 각 탭에 대응하는 `.tabpane`을 만들어 그 탭의 목업을 채운다.

규칙:
- `.tabbar`는 `.mock`의 직속 자식으로 두고, 그 **뒤에** 탭 개수만큼 `.tabpane`을 **`.mock`의 직속 자식**으로 나열한다.
- 첫 패널만 `class="tabpane on"`(노출), 나머지는 `class="tabpane"`(숨김). CSS `.tabpane{display:none}` / `.tabpane.on{display:block}`.
- 탭 순서 = 패널 순서(인덱스 매칭). JS가 클릭 시 같은 인덱스의 패널을 켠다. **탭 개수 = 패널 개수** 필수.
- 패널 안에는 그 탭에 필요한 부품(qbar·actionbar·mock-flex·mock-main·grid·form·statusbar…)을 화면 성격대로 넣는다. 탭마다 부품 구성이 달라도 된다.
- 각 패널의 데이터도 그 탭의 규칙을 증명하는 대표값으로 채운다(빈 껍데기 금지).

```html
<div class="tabbar"><div class="tab on">전체 <span class="tno">1</span></div><div class="tab">유형별 <span class="tno">2</span></div></div>
<div class="tabpane on">
  <div class="qbar">…전체 뷰 조회조건…</div>
  <div class="mock-flex"><div class="mock-main">…전체 목록 grid…<div class="statusbar">…</div></div><div class="rpanel">…</div></div>
</div>
<div class="tabpane">
  <div class="qbar">…유형별 뷰 조회조건…</div>
  <div class="mock-flex"><div class="mock-main">…유형별 집계 grid…<div class="statusbar">…</div></div><div class="rpanel">…</div></div>
</div>
```

이미 만들어진 단일-뷰 화면에 탭을 뒤늦게 채워 넣을 때: 기존 「탭바 뒤 ~ .mock 닫기 전」 내용을 `<div class="tabpane on">…</div>`로 감싸 1번 패널로 만들고, 나머지 탭마다 `<div class="tabpane">…</div>`를 이어 붙인다.

실제 2탭 화면의 전체 마크업 예시는 `references/tab-example.md` 참고.

### 4.5 mock-flex (좌·중·우 배치)
`.lpane`(좌측 트리, 선택), `.mock-main`(중앙 본문, 필수), `.rpanel`(우측 검증/연계 패널, 선택).
```html
<div class="mock-flex">
  <div class="lpane"><div class="lp-t">분류 트리</div><div class="tree">...</div></div>
  <div class="mock-main">...그리드·폼...<div class="statusbar">...</div></div>
  <div class="rpanel">...rp-box들...</div>
</div>
```
단순 화면은 `.lpane`/`.rpanel` 생략하고 `.mock-main`만 둔다.

### 4.6 tree (좌측 계정/분류 트리)
```html
<div class="tree">
  <div class="tnode lv1 on">▸ 자산 <span class="cnt">차 1,250,000</span></div>
  <div class="tnode lv2">유동자산 <span class="cnt">820,000</span></div>
  <div class="tnode lv3">375 이월이익잉여금 <span class="cnt">↔ OPN-04</span></div>
</div>
```

### 4.7 grid (데이터 그리드) — 가장 자주 쓰는 본문
`td.num`(우측·monospace 숫자), `td.c`(가운데), `tr.sel`(선택행 하이라이트), `tr.empty`(빈행), `tr.tot`(합계행), `.red`/`.blue`(강조 텍스트), `.dr`/`.cr`(차변/대변 색상), `.dim`(희미한 선택값), `.lens`(돋보기/단축키). 대표 데이터를 넣어 화면 규칙(차대균형·차액0·자동반영 등)이 눈에 보이게 한다.
```html
<table class="grid">
  <tr><th>Code</th><th>계정과목</th><th class="c">차변</th><th class="c">대변</th><th>비고</th></tr>
  <tr class="sel"><td class="c">101</td><td>현금 <span class="lens">🔍 F2</span></td><td class="num">30,000</td><td class="num">—</td><td></td></tr>
  <tr><td class="c">375</td><td>이월이익잉여금 <span class="badge b-block">검증대상</span></td><td class="num">—</td><td class="num">120,000</td><td>↔ OPN-04</td></tr>
  <tr class="empty"><td></td><td></td><td></td><td></td><td></td></tr>
  <tr class="tot"><td colspan="2">합계</td><td class="num">1,250,000</td><td class="num">1,250,000</td><td class="blue">차액 0</td></tr>
</table>
```

### 4.8 formgrid (입력 폼) — 등록/설정 화면
`.formgrid`(4열)·`.c3`·`.c2`로 열 수 조절. `.ff.wide`(2칸)·`.ff.full`(전체). `.fv.ro`=읽기전용.
```html
<div class="formgrid c3">
  <div class="ff"><label>필드명</label><div class="fv">값 <span class="lens">🔍</span></div></div>
  <div class="ff"><label>읽기전용</label><div class="fv ro">자동계산</div></div>
  <div class="ff full"><label>비고</label><div class="fv">전체폭 필드</div></div>
</div>
```

### 4.9 rpanel / rp-box (우측 검증·연계 패널)
검증 규칙은 `<br>` 목록 + 뱃지, 연계는 `.kv`(키-값) 목록으로. 개발설계의 검증/산출/권한 항목을 여기에 압축한다.
```html
<div class="rpanel">
  <div class="rp-box"><div class="rp-t">입력 검증 (§근거)</div><div class="rp-b">
    · 규칙1 <span class="badge b-block">차단</span><br>
    · 규칙2 <span class="badge b-warn">경고</span>
  </div></div>
  <div class="rp-box"><div class="rp-t">산출·연계</div><div class="rp-b">
    <div class="kv"><span class="k">항목</span><span class="v">→ 대상화면</span></div>
  </div></div>
  <div class="rp-box"><div class="rp-t">권한</div><div class="rp-b"><code>tenant:masterdata:write</code></div></div>
</div>
```

### 4.10 statusbar (하단 상태바)
`.okmsg`(초록 통과)·`.warnmsg`(노랑 경고)·`.opts`(상태 옵션 묶음)·`.cnt`(우측 건수).
```html
<div class="statusbar"><span class="okmsg">✓ 대차차액 0 — 대차균형 제약 통과</span><span class="cnt">계정 42건</span></div>
```

### 4.11 WJV-01 고밀도 전표 화면 보조 클래스

`구현_화면_전표_v1.1.html`의 일반전표처럼 고밀도 분개 그리드와 우측 패널을 그대로 이식할 때 사용하는 클래스다.

- `.source-wjv`: 참조 HTML 원형 이식 섹션에 붙인다. 원본처럼 줄바꿈을 줄이고 `rpanel` 폭을 230px로 맞춘다.
- `.toggle .sw`: 자동분개 추천 ON/OFF 스위치.
- `.sumbox`: 기능바 우측의 차변합계/대변합계/차대차액 요약.
- `.dropzone`, `.file`: 첨부파일 드롭 영역과 파일 목록.
- `.twocol`: 상세 설명을 좌우 2단으로 배치.

```html
<section class="section source-wjv" id="jnl01">
  <div class="mock">
    <div class="titlebar">...</div>
    <div class="fnbar">
      <span class="chip on">⚡ 스마트 입력</span>
      <span class="toggle">자동분개 추천 <span class="sw"></span> ON</span>
      <div class="sumbox"><span>차변합계 <b>110,000</b></span><span class="ok">차대차액 0 ✓ 일치</span></div>
    </div>
  </div>
</section>
```

### 4.12 WPV-01 매입매출전표 변환 규칙

매입매출전표입력은 일반전표와 같은 스타일로 보이되, 화면 안에는 원본 WPV 업무 구조를 모두 담는다.

- 상단부 세무헤더와 하단부 분개라인을 `table.grid` 2개로 나란히 세로 배치한다.
- 상단 세무헤더 컬럼: 일, 전표번호, N/U, 유형, 코드, 거래처/사업자번호, 품명, 수량, 단가, 공급가액, 부가세, 전자, 분개, 관리.
- 하단 분개라인 컬럼: 라인, 구분, 계정과목, 차변, 대변, 거래처, 적요, 부서, 프로젝트, 상세·증빙, 관리.
- 매출 유형 11~25는 `.red`, 매입 유형 51~64는 `.blue`로 표시한다.
- 부가세예수금/부가세대급금 자동라인은 `<span class="badge b-block">자동 🔒</span>`로 표시한다.
- 우측 패널에는 전표 정보, 선택 세무헤더, 과세유형 라우팅, 자동분개 규칙, 검증, 관리항목을 둔다.
- 상세 설명에는 원본 WPV-01의 메타/API, 조회방식, 상단부 필드, 하단부 필드/검증 표를 유지한다.

### 4.13 modal (모달 목업) — 팝업/확인창 표현 시
```html
<div class="modal"><div class="m-t">제목 <span class="x">✕</span></div><div class="m-b">본문</div>
  <div class="m-f"><button class="abtn ghost">취소</button><button class="abtn dark">확인</button></div></div>
```

---

## 5. 공통 섹션 (게이트·업로드·데이터모델 등)

화면 목록 뒤에, 개발설계의 검증 게이트/배치/데이터모델/API/권한/DoD 같은 횡단 내용을 별도 섹션으로 둔다. 목업 대신 `.flow`(파이프라인) + `table.spec`(정의표) 조합을 주로 쓴다. 사이드바 마지막 그룹(예: "게이트·공통")에 링크.

```html
<section class="section" id="gate">
  <div class="page-title"><h1>검증 게이트</h1><span class="chip-id">§22</span></div>
  <div class="crumb">공통 › 검증 게이트 · 통과 조건과 차단 규칙</div>
  <h2 class="sec">게이트 파이프라인</h2>
  <div class="flow"><span class="st">입력</span><span class="ar">→</span><span class="st hl">검증</span><span class="ar">→</span><span class="st end">통과→ACTIVE</span></div>
  <h2 class="sec">검증 항목</h2>
  <table class="spec"><tr><th>#</th><th>항목</th><th>규칙</th><th class="c">차단?</th></tr>
    <tr><td>1</td><td>대차균형</td><td>차변합=대변합</td><td class="c"><span class="badge b-block">차단</span></td></tr>
  </table>
</section>
```

---

## 6. 배지·플로우·기타 인라인 요소

- **배지**: `b-block`(빨강 차단), `b-warn`(노랑 경고), `b-ok`(초록 통과), `b-new`(노랑 신규/차수), `b-ref`(파랑 참조), `b-gray`(회색 2차/보조).
- **flow 스텝**: `.st`(기본), `.st.hl`(노랑 강조=핵심 단계), `.st.end`(다크=종료/관문), `.ar`(화살표 →). `<small>`로 부제.
- **code**: 권한 키·엔티티명 등 `<code>tenant:journal:write</code>`.
- **kbd**: 단축키 `<span class="kbd">F3</span>`.
- **§근거 보존**: 개발설계 md의 §번호(예: §25.2.1)를 crumb·rp-t·표에 그대로 남겨 추적성을 유지한다.

---

## 검증 체크리스트 (빌드 후 필수)
- 사이드바 `data-sec` 개수 = `<section id>` 개수, 값이 1:1 매칭.
- `class="section visible"`은 `#home` 하나뿐.
- `<section>`/`</section>`, `<div>`/`</div>` 태그 수 균형. `<main>`/`</main>`, `</html>` 각 1개.
- 각 화면 섹션에 `.mock` + `.screen-desc-list`(6칸) 존재.
- 개발설계의 모든 화면 ID가 섹션으로 존재하는지 대조.
