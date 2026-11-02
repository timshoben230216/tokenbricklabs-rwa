import SwapCard from 'features/swap/SwapCard';
import WalletGate from 'shared/components/ui/WalletGate';
import oneInch from 'assets/images/partners/1inch.svg';

const CHECKS = [
  ['Wallet', 'Required', 'Injected EIP-1193 provider'],
  ['Supported networks', 'Ethereum · BSC', 'Chain IDs 1 and 56'],
  ['Quote source', '1inch API', 'API key required'],
  ['Slippage policy', '0.5% default', 'Review before production'],
  ['Transaction control', 'Wallet confirmation', 'Never signed by the frontend'],
];

export default function Swap() {
  return (
    <div className="bx-page">
      <section className="bx-subhero">
        <div className="vx-container">
          <div className="bx-kicker">Liquidity workspace</div>
          <div className="bx-subhead">
            <h1 className="bx-display">Quote first. Verify every route.</h1>
            <div>
              <p>Token selection, price impact, gas estimate, and wallet confirmation remain distinct steps in the swap workflow.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                <img src={oneInch} alt="1inch" width="46" />
                <div>
                  <div className="mono" style={{ color: 'var(--dim)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase' }}>Routing provider</div>
                  <strong style={{ display: 'block', marginTop: 4, fontFamily: 'Fraunces, serif', fontSize: 22 }}>1inch aggregation</strong>
                  <div style={{ marginTop: 4, color: 'var(--muted)', fontSize: 13 }}>External quote and execution API</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bx-subbody">
        <div className="vx-container">
          <WalletGate title="Connect a wallet to request a quote" description="Token lists, quotes, and swap transactions require a connected wallet on a supported network.">
            <div className="bx-split">
              <SwapCard />
              <div>
                <div className="vx-card-strong" style={{ padding: 23 }}>
                  <div className="vx-kicker">Execution policy</div>
                  <h2 style={{ margin: '8px 0 8px', fontSize: 32, letterSpacing: '-.04em' }}>What must be true before a swap</h2>
                  {CHECKS.map(([label, value, note], index) => (
                    <div key={label} className="bx-rule" style={{ display: 'grid', gridTemplateColumns: '52px 1fr auto', gap: 12, alignItems: 'center', padding: '16px 0' }}>
                      <div className="bx-index">{String(index + 1).padStart(2, '0')}</div>
                      <div><strong style={{ fontFamily: 'Fraunces, serif', fontSize: 20 }}>{label}</strong><div style={{ marginTop: 4, color: 'var(--muted)', fontSize: 13 }}>{note}</div></div>
                      <span className="vx-status">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="bx-note-warn">
                  Quotes can expire or change between request and confirmation. Review the final wallet transaction, route, gas, slippage, and recipient before signing.
                </div>
              </div>
            </div>
          </WalletGate>
        </div>
      </section>
    </div>
  );
}
