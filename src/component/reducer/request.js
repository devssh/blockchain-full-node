import axios from 'axios';

const get = (url, setValue) => {
    axios.get('http://localhost:8080/keys')
        .then(({data}) => {
            setValue(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {get};