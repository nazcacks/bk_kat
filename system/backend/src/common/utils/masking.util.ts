/**
 * 개인정보 마스킹 유틸 (설계서 21.4 마스킹 기준)
 * 화면/목록/보고서/다운로드 응답 전 적용한다.
 */
export const Masking = {
  /** 성명: 홍길동 -> 홍*동, 두 글자는 홍* */
  name(value?: string | null): string {
    if (!value) return '';
    if (value.length <= 1) return value;
    if (value.length === 2) return value[0] + '*';
    return value[0] + '*'.repeat(value.length - 2) + value[value.length - 1];
  },

  /** 이메일: abcdef@x.com -> ab****@x.com */
  email(value?: string | null): string {
    if (!value || !value.includes('@')) return value ?? '';
    const [local, domain] = value.split('@');
    const visible = local.slice(0, 2);
    return `${visible}${'*'.repeat(Math.max(local.length - 2, 2))}@${domain}`;
  },

  /** 전화번호: 010-1234-5678 -> 010-****-5678 */
  phone(value?: string | null): string {
    if (!value) return '';
    return value.replace(/(\d{2,3})-?(\d{3,4})-?(\d{4})/, '$1-****-$3');
  },

  /** 주민등록번호: 뒤 6자리 마스킹 (설계서: 뒤 6자리) */
  rrn(value?: string | null): string {
    if (!value) return '';
    return value.replace(/(\d{6})-?(\d)(\d{6})/, '$1-$2******');
  },

  /** 계좌번호: 가운데 마스킹 */
  account(value?: string | null): string {
    if (!value) return '';
    if (value.length <= 6) return '*'.repeat(value.length);
    return value.slice(0, 3) + '*'.repeat(value.length - 6) + value.slice(-3);
  },

  /** 카드번호: 가운데 8자리 마스킹 */
  card(value?: string | null): string {
    if (!value) return '';
    return value.replace(/(\d{4})-?(\d{4})-?(\d{4})-?(\d{4})/, '$1-****-****-$4');
  },
};

export type MaskType = keyof typeof Masking;
