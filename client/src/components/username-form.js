import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { updateMyProfile } from "../fetches/profileFetch";

const UsernameForm = ({ initialValue = "", onSaved, submitLabel = "Save", label = "Username" }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [username, setUsername] = useState(initialValue);
    const [status, setStatus] = useState(null);
    const [saving, setSaving] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        if (!username.trim()) return;
        setSaving(true);
        setStatus("Saving...");
        try {
            const token = await getAccessTokenSilently();
            const res = await updateMyProfile({ username: username.trim() }, token);
            if (res.ok) {
                setStatus("Saved!");
                if (onSaved) onSaved(res.body.user);
            } else if (res.status === 409) {
                setStatus("That username is already taken.");
            } else {
                setStatus("Could not save. Please try again.");
            }
        } catch (err) {
            console.error(err.message);
            setStatus("Could not save. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={submit} className="mt-2">
            <label>{label}</label>
            <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <button type="submit" className="btn btn-success mt-2" disabled={saving}>
                {submitLabel}
            </button>
            {status && <p className="mt-2">{status}</p>}
        </form>
    );
};

export default UsernameForm;
