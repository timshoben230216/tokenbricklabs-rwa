import { useNavigate } from 'react-router-dom';
import vaultxMark from 'assets/images/vaultx-logo.png';

const GROUPS = {
  Platform: [
    ['Opportunities', '/gallery'],
    ['Presale', '/presale'],
    ['Portfolio', '/portfolio'],
    ['Staking', '/stake'],
  ],
  Trust: [
    ['Compliance center', '/compliance'],
    ['Contract registry', '/contact'],
    ['Transactions', '/transactions'],
  ],
  Company: [
    ['About', '/about'],
    ['Contact', '/contact'],
  ],
};

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bx-footer">
      <div className="vx-container">
        <div className="bx-footer-brand">
          <div>
            <div className="bx-footer-mark">
              <img src={vaultxMark} alt="" width="48" height="48" />
              <div>
                <div className="bx-footer-name">TBL</div>
                <div className="mono bx-footer-sub">Real asset capital workspace</div>
              </div>
            </div>
          </div>
          <p>
            A contract-aware proof of concept for discovering, verifying, and managing tokenized real-world asset opportunities.
          </p>
        </div>
        <div className="bx-footer-links">
          {Object.entries(GROUPS).map(([group, links]) => (
            <div key={group}>
              <h2>{group}</h2>
              {links.map(([label, route]) => (
                <button key={label} type="button" onClick={() => navigate(route)}>
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="bx-footer-base">
          <div className="mono">© 2026 TBL PROTOCOL · PROOF OF CONCEPT</div>
          <div>
            <span className="bx-pill">Contract-gated</span>
            <span className="bx-pill-warn">Testnet only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
