<template>
  <div class="wrapper">
    <h3 class="title" align="left">Portfolio</h3>
    <el-table
      class="portfolio-table"
      border
      :data="portfolios"
      style="width: 95%"
      :default-sort = "{ prop: 'name', order: 'descending'}"
      align="left"
    >
      <el-table-column
        prop="name"
        label="Name"
        sortable
        :width="labelWidth">
      </el-table-column>
      <el-table-column
        prop="date"
        label="Date"
        sortable
        :width="labelWidth">
      </el-table-column>
      <el-table-column
        prop="cash"
        label="Cash"
        :width="labelWidth">
      </el-table-column>
      <el-table-column label="Operate">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleView(scope.$index, scope.row)">Detail</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        portfolios:[
          {
            id:1,
            name:'111'
          },{
            id:2,
            name:'222'
          },{
            id:3,
            name:'333'
          }
        ],
        total:200,
        pageNum:3,
        buyFormVisible:false,
        sellFormVisible:false,
        pageSize:8,
        tabIndex: 1,
        labelWidth:"150",
        formLabelWidth:"120"
      }
    },
    methods:{
      handleCurrentChange(page) {
        this.getManagers(this.size * (page - 1));
      },
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      },
      handleView(){

      },
      buy(id){
        PORTFOLIO.getPositionDetail(id)
          .then(rep => {
            if(PREDICTION.httpSuccess(rep)){
              this.form = rep.data;
              this.sellFormVisible = true;
            }
          })
      },
      submitBuyForm(){
        let params = new URLSearchParams();
        params.append('name', this.form.name);
        params.append('qty', this.form.qty);
        params.append('price', this.form.price);
        PORTFOLIO.buy(params)
          .then(rep => {
            if(PREDICTION.httpSuccess(rep)){
              this.$message.success("success")
            }
            this.buyFormVisible = false;
          })
      },
      sell(id){
        PORTFOLIO.getPositionDetail(id)
          .then(rep => {
            if(PREDICTION.httpSuccess(rep)){
              this.form = rep.data;
              this.sellFormVisible = true;
            }
          })
      },
      submitSellForm(){
        let params = new URLSearchParams();
        params.append('name', this.form.name);
        params.append('qty', this.form.qty);
        params.append('price', this.form.price);
        PORTFOLIO.sell(params)
          .then(rep => {
            if(PREDICTION.httpSuccess(rep)){
              this.$message.success("success")
            }
            this.sellFormVisible = false;
          })
      },
      linkToBuyPage(){
        this.$router.push('/main/stock');
      },
      displayPortfolio(id) {
        PORTFOLIO.getPortfolio(id)
          .then(rep => {
//            if( PREDICTION.httpSuccess(rep)){
              let data = rep.data;
              this.editableTabs.push({
                id: data.id,
                title: 'Tab ' + data.id,
//                name: data.id + '',
                name:'1',
                positions: data.positions,
                total:data.total,
                pageNum:data.total / this.pageSize * 10,
              });
//            }
          });
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrapper{
    background-color: white;
    width: 99%;
    /*height: 580px;*/
    .title {
      margin: 20px 0 10px 20px;
    }
    .portfolio-table {
      margin: 20px;
    }
    .btn-group{
      display: flex;
      justify-content: flex-start;
      margin: 5px 0 10px 0 ;
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
  }
</style>
