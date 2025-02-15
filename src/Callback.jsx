import React, { useEffect } from "react";
import { exchangeCodeForToken } from "./api";
import { useNavigate } from "react-router-dom";

function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            exchangeCodeForToken(code).then((data) => {
                if (data.access_token) {
                    localStorage.setItem("epic_token", data.access_token);
                    navigate("/"); // Redirect to home after login
                }
            });
        }
    }, [navigate]);

    return <h1>Authenticating...</h1>;
}

export default Callback;
