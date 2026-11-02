const LAYERS = [
  { label: 'Discover', title: 'Opportunity workspace', items: ['Search and multi-filter', 'Persistent watchlist', 'Three-asset comparison'], status: 'Ready in PoC', tone: 'ok' },
  { label: 'Verify', title: 'Compliance center', items: ['Jurisdiction readiness', 'Identity checklist', 'Document anchor view'], status: 'Ready in PoC', tone: 'ok' },
  { label: 'Execute', title: 'Contract interactions', items: ['Presale state gates', 'Swap quote workflow', 'Stake calculator'], status: 'Configuration required', tone: 'warn' },
  { label: 'Monitor', title: 'Portfolio operations', items: ['Allocation view', 'Distribution schedule', 'CSV export'], status: 'Preview data', tone: 'info' },
];

export default function RoadmapSection() {
  return (
    <section className="bx-layers">
      <div className="vx-container">
        <div className="bx-layers-head">
          <div className="bx-kicker">Product architecture</div>
          <h2 className="bx-display">Four layers, one clear operating model.</h2>
          <p className="bx-layers-copy">Preview-only data is labeled, while transaction modules remain constrained by real wallet and contract state.</p>
        </div>
        {LAYERS.map((layer) => (
          <article key={layer.label} className="bx-layer">
            <div className="bx-kicker">{layer.label}</div>
            <h3>{layer.title}</h3>
            <div className="bx-layer-items">
              {layer.items.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
            <span className={layer.tone === 'warn' ? 'bx-pill-warn' : 'bx-pill'}>{layer.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
