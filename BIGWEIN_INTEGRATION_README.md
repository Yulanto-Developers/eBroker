# Bigwein Next.js UI Conversion

This package contains the Bigwein HTML design converted into Next.js pages/components.

Converted pages:
- `/` Home
- `/properties` Properties
- `/projects` Projects
- `/login` Login / Sign up
- `/signup` Login / Sign up
- `/property-details/modern-haven-villai` Property detail

Assets are copied to `public/bigwein/assets`.
The design is rendered through `src/components/bigwein/BigweinStaticPage.jsx` and uses the original static markup/styles with Next.js routing paths.

Next step for full functionality: connect the existing Laravel API data to these sections by replacing static cards/filters with React state and API calls.
