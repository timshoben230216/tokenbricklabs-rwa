import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import vaultxMark from 'assets/images/vaultx-logo.png';

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
    <div className="vx-mobile-drawer bx-drawer" style={{ position: 'fixed', inset: 0, zIndex: 10000 }}>
      <button type="button" className="bx-drawer-scrim" aria-label="Close navigation" onClick={onClose} />
      <aside className="bx-drawer-panel" role="dialog" aria-modal="true" aria-label="Navigation">
        <div className="bx-drawer-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <img src={vaultxMark} alt="" width="38" height="38" style={{ objectFit: 'contain' }} />
            <div>
              <div className="bx-logo-name">TBL</div>
              <div className="mono bx-logo-sub">Capital workspace</div>
            </div>
          </div>
          <button type="button" className="bx-drawer-close" aria-label="Close navigation" onClick={onClose}>✕</button>
        </div>

        <div className="bx-drawer-body">
          <div className="bx-drawer-env">
            <div className="mono bx-kicker">Environment</div>
            <p><span className="live-dot" /> Testnet preview available</p>
          </div>

          {mainLinks.map((item) => {
            const active = item.end ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                className="bx-drawer-link"
                onClick={(event) => go(event, item.href)}
                aria-current={active ? 'page' : undefined}
              >
                <span>{item.label}</span><span aria-hidden="true">→</span>
              </a>
            );
          })}

          <button type="button" className="bx-drawer-contracts" onClick={handleClickContracts}>
            <span>Contract registry</span><span aria-hidden="true">→</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
