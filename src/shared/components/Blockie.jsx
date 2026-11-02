import { useMemo } from 'react';
import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';

// Stable mirrored wallet identicon without an additional runtime dependency.
function identicon(seed, size) {
  let state = 2166136261;
  for (const char of seed) state = Math.imul(state ^ char.charCodeAt(0), 16777619) >>> 0;
  const next = () => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) / 4294967296);
  const color = `hsl(${Math.floor(next() * 360)}, 62%, 48%)`;
  const background = `hsl(${Math.floor(next() * 360)}, 35%, 90%)`;
  const cells = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < Math.ceil(size / 2); x++) {
      if (next() > .5) {
        cells.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
        if (x !== size - 1 - x) cells.push(`<rect x="${size - 1 - x}" y="${y}" width="1" height="1"/>`);
      }
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="${background}"/><g fill="${color}">${cells.join('')}</g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default function Blockie({ address, currentWallet, size = 8, scale = 3, className = 'identicon', ...props }) {
  const { walletAddress } = useMoralisDapp();
  const seed = currentWallet ? walletAddress : address;
  const image = useMemo(() => identicon((seed || '').toLowerCase(), size), [seed, size]);
  if (!seed) return null;
  return <img src={image} width={size * scale} height={size * scale} className={className} alt="Wallet identicon" {...props} />;
}
