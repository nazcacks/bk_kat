import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuthStore } from '../stores/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [loginId, setLoginId] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!loginId.trim()) {
      setError('로그인 ID를 입력해주세요.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await login(loginId.trim(), password);
      setAuth(result.accessToken, result.user);
      navigate('/dashboard', { replace: true });
    } catch {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">
          <div className="ey-logo">
            <span>EY</span>
          </div>
          <div>
            <h1>BK 회계·세무 서비스</h1>
            <div className="sub">멀티테넌트 SaaS 회계/세무 플랫폼</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="loginId">로그인 ID</label>
            <input
              id="loginId"
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              autoComplete="username"
              autoFocus
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? '로그인 중…' : '로그인'}
          </button>
        </form>

        {error && <div className="error-note">{error}</div>}
        <div className="dev-note">⚠ 개발 모드: 인증 검증 없이 로그인됩니다</div>
      </div>
    </div>
  );
}
