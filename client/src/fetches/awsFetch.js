const fetchPutPresignedUrl = async (endpoint_file_name) => {
    var request = await fetch("http://localhost:5000/aws/requestputURL/",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({"file": endpoint_file_name})
        });
    return await request.json()
};

const fetchGetPresignedUrl = async (endpoint_file_name) => {
    var request = await fetch("http://localhost:5000/aws/requestgetURL/",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({"file": endpoint_file_name})
        });
    return await request.json()
};

const fetchPutIntoAWS = async (url, file) => {
    const result = await fetch(url, {
        method:"PUT", body: file
    });
 
}

const fetchGetIntoAWS = async (url) => {
    const file = await fetch(url, { method:"GET"});
    return file;
}


export {fetchPutPresignedUrl,fetchPutIntoAWS, fetchGetPresignedUrl, fetchGetIntoAWS};