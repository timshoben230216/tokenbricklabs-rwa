import TokenPools from 'features/staking/TokenPools';

const TERMS = [
  { label:'Flexible', value:'4.8%', note:'No fixed lock' },
  { label:'30-day', value:'7.2%', note:'Illustrative APR' },
  { label:'90-day', value:'10.4%', note:'Illustrative APR' },
];

const PRINCIPLES = [
  ['Variable rewards', 'Rates are estimates until a verified staking contract and reward schedule are configured.'],
  ['Explicit approvals', 'Token allowance must be reviewed before a staking transaction can be submitted.'],
  ['Visible lock terms', 'Unlock dates, early-exit rules, and reward treatment should be shown before confirmation.'],
  ['Contract-gated actions', 'The transaction button remains disabled when wallet, network, or address checks fail.'],
];

export default function Stake() {
  return (
    <div className="bx-page">
      <section className="bx-subhero">
        <div className="vx-container">
          <div className="bx-kicker">TBL utility</div>
          <div className="bx-subhead">
            <h1 className="bx-display">Model rewards before you lock tokens.</h1>
            <p>Compare term assumptions, estimate rewards, and see exactly which configuration gates must pass before staking becomes available.</p>
          </div>
          <div className="bx-statgrid cols-3">
            {TERMS.map((term) => (
              <div key={term.label}>
                <strong>{term.value}</strong>
                <span>{term.label}</span>
                <em>{term.note}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bx-subbody">
        <div className="vx-container bx-split">
          <div>
            <div className="vx-card-strong" style={{ padding: 23 }}>
              <div className="vx-kicker">Staking policy</div>
              <h2 style={{ margin: '8px 0 8px', fontSize: 32, letterSpacing: '-.04em' }}>What the interface protects</h2>
              {PRINCIPLES.map(([title, description], index) => (
                <div key={title} className="bx-rule" style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 12, padding: '16px 0' }}>
                  <div className="bx-index">{String(index + 1).padStart(2, '0')}</div>
                  <div><strong style={{ fontFamily: 'Fraunces, serif', fontSize: 20 }}>{title}</strong><p style={{ margin: '6px 0 0', color: 'var(--muted)', fontSize: 14, lineHeight: 1.55 }}>{description}</p></div>
                </div>
              ))}
            </div>
            <div className="bx-note-warn">
              Reward rates are illustrative UI assumptions. Production rates, lock periods, and exit rules must come from the verified staking deployment.
            </div>
          </div>
          <TokenPools />
        </div>
      </section>
    </div>
  );
}
