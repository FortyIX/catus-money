<template>
  <n-message-provider>
  <router-view></router-view>
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Frame from './components/frame.vue';
import {NMessageProvider} from 'naive-ui'
export default defineComponent({
  name: 'App',
  components: {
    NMessageProvider
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
