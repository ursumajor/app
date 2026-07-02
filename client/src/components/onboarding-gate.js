import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameForm from "./username-form";
import { fetchMyProfile } from "../fetches/profileFetch";

// Forces a logged-in user without a username to pick one before using the app,
// so authors never show up as "anonymous".
const OnboardingGate = ({ children }) => {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [checked, setChecked] = useState(false);
    const [needsUsername, setNeedsUsername] = useState(false);

    useEffect(() => {
        if (isLoading) return;
        if (!isAuthenticated) {
            setChecked(true);
            return;
        }
        const check = async () => {
            try {
                const token = await getAccessTokenSilently();
                const data = await fetchMyProfile(token);
                setNeedsUsername(!data.user?.username);
            } catch (err) {
                console.error(err.message);
            } finally {
                setChecked(true);
            }
        };
        check();
    }, [isAuthenticated, isLoading]);

    if (isLoading || !checked) return <div className="container mt-5">Loading...</div>;

    if (isAuthenticated && needsUsername) {
        return (
            <div className="container mt-5">
                <h2>Welcome! Pick a username to get started.</h2>
                <UsernameForm onSaved={() => setNeedsUsername(false)} submitLabel="Continue" />
            </div>
        );
    }

    return children;
};

export default OnboardingGate;
