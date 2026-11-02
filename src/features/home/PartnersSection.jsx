import { useNavigate } from 'react-router-dom';

const RAILS = ['Asset servicing', 'Identity and KYC', 'Custody', 'Transfer controls', 'Oracle data', 'Settlement', 'Document anchors', 'Reporting'];

export default function PartnersSection() {
  const navigate = useNavigate();
  return (
    <section className="bx-rails">
      <div className="vx-container">
        <div className="bx-rails-head">
          <div>
            <div className="bx-kicker">Integration-ready foundation</div>
            <h2 className="bx-display">Built around the services real asset operations require.</h2>
          </div>
          <div>
            <p className="bx-rails-copy">
              The proof of concept keeps these rails modular so production providers can be integrated without rewriting the investor experience.
            </p>
            <div className="bx-actions" style={{ marginTop: 22 }}>
              <button className="vx-btn bx-btn" type="button" onClick={() => navigate('/compliance')}>Open compliance center</button>
              <button className="vx-btn bx-btn secondary" type="button" onClick={() => navigate('/about')}>Review platform model</button>
            </div>
          </div>
        </div>
        <div className="bx-rail-grid">
          {RAILS.map((rail, index) => (
            <div key={rail}>
              <span>Rail {String(index + 1).padStart(2, '0')}</span>
              <strong>{rail}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
