import PropertyDetailPage from '@/components/bigwein/PropertyDetailPage';
export default function Page({ slug }) { return <PropertyDetailPage slug={slug} /> }
export async function getServerSideProps(ctx){ return { props: { slug: ctx.params?.slug || 'modern-haven-villai' } } }
