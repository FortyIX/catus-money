<template>
<div>
    <h1>login page</h1>
    <router-link to="/dashboard">Login</router-link>
    <router-link to="/registerPage">register</router-link>
</div>
</template>

<script lang="ts">
import { defineComponent,h } from '@vue/runtime-core';


export default defineComponent({
  components:{
  
  },
  name: 'loginPage',

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
