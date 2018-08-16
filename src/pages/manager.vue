<template>
  <div class="wrapper">
    <div class="btn-group">
      <!--<el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true" circle></el-button>-->
      <i class="plus-icon" @click="dialogFormVisible = true"></i>
      <i class="edit-icon" @click="editable = ! editable"></i>
      <i class="delete-icon" v-if="editable"></i>
      <!--<el-button type="primary" icon="el-icon-edit" circle @click="editable = ! editable"></el-button>-->
      <!--<el-button type="danger" icon="el-icon-delete" circle v-if="editable"></el-button>-->
    </div>

    <el-dialog title="New Manager" :visible.sync="dialogFormVisible">
      <el-form :model="managerForm" lable-width="80px">
        <el-form-item label="Name" :lable-width="formLabelWidth">
          <el-input v-model="managerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input v-model="managerForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Re-enter Password" :label-width="formLabelWidth">
          <el-input v-model="managerForm.password2"  type="password"></el-input>
        </el-form-item>
        <el-form-item label="Contact" :label-width="formLabelWidth">
          <el-input v-model="managerForm.contact"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createManager">Submit</el-button>
      </div>
    </el-dialog>

    <div class="table-wrapper">
      <el-table
      @selection-change="handleSelectionChange"
      border
      stripe
      class = "manager-form"
      :data="managers"
      style="width: 95%"
      :default-sort = "{ prop: 'date', order: 'descending'}"
      align="left"
      >
      <el-table-column
        type="selection"
        width="55"
        v-if="editable">
      </el-table-column>
      <el-table-column
        prop="manager.userId"
        label="Id"
        :width="labelWidth"
        >
      </el-table-column>
      <el-table-column
        prop="manager.userName"
        label="Name"
        :width="labelWidth"
        >
      </el-table-column>
      <el-table-column
        prop="manager.tel"
        label="Contact"
        :width="labelWidth">
      </el-table-column>
      <el-table-column
        prop="initValue"
        label="Init Value"
        :width="labelWidth"
        >
      </el-table-column>
      <el-table-column
        prop="currentValue"
        label="Cur Value"
        :width="labelWidth"
        >
      </el-table-column>
      <el-table-column
        prop="percent"
        label="Performance"
        :width="labelWidth">
      </el-table-column>
      <el-table-column label="Operate">
        <template slot-scope="scope">
          <!--<el-button size="mini" @click="handleView(scope.row)">More</el-button>-->
          <el-button size="mini" v-if="editable" @click="editManager(row)">Edit</el-button>
          <el-button size="mini" type="danger" v-if="editable" @click="deleteManager">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>

    <el-dialog title="Edit Manager" :visible.sync="managerEditVisible">
      <el-form :model="managerForm" lable-width="80px">
        <el-form-item label="Id" :lable-width="formLabelWidth">
          <el-input v-model="managerForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="Name" :lable-width="formLabelWidth">
          <el-input v-model="managerForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input v-model="managerForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Re-enter Password" :label-width="formLabelWidth">
          <el-input v-model="managerForm.password2"  type="password"></el-input>
        </el-form-item>
        <el-form-item label="Tel" :label-width="formLabelWidth">
          <el-input v-model="managerForm.tel"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="managerEditVisible = false">Close</el-button>
      </div>
    </el-dialog>

    <div class="page-container">
      <el-tag class="amount">Page size: {{ pageSize }} , Total data: {{ total }} </el-tag>
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
          id:null,
          name:'',
          password:'',
          password2:'',
          contact:null
        },
        manager:{},
        managers:[],
        total:0,
        pageNum:0,
        pageSize:4,
        dialogFormVisible:false,
        managerEditVisible:false,
        editable:false,
        labelWidth:"150",
        formLabelWidth:"120",
//        order_type:'user_id',
//        sequence:"AES"
      }
    },
    methods:{
      handleCurrentChange(page) {
        this.getManagers(this.pageSize * (page - 1));
      },
      handleView(row) {

      },
      handleSelectionChange(){

      },
      createManager(){
        if(this.managerForm.password !== this.managerForm.password2) {
          this.$message.error("Password is not the same");
          return;
        }
        let params = new URLSearchParams();
        params.append('name', this.managerForm.name);
        params.append('password', this.managerForm.password);
        params.append('tel', this.managerForm.contact);
        MANAGER.addManager(params)
          .then(rep => {
            if (PREDICTION.httpSuccess(rep)){
              this.$message.success(rep.message);
              this.getManagers();
            }
            this.dialogFormVisible = false;
          })
      },
      deleteManager(){
        MANAGER.removeManager(params)
          .then(rep => {
            if (PREDICTION.httpSuccess(rep)){
              this.$message.success(rep.message);
              this.getManagers();
            }
          })
      },
      editManager(row){
        this.manager.id = row.userId;
        this.manager.name = row.userName;
        this.manager.tel = row.tel;
        this.managerEditVisible = true;
      },
      modifyManager(){
        if(this.managerForm.password !== this.managerForm.password2) {
          this.$message.error("Password is not the same");
          return;
        }
        let params = new URLSearchParams();
        params.append('name', this.managerForm.name);
        params.append('password', this.managerForm.password);
        params.append('tel', this.managerForm.contact);
        MANAGER.modifyManager(params)
          .then(rep => {
            if (PREDICTION.httpSuccess(rep)){
              this.$message.success(rep.message);
              this.getManagers();
            }
            this.managerEditVisible = false;
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
          params:{
            from:from,
            size:this.pageSize,
//            order_type:this.order_type,
//            sequence:this.sequence
          }
        };
        MANAGER.getManagers(params)
          .then(rep => {
            if (PREDICTION.httpSuccess(rep)){
              this.managers = rep.data.managerPerformances;
              this.total = rep.data.size;
              this.pageNum = rep.data.size / this.pageSize * 10;
            }
          })
      },
//      handleSort(info){
//        if (info.prop === 'userId'){
//          this.order_type = 'user_id';
//        }
//        else if(info.prop === 'name') {
//          this.order_type = 'name';
//        }
//        else if(info.prop === 'initValue'){
//          this.order_type = 'init_value';
//        }
//        else if(info.prop === 'currentValue') {
//          this.order_type = 'current_value';
//        }
//        if (info.order === 'descending'){
//          this.sequence = "DESC";
//        }
//        else if(info.order === 'ascending') {
//          this.sequence = "ASC";
//        }
//        this.getManagers();
//      }
    },
    mounted(){
      this.getManagers();
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/common";
  .wrapper{
    .table-wrapper {
      height: 400px;
    }
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

  .plus-icon {
    $icon-h: 24px;
    $icon-w: 24px;
    background-image: url("../assets/svg/plus.svg");
    background-size: $icon-w $icon-h;
    width: $icon-w;
    height:$icon-h;
    display: inline-block;
    margin: 0 15px 0 4px;
  }

  .edit-icon {
    background-image: url("../assets/svg/edit.svg");
    @extend .plus-icon
  }

  .delete-icon {
    background-image: url("../assets/svg/delete.svg");
    @extend .plus-icon
  }

</style>
