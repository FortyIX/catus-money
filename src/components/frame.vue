<template>
  <div class="dashboard-view">
     <n-card class="nav-card">  
    <n-image class="logo-container" width="25" src="https://pic.imgdb.cn/item/619227bf2ab3f51d9127ee7b.png"/>  
    
    <n-menu v-if="!isMobileDevice" class="menu" v-model:value="activeKey" mode="horizontal" :options="menuOptions" />

     
     <div class="shortcut" v-if="isMobileDevice" > 
      <n-button class="quick-operate-btn">操作</n-button> 
      <n-dropdown trigger="hover" @select="handleSelect" :options="options">
          <n-button class="dropdown-menu">菜单</n-button>
      </n-dropdown>
     </div> 
    </n-card>

  </div>
  <router-view class="router-window" />
</template>

<script lang="ts">
import { defineComponent,h,ref, resolveComponent } from '@vue/runtime-core';
import {NMenu,NCard,NImage,NDropdown,NButton} from 'naive-ui'
import Dashboard from './dashboard.vue'

const menuOptions = [
  {
    label: () =>
      h(
        resolveComponent('router-link'),
        {
          to:{
            name:'dashboard',
          }
        },
        '操作'
      ),
    key: 'actions',
    
  },
  {
    label: () =>
      h(
        resolveComponent('router-link'),
        {
          to:{
            name:'dashboard',
          }
        },
        '总览'
      ),
    key: 'homepage',
    
  },
  {
    
    label: () =>
      h(
        resolveComponent('router-link'),
        {
          to:{
            name:'transaction_page',
          }
        },
        '流水'
      ),
    key: 'bank_account',
    
  },
  {
    label: () =>
      h(
        resolveComponent('router-link'),
        {
          to:{
            name:'dashboard',
          }
        },
        '银行账户'
      ),
    key: 'bank_account',
    
  },
  {
    label: '计划',
    key: 'plan',
    children: [
      {
        type: 'group',
        label: '攒钱',
        key: 'saving',
        children: [
          {
            label: '计划列表',
            key: 'saving-list',
            
          },
        ]
      },
      {
        type: 'group',
        label: '开销规划',
        key: 'spending_plan',
        children: [
          {
            label: '设置预算',
            key: 'spending_plan_setting',
            
          },
          {
            label: '购物计划',
            key: 'shopping_planning',
            
          },
        ]
      }
    ]
  },
  {
    label: () =>
      h(
        resolveComponent('router-link'),
        {
          to:{
            name:'dashboard',
          }
        },
        '账号'
      ),
    key: 'account',
    
  },
  {
      label: '设置',
      key: 'setting',
      children: [
        {
          type: 'group',
          label: '设置',
          key: 'setting-group',
          children: [
            {
              label: '设置页面',
              key: 'setting-page',
              
            },
          ]
        },
        {
          type: 'group',
          label: '关于',
          key: 'about_group',
          children: [
            {
              label: '关于系统',
              key: 'about_system',
              
            },
            {
              label: '版本更新',
              key: 'about_update',
              
            },
          ]
        }
      ]
    }
]

const options = menuOptions;
      





export default defineComponent({
  components:{
    NMenu,NCard,NImage,NDropdown,NButton
  },
  name: 'Frame',
  props: {
    msg: String,
  },
  data(){
    return {
      isMobileDevice : false
    }
  },
  setup(){
    return {
      activeKey:ref(null),
      menuOptions,
      options,
      handleSelect (key : any) {
        console.log(key)
     }


    }
  },
  mounted() {
    if(window.innerWidth < 600){
          this.isMobileDevice = true;
    } 
    window.onresize = () => {
      if(window.innerWidth < 600){
          this.isMobileDevice = true;
      }
      else{
         this.isMobileDevice = false;
      }
    }
    

  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.dashboard-view{
  width: 100%;
  height: 40px;
  background: rgb(255, 255, 255);
}

.menu{
  margin-top: -10px;
}

.nav-card{
  widows: 100%;
  height: 60px;
}

.router-window{
  top: 20px;
  position: relative;
  height: 100%;
  width: 100%;
  background: white;
}

.dropdown-menu{
  float: right;
  bottom: 38px;
  
}

.quick-operate-btn{
  width: 200px;
  bottom: 38px;
  position: relative;
  left: 40px;  
}

.logo-container{

  position: relative;
  bottom:10px;
}

</style>
