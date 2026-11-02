import { galleryImages } from 'assets/remoteImages';

const FEATURES = [
  { icon: '01', title: 'Opportunity intelligence', desc: 'Search by property type or location, save a watchlist, compare opportunities, and open detailed underwriting views.' },
  { icon: '02', title: 'Visible compliance state', desc: 'Jurisdiction, identity, accreditation, disclosures, and document records live in a dedicated readiness center.' },
  { icon: '03', title: 'Safe transaction states', desc: 'Wallet, network, contract address, and on-chain status must all be valid before transaction actions become available.' },
  { icon: '04', title: 'Portfolio operations', desc: 'Holdings, asset allocation, projected distributions, and activity are organized in one exportable workspace.' },
];

export default function FeaturesSection() {
  return (
    <section className="bx-features">
      <div className="vx-container">
        <div className="bx-feature-head">
          <div>
            <div className="bx-kicker">One connected workspace</div>
            <h2 className="bx-display">From diligence to portfolio operations.</h2>
          </div>
          <p>
            The product separates information, eligibility, and execution so investors always understand what they are reviewing and which actions are actually available.
          </p>
        </div>
        <div className="bx-feature-body">
          <div className="bx-feature-photo">
            <img src={galleryImages[1]} alt="" />
          </div>
          <div className="bx-feature-list">
            {FEATURES.map((item) => (
              <article key={item.title}>
                <div className="bx-index">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
