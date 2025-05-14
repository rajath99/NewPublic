  // const baseUrl = 'http://localhost:5001/api';
   //export {baseUrl}

   // ../../../environment.js (NEW - For Vercel Deployment)

// Determine the base URL based on the environment
// VITE_API_BASE_URL is the Vercel environment variable (for Vite projects)
// Use NEXT_PUBLIC_API_BASE_URL for Next.js, REACT_APP_API_BASE_URL for Create React App
const vercelApiUrl = import.meta.env.VITE_API_BASE_URL; // << ADJUST THIS if not using Vite

// Fallback for local development if the Vercel env var isn't set
const localApiUrl = "http://localhost:5001/api"; // Your local backend URL WITH /api

// Use the Vercel URL if it's available (meaning it's a Vercel build), otherwise use local
export const baseUrl = vercelApiUrl || localApiUrl;

console.log("Using API Base URL:", baseUrl); // Good for debugging