# The Moat Eco

The Moat Eco is an interactive, educational investment analysis platform designed to teach users Michael Mauboussin's "Measuring the Moat" framework. It helps users analyze the magnitude and sustainability of corporate value creation through hands-on simulators, financial deep dives, and an AI-powered Socratic Coach.

## Tech Stack
- **Frontend**: React (v18), Vite, Tailwind CSS, Framer Motion for animations.
- **Backend**: Node.js, Express for the AI Coach API.
- **AI Integration**: Gemini API (`@google/genai`) for pedagogical coaching.
- **Language**: TypeScript (Strict typing for financial objects).
- **Icons**: Lucide React.
- **Charts**: Recharts.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A Gemini API Key (set in `.env`)

### Installation & Development
1. Install dependencies:
   \`npm install\`
2. Set up environment variables:
   - Create a `.env` file based on `.env.example`.
   - Ensure `GEMINI_API_KEY` is populated.
3. Start the development server:
   \`npm run dev\`

### Build & Production
To build the application for production:
\`npm run build\`

This compiles the React SPA into `dist/` and bundles the backend Express server into a CommonJS server (`dist/server.cjs`) via esbuild.

To start the production server:
\`npm start\`

## Testing Financial Calculations
A simple regression test script is included to ensure that critical financial calculations (ROIC, WACC, Spread) don't break when modifying `src/data/companyAuditData.ts`.

Run tests via:
\`node test-finance.cjs\`
