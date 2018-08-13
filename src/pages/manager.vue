<template>
  <div class="wrapper">
    <div class="btn-group">
      <el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </div>

    <el-dialog title="New Manager" :visible.sync="dialogFormVisible">
      <el-form :model="managerForm">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="managerForm.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">OK</el-button>
      </div>
    </el-dialog>

    <el-table
      :data="managers"
      style="width: 95%"
      :default-sort = "{ prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="date"
        label="date"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="name"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="address"
        :formatter="formatter">
      </el-table-column>
      <el-table-column label="operate">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleView(scope.$index, scope.row)">More</el-button>
          <el-button size="mini">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-tag class="amount">total page: {{ pageSize }} , total data: {{ total }} </el-tag>
      <el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :total="pageNum" class="pagination"></el-pagination>
    </div>
  </div>
</template>

<script>
  import MANAGER from '../api/user'
  import PREDICTION from '../util/prediction'
  export default {
    data() {
      return {
        managerForm:{
          name:'',

        },
        managers:[
          {
            date: '2016-05-02',
            name: 'Tom',
            address: 'New York'
          }
        ],
        total:200,
        pageNum:3,
        pageSize:8,
        dialogFormVisible:false,
        formLabelWidth:120
      }
    },
    methods:{
      formatter(row, column) {
        return row.address;
      },
      handleCurrentChange(page) {
        this.getManagers(this.size * (page - 1));
      },
      createManager(manager){

      },
      getManagers(from = 0) {
        let params = {
          from:from,
          size:this.pageSize
        };
        MANAGER.getManagers(params)
          .then(rep => {
            if (PREDICTION.httpSuccess(rep)){
              let data = rep.data;
              this.managers = data.data;
              this.total = data.total;
              this.pageNum = data.total / this.size * 10;
            }
          })
      }
    },
    mounted(){
      this.getManagers();
    }
  }
</script>

<style scoped lang="scss">
  .wrapper{
    .btn-group{
      display: flex;
      justify-content: flex-start;
      margin: 20px;
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
