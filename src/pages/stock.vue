<template>
  <div class="wrapper">
    <div class="search">
      <el-input placeholder="value" v-model="value" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="Select" style="width: 120px">
          <el-option label="By Name" value="1"></el-option>
          <el-option label="By Type" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table
      border
      :data="stocks"
      style="width: 97%"
      :default-sort = "{ prop: 'name', order: 'descending'}"
      align="left"
    >
      <el-table-column
        prop="name"
        label="Name"
        sortable
        :width="100">
      </el-table-column>
      <el-table-column
        prop="type"
        label="Type"
        sortable
        :width="80">
      </el-table-column>
      <el-table-column
        prop="date"
        label="Date"
        sortable
        :width="labelWidth">
      </el-table-column>
      <el-table-column
        prop="price"
        label="Price($)"
        :width="labelWidth">
      </el-table-column>
      <el-table-column
        prop="open_price"
        label="Open Price"
        :width="labelWidth">
      </el-table-column>
      <el-table-column
        prop="high_price"
        label="High Price"
        :width="labelWidth">
      </el-table-column>
      <el-table-column
        prop="low_price"
        label="Low Price"
        :width="labelWidth">
      </el-table-column>
      <el-table-column
        prop="vol"
        label="Vol"
        :width="labelWidth">
      </el-table-column>
      <el-table-column
        prop="chg"
        label="CHG"
        :width="labelWidth">
      </el-table-column>
      <el-table-column label="Operate">
        <template slot-scope="scope">
          <el-button size="mini" @click="detail(scope.row.name)">Detail</el-button>
          <el-button size="mini" type="success" @click="buy(scope.$index)">Buy</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog align="left" title="Buy" :visible.sync="buyFormVisible">
      <div class="performance">
        <div>
          <p class="title" align="left">Performance</p>
        </div>
        <div>
          <div id="c1"></div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailFormVisible = false">Close</el-button>
      </div>
    </el-dialog>

    <el-dialog align="left" title="Buy" :visible.sync="buyFormVisible">
      <el-form :model="form">
        <el-form-item label="Name:" label-width="10">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="Price($):" label-width="10">
          <el-input v-model="form.price" disabled></el-input>
        </el-form-item>
        <el-form-item label="Qty:" :label-width="formLabelWidth">
          <el-input v-model="form.qty"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="buyFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitBuyForm">Confirm</el-button>
      </div>
    </el-dialog>

    <div class="page-container">
      <el-tag class="amount">page size : {{ pageSize }} , total data: {{ total }} </el-tag>
      <el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :total="pageNum" class="pagination"></el-pagination>
    </div>
  </div>
</template>

<script>
  import PORTFOLIO from '../api/portfolio'
  import PREDICTION from '../util/prediction'
  export default {
    data() {
      return {
        stocks:[
          {
            name:'FB',
            type:'stock',
            date:'2018-08-08',
            price:120,
            high_price:120,
            open_price:120,
            low_price:120,
            vol:120,
            chg:120
          },{
            name:'FB',
            type:'stock',
            date:'2018-08-08',
            price:120,
            high_price:120,
            open_price:120,
            low_price:120,
            vol:120,
            chg:120
          }],
        form:{
          name:'',
          price:'',
          qty:null
        },
        total:300,
        pageNum:4,
        pageSize:8,
        labelWidth:"110",
        formLabelWidth:"50",
        detailFormVisible:false,
        buyFormVisible:false,
        select:'',
        value:''
      }
    },
    methods:{
      getStocks(from = 0){
        let params = {
          params:{
            from:from,
            size:this.size,
            select:this.select,
            value:this.value
          }
        };
        PORTFOLIO.getStocks(params)
          .then(rep => {
            if(PREDICTION.httpSuccess(rep)){
              this.$message.success("success")
            }
            else{
              this.$message.error(rep.message)
            }
          })
      },
      buy(index){
        let stock = this.stocks[index];
        this.form.name = stock.name;
        this.form.price = stock.price;
        this.buyFormVisible = true;
      },
      detail(name){
        let params = {
          params:{
            name:name
          }
        };
        PORTFOLIO.getStockDetail(params)
          .then(rep => {
            if(PREDICTION.httpSuccess(rep)){
              this.detailFormVisible = true;
            }
          })
      },
      submitBuyForm(){
        let params = new URLSearchParams();
        params.append('name', this.form.name);
        params.append('qty', this.form.qty);
        PORTFOLIO.buy(params)
          .then(rep => {
            if(PREDICTION.httpSuccess(rep)){
              this.$message.success("success")
            }
            else{
              this.$message.error(rep.message)
            }
            this.buyFormVisible = false;
          })
      },
      handleCurrentChange(page) {
        this.getStocks(this.size * (page - 1));
      },
      render() {
        var data = [{
          year: '1991',
          value: 3
        }, {
          year: '1992',
          value: 4
        }, {
          year: '1993',
          value: 3.5
        }];
        const chart = new G2.Chart({
          container: 'c1',
          width: 500,
          height: 200
        });
        chart.source(data);
        chart.scale('value', {
          min: 0
        });
        chart.scale('year', {
          range: [0, 1]
        });
        chart.tooltip({
          crosshairs: {
            type: 'line'
          }
        });
        chart.line().position('year*value').shape('smooth');
//        chart.point().position('year*value').size(4).shape('circle').style({
//          stroke: '#fff',
//          lineWidth: 1
//        });
        chart.render();
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrapper{
    .search{
      margin: 15px 0 15px 0;
      width: 400px;
    }
  }
  .page-container {
    width: 1100px;
    margin-top: 30px;
    display: flex;
    .amount {
      display: inline-block;
    }
    .pagination {
      margin-left: auto;
    }
  }
</style>
