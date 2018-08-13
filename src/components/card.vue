<template>
  <div class="wrapper">
    <div class="left">
      <i :class="iconClass"></i>
    </div>
    <div class="right">
      <p class="card-name" align="left">{{ cardName }}</p>
      <div class="data-wrapper">
        <span class="amount">{{ amount }}</span>
        <i class="arrow" :class="arrowIcon"></i>
      </div>
      <p class="des up" align="left">{{ des }}</p>
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
      amount:Number,
      des:String,
      iconClass:{
        type: String,
        default:"discover-icon"
      },
      arrowIcon: {
        type: String,
        default:"arrow-up up"
      }
    }
  }
</script>

<style scoped lang="scss">
  $icon-h: 18px;
  $icon-w: 18px;
  .wrapper {
    display: flex;
    .left{
      margin: auto auto;
    }
    .right{
      margin-right: auto;
    }
    .card-name{
      color: #b6b6b6;
      font-size: 10px;
      margin: 0 auto;
    }
    .data-wrapper{
      display: flex;
      .amount{
        font-size: 40px;
        font-weight: 100;
        margin: 0 auto;
      }
      .arrow{
        margin-right: auto;
      }
    }
    .des{
      margin: 0 auto;
      font-size: 6px;
      font-weight: bold;
    }
    .up {
      color: #ff916e;
    }
    .drop {
      color: #10c7b1;
    }
    .discover-icon {
      background-image: url("../assets/svg/discover.svg");
      background-size: $icon-w $icon-h;
      width: $icon-w;
      height:$icon-h;
      display: inline-block;
      margin: 0 15px 0 4px;
    }
    .arrow-up{
      background-image: url("../assets/svg/up.svg");
      @extend .discover-icon
    }
    .arrow-down{
      background-image: url("../assets/svg/drop.svg");
      @extend .discover-icon
    }
  }
</style>
