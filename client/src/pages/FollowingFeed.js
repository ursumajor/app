import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import RequireAuth from "../components/RequireAuth";
import RecipeGrid from "../components/recipe-grid";
import { fetchFollowingRecipes } from "../fetches/recipeFetch";

const FollowingFeedInner = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const token = await getAccessTokenSilently();
                setRecipes(await fetchFollowingRecipes(token));
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            <h1>From People You Follow</h1>
            <RecipeGrid
                recipes={recipes}
                emptyMessage="Follow some cooks to see their recipes here."
            />
        </div>
    );
};

const FollowingFeed = () => (
    <RequireAuth>
        <FollowingFeedInner />
    </RequireAuth>
);

export default FollowingFeed;
