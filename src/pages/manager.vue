<template>
  <div class="wrapper">
    <div class="btn-group">
      <el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle @click="editable = ! editable"></el-button>
      <el-button type="danger" icon="el-icon-delete" circle v-if="editable"></el-button>
    </div>

    <el-dialog title="New Manager" :visible.sync="dialogFormVisible">
      <el-form :model="managerForm" lable-width="80px">
        <el-form-item label="Name" :lable-width="formLabelWidth">
          <el-input v-model="managerForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Contact" :label-width="formLabelWidth">
          <el-input v-model="managerForm.contact" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Submit</el-button>
      </div>
    </el-dialog>

    <el-table
      @selection-change="handleSelectionChange"
      class = "manager-form"
      :data="managers"
      style="width: 95%"
      :default-sort = "{ prop: 'date', order: 'descending'}"
      align="left">
      <el-table-column
        type="selection"
        width="55"
        v-if="editable">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        sortable>
      </el-table-column>
      <el-table-column
        prop="date"
        label="Date"
        sortable>
      </el-table-column>
      <el-table-column
        prop="contact"
        label="Contact">
      </el-table-column>
      <el-table-column label="Operate">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleView(scope.$index, scope.row)">More</el-button>
          <el-button size="mini" v-if="editable">Edit</el-button>
          <el-button size="mini" type="danger" v-if="editable">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Manager Detail" :visible.sync="managerDetailVisible">
      <el-form :model="managerForm" lable-width="80px">
        <el-form-item label="Name" :lable-width="formLabelWidth">
          <el-input v-model="managerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Contact" :label-width="formLabelWidth">
          <el-input v-model="managerForm.contact"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="managerDetailVisible = false">Close</el-button>
      </div>
    </el-dialog>

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
          contact:null
        },
        manager:{},
        managers:[],
        total:200,
        pageNum:3,
        pageSize:8,
        dialogFormVisible:false,
        managerDetailVisible:false,
        editable:false,
        formLabelWidth:120
      }
    },
    methods:{
      handleCurrentChange(page) {
        this.getManagers(this.size * (page - 1));
      },
      handleView(index, row) {
        this.managerDetailVisible = true;
        let manager = this.managers[index];
      },
      handleSelectionChange(){

      },
      createManager(){
        let params = new URLSearchParams();
        params.append('name', this.managerForm.name);
        params.append('contact', this.managerForm.contact);
        MANAGER.createManager(params)
          .then(rep => {
            if (PREDICTION.httpSuccess(rep)){
              this.$message.success(rep.data.msg)
            }
          })
      },
      removeManager(id){
        MANAGER.removeManager(id)
          .then(rep => {
            if (PREDICTION.httpSuccess(rep)){
              this.$message.success(rep.data.msg)
            }
          })
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
    /*.manager-form{*/
      /*display: flex;*/
      /*align-items: flex-start;*/
    /*}*/
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
