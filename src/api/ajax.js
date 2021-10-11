import axios from "axios";

let BASE_URL='https://api.sunofbeach.net' //阳光沙滩api接口地址

export default function ajax(url, data = {mock:false}, type = "GET") {
    return new Promise(function (resolve, reject) {


        switch (type) {
            case "GET":
                axios.get(BASE_URL+url, {
                    params: data
                }).then(function (response) {
                    resolve(response.data)
                }).catch(function (error) {
                    reject(error)
                });
                break;
            case "POST":
                axios.post(BASE_URL+url, data)
                    .then(function (response) {
                        resolve(response.data)
                    })
                    .catch(function (error) {
                        reject(error)
                    });
                break;

            case "PUT":
                axios.put(BASE_URL+url, data ).then(function (response) {
                    resolve(response.data)
                }).catch(function (error) {
                    reject(error)
                })
                break

            case "DELETE":
                axios.delete(BASE_URL+url, {
                    params: data
                }).then(function (response) {
                    resolve(response.data)
                }).catch(function (error) {
                    reject(error)
                });
                break;

            default:
                reject('请求类型错误')
        }


    })
}
