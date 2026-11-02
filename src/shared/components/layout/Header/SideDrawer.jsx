import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import vaultxMark from 'assets/images/vaultx-mark.svg';

export default function SideDrawer({ mainLinks, onClose, open, handleClickContracts }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const go = (event, href) => {
    event.preventDefault();
    navigate(href);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="vx-mobile-drawer" style={{ position: 'fixed', inset: 0, zIndex: 10000 }}>
      <button type="button" aria-label="Close navigation" onClick={onClose} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, cursor: 'default', background: 'rgba(11,18,32,.48)' }} />
      <aside role="dialog" aria-modal="true" aria-label="Navigation" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 'min(312px, 90vw)', overflowY: 'auto', background: '#fff', borderRight: '1px solid #dde2eb', boxShadow: '20px 0 70px rgba(11,18,32,.18)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #dde2eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <img src={vaultxMark} alt="" width="38" height="38" style={{ borderRadius: 11 }} />
          <div>
            <div style={{ fontSize: 18, color: '#111827', fontWeight: 800, letterSpacing: '-.04em' }}>Vault<span style={{ color: 'var(--brand)' }}>X</span></div>
            <div className="mono" style={{ fontSize: 7, color: '#7d8798', letterSpacing: '.18em', textTransform: 'uppercase', marginTop: 3 }}>Capital workspace</div>
          </div>
        </div>
        <button type="button" aria-label="Close navigation" onClick={onClose} style={{ background: '#f3f5f9', border: '1px solid #dde2eb', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', color: '#5f6879' }}>✕</button>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ padding: 14, marginBottom: 14, borderRadius: 14, background: '#eef9f5', border: '1px solid #c8eee1' }}>
          <div className="mono" style={{ fontSize: 8, color: '#0b7658', letterSpacing: '.13em', textTransform: 'uppercase', marginBottom: 6 }}>Environment</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#314037', fontSize: 12, fontWeight: 700 }}><span className="live-dot" /> Testnet preview available</div>
        </div>

        {mainLinks.map((item) => {
          const active = item.end ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => go(event, item.href)}
              aria-current={active ? 'page' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 13px',
                borderRadius: 11,
                marginBottom: 5,
                textDecoration: 'none',
                fontSize: 12,
                fontWeight: 700,
                color: active ? 'var(--brand-deep)' : '#4f596b',
                background: active ? 'var(--brand-soft)' : 'transparent',
              }}
            >
              <span>{item.label}</span><span aria-hidden="true">→</span>
            </a>
          );
        })}

        <button type="button" onClick={handleClickContracts} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '12px 13px', borderRadius: 11, marginTop: 8, background: '#f5f7fa', border: '1px solid #dde2eb', color: '#4f596b', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
          <span>Contract registry</span><span aria-hidden="true">→</span>
        </button>
      </div>
      </aside>
    </div>
  );
}
