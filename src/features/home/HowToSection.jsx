const STEPS = [
  { n: '01', t: 'Discover', d: 'Search, filter, save, and compare opportunity models using consistent asset metrics.' },
  { n: '02', t: 'Verify', d: 'Review eligibility, disclosures, document records, and contract configuration before connecting capital.' },
  { n: '03', t: 'Participate', d: 'Use presale, swap, or staking modules only when wallet, network, address, and contract state agree.' },
  { n: '04', t: 'Monitor', d: 'Track holdings, allocation, projected distributions, and transaction activity in the portfolio workspace.' },
];

export default function HowToSection() {
  return (
    <section className="bx-path">
      <div className="vx-container">
        <div className="bx-path-head">
          <div>
            <div className="bx-kicker">Investor workflow</div>
            <h2 className="bx-display">A deliberate path from discovery to execution.</h2>
          </div>
          <p className="bx-path-copy">Each stage exposes the information needed for the next decision instead of collapsing diligence and transaction actions into one screen.</p>
        </div>
        {STEPS.map((step) => (
          <article key={step.n}>
            <div className="bx-index">{step.n}</div>
            <h3>{step.t}</h3>
            <p>{step.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
