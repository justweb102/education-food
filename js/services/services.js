let postData = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};



let getResource = async (url) => {
    let res = await fetch(url);

    if(!res.ok){
        throw new Error(`Не могу fetch по адресу ${url}, статус ${res.status}`);
    }

    return await res.json();
}


export {postData};
export {getResource};