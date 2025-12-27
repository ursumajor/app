import React, { Fragment, useState} from "react";


const Login = (props) => {

    const url = "http://localhost:5000/" + props.db + "/"

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    // const onSubmitForm = async e => {
    //     e.preventDefault();
    //     try {
    //         const body = {"description": text}
    //         const response = await fetch(url, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json"},
    //             body: JSON.stringify(body)
    //         })
    //         window.location = "/DBtool/data";
    //     } catch (err){
    //         console.error(err.message);
    //     }
    // }

    return( <Fragment> <h1 className="text-center mt-5">Login</h1>
    <form className="d-flex">
        Username:
        <input type="text" display = "block" className = "form-control" value={username} onChange={e => setUsername(e.target.value)}></input>
        Password:
        <input type="text" className = "form-control" value={password} onChange={e => setPassword(e.target.value)}></input>
        <button className="btn btn-success">Submit</button>
    </form>
    </Fragment>)
};


export default Login;
