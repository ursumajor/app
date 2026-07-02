import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import RequireAuth from "../components/RequireAuth";
import { fetchMyCookbooks, createCookbook } from "../fetches/cookbookFetch";

const CookbooksInner = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [cookbooks, setCookbooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newName, setNewName] = useState("");

    const load = async () => {
        try {
            const token = await getAccessTokenSilently();
            setCookbooks(await fetchMyCookbooks(token));
        } catch (err) {
            console.error(err.message);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleCreate = async (event) => {
        event.preventDefault();
        if (!newName.trim()) return;
        try {
            const token = await getAccessTokenSilently();
            await createCookbook(newName.trim(), token);
            setNewName("");
            await load();
        } catch (err) {
            console.error(err.message);
        }
    };

    if (loading) return <div className="container mt-5">Loading your cookbooks...</div>;
    if (error) return <div className="container mt-5">Could not load your cookbooks. Please try again.</div>;

    return (
        <div className="container mt-5">
            <h1>My Cookbooks</h1>
            <div className="d-flex flex-wrap">
                {cookbooks.map((cookbook) => (
                    <Link
                        key={cookbook.id}
                        to={`/cookbooks/${cookbook.id}`}
                        className="m-2 border p-3 text-decoration-none text-dark"
                    >
                        <h3>{cookbook.name}</h3>
                        <p>
                            {cookbook.recipe_count} recipe{cookbook.recipe_count === 1 ? "" : "s"}
                            {cookbook.is_default ? " · default" : ""}
                        </p>
                    </Link>
                ))}
            </div>

            <form onSubmit={handleCreate} className="mt-4 d-flex" style={{ maxWidth: "400px" }}>
                <input
                    className="form-control"
                    placeholder="New cookbook name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button className="btn btn-success" type="submit">Create</button>
            </form>
        </div>
    );
};

const Cookbooks = () => (
    <RequireAuth>
        <CookbooksInner />
    </RequireAuth>
);

export default Cookbooks;
