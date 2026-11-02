import { useEffect, useMemo, useRef, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

const CHECKS = [
  { id: 'identity', title: 'Identity document', desc: 'Government-issued photo identification is ready for provider review.' },
  { id: 'address', title: 'Proof of address', desc: 'A recent utility, bank, or government statement is available.' },
  { id: 'tax', title: 'Tax classification', desc: 'Applicable tax residency and classification details are prepared.' },
  { id: 'risk', title: 'Risk acknowledgment', desc: 'The investor has reviewed the product and smart-contract risk disclosures.' },
];

const DOCUMENTS = [
  { type: 'Offering memorandum', version: 'Draft 0.8', date: '30 Jul 2026', hash: '0x6af1…92d4', status: 'Demo record' },
  { type: 'Risk disclosure', version: 'Draft 1.2', date: '30 Jul 2026', hash: '0x2d9e…11a7', status: 'Demo record' },
  { type: 'Property valuation', version: 'Sample 0.4', date: '28 Jul 2026', hash: '0x83c4…7fe2', status: 'Demo record' },
  { type: 'Contract review', version: 'Pending', date: 'Not issued', hash: 'Not anchored', status: 'Required' },
];

const JURISDICTIONS = ['United States', 'Singapore', 'Germany', 'United Kingdom', 'United Arab Emirates'];

export default function Compliance() {
  const { account, library } = useWeb3React();
  const reviewRef = useRef(null);
  const [jurisdiction, setJurisdiction] = useState('United States');
  const [investorType, setInvestorType] = useState('Individual');
  const [checks, setChecks] = useState({});
  const [copied, setCopied] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('vaultx_compliance_checklist') || '{}');
      if (saved && typeof saved === 'object') setChecks(saved);
    } catch {
      setChecks({});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vaultx_compliance_checklist', JSON.stringify(checks));
  }, [checks]);

  const completed = useMemo(() => CHECKS.filter((item) => checks[item.id]).length, [checks]);
  const progress = (completed / CHECKS.length) * 100;

  const toggle = (id) => setChecks((current) => ({ ...current, [id]: !current[id] }));
  const copyHash = async (hash) => {
    if (hash === 'Not anchored') return;
    await navigator.clipboard?.writeText(hash);
    setCopied(hash);
    window.setTimeout(() => setCopied(''), 1400);
  };

  const GATES = [
    ['Wallet connected', Boolean(account && library), account ? 'Detected' : 'Required'],
    ['Identity checklist', completed === CHECKS.length, `${completed}/${CHECKS.length} prepared`],
    ['Jurisdiction review', false, 'Manual review required'],
    ['Offering agreement', false, 'Not accepted'],
    ['Verified contract', false, 'Deployment not configured'],
  ];

  return (
    <div className="bx-page">
      <section className="bx-subhero">
        <div className="vx-container">
          <div className="bx-kicker">Trust and eligibility</div>
          <div className="bx-subhead">
            <h1 className="bx-display">Compliance state you can understand.</h1>
            <div>
              <p>Prepare identity information, review transaction gates, and inspect document-anchor records before entering an asset flow.</p>
              <div style={{ marginTop: 22, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                <div className="mono" style={{ color: 'var(--forest)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase' }}>Self-assessment progress</div>
                <div style={{ marginTop: 8, fontFamily: 'Fraunces, serif', fontSize: 40 }}>{completed} / {CHECKS.length}</div>
                <div className="vx-progress" style={{ marginTop: 12 }}><span style={{ width: `${progress}%` }} /></div>
                <p style={{ margin: '12px 0 0', color: 'var(--muted)', fontSize: 13, lineHeight: 1.55 }}>Local preparation only. This is not identity verification or legal eligibility approval.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bx-subbody">
        <div className="vx-container">
          <div className="bx-split" style={{ marginBottom: 28 }}>
            <aside className="vx-card-strong" style={{ padding: 23, alignSelf: 'start' }}>
              <div className="vx-kicker">Investor profile</div>
              <h2 style={{ margin: '8px 0 20px', fontSize: 32, letterSpacing: '-.035em' }}>Review context</h2>
              <label style={{ display: 'block', marginBottom: 16 }}>
                <span className="mono" style={{ display: 'block', marginBottom: 7, color: 'var(--dim)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase' }}>Jurisdiction</span>
                <select className="vx-field" value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}>
                  {JURISDICTIONS.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label style={{ display: 'block' }}>
                <span className="mono" style={{ display: 'block', marginBottom: 7, color: 'var(--dim)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase' }}>Investor profile</span>
                <select className="vx-field" value={investorType} onChange={(event) => setInvestorType(event.target.value)}>
                  <option>Individual</option>
                  <option>Entity</option>
                  <option>Professional investor</option>
                </select>
              </label>
              <div className="bx-note-warn">
                <div style={{ fontWeight: 700, fontSize: 14 }}>Manual review required</div>
                <p style={{ margin: '6px 0 0', fontSize: 13, lineHeight: 1.55 }}>{jurisdiction} · {investorType}. No automated legal conclusion is provided by this PoC.</p>
              </div>
              <button className="vx-btn" type="button" onClick={() => reviewRef.current?.scrollIntoView({ behavior: 'smooth' })} style={{ width: '100%', marginTop: 18 }}>Continue checklist</button>
            </aside>

            <div className="vx-card-strong" style={{ padding: 23 }} ref={reviewRef}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <div className="vx-kicker">Preparation checklist</div>
                  <h2 style={{ margin: '8px 0 0', fontSize: 32, letterSpacing: '-.035em' }}>Information readiness</h2>
                </div>
                <button type="button" className="vx-btn ghost" onClick={() => setChecks({})}>Clear local checklist</button>
              </div>
              <div className="bx-check-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
                {CHECKS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={Boolean(checks[item.id])}
                    onClick={() => toggle(item.id)}
                    style={{ textAlign: 'left', padding: 17, border: `1px solid ${checks[item.id] ? '#1e4634' : 'var(--border)'}`, background: checks[item.id] ? 'var(--accent-soft)' : 'transparent', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 22, height: 22, display: 'grid', placeItems: 'center', background: checks[item.id] ? 'var(--forest)' : 'transparent', color: '#f7f1e6', border: `1px solid ${checks[item.id] ? 'var(--forest)' : 'var(--border-strong)'}`, fontSize: 12 }}>{checks[item.id] ? '✓' : ''}</span>
                      <strong style={{ fontFamily: 'Fraunces, serif', fontSize: 18 }}>{item.title}</strong>
                    </div>
                    <p style={{ margin: '9px 0 0 32px', color: 'var(--muted)', fontSize: 13, lineHeight: 1.55 }}>{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bx-split flip">
            <div className="vx-card-strong" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '21px 22px', borderBottom: '1px solid var(--border)' }}>
                <div className="vx-kicker">Document register</div>
                <h2 style={{ margin: '8px 0 0', fontSize: 28, letterSpacing: '-.035em' }}>Asset disclosure records</h2>
                <p style={{ margin: '8px 0 0', color: 'var(--muted)', fontSize: 14 }}>Hashes below are illustrative UI records, not production blockchain attestations.</p>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="vx-data-table">
                  <thead><tr><th>Document</th><th>Version</th><th>Date</th><th>Anchor</th><th>Status</th></tr></thead>
                  <tbody>
                    {DOCUMENTS.map((document) => (
                      <tr key={document.type}>
                        <td><strong>{document.type}</strong></td>
                        <td>{document.version}</td>
                        <td>{document.date}</td>
                        <td><button type="button" onClick={() => copyHash(document.hash)} disabled={document.hash === 'Not anchored'} style={{ padding: 0, background: 'transparent', color: document.hash === 'Not anchored' ? 'var(--dim)' : 'var(--brand-deep)', cursor: document.hash === 'Not anchored' ? 'default' : 'pointer', fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, border: 0 }}>{copied === document.hash ? 'Copied' : document.hash}</button></td>
                        <td><span className={`vx-status ${document.status === 'Required' ? 'warning' : ''}`}>{document.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="vx-card-strong" style={{ padding: 23 }}>
              <div className="vx-kicker">Transaction policy</div>
              <h2 style={{ margin: '8px 0 8px', fontSize: 28, letterSpacing: '-.035em' }}>Readiness gates</h2>
              {GATES.map(([label, passed, note]) => (
                <div key={label} className="bx-rule" style={{ display: 'grid', gridTemplateColumns: '28px 1fr auto', alignItems: 'center', gap: 10, padding: '14px 0' }}>
                  <span style={{ width: 22, height: 22, display: 'grid', placeItems: 'center', background: passed ? 'var(--accent-soft)' : '#f3ead8', color: passed ? 'var(--forest)' : '#6e562e', fontSize: 12 }}>{passed ? '✓' : '!'}</span>
                  <strong style={{ fontSize: 15 }}>{label}</strong>
                  <span className={`vx-status ${passed ? '' : 'warning'}`}>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media(max-width:680px){.bx-check-grid{grid-template-columns:1fr!important}}
      `}</style>
    </div>
  );
}
