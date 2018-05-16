import axios from 'axios';

const request = (method, url, data, action) => {
    return axios({
        method: method,
        url: url,
        data: data,
    }).then(({data}) => {
        action(data);
    }).catch((error) => {
        console.log(error);
    });
};

export {request};