const fetchPutIntoAWS = async (url, file) => {
    await fetch(url, {
        method: "PUT", body: file
    });
}

export { fetchPutIntoAWS };
