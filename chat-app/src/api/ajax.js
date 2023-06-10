import axios from "axios";

//手动封装ajax
export default function ajax(url, data = {}, type = 'GET') {
    // console.log(data)
    if (type === 'GET') {
        return axios.get(url, {
            params: data
        })
    } else {
        return axios.post(url, data)
    }
}