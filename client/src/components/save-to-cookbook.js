import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
    fetchMyCookbooks,
    createCookbook,
    addRecipeToCookbook,
    removeRecipeFromCookbook,
} from "../fetches/cookbookFetch";

const SaveToCookbook = ({ recipeId }) => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [open, setOpen] = useState(false);
    const [cookbooks, setCookbooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newName, setNewName] = useState("");

    const load = async () => {
        setLoading(true);
        try {
            const token = await getAccessTokenSilently();
            const data = await fetchMyCookbooks(token, recipeId);
            setCookbooks(data);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleOpen = async () => {
        const next = !open;
        setOpen(next);
        if (next) await load();
    };

    const toggleMembership = async (cookbook) => {
        try {
            const token = await getAccessTokenSilently();
            if (cookbook.contains) {
                await removeRecipeFromCookbook(cookbook.id, recipeId, token);
            } else {
                await addRecipeToCookbook(cookbook.id, recipeId, token);
            }
            await load();
        } catch (err) {
            console.error(err.message);
        }
    };

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

    if (!isAuthenticated) return null;

    return (
        <div className="mt-3">
            <button className="btn btn-outline-primary" onClick={toggleOpen}>
                Save to cookbook
            </button>

            {open && (
                <div className="border p-3 mt-2" style={{ maxWidth: "320px" }}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {cookbooks.map((cookbook) => (
                                <div key={cookbook.id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={cookbook.contains}
                                            onChange={() => toggleMembership(cookbook)}
                                        />
                                        {" "}
                                        {cookbook.name}
                                        {cookbook.is_default ? " (default)" : ""}
                                    </label>
                                </div>
                            ))}

                            <form onSubmit={handleCreate} className="mt-2 d-flex">
                                <input
                                    className="form-control"
                                    placeholder="New cookbook"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <button className="btn btn-success" type="submit">Create</button>
                            </form>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SaveToCookbook;
