/** 성명 마스킹: 홍길동 → 홍*동, 두 글자면 홍* */
export function maskName(name: string): string {
  if (!name) return name;
  if (name.length <= 1) return name;
  if (name.length === 2) return name[0] + '*';
  return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
}

/** 이메일 마스킹: abcdef@domain.com → ab***@domain.com */
export function maskEmail(email: string): string {
  const at = email.indexOf('@');
  if (at < 0) return email;
  const local = email.slice(0, at);
  const domain = email.slice(at);
  const visible = local.slice(0, Math.min(2, local.length));
  return visible + '***' + domain;
}

/** 휴대전화 마스킹: 010-1234-5678 → 010-****-5678 */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length < 9) return phone;
  const head = digits.slice(0, 3);
  const tail = digits.slice(-4);
  return `${head}-****-${tail}`;
}

/** 주민등록번호 마스킹: 123456-1234567 → 123456-******* */
export function maskRrn(rrn: string): string {
  const m = rrn.match(/^(\d{6})-?(\d{7})$/);
  if (!m) return rrn;
  return `${m[1]}-*******`;
}

/** 계좌번호 마스킹: 가운데 자리 마스킹, 끝 2자리 노출 */
export function maskAccount(account: string): string {
  const digits = account.replace(/[^0-9]/g, '');
  if (digits.length < 6) return account;
  let masked = '';
  let idx = 0;
  for (const ch of account) {
    if (/\d/.test(ch)) {
      masked += idx >= 3 && idx < digits.length - 2 ? '*' : ch;
      idx++;
    } else {
      masked += ch;
    }
  }
  return masked;
}
