import axios from "axios";

let BASE_URL='https://api.sunofbeaches.com' //阳光沙滩api接口地址


export default function ajax(url, data = {}, type = "GET") {
    return new Promise(function (resolve, reject) {


        axios({
            method: type,
            url: url,
            baseURL:BASE_URL,
            data:data,
            withCredentials:true,

        }).then(response => {
            resolve(response.data)
        }).catch(reason => {
            reject(reason)
        })


    })
}
