import http from './public'

export default {
  getPositionDetail(id){
    return http.get("/position/" + id);
  },
  getPositions(){
    return http.get("/positions")
  },
  sell(params) {
    return http.post('/sell', params);
  },
  buy(params) {
    return http.post('/buy', params);
  },
  getIndices(){
    return http.get('/indices');
  },
  getStocks(params){
    return http.get('/stock', params)
  },
  getStockDetail(params){
    return http.get('/stock/detail', params)
  },
  getPortfolio(id){
    return http.get('/portfolio/' + id)
  }
}
