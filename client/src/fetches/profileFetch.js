const API = "http://localhost:5000";

const fetchMyProfile = async (accessToken) => {
    const request = await fetch(`${API}/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return await request.json();
};

const updateMyProfile = async (updates, accessToken) => {
    const request = await fetch(`${API}/profile`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
    return { ok: request.ok, status: request.status, body: await request.json() };
};

const fetchPublicProfile = async (username) => {
    const request = await fetch(`${API}/profile/${username}`, { method: "GET" });
    return await request.json();
};

export { fetchMyProfile, updateMyProfile, fetchPublicProfile };
