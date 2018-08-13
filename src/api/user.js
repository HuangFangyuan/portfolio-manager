import http from './public'

export default {
  login(params) {
    return http.post('/login', params);
  },
  logout(params) {
    return http.get('/logout', params)
  },
  getManagers(params){
    return http.get('/managers', params)
  },
  createManager(params){
    return http.post('/manager', params)
  }
}
