import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.baseURL = ''
axios.defaults.headers = {
    appversion:"1.1.4",
    Authorization: Cookies.get('Authorization'),
    platform:"ybk"
};

axios.interceptors.response.use(
    response => {
        // console.log(response)
        return response;
    }
)

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
