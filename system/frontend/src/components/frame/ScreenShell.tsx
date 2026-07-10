import type { ReactNode } from 'react';
import PageHeader from '../common/PageHeader';
import TitleBar from './TitleBar';

interface ScreenShellProps {
  title: string;
  screenId: string;
  /** breadcrumb 배열 — 첫 항목이 TitleBar crumb 로도 쓰임 */
  breadcrumb: string[];
  /** TitleBar 우측 상태 텍스트 */
  titleRight?: ReactNode;
  /** PageHeader 우측 액션 */
  headerActions?: ReactNode;
  children: ReactNode;
}

/** PageHeader + TitleBar + 화면 프레임(.screen-frame) 배치 래퍼 */
export default function ScreenShell({
  title,
  screenId,
  breadcrumb,
  titleRight,
  headerActions,
  children,
}: ScreenShellProps) {
  return (
    <div>
      <PageHeader title={title} screenId={screenId} breadcrumb={breadcrumb} actions={headerActions} />
      <div className="screen-frame">
        <TitleBar
          crumb={breadcrumb[breadcrumb.length - 2] ?? breadcrumb[0] ?? ''}
          title={title}
          screenId={screenId}
          right={titleRight}
        />
        {children}
      </div>
    </div>
  );
}
