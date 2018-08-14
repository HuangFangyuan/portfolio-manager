<template>
<div>
  <div class="btn-group">
    <el-button type="success" icon="el-icon-plus" circle @click="linkToBuyPage"></el-button>
  </div>
  <el-table
    border
    :data="positions"
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
      prop="qty"
      label="Qty"
      :width="labelWidth">
    </el-table-column>
    <el-table-column
      prop="ini_price"
      label="Initial Price"
      :width="labelWidth">
    </el-table-column>
    <el-table-column
      prop="cur_price"
      label="Current Price"
      :width="labelWidth">
    </el-table-column>
    <el-table-column label="Operate">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleView(scope.$index, scope.row)">Detail</el-button>
        <el-button size="mini" type="success" @click="buy(scope.row.id)">Buy</el-button>
        <el-button size="mini" type="danger" @click="sell(scope.row.id)">Sell</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog align="left" title="Buy" :visible.sync="buyFormVisible">
    <el-form :model="form">
      <el-form-item label="Name" :label-width="formLabelWidth">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="price" :label-width="formLabelWidth">
        <el-input v-model="form.price" disabled></el-input>
      </el-form-item>
      <el-form-item label="Qty" :label-width="formLabelWidth">
        <el-input v-model="form.qty"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="buyFormVisible = false">Cancel</el-button>
      <el-button type="primary" @click="submitBuyForm">Confirm</el-button>
    </div>
  </el-dialog>

  <el-dialog align="left" title="Sell" :visible.sync="sellFormVisible">
    <el-form :model="form">
      <el-form-item label="Name" :label-width="formLabelWidth">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="Price" :label-width="formLabelWidth">
        <el-input v-model="form.price" disabled></el-input>
      </el-form-item>
      <el-form-item label="Qty" :label-width="formLabelWidth">
        <el-input v-model="form.qty"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="sellFormVisible = false">Cancel</el-button>
      <el-button type="primary" @click="submitSellForm">Confirm</el-button>
    </div>
  </el-dialog>

  <div class="page-container">
    <el-tag class="amount">page size : {{ pageSize }} , total data: {{ total }} </el-tag>
    <el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :total="pageNum" class="pagination"></el-pagination>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        positions: [
          {
            id:1,
            name:'APPLE',
            date:'2018-01-01',
            qty:500,
            cur_price:120,
            ini_price:110
          },
          {
            id:2,
            name:'FB',
            date:'2018-01-01',
            qty:500,
            cur_price:120,
            ini_price:110
          }],
        form:{
          name:'111',
          price:111,
          qty:null
        },
        total:200,
        pageNum:3,
        labelWidth:"150",
        formLabelWidth:"120"
      }
    }
  }
</script>

<style scoped>

</style>
