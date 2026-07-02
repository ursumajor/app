import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import RequireAuth from "../components/RequireAuth";
import RecipeGrid from "../components/recipe-grid";
import { fetchCookbook } from "../fetches/cookbookFetch";

const CookbookDetailInner = () => {
    const { id } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [cookbook, setCookbook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const token = await getAccessTokenSilently();
                setCookbook(await fetchCookbook(id, token));
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) return <div className="container mt-5">Loading...</div>;
    if (!cookbook || cookbook.error) {
        return <div className="container mt-5">Cookbook not found.</div>;
    }

    return (
        <div className="container mt-5">
            <h1>{cookbook.name}</h1>
            <RecipeGrid recipes={cookbook.recipes} emptyMessage="No recipes saved yet." />
        </div>
    );
};

const CookbookDetail = () => (
    <RequireAuth>
        <CookbookDetailInner />
    </RequireAuth>
);

export default CookbookDetail;
