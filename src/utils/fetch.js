import router from '../router'
import axios from 'axios'
import qs from 'qs'
import cache from './cache'
import baseUrl from './constans.js'
axios.defaults.timeout = 30000
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;

axios.interceptors.response.use(
    response => {
        if(response.data.code === 1001 || response.data.code === 1002 || response.data.code === 6001) {
            
        }
        return response
    },
    error => {
        console.log(error)
        return Promise.reject(error.response.data)
    }
)

const http = {
	post (setting) {
        setting.data = setting.data || {}
		return  axios({
                    method: 'post',
		            url: setting.url,
		            data: qs.stringify(setting.data || {}),
		            headers: {
		            	'X-Requested-With': 'XMLHttpRequest',
		                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		                'X-Maximum-Key' : cache.readToken('adminToken') || ''
		            }
		        })
				.then(function(res){
                    // console.log(res.data)
					typeof setting.success === 'function' && setting.success(res.data)
				})
				.catch(function(res){
                    // console.log(res)
					typeof setting.error === 'function' && setting.error(res)
				})
		
	},
    upload (setting) {
        return  axios({
                    method: 'post',
                    url: setting.url,
                    data: setting.data || {},
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'multipart/form-data',
                        'X-Maximum-Key' : cache.readToken('adminToken') || ''
                    }
                })
                .then(function(res){
                    // console.log(res.data)
                    typeof setting.success == 'function' && setting.success(res.data)
                })
                .catch(function(res){
                    // console.log(res)
                    typeof setting.error == 'function' && setting.error(res)
                })
        
    },
	get (setting) {
        setting.data = setting.data || {}
		return  axios({
                    method: 'get',
		            url: setting.url,
		            params: setting.data || {},
		            headers: {
		                'X-Requested-With': 'XMLHttpRequest',
		                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		                'X-Maximum-Key' : cache.readToken('adminToken') || ''
		            }
		        })
				.then(function(res){
                    // console.log(res.data)
					typeof setting.success == 'function' && setting.success(res.data)
				})
				.catch(function(res){
                    // console.log(res)
					typeof setting.error == 'function' && setting.error(res)
				})
	},
	ajax (setting) {
		$.ajax({
                type: 'post',
	            url: eee + setting.url,
	            data: setting.data || {},
	            beforeSend: function (request) {
                    request.setRequestHeader("X-Maximum-Key", cache.readToken('adminToken') || '');
                },
                success: function (res) {
                    typeof setting.success == 'function' && setting.success(res)
                    
                },
                error: function (res) {
                    typeof setting.success == 'function' && setting.success(res)
                }
            })
		
	},
}
export default {
    install: function (Vue, options) { 
        Vue.prototype.$http = http
    }
}