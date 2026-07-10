import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from 'crypto';

/**
 * 데이터 암호화 유틸 (설계서 21.3: 고유식별정보·계좌번호 AES-256 양방향 암호화)
 * 개발 환경은 .env 키 사용, 운영 환경은 KMS envelope encryption 으로 대체한다.
 */
const ALGO = 'aes-256-gcm';

function getKey(): Buffer {
  const hex = process.env.DATA_ENCRYPTION_KEY ?? '';
  if (hex.length !== 64) {
    throw new Error('DATA_ENCRYPTION_KEY must be 32-byte hex (64 chars)');
  }
  return Buffer.from(hex, 'hex');
}

export const CryptoUtil = {
  /** AES-256-GCM 암호화 → "iv:tag:cipher" (base64) */
  encrypt(plain: string): string {
    const iv = randomBytes(12);
    const cipher = createCipheriv(ALGO, getKey(), iv);
    const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${iv.toString('base64')}:${tag.toString('base64')}:${enc.toString('base64')}`;
  },

  decrypt(payload: string): string {
    const [ivB64, tagB64, dataB64] = payload.split(':');
    const decipher = createDecipheriv(ALGO, getKey(), Buffer.from(ivB64, 'base64'));
    decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
    return Buffer.concat([
      decipher.update(Buffer.from(dataB64, 'base64')),
      decipher.final(),
    ]).toString('utf8');
  },

  /** 감사로그 해시체인용 SHA-256 */
  sha256(input: string): string {
    return createHash('sha256').update(input).digest('hex');
  },
};
