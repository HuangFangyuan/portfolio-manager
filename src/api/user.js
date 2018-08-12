import http from './public'

export default {
  login(params) {
    return http.post('/login', params);
  },
  logout(params) {
    return http.get('/logout', params)
  }
}
