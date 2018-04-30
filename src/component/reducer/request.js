import axios from 'axios';

const host = 'http://localhost:8080';

const request = (method, url, data) => {
    axios({
        method: method,
        url: host + url,
        data: data,
    }).then(({data}) => {
        console.log("response", data);
    }).catch((error) => {
        console.log(error);
    });
};

export {request};