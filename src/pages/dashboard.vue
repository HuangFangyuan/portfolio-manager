<template>
  <div class="wrapper">
    <p class="dashboard" align="left">Dashboard</p>
    <div class="card-list">
      <Card class="card" cardName="Average Rate" :amount="99.6" des="+0.6%" iconClass="discover-icon" ></Card>
      <Card class="card" cardName="Average Rate" :amount="99.6" des="+0.6%" iconClass="discover-icon" ></Card>
      <Card class="card" cardName="Average Rate" :amount="99.6" des="+0.6%" iconClass="discover-icon" ></Card>
      <Card class="card" cardName="Average Rate" :amount="99.6" des="+0.6%" iconClass="discover-icon" ></Card>
    </div>

    <div class="wrapper-2">
      <div class="performance">
        <div>
          <p class="title" align="left">Performance</p>
          <!--<el-date-picker-->
            <!--v-model="date"-->
            <!--type="date"-->
            <!--placeholder="pick date">-->
          <!--</el-date-picker>-->
        </div>
        <div>
          <div id="c1"></div>
        </div>
      </div>
      <div class="failure-rate">
        <p class="title" align="left">Failure Rate</p>
        <div>
          <div>
            <div id="c2"></div>
          </div>
          <div>

          </div>
        </div>

      </div>
    </div>

    <div class="wrapper-3">
      <div class="manager">
        <p class="title" align="left">Activity</p>
        <activity message1="11111" message2="11111" message3="11111" message4="11111"></activity>
        <activity message1="11111" message2="11111" message3="11111" message4="11111"></activity>
      </div>
      <div class="rank">
        <p class="title" align="left">Rank</p>
        <bar class="bar" :number=1 :percentage=87 name="Tom"></bar>
        <bar class="bar" :number=2 :percentage=87 name="Bob"></bar>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from '../components/card.vue'
  import Bar from '../components/bar.vue'
  import Activity from '../components/activity.vue'
  import G2 from '@antv/g2';
  export default {
    data() {
      return {
        date:''
      }
    },
    methods:{
      render(){
      var data = [{
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
      }];
        const chart = new G2.Chart({
          container: 'c1',
          width: 500,
          height: 200
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
      }
    },
    components:{
      Card,
      Bar,
      Activity
    },
    mounted(){
      this.render();
      this.render2()
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper{
    .dashboard{
      font-weight: bold;
    }
    .card-list{
      border: 1px solid #ececee;
      background-color: white;
      display: flex;
      padding: 5px 30px;
      margin-right: 20px;
      .card {
        margin: 10px 100px 10px 10px;
      }
    }
    .wrapper-2{
      display: flex;
      margin-top: 10px;
      .performance {
        @extend .card-list;
        display: block;
        width: 550px;
        height: 200px;
      }
      .failure-rate {
        width: 450px;
        @extend .performance;
      }
    }
    .wrapper-3{
      margin-top: 10px;
      display: flex;
      .manager{
        @extend .card-list;
        display: block;
        width: 550px;
        height: 180px;
      }
      .rank{
        @extend .manager;
        width: 450px;
        .bar{
          margin-bottom: 20px;
        }
      }
    }
    .title{
      font-weight: bold;
    }
  }
</style>
