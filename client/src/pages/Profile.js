import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import RequireAuth from "../components/RequireAuth";
import RecipeGrid from "../components/recipe-grid";
import { fetchMyProfile, updateMyProfile } from "../fetches/profileFetch";

const ProfileInner = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [usernameInput, setUsernameInput] = useState("");
    const [status, setStatus] = useState(null);

    const load = async () => {
        try {
            const token = await getAccessTokenSilently();
            const data = await fetchMyProfile(token);
            setProfile(data);
            setUsernameInput(data.user?.username || "");
        } catch (err) {
            console.error(err.message);
            setStatus("Could not load your profile.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const saveUsername = async (event) => {
        event.preventDefault();
        setStatus("Saving...");
        try {
            const token = await getAccessTokenSilently();
            const res = await updateMyProfile({ username: usernameInput }, token);
            if (res.ok) {
                setStatus("Saved!");
                await load();
            } else if (res.status === 409) {
                setStatus("That username is already taken.");
            } else {
                setStatus("Could not save. Please try again.");
            }
        } catch (err) {
            console.error(err.message);
            setStatus("Could not save. Please try again.");
        }
    };

    if (loading) return <div className="container mt-5">Loading your profile...</div>;

    const user = profile?.user;
    const hasUsername = user && user.username;

    return (
        <div className="container mt-5">
            {hasUsername
                ? <h1>@{user.username}</h1>
                : <h2>Welcome! Pick a username to get started.</h2>}

            <form onSubmit={saveUsername} className="mt-2">
                <label>{hasUsername ? "Change username" : "Username"}</label>
                <input
                    type="text"
                    className="form-control"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-success mt-2">Save</button>
                {status && <p className="mt-2">{status}</p>}
            </form>

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
