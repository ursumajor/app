import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeGrid from "../components/recipe-grid";
import { fetchPublicProfile } from "../fetches/profileFetch";

const UserProfile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchPublicProfile(username);
                setProfile(data);
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [username]);

    if (loading) return <div className="container mt-5">Loading...</div>;
    if (!profile || profile.error || !profile.user) {
        return <div className="container mt-5">User not found.</div>;
    }

    return (
        <div className="container mt-5">
            <h1>@{profile.user.username}</h1>
            <h2 className="mt-4">Recipes</h2>
            <RecipeGrid recipes={profile.recipes} emptyMessage="No recipes yet." />
        </div>
    );
};

export default UserProfile;
