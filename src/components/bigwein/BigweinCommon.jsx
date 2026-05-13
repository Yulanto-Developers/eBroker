import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  return <>
    <header className="lux-header">
      <div className="lux-container lux-nav">
        <Link className="lux-brand" href="/"><img alt="Bigwein Logo" src="/bigwein/assets/images/bigwein-logo.jpeg" /><span>Bigwein<small>Addressing Your Dreams</small></span></Link>
        <button className="lux-location-pill compact-mobile-location" onClick={() => setLocationOpen(true)} type="button"><span className="loc-icon"><i className="fa-solid fa-location-dot"></i></span><span><b>Location <i className="fa-solid fa-chevron-down"></i></b><small>Bhuj, Gujarat</small></span></button>
        <nav className={`lux-menu ${menuOpen ? 'show' : ''}`} id="luxMenu">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/properties" onClick={() => setMenuOpen(false)}>Properties</Link>
          <Link href="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
          <a href="#agents" onClick={() => setMenuOpen(false)}>Agents</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <Link className="mobile-menu-auth" href="/login" onClick={() => setMenuOpen(false)}><i className="fa-regular fa-user"></i> Login / Sign up</Link>
        </nav>
        <div className="lux-actions"><button aria-label="Search" className="lux-icon"><i className="fa-solid fa-magnifying-glass"></i></button><Link className="lux-btn dark" href="/login">Sign up</Link><button className="lux-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}><i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i></button></div>
      </div>
    </header>
    {locationOpen && <LocationModal onClose={() => setLocationOpen(false)} />}
  </>;
}
export function Footer() { return <footer className="lux-footer"><div className="lux-container lux-footer-grid"><div><Link className="lux-brand" href="/"><img alt="Bigwein Logo" src="/bigwein/assets/images/bigwein-logo.jpeg" /><span>Bigwein<small>Addressing Your Dreams</small></span></Link><p>Bringing you closer to your dream home, one click at a time.</p></div><div><h4>About</h4><a>Our Story</a><a>Careers</a><a>Our Team</a><a>Resources</a></div><div><h4>Support</h4><a>FAQ</a><a>Contact Us</a><a>Help Center</a><a>Terms of Service</a></div><div><h4>Find Us</h4><a>Events</a><a>Locations</a><a>Newsletter</a></div><div><h4>Our Social</h4><a><i className="fa-brands fa-instagram"></i> Instagram</a><a><i className="fa-brands fa-facebook"></i> Facebook</a><a><i className="fa-brands fa-x-twitter"></i> Twitter (X)</a></div></div></footer> }
export function Layout({ children, className = '' }) { return <><Head><title>Bigwein | Addressing Your Dreams</title><meta name="viewport" content="width=device-width, initial-scale=1.0" /><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" /><link href="/bigwein/assets/css/style.css" rel="stylesheet" /></Head><div className={className}><Header />{children}<Footer /></div></> }
export function LocationModal({ onClose }) { return <div className="modal location-modal active"><div className="modal-box location-modal-box"><div className="modal-head"><h3>Select Location</h3><button className="close" onClick={onClose} type="button"><i className="fa-solid fa-xmark"></i></button></div><p className="location-help">Find the perfect place based on your chosen location.</p><div className="location-input-row"><i className="fa-solid fa-location-dot"></i><input defaultValue="Bhuj, Gujarat, India" /></div><div className="map-preview-card"><div><i className="fa-solid fa-map-location-dot"></i><span>Map Preview</span></div></div><div className="km-row"><span>KM Range</span><input type="range" min="1" max="50" defaultValue="8" /></div><div className="location-actions"><button className="btn btn-light" onClick={onClose} type="button">Clear</button><button className="btn btn-primary" onClick={onClose} type="button">Save Location</button></div></div></div> }
export function SmartFilterModal({ open, onClose }) { if (!open) return null; return <div className="modal smart-filter-modal active"><div className="modal-box location-modal-box"><div className="modal-head"><h3>Smart Filters</h3><button className="close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button></div><div className="smart-filter-grid"><label><span>Facing</span><select><option>Any</option><option>East</option><option>West</option><option>North</option></select></label><label><span>Construction Status</span><select><option>Any</option><option>Ready to Move</option><option>Under Construction</option></select></label><label><span>Posted Since</span><select><option>Any Time</option><option>Last 7 Days</option><option>Last 30 Days</option></select></label><label><span>Facilities</span><select><option>Any</option><option>Parking</option><option>Swimming Pool</option><option>Gym</option></select></label></div><div className="location-actions"><button className="btn btn-light" onClick={onClose}>Reset</button><button className="btn btn-primary" onClick={onClose}>Apply Filters</button></div></div></div> }
export function useHeroSlider() { const [slide, setSlide] = useState(0); useEffect(() => { const t = setInterval(() => setSlide(s => (s + 1) % 4), 3500); return () => clearInterval(t) }, []); return slide; }
