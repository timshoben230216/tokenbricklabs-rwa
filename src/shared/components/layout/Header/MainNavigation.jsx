import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Account from 'features/wallet/WalletAccount';
import SideDrawer from './SideDrawer';
import Contracts from 'shared/components/common/Contracts';
import vaultxMark from 'assets/images/vaultx-logo.png';

const NAV = [
  { label: 'Assets', href: '/gallery' },
  { label: 'Presale', href: '/presale' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Stake', href: '/stake' },
  { label: 'Swap', href: '/swap' },
  { label: 'Compliance', href: '/compliance' },
];

function Logo() {
  const navigate = useNavigate();
  return (
    <button type="button" className="bx-logo" onClick={() => navigate('/')} aria-label="TBL home">
      <img src={vaultxMark} alt="" width="38" height="38" />
      <div style={{ textAlign: 'left' }}>
        <div className="bx-logo-name">
          TBL
        </div>
        <div className="mono bx-logo-sub">
          Capital workspace
        </div>
      </div>
    </button>
  );
}

export default function MainNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contractsOpen, setContractsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (event, href) => {
    event.preventDefault();
    navigate(href);
  };

  return (
    <Fragment>
      <header className={`bx-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="bx-notice">
          <div className="vx-container bx-notice-inner">
            <div className="mono bx-notice-live">
              <span className="live-dot" /> Public testnet preview
            </div>
            <div className="mono bx-notice-env">Contract actions stay gated until a verified deployment is configured.</div>
          </div>
        </div>
        <div className="bx-nav">
          <div className="vx-container bx-nav-inner">
            <button
              type="button"
              className="bx-menu"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              ☰
            </button>
            <Logo />

            <nav className="bx-nav-wrap" aria-label="Primary">
              {NAV.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="bx-navlink"
                    onClick={(event) => go(event, item.href)}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="bx-nav-tools">
              <button type="button" className="bx-contracts" onClick={() => setContractsOpen(true)}>
                Contracts
              </button>
              <Account />
            </div>
          </div>
        </div>
      </header>

      <SideDrawer
        mainLinks={[{ label: 'Home', href: '/', end: true }, ...NAV, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]}
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        handleClickContracts={() => { setContractsOpen(true); setMobileOpen(false); }}
      />
      <Contracts open={contractsOpen} handleClose={() => setContractsOpen(false)} />
    </Fragment>
  );
}
