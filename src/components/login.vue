<template>
<div class="login-bg">
    <div class="opt-panel">
        <n-grid x-gap="15" cols="1 700:2">
    <n-gi>
       <n-card title="登录到您的 Catus Money" hoverable embedded :bordered="false" class="inCard spend-card">
           <n-input v-model:value="username" placeholder="账号" style="margin-bottom:20px;"></n-input>
           <n-input v-model:value="password" placeholder="密码" type="password" style="margin-bottom:20px;"></n-input>
           <n-button @click="login" >登录</n-button>
        </n-card>
    </n-gi>
    <n-gi>
       <n-card title="注册及重置数据库" hoverable embedded :bordered="false" class="inCard" >
             <n-button style="margin-right:10px;">注册您的帐号</n-button>
             <n-button>重置数据库</n-button>
            <ul>
              <li>除非您是此系统的第一位用户，之后的用户注册均需第一位用户的密码作为邀请码</li>
              <li>您可以在备份数据库后重置系统来重设第一用户的信息，不过您仍需邀请码</li>
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
</div>
</template>

<script lang="ts">
import { defineComponent,h } from '@vue/runtime-core';
import {NGrid,NGi,NCard,NInput,NButton} from 'naive-ui'
import {useStore} from 'vuex';
import sha256 from 'crypto-js'
import { ref } from 'vue';

export default defineComponent({
  components:{
      NGrid,NGi,NCard,NInput,NButton
  },
  name: 'loginPage',
  setup(){
      const store = useStore();
      
      let password = ref(null);
      let username = ref(null)  

      const login = ():void =>{
            var token = sha256(password.value)
            console.log(token)
      }

      return{
          password:password,
          username:username,
          login:login
      }
  }



});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.opt-panel{
    margin-top:15%;
    width: 60%;
    margin-left: 21%;
    margin-right:15%;
    
}

.inCard{
    background: rgba(255,255,255, 0.6);
}

.login-bg{
     background: url('../assets/login-bg.jpg');
    position:fixed;
    top: 0;
    left: 0;    
    width:100%;
    height:100%;
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
