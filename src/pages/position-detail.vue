<template>
  <div class="wrapper-2">
    <div class="performance">
      <div class="top-bar">
        <!--<el-input size="mini" class="input" v-model="input" placeholder="Input Stock" style="width: 110px"></el-input>-->
        <div class="time-picker block">
        <el-date-picker
        size="mini"
        v-model="date"
        type="daterange"
        range-separator="To"
        start-placeholder="Start Date"
        end-placeholder="End Date">
        </el-date-picker>
        </div>
      </div>
      <div>
        <div id="c1"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import G2 from '@antv/g2';
  import PORTFOLIO from '../api/portfolio'
  import PREDICTION from '../util/prediction'
  export default {
    props:{
      itemType:String,
      itemName:String
    },
    data() {
      return {
        date:''
      }
    },
    watch:{
      date(){
        // console.log(this.$moment(this.date[0]).format('YYYY/MM/DD')),
        //   console.log(this.$moment(this.date[1]).format('YYYY/MM/DD'))
        this.getPerformance();
      },
    },
    methods:{
      render(data){
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
        chart.render();
      },
      getPerformance(){
        let params = {
          params:{
            startDate:this.$moment(this.date[0]).format('YYYY/MM/DD'),
            endDate:this.$moment(this.date[1]).format('YYYY/MM/DD')
          }
        };
        PORTFOLIO.getPerformance(this.itemType, this.itemName, params)
          .then( rep => {
            if(PREDICTION.httpSuccess(rep)){
              let _data = [];
              let date =  this.$moment(this.startDate, "YYYY/MM/DD");
              for(let i = 0; i < rep.data.length; i++){
                if (rep.data[i] > highest) highest = rep.data[i];
                if (rep.data[i] < lowest) lowest = rep.data[i];
                _data.push({
                  day: this.$moment(date.add(1, 'day')).format("YYYY/MM/DD"),
                  value: rep.data[i]
                } )
              }
              this.render(_data);
            }
          });
      },
    },
    mounted(){
      // this.render();
      this.getPerformance();
    }
  }
</script>

<style scoped lang="scss">
  .common{
    border: 1px solid #ececee;
    background-color: white;
    /*margin-right: 20px;*/
  }
  .wrapper-2{
    display: flex;
    /*margin-top: 10px;*/
    .performance {
      @extend .common;
      display: block;
      width: 600px;
      height: 200px;
      padding: 50px 20px;
      .top-bar {
        display: flex;
        align-items: center;
        .time-picker{
          margin-left: auto;
        }
      }
    }
  }
</style>
