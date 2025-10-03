import React, { Fragment, useState} from "react";


const Input = (props) => {

    const url = "http://localhost:5000/" + props.db + "/"

    const [text, setText] = useState("")
    
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {"description": text}
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            window.location = "/DBtool/data";
        } catch (err){
            console.error(err.message);
        }
    }


    return( <Fragment> <h1 className="text-center mt-5">Input</h1>
    <form className="d-flex" onSubmit={onSubmitForm}>
        <input type="text" className = "form-control" value={text} onChange={e => setText(e.target.value)}></input>
        <button className="btn btn-success">Add</button>
    </form>
    </Fragment>)
};


export default Input;
