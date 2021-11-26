<template>
<div v-if="isShowing" class="dashboard-panel">
    <n-grid x-gap="15" cols="1 900:2 1200:4">
    <n-gi>
       <n-card title="今日日期" hoverable  embedded :bordered="false" class="sinCard">
         <template #header-extra> {{todayDate}}</template>  
        </n-card>
    </n-gi>
    <n-gi>
       <n-card title="本月预算" hoverable embedded :bordered="false" class="sinCard" >
            <template #header-extra>4750元</template>

        </n-card>
    </n-gi>
    <n-gi>
       <n-card title="已用预算" hoverable embedded :bordered="false" class="sinCard">
         <template #header-extra> 3300元，剩余1450元</template>  
    </n-card>
    </n-gi>
    <n-gi>
       <n-card title="经济状态" hoverable embedded :bordered="false" class="sinCard">
         <template #header-extra> <span style="color:green;">健康</span></template>  
    </n-card>
    </n-gi>
  </n-grid>
<n-grid x-gap="15" cols="1 500:2 700:3 1200:4">
    <n-gi>
       <n-card title="可用资金" hoverable embedded :bordered="false" class="inCard">
            <span style="font-size:47px;">{{totalAvailableAmount}}</span>
            <template #footer> 七万五千元 </template>
        </n-card>
    </n-gi>
    <n-gi>
       <n-card title="月度支出" hoverable embedded :bordered="false" class="inCard" >
           <n-spin :show="isMonthlyViewStillLoading">
            <template #header-extra> 平均：{{this.monthlySpendingAve}}</template>
            <canvas id="monthly-average-bar-chart" height="130"></canvas>
            </n-spin>
        </n-card>
    </n-gi>
    <n-gi>
       <n-card title="未来还债日" hoverable embedded :bordered="false" class="inCard">
<n-scrollbar style="max-height: 160px;">
    <n-timeline>
      <n-timeline-item content="今天" />
      <n-timeline-item
        type="success"
        title="中国工商银行"
        time="2018-04-03 20:46"
      />
      <n-timeline-item type="error" content="哪里失败" time="2018-04-03 20:46" />
       <n-timeline-item type="error" content="哪里失败2" time="2017-04-03 20:46" />

    </n-timeline>
</n-scrollbar>
        </n-card>
    </n-gi>
    <n-gi>
       <n-card title="攒钱计划" hoverable embedded :bordered="false" class="inCard">
            <template #header-extra>  </template>
            <n-scrollbar style="max-height: 140px;">
              <n-card title="买车">
                    <template #header-extra> 2000/340000 </template>

                </n-card>  
              <n-card title="买电脑">
                    <template #header-extra> 2000/15000 </template>

                </n-card> 
              <n-card title="买咖啡机">
                    <template #header-extra> 90/1200 </template>
                </n-card> 
              <n-card title="买鱼豆腐">
                    <template #header-extra> 30/30 </template>
                </n-card> 
            </n-scrollbar>       
        </n-card>
    </n-gi>
  </n-grid>
  <n-grid x-gap="15" cols="1 600:1 800:2">
    <n-gi>
       <n-card title="消费走势 " hoverable embedded :bordered="false" class="linCard">
       <n-spin :show="isTrendViewStillLoading">
       <canvas id="transaction-view" height="90" ></canvas>    
       </n-spin>
      </n-card>
    </n-gi>
    <n-gi>
       <n-card title="30流水" hoverable embedded :bordered="false" class="linCard" >
          <n-spin :show="isTranscationTableStillLoading">
           <n-scrollbar style="max-height: 180px;">
            <n-table :bordered="false" :single-line="false">
                <thead>
                <tr>
                    <th>日期</th>
                    <th>金额</th>
                    <th>类型</th>
                    <th>账户</th>
                    <th>备注</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="records in nTrnsactionRecord" :key=records.id >
                    <td>{{records.date}}</td>
                    <td>{{records.amount}}</td>
                    <td>{{records.type}}</td>
                    <td>{{records.account}}</td>
                    <td>{{records.note}}</td>
                </tr>

                </tbody>
            </n-table>
           </n-scrollbar>
          </n-spin>
        </n-card>
    </n-gi>
  </n-grid>

  <!-- <n-drawer v-model:show="active" :width="502" :placement="placement">
    <n-drawer-content title="斯通纳">
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
    </n-drawer-content>
  </n-drawer> -->
  
  <!-- <footer>
      <span class="footer-info">Developed and designed by <a href="https://github.com/FortyIX">@FortyIX</a> with ❤</span>
  </footer> -->
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import {NGrid,NGi,NCard,NScrollbar,NTable,NTimeline,NTimelineItem,NSpin} from 'naive-ui'
import Chart from 'chart.js/auto';
import * as echarts from 'echarts';
import { ref } from 'vue';
import bus from '../bus'
import {useRouter} from 'vue-router'
import axios from 'axios';

export default defineComponent({
  components:{
     NGrid,NGi,NCard,NScrollbar,NTable,NTimeline,NTimelineItem,NSpin
  },
  name: 'Dashboard',
  data(){

    const isMonthlyViewStillLoading = true;
    const isTrendViewStillLoading = true;
    const isTranscationTableStillLoading = true;

    const parsedHalfMonthTrend : Array<number> = []
    const parsedMonthTrend : Array<number> =[]
    const nTrnsactionRecord : any = [];
    const monthlySpendingAve = 0;
    return {
        parsedHalfMonthTrend,
        parsedMonthTrend,
        monthlySpendingAve, 
        nTrnsactionRecord,
        isMonthlyViewStillLoading,
        isTrendViewStillLoading,
        isTranscationTableStillLoading
    }
  },
  methods : {

       setUpMonthlySpendAverageBarChart() : void {
          
          var data = [3000,3000,4200,3000,5010,5000];
          var label = ['1','2','3','4','5','6','7','8','9','10','11','12']
          const ctx : any = document.getElementById('monthly-average-bar-chart');
          const myChart = new Chart(ctx, {
                type: 'line',
                data: {labels: label,
            datasets: [{
                label: '信用卡',
                data: this.parsedMonthTrend,
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            // {
            //     label: '其他',
            //     data: [22, 10, 3, 44, 51, 2, 15],
            //     fill: true,
            //     borderColor: 'rgb(15, 102, 192)',
            //     tension: 0.1
            // }
            
            ]}});
      },

      setupOwnMoneyOverviewPolarChart() : void {
            const labels = [1,2,3,4,5,6,7]
            const data = {
            labels: labels,
            datasets: [{
                label: '信用卡',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: '其他',
                data: [22, 10, 3, 44, 51, 2, 15],
                fill: true,
                borderColor: 'rgb(15, 102, 192)',
                tension: 0.1
            }
            
            ]
            };
          const ctx : any = document.getElementById('own-money-overview');
          const myChart = new Chart(ctx, {
              type:'bar',
              data:data
          })
      },
      setUpTransactionRecord() : void {
            const labels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
            const data = {
            labels: labels,
            datasets: [{
                label: '网银交易',
                data: this.parsedHalfMonthTrend,
                fill: true,
                borderColor: 'rgb(75, 192, 34)',
                tension: 0.1
            },          
            ]
            };
          const ctx : any = document.getElementById('transaction-view');
          const myChart = new Chart(ctx, {
              type:'line',
              data:data
          })
      },

      getTrends() : void {
      axios.get('http://localhost:3990/stats/trends').then((res : any) => {
         var parsedDataForHalfMonth = JSON.parse(res.data.trends[0].day);
         this.parsedHalfMonthTrend = [];
         this.parsedHalfMonthTrend = Object.values(parsedDataForHalfMonth );
         this.setUpTransactionRecord();

         var parsedDataForMonth = JSON.parse(res.data.trends[0].month);
         this.parsedMonthTrend = [];
         this.parsedMonthTrend = Object.values(parsedDataForMonth);
         
         var sum = 0;
         this.parsedMonthTrend.forEach(ele => {
              var num = ele;
              sum += parseInt(String(num));
         });
      
         this.monthlySpendingAve = sum / (this.parsedMonthTrend.length );
         
         
        this.isMonthlyViewStillLoading = false;
         this.isTrendViewStillLoading = false;
         this.setUpMonthlySpendAverageBarChart();

      })
     },
     getTransactionOnDashboard():void {
       
       
       axios.get('http://localhost:3990/transactions/query').then((res : any) => {
          res.data.transactions.forEach((entry : any) => {
           this.nTrnsactionRecord.push(               
            {
                key: entry.id,
                date: entry.date,
                amount: entry.amount,
                type: entry.type,
                account:entry.account ,
                user:entry.user,
                note:entry.note
            }
           );
            this.isTranscationTableStillLoading = false;
         })
       })
     }
     


  },
  mounted(){
      this.getTrends();
      this.getTransactionOnDashboard();



      
    //   bus.on('activate_bottom_operation_menu',()=>{
    //       this.activate('bottom')
    //   })


  },
  setup(){
    const isShowing = ref(false);
    const router = useRouter();
    const totalAvailableAmount = ref(0)
    const todayDate = ref("");


    if(document.cookie.split('=')[1] == "LOGOUT_STATUS_00112312"){
      router.push('/login');
    }
    else{
      isShowing.value = true;
    }

    const getTotalAmount = ():void => {
       axios.get('http://localhost:3990/bankAccount/query').then((res : any) =>{
          var amount = 0;
          res.data.bank_account.forEach(account => {
            amount += parseInt(account.balance)
          })
          totalAvailableAmount.value = amount
       })
    }



    var date = new Date();
    todayDate.value = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

    getTotalAmount();
    
   
    const active = ref(false)
    const placement = ref('right')  
    const activate = (place:any) => {
      active.value = true
      placement.value = place
    }
    
    return {
      active:active,
      placement:placement,
      activate:activate,
      totalAvailableAmount,
      todayDate,
      isShowing

    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.dashboard-panel{
    height: 100%;
    width: 98%;
    margin-top: 10px;
    margin-left: 5px;
    margin-right:5px;
}

.inCard{
   height: 260px;
   margin-top:14px;
}

.sinCard{
   height: 60px;
   margin-top:14px;
}

.linCard{
   height: 290px;
   margin-top:14px;
}

.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}

.footer-info{
    
    position: relative;
    top:20px;

}

.saving-info{
    overflow-y: scroll;
}
</style>
