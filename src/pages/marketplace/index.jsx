import GalleryItems from 'features/marketplace/GalleryItems';

const FACTS = [
  ['06', 'Opportunity models'],
  ['06', 'Asset categories'],
  ['03', 'Compare limit'],
  ['Local', 'Watchlist storage'],
];

export default function Gallery() {
  return (
    <div className="bx-page">
      <section className="bx-subhero">
        <div className="vx-container">
          <div className="bx-kicker">Opportunity marketplace</div>
          <div className="bx-subhead">
            <h1 className="bx-display">Find the right real asset exposure.</h1>
            <p>Search, save, compare, and inspect illustrative property opportunities through one consistent diligence workflow.</p>
          </div>
          <div className="bx-statgrid">
            {FACTS.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bx-subbody">
        <div className="vx-container"><GalleryItems /></div>
      </section>
    </div>
  );
}
