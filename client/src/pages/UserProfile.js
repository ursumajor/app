import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeGrid from "../components/recipe-grid";
import FollowButton from "../components/follow-button";
import { fetchPublicProfile } from "../fetches/profileFetch";

const UserProfile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => { load(); }, [username]);

    if (loading) return <div className="container mt-5">Loading...</div>;
    if (!profile || profile.error || !profile.user) {
        return <div className="container mt-5">User not found.</div>;
    }

    return (
        <div className="container mt-5">
            <h1>@{profile.user.username}</h1>
            <p>
                {profile.counts?.followers ?? 0} followers · {profile.counts?.following ?? 0} following
            </p>
            <FollowButton username={username} onChange={load} />

            <h2 className="mt-4">Recipes</h2>
            <RecipeGrid recipes={profile.recipes} emptyMessage="No recipes yet." />
        </div>
    );
};

export default UserProfile;
