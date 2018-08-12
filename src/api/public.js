import axios from 'axios'

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded';

const baseUrl = "http://localhost:8088";

export default {
  get(uri, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(baseUrl + uri, params)
        .then(rep => resolve(rep.data))
        .catch(error => reject(error))
    })
  },

  get(uri) {
    return new Promise((resolve, reject) => {
      axios.get(baseUrl + uri)
        .then(rep => resolve(rep.data))
        .catch(error => reject(error))
    })
  },

  post(uri, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + uri, params)
        .then(rep => resolve(rep.data))
        .catch(error => reject(error))
    })
  },

  put(uri, params = {}) {
    return new Promise((resolve, reject) => {
      axios.put(baseUrl + uri, params)
        .then(rep => resolve(rep.data))
        .catch(error => reject(error))
    })
  },

  delete(uri) {
    return new Promise((resolve, reject) => {
      axios.delete(baseUrl + uri)
        .then(rep => resolve(rep.data))
        .catch(error => reject(error))
    })
  }
};
