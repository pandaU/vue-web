import { MessageBox, Message } from 'element-ui'

// api root
const root = '/'
// import axios
const axios = require('axios')
function apiAxios (method, url, params, success, failure) {
    let isBlob = false
    if (method === 'BLOB') {
      method = 'GET'
      isBlob = true
    }
  
    const _success = success || function () {}
    const _failure = failure || function () {}
    const config = {
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' || method === 'DELETE' ? params : null,
      params: method === 'GET' ? params : null,
      baseURL: root,
      withCredentials: false,
      responseType: isBlob ? 'blob' : 'json'
    }
   /*  if (token) {
      config.headers = {
        ignore_sign: ignoreSign,
        sign: sign
      }
    } */
    axios(config).then((res) => {
      if (Number(res.status) === 200) {
        // if: xxribd backen request
        if (!!res.data.status || !!res.data.result) {
          // xxribd real success
          const xxribdStatus = Number(res.data.status)
          switch (xxribdStatus) {
            case 200: {
              _success(res.data.result)
              break
            }
            case 301: {
              MessageBox.confirm('您可能已经在其他地方登陆，请刷新页面后重新登录。', '登录过期', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                location.reload()
              })
              break
            }
            case 304: {
              location.replace('/404?disableBack=true&enableWorkspace=true')
              break
            }
            case 305: {
              MessageBox.confirm('您还没登录，请登录！', '请登录', {
                confirmButtonText: '登录',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                location.reload()
              })
              break
            }
            default: {
              _failure(res.data || 'Error')
              break
            }
          }
        } else {
          // others request
          _success(res.data)
        }
      } else if (Number(res.status) === 201) {
        _success(res.data)
      } else {
        if (success) {
          _success(res)
        } else if (failure) {
          _failure(res.data)
        } else {
          Message.error('error: ' + JSON.stringify(res.data))
        }
      }
    }).catch((err) => {
      const res = err.response
      if (err && res) {
        Message.error(res.status ? 'api error, HTTP CODE: ' + res.status : res)
        _failure(res.data)
      }
    })
  }
  
  // 返回在vue模板中的调用接口
  export default {
    get: function (url, params, success, failure) {
      return apiAxios('GET', url, params, success, failure)
    },
    post: function (url, params, success, failure) {
      return apiAxios('POST', url, params, success, failure)
    },
    put: function (url, params, success, failure) {
      return apiAxios('PUT', url, params, success, failure)
    },
    delete: function (url, params, success, failure) {
      return apiAxios('DELETE', url, params, success, failure)
    },
    blob: function (url, params, success, failure) {
      return apiAxios('BLOB', url, params, success, failure)
    }
  }
  