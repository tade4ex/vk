<template>
  <div id="app" class="container container-fluid">
    <navigation :authVkSuccess="authVkSuccess" :vkAccessToken="vkAccessToken"/>
    <vk-auth :authVkSuccess="authVkSuccess" :vkAccessToken="vkAccessToken"/>
    <router-view :authVkSuccess="authVkSuccess" :vkAccessToken="vkAccessToken"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import VkAuth from '@/components/VkAuth';
  import Navigation from "@/components/Navigation";

  export default {
    name: 'App',
    computed: mapState({
      authVkSuccess: state => state.vkAuth.auth,
      vkAccessToken: state => state.vkAuth.accessToken
    }),
    created() {
      this.$store.dispatch('vkAuth/getAuthHash');
      this.$store.dispatch('vkAuth/getAuth');
    },
    components: {
      Navigation,
      VkAuth
    }
  }
</script>
