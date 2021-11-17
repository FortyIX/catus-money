<template>
<div>
<div class="bank-panel">
<n-grid x-gap="15" cols="1 700:2">
  <n-gi>
    <n-card title="操作" hoverable embedded :bordered="false" class="inCard spend-card">
      <span>账户名称</span>
      <n-input v-model:value="accountName" class="input-field"></n-input>
      <span>户主</span>
      <n-input v-model:value="accountHolder" class="input-field"></n-input>
      <span>剩余金额</span>
      <n-input-number v-model:value="balance" size="large" class="input-field">
                    <template #prefix>￥</template>
      </n-input-number>
      <n-button @click="addBankAccount">添加</n-button>
    
    </n-card> 
  </n-gi>
    <n-gi>
    <n-card title="账户列表" hoverable embedded :bordered="false" class="inCard spend-card">
    <n-scrollbar style="max-height: 320px;">
    <n-card v-for="account in datalist" :key=account.account_id v-model:title="account.account_name">
      <template #header-extra> 剩余：{{account.account_balance}}</template>
      {{account.account_holder}}
    </n-card>
    </n-scrollbar>
    
    </n-card> 
  </n-gi>
</n-grid>

</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import {NGrid,NGi,NCard,NInput,NInputNumber,NButton,NScrollbar,useMessage} from 'naive-ui'
import { ref } from 'vue';
import axios from 'axios';
import qs from 'qs';


export default defineComponent({
  components:{
    NGrid,NGi,NCard,NInput,NInputNumber,NButton,NScrollbar
  },
  name: 'backAccountPage',
  setup(){
     
    const messager = useMessage();

    let datalist = ref();
    let accountName = ref(null);
    let accountHolder = ref(null);
    let balance = ref(0);

    datalist.value = []
     const getAllBackAccount = ():void => {
       axios.get('http://localhost:3990/bankAccount/query').then((res : any) =>{
          
          res.data.bank_account.forEach((account : any) => {
            (datalist.value as any).push({
              account_id:account.id,
              account_name:account.name,
              account_holder:account.holder,
              account_balance:account.balance,
            })

          })

       })
     }


     const addBankAccount = ():void => {

        var account_id = "dasdas";
        var account_name = accountName.value;
        var account_holder = accountHolder.value;
        var account_balance = balance.value;

        axios.post("http://localhost:3990/bankAccount/addAccount",qs.stringify({
          id:account_id,
          account_name:account_name,
          account_balance:account_balance,
          holder:account_holder
        }),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          messager.success(`您添加的 ${account_name} 账号 已成功`);
          getAllBackAccount();

           
           accountName.value = null;
           accountHolder.value = null;
           balance.value = 0;

        })




     }

     getAllBackAccount();
    

    return {
      getAllBackAccount,
      addBankAccount,
      datalist,
      accountName,
      accountHolder,
      balance

    }
  }

});
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.bank-panel{
  
  margin-top:50px;
  width: 60%;
  margin-right: 20%;
  margin-left: 20%;

}

.input-field{
  margin-bottom: 20px;
}

.inCard{
  height: 400px;
}

@media screen and (max-width: 700px) {
    .bank-panel {
            height: 100%;
            width: 95%;
            margin-top: 10px;
            margin-left: 5px;
            margin-right:10px;
    }
}







</style>
