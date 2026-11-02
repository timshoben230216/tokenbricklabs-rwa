const CAPABILITIES = [
  { label: 'Opportunity intelligence', value: 'Search + compare', sub: 'Filter assets and evaluate key metrics side by side.' },
  { label: 'Trust layer', value: 'Documents + eligibility', sub: 'Make compliance state visible before wallet actions.' },
  { label: 'Execution layer', value: 'Contract-gated', sub: 'Disable transactions until network and addresses are valid.' },
  { label: 'Portfolio layer', value: 'Holdings + activity', sub: 'Preview allocations, distributions, and account history.' },
];

export default function StatsBar() {
  return (
    <section className="bx-stats">
      <div className="vx-container bx-stats-grid">
        {CAPABILITIES.map((item) => (
          <article key={item.label}>
            <div className="bx-kicker">{item.label}</div>
            <h2>{item.value}</h2>
            <p>{item.sub}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
