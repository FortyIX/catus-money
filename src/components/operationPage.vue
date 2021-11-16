<template>
  <div class="opt-panel">
<n-grid x-gap="15" cols="1 700:2">
    <n-gi>
       <n-card title="操作" hoverable embedded :bordered="false" class="inCard spend-card">
                    <n-radio-group v-model:value="value" name="typeOfOperationSelect" style="width:100%; margin-bottom:20px;">
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
                <n-input-number size="large" class="spend_input" v-model:value="spend_value">
                    <template #prefix>￥</template>
                </n-input-number>
                <span>账户</span>
                <n-select class="input-element" v-model:value="selected_account" :options="spend_account_options" placeholder="选择账户" />
                <span>时间</span>
                <n-date-picker class="input-element" v-model:value="spend_time_stamp" type="date" clearable/>
                <span>备注</span>
                <n-input class="input-element" v-model:value="spend_note" type="text" placeholder="备注" />
                <n-button style="width:100%;">记录</n-button>

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
import {NGrid,NGi,NCard,NInputNumber,NSelect,NDatePicker,NInput,NButton,NRadioButton,NRadioGroup} from 'naive-ui'
import { ref } from 'vue';





export default defineComponent({
  components:{
    NGrid,NGi,NCard,NInputNumber,NSelect,NDatePicker,NInput,NButton,NRadioGroup,NRadioButton
  },
  name: 'OperationPage',
  data(){
    return{
      spend_value:0,
      selected_account:ref(null),
      spend_account_options: [
        {
          label: "中国招商银行",
          value: "中国招商银行",
        }],
      spend_time_stamp:new Date(),
      spend_note:ref(null),
      typeOfOperations: [
        {
          label: "消费",
          value: "out"
        },
        {
          label: '收入',
          value: 'in'
        },
        {
          label: '存钱',
          value: 'saving'
        },
        {
          label: '还债',
          value: 'payback'
        },
        ]
    }
  }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.opt-panel{
    height: 100%;
    width: 95%;
    margin-top: 10px;
    margin-left: 20px;
    margin-right:15px;
}



.spend_input{
  margin-bottom: 20px;
}

.input-element{
  margin-bottom: 20px;
}



</style>
