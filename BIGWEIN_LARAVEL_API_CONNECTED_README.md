# Bigwein Next.js UI connected with existing Laravel APIs

This build keeps the existing eBroker Next.js/Laravel API structure and replaces the main public UI pages with the Bigwein design.

## Connected API files used
- `src/api/axiosMiddleware.js`
- `src/api/apiEndpoints.js`
- `src/api/apiRoutes.js`

## New Bigwein React components
- `src/components/bigwein/HomePage.jsx`
- `src/components/bigwein/PropertiesPage.jsx`
- `src/components/bigwein/PropertyDetailPage.jsx`
- `src/components/bigwein/ProjectsPage.jsx`
- `src/components/bigwein/LoginPage.jsx`
- `src/components/bigwein/SearchPanel.jsx`
- `src/components/bigwein/BigweinCommon.jsx`
- `src/components/bigwein/Cards.jsx`
- `src/components/bigwein/apiData.js`

## Pages updated
- `/`
- `/properties`
- `/projects`
- `/login`
- `/signup`
- `/property-details/[slug]`
- Locale wrappers are also added for `/:locale` routes.

## APIs currently bound
- Homepage data: `homepage-data`
- Property listing: `get-property-list`
- Property detail: `get_property?slug_id=`
- Projects: `get-projects`
- Categories: `get_categories`

## Important
Update `.env` values before deployment:

```env
NEXT_PUBLIC_API_URL="https://your-laravel-domain.com"
NEXT_PUBLIC_END_POINT="/api/"
NEXT_PUBLIC_WEB_URL="https://www.bigwein.com"
```

The UI includes safe fallback demo data, so pages will still render even if the API is offline or pending configuration.
