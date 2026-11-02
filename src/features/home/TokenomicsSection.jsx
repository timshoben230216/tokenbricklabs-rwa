import { brandImages } from 'assets/remoteImages';

const SEGMENTS = [
  { label: 'Property reserve', pct: 35 },
  { label: 'Public presale', pct: 20 },
  { label: 'Ecosystem incentives', pct: 20 },
  { label: 'Treasury and liquidity', pct: 15 },
  { label: 'Operations reserve', pct: 10 },
];

export default function TokenomicsSection() {
  return (
    <section className="bx-token">
      <div className="vx-container bx-token-grid">
        <div>
          <div className="bx-kicker">Illustrative allocation model</div>
          <h2 className="bx-display">Token utility needs an auditable source of truth.</h2>
          <p className="bx-token-copy">
            The interface treats allocation values as model data until they are reconciled with deployed contracts, governance approvals, and final legal documentation.
          </p>
          <div className="bx-token-photo">
            <img src={brandImages.dashboard} alt="" />
          </div>
        </div>
        <div className="bx-report">
          <div className="bx-report-head">
            <div>
              <div className="bx-kicker">VTX allocation</div>
              <strong>100% modeled supply</strong>
            </div>
            <span className="bx-pill-warn">Prototype values</span>
          </div>
          {SEGMENTS.map((segment) => (
            <div key={segment.label} className="bx-alloc">
              <div>
                <b>{segment.label}</b>
                <em><i style={{ width: `${segment.pct}%` }} /></em>
              </div>
              <span>{segment.pct}%</span>
            </div>
          ))}
          <div className="bx-footnote">
            Production releases must derive these values from an approved token specification and verified deployment.
          </div>
        </div>
      </div>
    </section>
  );
}
