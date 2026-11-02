import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import Account from 'features/wallet/WalletAccount';

const HOLDINGS = [
  { id: 'VX-101', asset: 'Brickell Residence Fund', type: 'Residential', units: 12400, nav: 1.04, target: '8.4%', status: 'Active' },
  { id: 'VX-518', asset: 'Distribution Hub I', type: 'Logistics', units: 8750, nav: 1.08, target: '9.6%', status: 'Active' },
  { id: 'VX-412', asset: 'Austin Growth Portfolio', type: 'Mixed-use', units: 6800, nav: 1.02, target: '8.7%', status: 'Funding' },
];

const DISTRIBUTIONS = [
  { date: '15 Sep 2026', asset: 'Brickell Residence Fund', amount: '$216.40', status: 'Projected' },
  { date: '30 Sep 2026', asset: 'Distribution Hub I', amount: '$188.10', status: 'Projected' },
  { date: '15 Oct 2026', asset: 'Austin Growth Portfolio', amount: '$142.80', status: 'Modeled' },
];

const ACTIVITY = [
  { date: '02 Aug 2026', action: 'Watchlist updated', asset: 'VX-518', state: 'Local' },
  { date: '29 Jul 2026', action: 'Opportunity reviewed', asset: 'VX-101', state: 'Preview' },
  { date: '25 Jul 2026', action: 'Compliance checklist saved', asset: 'Account', state: 'Local' },
];

const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

export default function Portfolio() {
  const { account } = useWeb3React();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [watchlistCount, setWatchlistCount] = useState(0);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('vaultx_watchlist') || '[]');
      setWatchlistCount(Array.isArray(saved) ? saved.length : 0);
    } catch {
      setWatchlistCount(0);
    }
  }, []);

  const total = useMemo(() => HOLDINGS.reduce((sum, item) => sum + item.units * item.nav, 0), []);
  const averageTarget = useMemo(() => HOLDINGS.reduce((sum, item) => sum + Number(item.target.replace('%', '')), 0) / HOLDINGS.length, []);

  const exportCsv = () => {
    const rows = [
      ['Asset ID', 'Asset', 'Type', 'Units', 'Reference NAV', 'Illustrative Value', 'Target APY', 'Status'],
      ...HOLDINGS.map((item) => [item.id, item.asset, item.type, item.units, item.nav, (item.units * item.nav).toFixed(2), item.target, item.status]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'btl-portfolio-preview.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const mask = (value) => visible ? value : '••••••';

  return (
    <div className="bx-page">
      <section className="bx-subhero">
        <div className="vx-container">
          <div className="bx-kicker">Portfolio operations</div>
          <div className="bx-subhead">
            <h1 className="bx-display">Your real asset command center.</h1>
            <div>
              <p>Review holdings, allocation, projected cash flow, and account activity in one exportable workspace.</p>
              <div className="bx-actions" style={{ marginTop: 18 }}>
                <button className="vx-btn secondary" type="button" onClick={() => setVisible((value) => !value)}>{visible ? 'Hide values' : 'Show values'}</button>
                <button className="vx-btn" type="button" onClick={exportCsv}>Export CSV</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bx-subbody">
        <div className="vx-container">
          <div className="bx-banner">
            <div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22 }}>{account ? 'Wallet connected · Preview holdings remain illustrative' : 'Portfolio preview · No wallet connected'}</div>
              <div style={{ marginTop: 4, color: 'var(--muted)', fontSize: 14 }}>Production holdings require indexed on-chain positions and verified asset-servicing data.</div>
            </div>
            {!account && <Account />}
          </div>

          <div className="bx-statgrid" style={{ marginBottom: 28 }}>
            {[
              ['Illustrative value', mask(money(total)), 'Preview NAV'],
              ['Modeled annual yield', mask(`${averageTarget.toFixed(1)}%`), 'Not guaranteed'],
              ['Open holdings', HOLDINGS.length, 'Across 3 asset types'],
              ['Saved opportunities', watchlistCount, 'Stored in this browser'],
            ].map(([label, value, note]) => (
              <div key={label}>
                <span>{label}</span>
                <strong style={{ marginTop: 10 }}>{value}</strong>
                <em>{note}</em>
              </div>
            ))}
          </div>

          <div className="bx-split flip" style={{ marginBottom: 28 }}>
            <div className="vx-card-strong" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '21px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div className="vx-kicker">Holdings</div>
                  <h2 style={{ margin: '7px 0 0', fontSize: 28, letterSpacing: '-.035em' }}>Asset positions</h2>
                </div>
                <span className="vx-status warning">Illustrative data</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="vx-data-table">
                  <thead><tr><th>Asset</th><th>Units</th><th>Ref. NAV</th><th>Value</th><th>Target</th><th>Status</th></tr></thead>
                  <tbody>
                    {HOLDINGS.map((item) => (
                      <tr key={item.id}>
                        <td><strong>{item.asset}</strong><div className="mono" style={{ marginTop: 4, color: 'var(--dim)', fontSize: 10 }}>{item.id} · {item.type}</div></td>
                        <td>{mask(item.units.toLocaleString())}</td>
                        <td>{mask(`$${item.nav.toFixed(2)}`)}</td>
                        <td><strong>{mask(money(item.units * item.nav))}</strong></td>
                        <td>{item.target}</td>
                        <td><span className={`vx-status ${item.status === 'Funding' ? 'warning' : ''}`}>{item.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="vx-card-strong" style={{ padding: 22 }}>
              <div className="vx-kicker">Allocation</div>
              <h2 style={{ margin: '7px 0 22px', fontSize: 28, letterSpacing: '-.035em' }}>By opportunity</h2>
              <div style={{ display: 'grid', gap: 19 }}>
                {HOLDINGS.map((item) => {
                  const share = ((item.units * item.nav) / total) * 100;
                  return (
                    <div key={item.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8, fontSize: 14 }}>
                        <span style={{ fontWeight: 700 }}>{item.id}</span>
                        <span className="mono" style={{ color: 'var(--dim)', fontSize: 12 }}>{share.toFixed(1)}%</span>
                      </div>
                      <div className="vx-progress"><span style={{ width: `${share}%` }} /></div>
                    </div>
                  );
                })}
              </div>
              <button className="vx-btn secondary" type="button" onClick={() => navigate('/gallery')} style={{ width: '100%', marginTop: 28 }}>Review more assets</button>
            </div>
          </div>

          <div className="bx-split even">
            <div className="vx-card-strong" style={{ padding: 22 }}>
              <div className="vx-kicker">Projected schedule</div>
              <h2 style={{ margin: '7px 0 8px', fontSize: 28, letterSpacing: '-.035em' }}>Upcoming distributions</h2>
              {DISTRIBUTIONS.map((item) => (
                <div key={item.date + item.asset} className="bx-rule" style={{ display: 'grid', gridTemplateColumns: '96px 1fr auto', gap: 12, alignItems: 'center', padding: '14px 0' }}>
                  <div className="mono" style={{ color: 'var(--dim)', fontSize: 11 }}>{item.date}</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{item.asset}</div>
                  <div style={{ textAlign: 'right' }}><strong>{mask(item.amount)}</strong><div style={{ color: 'var(--dim)', fontSize: 12, marginTop: 2 }}>{item.status}</div></div>
                </div>
              ))}
            </div>

            <div className="vx-card-strong" style={{ padding: 22 }}>
              <div className="vx-kicker">Account trail</div>
              <h2 style={{ margin: '7px 0 8px', fontSize: 28, letterSpacing: '-.035em' }}>Recent workspace activity</h2>
              {ACTIVITY.map((item) => (
                <div key={item.date + item.action} className="bx-rule" style={{ display: 'grid', gridTemplateColumns: '96px 1fr auto', gap: 12, alignItems: 'center', padding: '14px 0' }}>
                  <div className="mono" style={{ color: 'var(--dim)', fontSize: 11 }}>{item.date}</div>
                  <div><div style={{ fontSize: 15, fontWeight: 600 }}>{item.action}</div><div className="mono" style={{ color: 'var(--dim)', fontSize: 11, marginTop: 3 }}>{item.asset}</div></div>
                  <span className="vx-status">{item.state}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
