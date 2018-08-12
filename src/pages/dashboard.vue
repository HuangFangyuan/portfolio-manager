<template>
  <div class="wrapper">
    <p class="dashboard" align="left">Dashboard</p>
    <div class="card-list">
      <Card class="card" cardName="Average Rate" amount="99.6" des="+0.6%" iconClass="discover-icon" ></Card>
      <Card class="card" cardName="Average Rate" amount="99.6" des="+0.6%" iconClass="discover-icon" ></Card>
      <Card class="card" cardName="Average Rate" amount="99.6" des="+0.6%" iconClass="discover-icon" ></Card>
      <Card class="card" cardName="Average Rate" amount="99.6" des="+0.6%" iconClass="discover-icon" ></Card>
    </div>

    <div>
      <div>

      </div>
      <div>

      </div>
    </div>

    <div>
      <div>

      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
  import Card from '../components/card.vue'
  export default {
    data() {
      return {

      }
    },
    components:{
      Card
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper{
    .dashboard{
      font-weight: bold;
    }
    .card-list{
      border: 1px solid grey;
      border-radius: 5px;
      display: flex;
      padding: 10px 30px;
      margin-right: 20px;
      .card {
        margin-right: 200px;
      }
    }
  }
</style>
