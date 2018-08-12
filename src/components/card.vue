<template>
  <div class="wrapper">
    <i :class="iconClass"></i>
    <div>
      <h class="card-name">{{ cardName }}</h>
      <div>
        <span class="amount">{{ amount }}</span>
        <i class="arrow-icon"></i>
      </div>
      <p class="des" :class="">{{ des }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props:{
      cardName:String,
      amount:String,
      des:String,
      iconClass:String
    }
  }
</script>

<style scoped lang="scss">
  .wrapper {

    .card-name{
      color: #b6b6b6;
      font-size: 10px;
    }
    .amount{
      font-size: 40px;
    }
    .up {
      color: #10c7b1;
    }
    .drop {
      color: #ff916e;
    }
  }
</style>
