import axios from 'axios';

const host = 'http://localhost:8080';

const request = (method, url, data, action) => {
    return axios({
        method: method,
        url: host + url,
        data: data,
    }).then(({data}) => {
        console.log("data",data);
        action(data);
    }).catch((error) => {
        console.log(error);
    });
};

export {request};