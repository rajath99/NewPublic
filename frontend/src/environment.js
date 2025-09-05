//   // Removed duplicate baseUrl declaration and export
//   const netlifyDeployedApiUrl = undefined; // Not using Netlify, so set to undefined
// //const netlifyDeployedApiUrl = import.meta.env.VITE_API_BASE_URL; // This VAR NAME MUST MATCH Netlify setting
// const localApiUrl = "http://localhost:5001/api"; // Your local backend with /api

// export const baseUrl = netlifyDeployedApiUrl || localApiUrl;

// // CRITICAL DEBUG LOGS - Keep these for now
// //console.log("ENVIRONMENT.JS: Raw VITE_API_BASE_URL from Netlify env:", import.meta.env.VITE_API_BASE_URL);
// //console.log("ENVIRONMENT.JS: Final 'baseUrl' being exported:", baseUrl);



// Use Vercel environment variable
const vercelApiUrl = import.meta.env.VITE_API_BASE_URL; // This VAR NAME MUST MATCH Vercel setting
const localApiUrl = "http://localhost:5001/api"; // Local backend with /api

// Export final base URL
export const baseUrl = vercelApiUrl || localApiUrl;

// Debug logs (check in browser console after deploy)
console.log("ENVIRONMENT.JS: Raw VITE_API_BASE_URL from Vercel env:", vercelApiUrl);
console.log("ENVIRONMENT.JS: Final 'baseUrl' being exported:", baseUrl);
