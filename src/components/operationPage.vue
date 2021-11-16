<template>
  <div class="opt-panel">
<n-grid x-gap="15" cols="1 500:2 700:3 1200:4">
    <n-gi>
       <n-card title="消费" hoverable embedded :bordered="false" class="inCard spend-card">
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
       <n-card title="存入" hoverable embedded :bordered="false" class="inCard" >
            
            
        </n-card>
    </n-gi>
    <n-gi>
       <n-card title="存钱" hoverable embedded :bordered="false" class="inCard">

        </n-card>
    </n-gi>
    <n-gi>
       <n-card title="还债" hoverable embedded :bordered="false" class="inCard">
            
       </n-card>
    </n-gi>
  </n-grid>
  </div>

</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import {NGrid,NGi,NCard,NInputNumber,NSelect,NDatePicker,NInput,NButton} from 'naive-ui'
import { ref } from 'vue';





export default defineComponent({
  components:{
    NGrid,NGi,NCard,NInputNumber,NSelect,NDatePicker,NInput,NButton
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
      spend_note:ref(null)  
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
