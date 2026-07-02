import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import RequireAuth from "../components/RequireAuth";
import RecipeGrid from "../components/recipe-grid";
import UsernameForm from "../components/username-form";
import { fetchMyProfile } from "../fetches/profileFetch";

const ProfileInner = () => {
    const { getAccessTokenSilently, logout } = useAuth0();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const load = async () => {
        try {
            const token = await getAccessTokenSilently();
            const data = await fetchMyProfile(token);
            setProfile(data);
        } catch (err) {
            console.error(err.message);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    if (loading) return <div className="container mt-5">Loading your profile...</div>;
    if (error) return <div className="container mt-5">Could not load your profile. Please try again.</div>;

    const user = profile?.user;
    const hasUsername = user && user.username;

    return (
        <div className="container mt-5">
            {hasUsername
                ? <h1>@{user.username}</h1>
                : <h2>Welcome! Pick a username to get started.</h2>}

            <div className="mb-3">
                <Link to="/cookbooks">My Cookbooks</Link>
                {" | "}
                <Link to="/following">Following</Link>
                {" | "}
                <button
                    className="btn btn-link p-0 align-baseline"
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                    Log Out
                </button>
            </div>

            <UsernameForm
                initialValue={user?.username || ""}
                onSaved={load}
                submitLabel="Save"
                label={hasUsername ? "Change username" : "Username"}
            />

            <h2 className="mt-5">My Recipes</h2>
            <RecipeGrid
                recipes={profile?.recipes}
                emptyMessage="You haven't posted any recipes yet."
            />
        </div>
    );
};

const Profile = () => (
    <RequireAuth>
        <ProfileInner />
    </RequireAuth>
);

export default Profile;
