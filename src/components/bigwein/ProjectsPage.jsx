import { useEffect, useState } from 'react';
import { Layout } from './BigweinCommon';
import { ProjectCard } from './Cards';
import { fallbackProjects, loadProjects } from './apiData';
export default function ProjectsPage(){ const [items,setItems]=useState(fallbackProjects); useEffect(()=>{loadProjects().then(list=>setItems(list.length?list:fallbackProjects))},[]); return <Layout className="bigwein-theme projects-page"><main><section className="page-hero compact"><div className="lux-container"><h1>Projects</h1><p>Explore premium residential and commercial projects.</p></div></section><section className="lux-section"><div className="lux-container"><div className="bw-property-grid">{items.map((p,i)=><ProjectCard key={p.id || i} project={p}/>)}</div></div></section></main></Layout> }
