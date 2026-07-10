import { useEffect, useState } from 'react';
import ScreenShell from '../../components/frame/ScreenShell';
import QueryBar, { QLabel, QValue, Seg, ABtn } from '../../components/frame/QueryBar';
import RightPanel from '../../components/frame/RightPanel';
import InfoBox from '../../components/frame/InfoBox';
import StatusBar from '../../components/frame/StatusBar';
import ScreenDetails from '../../components/frame/ScreenDetails';
import { fetchCommonCodes } from '../../api/codes';
import type { CommonCodeGroup } from '../../types';

/** OP-05C 시스템 공통코드 관리 — 마스터(코드그룹)/세부(코드항목), 실제 API 연동 */
export default function CommonCodePage() {
  const [groups, setGroups] = useState<CommonCodeGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [domain, setDomain] = useState('전체');
  const [useYn, setUseYn] = useState('전체');

  useEffect(() => {
    void fetchCommonCodes().then(setGroups);
  }, []);

  const sel = groups.find((g) => g.groupCode === selectedGroup) ?? groups[0];
  const items = (sel?.items ?? []).filter(
    (i) => useYn === '전체' || (useYn === 'Y') === i.isActive,
  );

  return (
    <ScreenShell
      title="시스템 공통코드"
      screenId="OP-05C"
      breadcrumb={['운영콘솔', '공통 표준 카탈로그', '시스템 공통코드 관리']}
      titleRight={<>CommonCodeVersion v21</>}
    >
      <QueryBar
        actions={
          <>
            <ABtn variant="yellow">🔍 조회</ABtn>
            <ABtn>마스터 추가</ABtn>
            <ABtn>마스터 수정</ABtn>
            <ABtn variant="red">마스터 삭제</ABtn>
            <ABtn variant="dark">마스터 저장</ABtn>
          </>
        }
      >
        <QLabel>마스터 검색</QLabel>
        <QValue><input placeholder="코드그룹/그룹명" /> <span className="lens">⌕</span></QValue>
        <QLabel>도메인</QLabel>
        <Seg options={['전체', 'AUTH', 'MENU', 'BATCH', 'SECURITY']} value={domain} onChange={setDomain} />
        <QLabel>적용범위</QLabel>
        <QValue>GLOBAL/PLAN/TENANT <span className="lens">▾</span></QValue>
        <QLabel>상태</QLabel>
        <QValue>ACTIVE/RETIRED <span className="lens">▾</span></QValue>
      </QueryBar>
      <div className="mock-flex">
        <div className="lpane">
          <div className="lp-t">마스터: 코드그룹 <span className="cnt">{groups.length}건</span></div>
          <div className="ptree">
            {groups.map((g) => (
              <div
                key={g.groupCode}
                className={`tnode lv1${sel?.groupCode === g.groupCode ? ' on' : ''}`}
                onClick={() => setSelectedGroup(g.groupCode)}
              >
                {g.groupCode} <span className="cnt">{g.groupName} · {g.items.length}건</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mock-main">
          <div className="formgrid c3 label-left">
            <div className="ff"><label>코드그룹</label><div className="fv ro">{sel?.groupCode ?? '-'}</div></div>
            <div className="ff"><label>그룹 국문명</label><div className="fv ro">{sel?.groupName ?? '-'}</div></div>
            <div className="ff"><label>도메인</label><div className="fv ro">SYSTEM</div></div>
            <div className="ff"><label>적용범위</label><div className="fv ro">GLOBAL</div></div>
            <div className="ff"><label>변경정책</label><div className="fv ro">DRAFT → PUBLISHED</div></div>
            <div className="ff"><label>발행버전</label><div className="fv ro">v21</div></div>
          </div>
          <div className="qbar">
            <span className="qlabel">세부 검색</span>
            <span className="qv"><input placeholder="코드/국문명" /> <span className="lens">⌕</span></span>
            <span className="qlabel">사용여부</span>
            <Seg options={['전체', 'Y', 'N']} value={useYn} onChange={setUseYn} />
            <span className="qright">
              <ABtn variant="yellow">🔍 조회</ABtn>
              <ABtn>세부 추가</ABtn>
              <ABtn>세부 수정</ABtn>
              <ABtn variant="red">세부 삭제</ABtn>
              <ABtn variant="dark">세부 저장</ABtn>
              <ABtn>영향 분석</ABtn>
              <ABtn variant="dark">발행</ABtn>
            </span>
          </div>
          <div className="gridwrap">
            <table className="grid">
              <thead><tr><th>코드</th><th>코드그룹</th><th>국문명</th><th className="c">정렬</th><th className="c">사용여부</th><th>시작일</th><th>종료일</th></tr></thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.code}>
                    <td className="mono">{item.code}</td>
                    <td>{sel?.groupCode}</td>
                    <td>{item.name}</td>
                    <td className="c">{item.sortOrder}</td>
                    <td className="c"><span className={`badge ${item.isActive ? 'b-ok' : 'b-gray'}`}>{item.isActive ? 'Y' : 'N'}</span></td>
                    <td>2026-01-01</td>
                    <td>9999-12-31</td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan={7} className="dim">세부 코드가 없습니다</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <StatusBar
            message={sel ? `✓ ${sel.groupCode} 선택됨` : '✓ 마스터 선택 대기'}
            count={`세부 ${items.length}건`}
          />
        </div>
        <RightPanel>
          <InfoBox title="마스터/세부 규칙">마스터 선택 전 세부 저장 차단<br /><span className="badge b-block">COMMON_CODE_GROUP_REQUIRED</span></InfoBox>
          <InfoBox title="발행 차이">코드그룹을 선택하면 DRAFT/PUBLISHED 차이가 표시된다.</InfoBox>
          <InfoBox title="사용처 영향">문서 검토 출처와 사용처가 표시된다.</InfoBox>
        </RightPanel>
      </div>
      <ScreenDetails
        items={[
          { label: '목적', body: '공통코드를 마스터(코드그룹)와 세부(코드항목) 관계로 관리하고 런타임에 일관된 정의를 제공한다.' },
          { label: '마스터 입력', body: '코드그룹, 그룹 국문명, 그룹 영문명, 도메인, 적용범위, 변경정책, 값 유형, 다국어 필수.' },
          { label: '세부 입력', body: '코드, 코드그룹, 국문명, 영문명, 정렬순서, 사용여부, 시작일, 종료일, 대체코드, 메타데이터.' },
          { label: '기능', body: '마스터/세부별 조회·추가·수정·삭제·저장, DRAFT/PUBLISHED, 가져오기/내보내기, 사용처 영향 분석.' },
          { label: '검증', body: '마스터 미선택, 코드그룹 불일치, 중복, 예약 코드 변경, 시작일/종료일, 다국어, 메타데이터 스키마 차단.' },
          { label: '산출물', body: 'CommonCodeGroup, CommonCodeItem, CommonCodeVersion, CommonCodeUsage, CommonCodeHistory.' },
        ]}
      />
    </ScreenShell>
  );
}
