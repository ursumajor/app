import React, {Fragment} from 'react';
import { useParams } from "react-router"


import Input from '../components/input'
import Display from '../components/display';

const DBTool = (props) => {
    const {db} = useParams();

    return (<Fragment>
        <div className="container">
        <Input db={db}/><Display db={db}/>
        </div>
    </Fragment>);
}

export default DBTool;