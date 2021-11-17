<template>
  <div class="opt-panel">
<n-grid x-gap="15" cols="1 700:2">
    <n-gi>
       <n-card title="操作" hoverable embedded :bordered="false" class="inCard spend-card">
                    <n-radio-group v-model:value="type" name="typeOfOperationSelect" style="width:100%; margin-bottom:20px;">
                      <n-radio-button
                        style="width:25%"
                        v-for="type in typeOfOperations"
                        :key="type.value"
                        :value="type.value" 
                      >
                        <span style="text-align:center;">{{type.label }}</span>
                      </n-radio-button>
                    </n-radio-group>
                <span>金额</span>
                <n-input-number size="large" class="spend_input" v-model:value="amount">
                    <template #prefix>￥</template>
                </n-input-number>
                <span>账户</span>
                <n-select class="input-element" v-model:value="account" :options="account_options" placeholder="选择账户" />
                <span>时间</span>
                <n-date-picker class="input-element" v-model:value="time_stamp" type="date" clearable/>
                <span>备注</span>
                <n-input class="input-element" v-model:value="note" type="text" placeholder="备注" />
                <n-button @click="submitTransaction" style="width:100%;">记录</n-button>

        </n-card>
    </n-gi>
    <n-gi>
       <n-card title="计划检查" hoverable embedded :bordered="false" class="inCard" >
            <ul>
              <li style="color:green;">此笔消费过后您仍没有超过消费上限</li>
              <li style="color:green;">此笔还款过后您将还完所有债款</li>
              <li style="color:green;">此笔存钱过后您将完成您所选中的存钱计划</li>
              <li style="color:orange;">此笔消费过后您将剩余小于10%的消费预算</li>
              <li style="color:red;">此行为将导致您超过本月预算</li>
            </ul>
            
        </n-card>
    </n-gi>
    <!-- <n-gi>
       <n-card title="存钱" hoverable embedded :bordered="false" class="inCard">

        </n-card>
    </n-gi>
    <n-gi>
       <n-card title="还债" hoverable embedded :bordered="false" class="inCard">
            
       </n-card>
    </n-gi> -->
  </n-grid>
  </div>

</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import {NGrid,NGi,NCard,NInputNumber,NSelect,NDatePicker,NInput,NButton,NRadioButton,NRadioGroup, useMessage} from 'naive-ui'
import { ref } from 'vue';
import axios from 'axios';
import qs from 'qs';


export default defineComponent({
  components:{
    NGrid,NGi,NCard,NInputNumber,NSelect,NDatePicker,NInput,NButton,NRadioGroup,NRadioButton
  },
  name: 'OperationPage',
  setup(){


    const messager = useMessage();
    let amount = ref(0);
    let type=ref("消费")
    let account = ref(null);
    let account_options =[
        {
          label: "中国招商银行",
          value: "中国招商银行",
        }]
    
    var date = new Date();
    
    let time_stamp = ref(date.getTime());

    let note = ref(" ")

    let  typeOfOperations = [
        {
          label: "消费",
          value: "消费"
        },
        {
          label: '收入',
          value: '收入'
        },
        {
          label: '存钱',
          value: '存钱'
        },
        {
          label: '还债',
          value: '还债'
        },
        ]
    

    return {
      amount: amount,
      account:account,
      account_options: account_options,
      time_stamp:time_stamp,
      note:note,
      type:type,
    
      typeOfOperations: typeOfOperations,
        submitTransaction(){
      
            var time = new Date()
            
            var id = time.getTime();
            var optType = type.value;
            var optAmount = amount.value;
            
            var currDate = new Date(time_stamp.value);
            var optDate = currDate.getFullYear() + '-' + (currDate.getMonth() + 1) +  '-' + currDate.getDate();

            var optAcccount = account.value;
            var optUser = "张辅"
            var optNote = note.value;

            console.log(id,optType,optAmount,optDate,optAcccount,optNote)

            axios.post("http://localhost:3990/transactions/add",qs.stringify({
              id:id,
              date:optDate,
              amount:optAmount,
              type:optType,
              account:optAcccount,
              user : optUser,
              note:optNote
            }),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res) => {
              
              messager.info(`您的 ${type.value} 记录成功！`)
              amount.value = 0;
              account.value  = null;
              note.value  = "";
              type.value  = "消费";
              

            }).then((err) =>{
              console.log(err)
            })

          }
          }
  }

});
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.opt-panel{
    height: 100%;
    width: 60%;
    margin-top: 10px;
    margin-left: 20%;
    margin-right:20%;
}


@media screen and (max-width: 700px) {
    .opt-panel {
            height: 100%;
            width: 95%;
            margin-top: 10px;
            margin-left: 5px;
            margin-right:10px;
    }
}





.spend_input{
  margin-bottom: 20px;
}

.input-element{
  margin-bottom: 20px;
}

.inCard{
  margin-bottom: 20px;
}


</style>
