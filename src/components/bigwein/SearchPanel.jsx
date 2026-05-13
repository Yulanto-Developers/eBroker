import { useState } from 'react';
import { SmartFilterModal } from './BigweinCommon';
import { useRouter } from 'next/router';
export default function SearchPanel({ onSearch }) {
  const [smart, setSmart] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const submit = (e) => { e?.preventDefault?.(); if (onSearch) onSearch(search); else router.push(`/properties?search=${encodeURIComponent(search)}`); };
  return <>
    <form className="lux-search-card new-search-card" onSubmit={submit}>
      <div className="search-tabs"><button className="active" type="button">Buy</button><button type="button">Rent</button><button type="button">Projects</button><button className="business" type="button">Business For Sale</button></div>
      <div className="search-fields"><label className="wide-search-field"><span>Search Property</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search city, area, project or property" type="text"/></label><label><span>Property Type</span><select><option>Apartment</option><option>Villa</option><option>Commercial</option><option>Land</option></select></label><label><span>Budget</span><select><option>Any Budget</option><option>₹50L - ₹1Cr</option><option>₹1Cr - ₹3Cr</option><option>₹3Cr+</option></select></label><label><span>BHK</span><select><option>Any</option><option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4+ BHK</option></select></label><div className="search-actions"><button className="lux-btn smart-btn" onClick={() => setSmart(true)} type="button"><i className="fa-solid fa-sliders"></i> Smart Filter</button><button className="lux-btn search-btn" type="submit"><i className="fa-solid fa-magnifying-glass"></i> Search</button></div></div>
    </form><SmartFilterModal open={smart} onClose={() => setSmart(false)} />
  </>;
}
