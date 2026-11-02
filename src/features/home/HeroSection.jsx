import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showcaseAssets } from 'assets/remoteImages';

function Metric({ label, value }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function OpportunityCard({ asset, active, onSelect }) {
  const navigate = useNavigate();
  return (
    <div className="bx-diptych">
      <div className="bx-photo-wrap">
        <img src={asset.img} alt={asset.name} />
        <div className="bx-photo-flags">
          <span className="bx-flag">Illustrative opportunity</span>
          <span className="bx-flag-warn">{asset.raise} modeled</span>
        </div>
      </div>
      <article className="bx-dossier">
        <div className="mono bx-dossier-id">{asset.id}</div>
        <h2>{asset.name}</h2>
        <p className="bx-dossier-loc">{asset.location}</p>
        <div className="bx-specs">
          {[
            ['Units', asset.specs.units],
            ['Occupancy', asset.specs.occupancy],
            ['Target APY', asset.specs.yield],
          ].map(([label, value]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="bx-pair">
          <div>
            <span>Modeled value</span>
            <strong>{asset.price}</strong>
          </div>
          <div>
            <span>Reference unit</span>
            <strong>{asset.tokenPrice}</strong>
          </div>
        </div>
        <button className="vx-btn bx-btn" type="button" onClick={() => navigate('/gallery')}>Review opportunity</button>
        <div className="bx-switch">
          {showcaseAssets.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.name}`}
              aria-pressed={active === index}
              onClick={() => onSelect(index)}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </article>
    </div>
  );
}

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % showcaseAssets.length), 7000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="bx-hero">
      <div className="vx-container">
        <div className="bx-masthead">
          <div>
            <div className="bx-kicker"><span className="live-dot" /> Institutional RWA infrastructure · v3.1</div>
            <h1 className="bx-display">
              Real assets.<em>Programmable capital.</em>
            </h1>
          </div>
          <div>
            <p className="bx-lead">
              Discover, verify, and manage tokenized real-world assets through a single contract-aware investment workspace.
            </p>
            <div className="bx-actions">
              <button className="vx-btn bx-btn" type="button" onClick={() => navigate('/gallery')}>Explore opportunities</button>
              <button className="vx-btn bx-btn secondary" type="button" onClick={() => navigate('/portfolio')}>Open portfolio preview</button>
            </div>
          </div>
        </div>
        <OpportunityCard asset={showcaseAssets[active]} active={active} onSelect={setActive} />
        <div className="bx-metric-row">
          <Metric label="Opportunity models" value="06" />
          <Metric label="Configured networks" value="04" />
          <Metric label="Transaction policy" value="Gated" />
        </div>
        <p className="mono bx-fine">
          Preview values are illustrative. Production use requires verified contracts, completed compliance review, and final offering documents.
        </p>
      </div>
    </section>
  );
}
