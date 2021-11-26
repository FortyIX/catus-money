<template>
  <n-message-provider>
  <div class="opt-panel">
     
      <n-grid x-gap="15" cols="1 700:1">
          <n-gi>
            <n-card title="流水" hoverable embedded :bordered="false" class="inCard">
                  <template #header-extra> 、
                    
                  <n-grid x-gap="4" cols="1 700 2">
                    <n-gi>
                      <n-date-picker v-model:value="transaction_time" type="date" clearable />
                    </n-gi>
                    <n-gi>
                      <n-button>查询</n-button>
                    </n-gi>
                  </n-grid>  
                  </template>

                <n-data-table     :scroll-x="900" virtual-scroll :max-height="750" :loading="loading"  :columns="columns" :data="transactionRecord" :pagination="pagination" />  
              </n-card>
          </n-gi>

        </n-grid>


  </div>
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent,h } from '@vue/runtime-core';
import {NGrid,NGi,NCard,NDatePicker,NButton,NDataTable,NTag,useMessage} from 'naive-ui'
import axios from 'axios'
import  Transaction from '../Transaction'
import { ref } from 'vue';
import qs from 'qs';

export default defineComponent({
  components:{
    NGrid,NGi,NCard,NDatePicker,NButton,NDataTable
  },
  name: 'TransactionPage',

  setup () {

     let transaction_time  = ref(new Date().getFullYear());
     let transactionRecord = ref([]);
     let loading = ref(false);


     const sendMail = (rowData : any,messager:any) => {
      
      axios.post('http://localhost:3990/transactions/del',qs.stringify({
        id : rowData.key
      }),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then( _ => {
         messager.info(`删除 ${rowData.account} 于 ${rowData.date}的 ${rowData.amount} ${rowData.type}`);
         loadTransactions();
      })

  }


        const createColumns = (messager:any) => {
          return [
            {
              title: '日期',
              key: 'date',
              align: 'center'
            },
            {
              title: '金额',
              key: 'amount'
            },
            {
              title: '类型',
              key: 'type',
            },
            {
              title: '账户',
              key: 'account'
            },
            {
              title:'使用者',
              key:'user'
            },
            {
              title: '备注',
              key: 'note'
            },
            {
              title: '操作',
              key: 'actions',
              render (row : any) {
                return h(
                  NButton,
                  {
                    size: 'small',
                    onClick: () => sendMail(row,messager)
                  },
                  { default: () => '删除' }
                )
              }
            }
          ]
        }

    

     const loadTransactions = () => {
        loading.value = true;
        transactionRecord.value = [];
        axios.get('http://localhost:3990/transactions/query').then(res => {
         loading.value = false; 
         res.data.transactions.forEach((entry : any) => {
           (transactionRecord.value as any).push(               
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
 
         })
     })
     }

    loadTransactions();
    const messager = useMessage();
    return {
      loading:loading,
      transactionRecord:transactionRecord,
      transaction_time:transaction_time,
      columns: createColumns(messager),
      pagination: {
        pageSize: 9
      },
      
    }
  },


});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.inCard{
  width: 100%;
}


</style>
