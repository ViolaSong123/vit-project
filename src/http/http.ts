import request from "./request"
const http = new request({
    baseURL:'http://42.193.158.170:8098',
    timeout:10000
})
export default http;