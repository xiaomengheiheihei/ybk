import axios from 'axios'

axios.defaults.baseURL = ''
axios.defaults.headers = {
    appversion:"1.1.4",
    uuid:"21712201756195fw5ci3jmtarrmxk0000000",
    platform:"miniapp"
};

export default {
    post: (url,params = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
            .then (response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
        })
    },
    get: (url,params = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(url, {params})
            .then (response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
        })
    },
    put: (url,params = {}) => {
        return new Promise((resolve, reject) => {
            axios.put(url, {params})
            .then (response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
        })
    }
}
