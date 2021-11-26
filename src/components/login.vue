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
           <div v-show="!isRegister">
           <n-input v-model:value="username" placeholder="账号" style="margin-bottom:20px;"></n-input>
           <n-input v-model:value="password" placeholder="密码" type="password" style="margin-bottom:20px;"></n-input>
           <n-button style="width:100%; margin-bottom:10px;" @click="verifyLogin" >登录</n-button>
           <n-button style="width:100%; margin-bottom:10px;" v-on:click="isRegister = !isRegister">注册您的帐号</n-button>
           <n-button style="width:100%; margin-bottom:10px;">重置数据库</n-button>
          <ul>
              <li>除非您是此系统的第一位用户，之后的用户注册均需第一位用户的密码作为邀请码</li>
              <li>您可以在备份数据库后重置系统来重设第一用户的信息，不过您仍需邀请码</li>
          </ul>
           </div>
           <div  v-show="isRegister">
            <div  v-show="isRegisteringForUser">
            <n-input v-model:value="username" placeholder="账号" style="margin-bottom:20px;"></n-input>
           <n-input v-model:value="password" placeholder="密码" type="password" style="margin-bottom:20px;"></n-input>
           <n-input v-model:value="inviteKey" placeholder="邀请码" style="margin-bottom:20px;"></n-input>
            <n-button style="width:100%; margin-bottom:10px;" @click="registerForUsers" >注册</n-button>
            <n-button style="width:100%; margin-bottom:10px;" v-on:click="isRegister = !isRegister">返回</n-button>
            <ul>
              <li>您并非此数据库的第一位用户，所以请您使用管理员所设定的密码作为邀请码来注册您的帐号</li>
          </ul>
           </div>
            <div  v-show="!isRegisteringForUser">
            <n-input v-model:value="username" placeholder="账号" style="margin-bottom:20px;"></n-input>
           <n-input v-model:value="password" placeholder="密码" type="password" style="margin-bottom:20px;"></n-input>
            <n-button style="width:100%; margin-bottom:10px;" @click="registerForAdmin" >注册</n-button>
            <n-button style="width:100%; margin-bottom:10px;" v-on:click="isRegister = !isRegister">返回</n-button>
            <ul>
              <li>您是此数据库的第一位用户，请您注册管理员账户。</li>
          </ul>
           </div>
           </div>
          


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
import {NGrid,NGi,NCard,NInput,NButton,useMessage} from 'naive-ui'
import {useStore} from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CryptoJS from 'crypto-js'
import axios from 'axios';
import qs from 'qs';


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
      let inviteKey = ref(null); 
      let isRegister = ref(false)

      const isRegisteringForUser = ref(false)
      
      const messager = useMessage()


      
      const registerForUsers = ():void => {
        axios.post('http://localhost:3990/account/userRegister',qs.stringify({
          username:username.value,
          password:String(CryptoJS.SHA1(password.value)),
          invitekey:String(CryptoJS.SHA1(inviteKey.value)),
        }),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then(res =>{
          if(parseInt(res.data.result) == 0){
            messager.error("您的邀请码无效");
          }
          else{
            messager.success(username.value + " 注册成功！");
            isRegister.value = false;
          }
        })
      }

      const registerForAdmin = ():void =>{
        axios.post('http://localhost:3990/account/adminRegister',qs.stringify({
          username:username.value,
          password:String(CryptoJS.SHA1(password.value)),
        }),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then(res =>{
           messager.success("管理员账号注册成功");
           isRegister.value = false;
        })
      }

      const verifyLogin = (): void => {
        
            var token = CryptoJS.SHA1(password.value)
            store.dispatch('set_UserToken',token)
            document.cookie = "catusMoneyLoginStatus=" + username.value

          axios.post('http://localhost:3990/account/verifyAccount',qs.stringify({
          username:username.value,
          password:String(CryptoJS.SHA1(password.value)),
        }),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then(res =>{
          if(parseInt(res.data.result) == 0){
            messager.error("您的信息不正确");
          }
          else{
            router.push('/dashboard');
          }
        })
      }
      

      
      
      const checkAdminStatus = ():void => {
        axios.get('http://localhost:3990/account/getUserAmount').then(res =>{
          if(parseInt(res.data.nUser) > 0){
            isRegisteringForUser.value = true
          }
        })
      }




      checkAdminStatus() 

      return{
          password,
          username,
          isRegister,
          inviteKey,
          isRegisteringForUser,
          registerForUsers,
          verifyLogin,
          registerForAdmin
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
