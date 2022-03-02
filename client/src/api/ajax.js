let axios = require('axios')

export default function ajax(url='', data={}, method='get') {
     if (method === 'get') {
         return axios({
             url,
             baseURL:'http://localhost:4000/',
             method,
             params:data,
             withCredentials: true
         })
     }else {
         return axios({
             url,
             baseURL:'http://localhost:4000/',
             method,
             data,
             withCredentials: true
         })
     }
}