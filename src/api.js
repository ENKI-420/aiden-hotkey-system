const EPIC_AUTH_URL = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize";
const CLIENT_ID = "your-client-id"; // Replace with actual Epic Client ID
const REDIRECT_URI = "http://localhost:5173/callback"; // Set in Epic Dev Console
const EPIC_AUTH_URL = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize";
const CLIENT_ID = "your-client-id"; // Replace with actual Epic Client ID
const REDIRECT_URI = "http://localhost:5174/callback"; // Update here

export const loginWithEpic = () => {
    const authUrl = `${EPIC_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=openid profile`;
    window.location.href = authUrl;
};

// Function to redirect user to Epic login page
export const loginWithEpic = () => {
    const authUrl = `${EPIC_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=openid profile`;
    window.location.href = authUrl;
};

// Function to exchange authorization code for access token
export const exchangeCodeForToken = async (code) => {
    const tokenUrl = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token";
    
    const payload = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: "your-client-secret", // Secure this in ENV variables
    });

    const response = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload,
    });

    return response.json();
};
