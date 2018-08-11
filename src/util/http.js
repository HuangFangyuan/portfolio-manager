const baseUrl = 'http://192.168.191.3:8080';

export default {
  composeUrl(uri) {
    return baseUrl + uri;
  }
}
