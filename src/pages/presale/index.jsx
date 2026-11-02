import { useMemo, useState } from 'react';
import PhaseOne from 'features/presale/phases/phase-one/PhaseOne';

const STEPS = [
  { n: '01', t: 'Verify environment', d: 'Confirm the network, sale address, token address, and contract state.' },
  { n: '02', t: 'Review eligibility', d: 'Complete the required compliance and offering-document checks.' },
  { n: '03', t: 'Preview allocation', d: 'Model contribution size and token allocation before opening a wallet action.' },
  { n: '04', t: 'Submit or recover', d: 'Deposit only while active, claim after success, or refund after failure.' },
];

const TERMS = [
  ['Round', 'Public model'],
  ['Allocation', '100M TBL'],
  ['Reference rate', '2M / ETH'],
  ['Hard cap', '100 ETH'],
];

function ContributionPlanner() {
  const [amount, setAmount] = useState('0.1');
  const rate = 2000000;
  const tokens = useMemo(() => Math.max(0, Number(amount) || 0) * rate, [amount]);
  return (
    <div className="vx-card-strong" style={{ padding: 22, marginBottom: 16 }}>
      <div className="vx-kicker">Contribution planner</div>
      <h3 style={{ margin: '8px 0 15px', fontSize: 28, letterSpacing: '-.03em' }}>Preview an illustrative allocation</h3>
      <label>
        <span className="mono" style={{ display: 'block', marginBottom: 7, color: 'var(--dim)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase' }}>Contribution amount (ETH)</span>
        <input className="vx-field" type="number" min="0" step="0.05" value={amount} onChange={(event) => setAmount(event.target.value)} aria-label="Contribution amount (ETH)" />
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginTop: 11 }}>
        {['0.05', '0.1', '0.25', '0.5'].map((value) => (
          <button key={value} type="button" onClick={() => setAmount(value)} style={{ minHeight: 40, background: amount === value ? 'var(--brand-soft)' : 'transparent', color: amount === value ? 'var(--brand-deep)' : 'var(--muted)', border: `1px solid ${amount === value ? 'var(--forest)' : 'var(--border)'}`, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>{value} ETH</button>
        ))}
      </div>
      <div style={{ marginTop: 14, padding: '16px 0', borderTop: '1px solid var(--line)' }}>
        <div className="mono" style={{ color: 'var(--brand-deep)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase' }}>Modeled TBL allocation</div>
        <strong style={{ display: 'block', marginTop: 6, fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 520 }}>{tokens.toLocaleString(undefined, { maximumFractionDigits: 0 })} TBL</strong>
      </div>
      <p style={{ margin: '10px 0 0', color: 'var(--dim)', fontSize: 12, lineHeight: 1.55 }}>Uses the illustrative 2,000,000 TBL/ETH reference rate. The configured contract remains the execution source of truth.</p>
    </div>
  );
}

export default function PreSale() {
  return (
    <div className="bx-page">
      <section className="bx-subhero">
        <div className="vx-container">
          <div className="bx-kicker"><span className="live-dot" /> Contract-aware sale workspace</div>
          <div className="bx-subhead">
            <h1 className="bx-display">Review every gate before you transact.</h1>
            <p>The presale console reads wallet, network, deployed address, and on-chain sale state before enabling any deposit, claim, or refund action.</p>
          </div>
          <div className="bx-statgrid">
            {TERMS.map(([label, value]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bx-subbody">
        <div className="vx-container bx-split">
          <aside>
            <ContributionPlanner />
            <div className="vx-card-strong" style={{ padding: 22, marginBottom: 16 }}>
              <div className="vx-kicker">Safe execution path</div>
              <div style={{ marginTop: 8 }}>
                {STEPS.map((step) => (
                  <div key={step.n} className="bx-rule" style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 12, padding: '16px 0' }}>
                    <div className="bx-index">{step.n}</div>
                    <div><strong style={{ fontFamily: 'Fraunces, serif', fontSize: 20 }}>{step.t}</strong><p style={{ margin: '6px 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: 14 }}>{step.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bx-note-danger">
              <div className="mono" style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 7 }}>Risk disclosure</div>
              <p style={{ margin: 0, lineHeight: 1.6 }}>Confirm official addresses, legal terms, token documentation, and independent contract review before any production transaction.</p>
            </div>
          </aside>
          <main><PhaseOne /></main>
        </div>
      </section>
    </div>
  );
}
