import Link from 'next/link';
import { price, paramValue } from './apiData';

export function PropertyCard({ property }) {
  const bed = paramValue(property, ['bed'], '3');
  const bath = paramValue(property, ['bath'], '2');
  const area = paramValue(property, ['area', 'sqft', 'build'], '1500');
  return <article className="bw-property-card portfolio-card" onClick={() => { if (typeof window !== 'undefined') window.location.href = `/property-details/${property.slug_id}`; }}>
    <div className="bw-card-img img"><img alt={property.title} src={property.title_image}/><span className="type-chip">{property.category?.translated_name || property.category?.category || 'Property'}</span><button><i className="fa-regular fa-heart"></i></button></div>
    <div className="bw-card-body body"><p className="place"><i className="fa-solid fa-location-dot"></i> {[property.city, property.state].filter(Boolean).join(', ') || 'Bhuj, Gujarat'}</p><h3>{property.title}</h3><div className="bw-icons meta"><span><i className="fa-solid fa-bed"></i> {bed}</span><span><i className="fa-solid fa-bath"></i> {bath}</span><span><i className="fa-solid fa-ruler-combined"></i> {area}</span></div><div className="bw-card-foot"><b>{price(property.price)}</b><Link href={`/property-details/${property.slug_id}`}>View</Link></div></div>
  </article>;
}
export function ProjectCard({ project }) { const image = project.image || project.title_image || project.project_image || '/bigwein/assets/images/apartment.jpg'; return <article className="bw-property-card project-card"><div className="bw-card-img"><img alt={project.title || project.name} src={image}/><span>Project</span></div><div className="bw-card-body"><p><i className="fa-solid fa-location-dot"></i> {[project.city, project.state].filter(Boolean).join(', ') || 'Chennai'}</p><h3>{project.title || project.name}</h3><p>{project.description || 'Premium project with modern amenities and good location advantage.'}</p><div className="bw-card-foot"><b>{project.price || project.starting_price || 'Price on Request'}</b><a>View</a></div></div></article> }
export function CategoryCard({ category }) { const name = category.translated_name || category.category || category.name || 'Property'; return <Link className="bw-category-card" href={`/properties?category=${category.slug_id || category.id || ''}`}><i className={`fa-solid ${category.icon || 'fa-building'}`}></i><b>{name}</b><small>{category.properties_count || category.property_count || 0} Properties</small></Link> }
