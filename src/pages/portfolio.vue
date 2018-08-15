<template>
  <div class="wrapper">
    <h3 class="title" align="left">Portfolio</h3>

    <div class="btn-group">
      <el-button type="success" icon="el-icon-plus" circle @click="createFormVisible = true"></el-button>
    </div>

    <div class="table-wrapper">
      <el-table
        class="portfolio-table"
        border
        stripe
        :data="portfolios"
        style="width: 95%"
        :default-sort = "{ prop: 'name', order: 'descending'}"
        align="left"
      >
        <el-table-column
          prop="portId"
          label="ID"
          sortable
          :width="labelWidth">
        </el-table-column>
        <el-table-column
          prop="portName"
          label="Name"
          sortable
          :width="labelWidth">
        </el-table-column>
        <el-table-column
          prop="portDate"
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
            <el-button size="mini" @click="linkToPositionPage(scope.row.portId)">Detail</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog align="left" title="New Portfolio" :visible.sync="createFormVisible">
      <el-form :model="newPortfolio">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="newPortfolio.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Initial Cash" :label-width="formLabelWidth">
          <el-input v-model="newPortfolio.cash" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addPortfolio">Confirm</el-button>
      </div>
    </el-dialog>

    <div class="page-container">
      <el-tag class="amount">Page size : {{ pageSize }} , Total data: {{ total }} </el-tag>
      <el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :total="pageNum" class="pagination"></el-pagination>
    </div>
  </div>
</template>

<script>
  import PORTFOLIO from '../api/portfolio'
  import PREDICTION from '../util/prediction'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        portfolios:[],
        newPortfolio:{
          name:'',
          cash:null
        },
        total:200,
        pageNum:3,
        createFormVisible:false,
        pageSize:4,
        tabIndex: 1,
        labelWidth:"200",
        formLabelWidth:"120"
      }
    },
    computed:mapState(['userId']),
    methods:{
      handleCurrentChange(page) {
        this.getPortfolios(this.pageSize * (page - 1));
      },
      getPortfolios(from = 0){
        let params = {
          params:{
            from:from,
            size:this.pageSize
          }
        };
        PORTFOLIO.getPortfolios(this.userId, params)
          .then(rep => {
            if(PREDICTION.httpSuccess(rep)) {
              this.total = rep.data.size;
              this.pageNum = rep.data.size / this.pageSize * 10;
              this.portfolios = rep.data.portfolios;
            }
            else {
              this.$message.error(rep.message);
            }
          })
      },
      addPortfolio(){
        let params = new URLSearchParams();
        params.append('name', this.newPortfolio.name);
        params.append('cash', this.newPortfolio.cash);
        params.append('managerID', this.userId);
        PORTFOLIO.addPortfolio(params)
          .then(rep => {
            if(PREDICTION.httpSuccess(rep)){
              this.$message.success("Add Successfully")
              this.getPortfolios();
            }
            this.createFormVisible = false;
          })
      },
      linkToPositionPage(portfolioId) {
        this.$router.push('/main/position/' + portfolioId);
      }
    },
    mounted(){
      this.getPortfolios();
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/common";
  .wrapper{
    background-color: white;
    width: 100%;
    /*height: 580px;*/
    .title {
    }
    .table-wrapper {
      height: 400px;
      .portfolio-table {
        margin: 20px;
      }
    }
    .btn-group{

    }
    .page-container {

    }
  }
</style>
