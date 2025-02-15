import React, { useEffect, useState } from "react";
import { loginWithEpic, exchangeCodeForToken } from "./api";

function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Check if user was redirected back with an authorization code
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            exchangeCodeForToken(code).then((data) => {
                if (data.access_token) {
                    setToken(data.access_token);
                    localStorage.setItem("epic_token", data.access_token);
                }
            });
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Epic OpenID Login</h1>

            {!token ? (
                <button
                    onClick={loginWithEpic}
                    className="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50 text-white shadow h-9 px-4 py-2 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 flex items-center justify-center gap-2 group"
                    type="submit"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-log-in w-4 h-4 transition-transform group-hover:translate-x-1"
                    >
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" x2="3" y1="12" y2="12"></line>
                    </svg>
                    Login with Epic OpenID
                </button>
            ) : (
                <p className="text-green-500">Logged in! Access Token: {token}</p>
            )}
        </div>
    );
}

export default App;
