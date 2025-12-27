import React, {Fragment} from 'react';
import { useParams } from "react-router"


import LoginButton from '../components/LoginButton'

const LoginPage = (props) => {

    return (<Fragment>
        <div className="container">
            <LoginButton/>
        </div>
    </Fragment>);
}

export default LoginPage;