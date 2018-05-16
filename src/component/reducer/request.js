import axios from 'axios';

const host = 'http://0.0.0.0:8080';

const request = (method, url, data, action) => {
    return axios({
        method: method,
        url: host + url,
        data: data,
    }).then(({data}) => {
        action(data);
    }).catch((error) => {
        console.log(error);
    });
};

export {request};