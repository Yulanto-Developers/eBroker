import {
  getHomePageData,
  getPropertyListApi,
  getPropertyDetails,
  getAllProjectsApi,
  getCategoriesApi,
  userSignup,
  userRegisterApi,
} from '@/api/apiRoutes';

export const img = (name) => `/bigwein/assets/images/${name}`;
export const fallbackImages = [img('detail-hero-building.jpg'), img('detail-living-1.jpg'), img('detail-living-2.jpg'), img('detail-bedroom.jpg'), img('detail-tour.jpg')];
export const fallbackProperties = [
  { id: 1, slug_id: 'modern-haven-villai', title: 'Modern Haven Villa', city: 'Bhuj', state: 'Gujarat', price: 2700000, property_type: 'sell', title_image: img('detail-hero-building.jpg'), category: { category: 'Villa' }, parameters: [{ name: 'Bedroom', value: '5' }, { name: 'Bathroom', value: '4' }, { name: 'Room', value: '2' }, { name: 'Area', value: '1500' }] },
  { id: 2, slug_id: 'lakeside-serenity-villa', title: 'Lakeside Serenity Villa', city: 'Bhuj', state: 'Gujarat', price: 1600000, property_type: 'sell', title_image: img('villa.jpg'), category: { category: 'Villa' }, parameters: [{ name: 'Bedroom', value: '5' }, { name: 'Bathroom', value: '5' }, { name: 'Room', value: '2' }, { name: 'Area', value: '19000' }] },
  { id: 3, slug_id: 'tranquil-oasis-bungalow', title: 'Tranquil Oasis Bungalow', city: 'Bhuj', state: 'Gujarat', price: 400000, property_type: 'sell', title_image: img('house.jpg'), category: { category: 'House' }, parameters: [{ name: 'Bedroom', value: '4' }, { name: 'Bathroom', value: '2' }, { name: 'Room', value: '3' }, { name: 'Area', value: '10000' }] },
  { id: 4, slug_id: 'luxury-sunset-villa', title: 'Luxury Sunset Villa', city: 'Bhuj', state: 'Gujarat', price: 1500, property_type: 'rent', title_image: img('slide-img3.jpg'), category: { category: 'Villa' }, parameters: [{ name: 'Bedroom', value: '4' }, { name: 'Bathroom', value: '3' }, { name: 'Room', value: '2' }, { name: 'Area', value: '2000' }] },
];
export const fallbackProjects = [
  { id: 1, slug_id: 'skyline-residences', title: 'Skyline Residences', city: 'OMR', state: 'Chennai', image: img('apartment.jpg'), price: '₹72 Lakhs onwards' },
  { id: 2, slug_id: 'green-valley-villas', title: 'Green Valley Villas', city: 'ECR', state: 'Chennai', image: img('side-mig1.jpg'), price: '₹1.9 Cr onwards' },
  { id: 3, slug_id: 'urban-prime-plots', title: 'Urban Prime Plots', city: 'Tambaram', state: 'Chennai', image: img('detail-hero-building.jpg'), price: '₹38 Lakhs onwards' },
];
export const fallbackCategories = [
  { id: 1, category: 'Apartments', icon: 'fa-building', properties_count: 120 },
  { id: 2, category: 'Villas', icon: 'fa-house-chimney', properties_count: 42 },
  { id: 3, category: 'Commercial', icon: 'fa-shop', properties_count: 36 },
  { id: 4, category: 'Plots', icon: 'fa-map', properties_count: 57 },
  { id: 5, category: 'Projects', icon: 'fa-city', properties_count: 24 },
];

export const price = (value) => {
  if (!value && value !== 0) return 'Price on Request';
  if (typeof value === 'string' && value.includes('₹')) return value;
  const n = Number(String(value).replace(/[^0-9.]/g, ''));
  if (!n) return String(value);
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(n % 10000000 ? 1 : 0)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 ? 1 : 0)} Lakhs`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(n % 1000 ? 1 : 0)}K`;
  return `₹${n}`;
};
export const pickArray = (obj, keys) => {
  for (const key of keys) {
    const val = key.split('.').reduce((a, k) => a?.[k], obj);
    if (Array.isArray(val) && val.length) return val;
  }
  if (Array.isArray(obj?.data)) return obj.data;
  return [];
};
export const normalizeProperty = (p = {}) => ({
  id: p.id || p.property_id || p.slug_id,
  slug_id: p.slug_id || p.slug || p.id || 'modern-haven-villai',
  title: p.translated_title || p.title || p.name || 'Modern Haven Villa',
  city: p.city || p.city_name || p.location?.city || '',
  state: p.state || p.state_name || p.location?.state || '',
  country: p.country || p.country_name || p.location?.country || '',
  address: p.address || p.location || '',
  price: p.price || p.min_price || p?.parameters?.find?.(x => /price/i.test(x.name))?.value,
  property_type: p.property_type || p.type || 'sell',
  title_image: p.title_image || p.image || p?.gallery?.[0]?.image || p?.images?.[0]?.image || p?.images?.[0] || fallbackImages[0],
  gallery: p.gallery || p.images || p.property_gallary_images || [],
  category: p.category || { category: p.category_name || 'Property' },
  parameters: p.parameters || p.facilities || [],
  description: p.translated_description || p.description || p.meta_description || '',
  raw: p,
});
export const paramValue = (property, names, fallback = '-') => {
  const arr = property?.parameters || [];
  const found = arr.find((x) => names.some((n) => String(x.name || x.title || '').toLowerCase().includes(n)));
  return found?.value || found?.translated_value || fallback;
};
export async function loadHomeData() {
  try {
    const res = await getHomePageData({});
    return {
      properties: pickArray(res, ['data.featured_properties', 'data.properties', 'featured_properties', 'properties']).map(normalizeProperty),
      categories: pickArray(res, ['data.categories', 'categories']),
      projects: pickArray(res, ['data.projects', 'data.featured_projects', 'projects', 'featured_projects']),
    };
  } catch { return { properties: [], categories: [], projects: [] }; }
}
export async function loadProperties(filters = {}) {
  try {
    const res = await getPropertyListApi({ limit: 24, offset: 0, ...filters });
    return pickArray(res, ['data.data', 'data.properties', 'data', 'properties']).map(normalizeProperty);
  } catch { return []; }
}
export async function loadProperty(slug_id) {
  try {
    const res = await getPropertyDetails({ slug_id });
    const arr = pickArray(res, ['data', 'property']);
    const data = Array.isArray(arr) ? arr[0] : (res?.data || res?.property || res);
    return normalizeProperty(data);
  } catch { return null; }
}
export async function loadProjects() {
  try {
    const res = await getAllProjectsApi({ limit: 24, offset: 0 });
    return pickArray(res, ['data.data', 'data.projects', 'data', 'projects']);
  } catch { return []; }
}
export async function loadCategories() {
  try {
    const res = await getCategoriesApi({ limit: 12, offset: 0, has_property: true });
    return pickArray(res, ['data', 'categories']);
  } catch { return []; }
}
