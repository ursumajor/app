import React, {Fragment, useEffect, useState} from "react";


const Display = (props) => {

    const url = "http://localhost:5000/" + props.db + "/"

    const [json_data, set_json_data] = useState([])
    
    
    const load_data = async () => {
        try {
            const response = await fetch(url, {
                method: "GET",
            })
            const j_data = await response.json()
            set_json_data(j_data)
            console.log(j_data)
        } catch (err){
            console.error(err.message);
        }
    }

    useEffect(() => {load_data();}, []);

    const delete_item = async (id) => {
        try {
            const response = await fetch(url + id, {
                method: "DELETE",
            })
            set_json_data(json_data.filter(row => row.id != id))
        } catch (err){
            console.error(err.message);
        }
    }

    return( <Fragment> 
            <table className = "table text-center mt-5">
            <thead>
                <tr>
                <th>ID</th>
                <th>description</th>
                <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
                {json_data.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.description}</td>
                    <td><button className="btn btn-danger" onClick={() => delete_item(item.id)}>DELETE</button></td>
                </tr>
                ))}
            </tbody>
            </table>
    </Fragment>)
};


export default Display;
