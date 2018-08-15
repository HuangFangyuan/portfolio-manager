<template>
  <div class="wrapper">
    <p class="dashboard">Dashboard</p>
    <!--<MyTitle title="Dashboard"></MyTitle>-->
    <div class="card-list">
      <Card v-for="i in indices" class="card" :cardName="i.indiciesName" :amount="i.price" :des="i.changeRate" :x="i.x"></Card>
    </div>

    <div class="wrapper-2">
      <div class="performance">
        <div class="top-bar">
          <p class="title" align="left">Performance</p>
          <el-input size="mini" class="input" v-model="input" placeholder="Input Stock" style="width: 110px"></el-input>
          <!--<div class="time-picker block">-->
            <!--<el-date-picker-->
              <!--size="mini"-->
              <!--v-model="value6"-->
              <!--type="daterange"-->
              <!--range-separator="To"-->
              <!--start-placeholder="Start Date"-->
              <!--end-placeholder="End Date">-->
            <!--</el-date-picker>-->
          <!--</div>-->
        </div>
        <div>
          <div id="c1"></div>
        </div>
        <div class="bottom">
          <div class="item">
            <p class="price"> {{ todayPrice }}</p>
            <p class="label">  Today </p>
          </div>
          <div class="item">
            <p class="price"> {{ yesterdayPrice }}</p>
            <p class="label">  Yesterday </p>
          </div>
        </div>
      </div>

      <div class="rank">
        <div class="top-bar">
          <p class="title" align="left">Rank</p>
          <p class="view-all" @click="">View All</p>
        </div>
        <bar class="bar" :number=1 :percentage=87 name="Tom"></bar>
        <bar class="bar" :number=2 :percentage=87 name="Bob"></bar>
      </div>
      <!--<div class="failure-rate">-->
      <!--<p class="title" align="left">Failure Rate</p>-->
      <!--<div>-->
      <!--<div>-->
      <!--<div id="c2"></div>-->
      <!--</div>-->
      <!--<div>-->

      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>

    <!--<div class="wrapper-3">-->
    <!--<div class="activity-wrapper">-->
    <!--<div class="top-bar">-->
    <!--<p class="title" align="left">Activity</p>-->
    <!--<p class="view-all" @click="">View All</p>-->
    <!--</div>-->
    <!--<activity message1="11111" message2="11111" message3="11111" message4="11111"></activity>-->
    <!--<activity message1="11111" message2="11111" message3="11111" message4="11111"></activity>-->
    <!--</div>-->
    <!--<div class="rank">-->
    <!--<div class="top-bar">-->
    <!--<p class="title" align="left">Rank</p>-->
    <!--<p class="view-all" @click="">View All</p>-->
    <!--</div>-->
    <!--<bar class="bar" :number=1 :percentage=87 name="Tom"></bar>-->
    <!--<bar class="bar" :number=2 :percentage=87 name="Bob"></bar>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Card from '../components/card.vue'
  import Bar from '../components/bar.vue'
  import Activity from '../components/activity.vue'
  import MyTitle from '../components/title.vue'
  import G2 from '@antv/g2';
  import PORTFOLIO from '../api/portfolio'
  import PREDICTION from '../util/prediction'
  export default {
    data() {
      return {
        date:'',
        indices:[],
        todayPrice:200,
        yesterdayPrice:300,

        stockName:'',
        startDate:new Date().getMilliseconds() - 7*24*60*60,
        endDate:new Date().getMilliseconds()
      }
    },
    watch:{
      stockName(){
        this.getPerformance();
      }
    },
    methods:{
      render(){
        var data = [
          {
            year: '1991',
            value: 3
          }, {
            year: '1992',
            value: 4
          }, {
            year: '1993',
            value: 3.5
          }, {
            year: '1994',
            value: 5
          }, {
            year: '1995',
            value: 4.9
          }
        ];
        const chart = new G2.Chart({
          container: 'c1',
          width: 500,
          height: 250
        });
        chart.source(data);
        chart.scale('value', {
          min: 0
        });
        chart.scale('year', {
          range: [0, 1]
        });
        chart.tooltip({
          crosshairs: {
            type: 'line'
          }
        });
        chart.line().position('year*value').shape('smooth');
//        chart.point().position('year*value').size(4).shape('circle').style({
//          stroke: '#fff',
//          lineWidth: 1
//        });
        chart.render();
      },
      render2(){
        var data = [{
          "term": "Zombieland",
          "count": 9
        }];
        var chart = new G2.Chart({
          container: 'c2',
          forceFit: true,
          height: 200,
          padding: [20, 80]
        });
        chart.source(data, {
          count: {
            max: 12
          }
        });
        chart.coord('theta', {
          innerRadius: 0.2,
          endAngle: Math.PI
        });
        chart.interval().position('term*count').color('#8543e0').shape('line').select(false).style({
          lineAppendWidth: 10
        }); // 线状柱状图
        chart.point().position('term*count').color('#8543e0').shape('circle');
        for (var i = 0, l = data.length; i < l; i++) {
          var obj = data[i];
          chart.guide().text({
            position: [obj.term, 0],
            content: obj.term + ' ',
            style: {
              textAlign: 'right'
            }
          });
        }
        chart.guide().text({
          position: ['50%', '50%'],
          content: 'Music',
          style: {
            textAlign: 'center',
            fontSize: 24,
            fill: '#8543e0'
          }
        });
        chart.render();
      },
      renderStockPerformance(data){
        var ctx = document.getElementById("chart");
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: options
        });
      },
      getIndices(){
        PORTFOLIO.getIndices()
          .then(rep => {
            if(PREDICTION.httpSuccess(rep)){
              this.indices = rep.data;
              console.log(this.indices)
            }
          })
          .catch(error =>{
            console.log(error)
          })
      },
      getPerformance(){
        let params = {
          params:{
            name:this.name,
            startDate:this.startDate,
            endDate:this.endDate
          }
        };
        PORTFOLIO.getPerformance(params)
          .then(rep => {
            if(PREDICTION.httpSuccess(rep)){

            }
          })
      }
    },
    components:{
      Card,
      Bar,
      Activity,
      MyTitle
    },
    mounted(){
      this.render();
      this.getIndices();
      this.getPerformance();
    }
  }
</script>

<style lang="scss" scoped>
  /*@import "../assets/css/common";*/
  .common{
    border: 1px solid #ececee;
    background-color: white;
    margin-right: 20px;
  }
  .wrapper{
    .dashboard{
      text-align: left;
      font-weight: bold;
    }
    .card-list{
      @extend .common;
      display: flex;
      padding: 5px 20px;
      height: 90px;
      .card {
        margin: 10px auto;
      }
    }

    .wrapper-2{
      display: flex;
      margin-top: 10px;
      .performance {
        @extend .common;
        display: block;
        width: 600px;
        height: 430px;
        padding: 0 20px;
        .top-bar {
          display: flex;
          align-items: center;
          .input {
            margin-left: auto;
          }
          .time-picker{
            margin-left: auto;
          }
        }
        .bottom{
          display: flex;
          justify-items: center;
          p {
            padding: 0;
            margin: 0;
          }
          .item{
            margin:0 auto;
            .price{
              font-size: 40px;
            }
            .label{
              color: #b6b6b6;
              font-size: 10px;
            }
          }
        }
      }
      .rank{
        @extend .performance;
        width: 450px;
        .bar{
          margin-bottom: 20px;
        }
        .top-bar{
          display: flex;
          justify-content: space-between;
          .view-all{
            color: #729bc4;
          }
        }
      }
    }
    /*
      .activity-wrapper{
        @extend .common;
        padding: 0 20px;
        display: block;
        width: 550px;
        height: 180px;
        .top-bar{
          display: flex;
          justify-content: space-between;
          .view-all{
            color: #729bc4;
          }
        }
      }
      */
    .title{
      font-weight: bold;
    }
  }
</style>
