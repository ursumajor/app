import * as userModel from "../models/userModels.js"

const getProfile = async (req, res) => {
    try {
        const auth0_id = req.auth.payload.sub;
        const user = await userModel.getUserByAuth0Id(auth0_id);
        res.json({
            message: 'Access granted',
            user: user,
        });
    } catch(err) {
        console.error(err.message);
    }
}



export {getProfile}