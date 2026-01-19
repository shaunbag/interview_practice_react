# Interview Practice React

Small collection of React/TypeScript mini-apps I use to practice common interview-style tasks. Built with Vite.

## What's inside
- **Todo list** – add/complete todos with localStorage persistence.
- **Calculator** – basic arithmetic with decimal support and divide-by-zero guard.
- **Tip calculator** – quick tip table for multiple percentages.
- **Form validation** – username/email/password with inline validation rules.
- **Expense tracker** – track a budget, add expenses, and mark them cleared.
- **Weather forecast** – 5-day forecast grouped by day using the OpenWeather API.

## Getting started
Prerequisites: Node 18+ and npm.

1) Install dependencies  
`npm install`

2) Set the Weather API key  
Create `.env` in the project root with your OpenWeather key:
```
VITE_WEATHER_API_KEY=your_api_key_here
```

3) Run locally  
`npm run dev`

4) Build for production  
`npm run build`

## Scripts
- `npm run dev` – start Vite dev server.
- `npm run build` – type-check and build.
- `npm run preview` – preview the production build.
- `npm run lint` – run eslint.

## Notes
- Weather calls require a valid OpenWeather API key; without it the weather feature will fail to fetch data.
- All components are rendered from `src/App.tsx`; you can comment out sections to focus on a single mini-app.
