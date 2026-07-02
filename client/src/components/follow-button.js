import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchFollowStatus, followUser, unfollowUser } from "../fetches/profileFetch";

const FollowButton = ({ username, onChange }) => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [following, setFollowing] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) return;
        const load = async () => {
            try {
                const token = await getAccessTokenSilently();
                const data = await fetchFollowStatus(username, token);
                if (data && data.error) return; // e.g. your own profile
                setFollowing(!!data.following);
                setReady(true);
            } catch (err) {
                console.error(err.message);
            }
        };
        load();
    }, [username, isAuthenticated]);

    const toggle = async () => {
        try {
            const token = await getAccessTokenSilently();
            if (following) {
                await unfollowUser(username, token);
                setFollowing(false);
            } else {
                await followUser(username, token);
                setFollowing(true);
            }
            if (onChange) onChange();
        } catch (err) {
            console.error(err.message);
        }
    };

    // Hidden until we know the status (also hides on the viewer's own profile,
    // where the follow endpoint returns a 400 and status never becomes ready).
    if (!isAuthenticated || !ready) return null;

    return (
        <button
            className={following ? "btn btn-secondary" : "btn btn-primary"}
            onClick={toggle}
        >
            {following ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowButton;
