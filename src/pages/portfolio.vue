<template>
  <div class="wrapper">
    <h3 align="left">Portfolio</h3>
    <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name"
      >
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
          <el-tag class="amount">total page: {{ item.pageSize }} , total data: {{ item.total }} </el-tag>
          <el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :total="item.pageNum" class="pagination"></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        editableTabsValue:'1',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content',
          total:200,
          pageNum:3,
        },{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content',
          total:200,
          pageNum:3,
        }],
        pageSize:8,
        tabIndex: 1
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
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrapper{
    background-color: white;
    width: 95%;
    height: 500px;

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
