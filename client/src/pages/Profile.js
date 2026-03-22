import RequireAuth from '../components/RequireAuth';
import React, {Fragment, useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const [json_data, set_json_data] = useState([])
    const load_data = async () => {
        const url = "http://localhost:5000/profile"
        const accessToken = await getAccessTokenWithPopup({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: "read:profile write:profile"
        });
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            const j_data = await response.json()
            set_json_data(j_data)
        } catch (err){
            console.error(err.message);
        }
    }
    return <RequireAuth> <button onClick={load_data}>Load Profile Data</button> {json_data && <div> Welcome {JSON.stringify(json_data.user)}! </div>} </RequireAuth> 
}


export default ProfilePage;