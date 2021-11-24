<template>
<div class="login-bg">
   <vue-particles
        class="login-bg-particle"
      color="#000"
      :particleOpacity="0.2"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="000"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.2"
      :linesDistance="150"
      :moveSpeed="1"
      :hoverEffect="false"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
      >
      </vue-particles>
    <div class="opt-panel">
    <n-grid x-gap="15" cols="1 700:1">
    <n-gi>
       <n-card  embedded hoverable :bordered="true" class="inCard">
         <img class="logo-login" width="150" src="https://pic.imgdb.cn/item/61935f462ab3f51d9181aabe.png"/>
           <n-input v-model:value="username" placeholder="账号" style="margin-bottom:20px;"></n-input>
           <n-input v-model:value="password" placeholder="密码" type="password" style="margin-bottom:20px;"></n-input>
           <n-button style="width:100%; margin-bottom:10px;" @click="login" >登录</n-button>

          <n-button  style="width:100%; margin-bottom:10px;">注册您的帐号</n-button>
             <n-button style="width:100%; margin-bottom:10px;">重置数据库</n-button>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components:{
      NGrid,NGi,NCard,NInput,NButton
  },
  name: 'loginPage',
  setup(){
      const store = useStore();
      const router = useRouter();

      let password = ref(null);
      let username = ref(null)  

      const login = ():void =>{
            var token = password.value
            store.dispatch('set_UserToken',token)
            document.cookie = "catusMoneyLoginStatus=" + username.value
            router.push('/dashboard')
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
    width:30%;
    margin : 5% auto;
}

.logo-login{
   margin-top: 10%;
   margin-left:50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
   -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.inCard{
    background: rgba(255,255,255, 0.5);
    box-shadow: 10%;
    border-radius: 25px;
}

.login-bg{   
    position: fixed;
    left:0;
    top: 0;
    width:100%;
    height:100%;
    background: rgba(255, 255, 255, 0.6);
}

.login-bg-particle{
    position: fixed;
    left:0;
    top: 0;
    width:100%;
    height:100%;
}


@media screen and (max-width: 1200px) {
.opt-panel{
    width:60%;
    margin : 5% auto;
}


}

@media screen and (max-width: 1000px) {
.opt-panel{
    width:80%;
    margin : 5% auto;
}

}

@media screen and (max-width: 800px) {
.opt-panel{
    width:90%;
    margin : 5% auto;
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
