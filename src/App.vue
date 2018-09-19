<template>
  <div id="app" class="container container-fluid">
    <vk-auth :authVkSuccess="authVkSuccess" :vkAccessToken="vkAccessToken"/>
    <router-view :authVkSuccess="authVkSuccess" :vkAccessToken="vkAccessToken"/>
  </div>
</template>

<script>
  import VkAuth from '@/components/VkAuth';

  export default {
    name: 'App',

    methods: {
      getVkAccessToken: function (hash) {
        if (hash.length < 1) {
          return null;
        }
        let rx = /access_token=([A-Za-z0-9]){1,}/g;
        let arr = rx.exec(hash);
        if (arr.length > 0) {
          return arr[0].replace('access_token=', '');
        }
        return null;
      },
    },
    data: function () {
      window.onhashchange = () => {
        let hash = window.location.hash || '';
        this.authVkSuccess = /#access_token=.*&expires_in=86400&user_id=.*/.test(hash);
        this.vkAccessToken = this.getVkAccessToken(hash);
      };

      let hash = window.location.hash || '';
      let authVkSuccess = /#access_token=.*&expires_in=86400&user_id=.*/.test(hash);
      let vkAccessToken = this.getVkAccessToken(hash);

      return {
        authVkSuccess,
        vkAccessToken
      }
    },
    components: {
      VkAuth
    }
  }
</script>
