<template>
  <b-jumbotron v-if="!authVkSuccess">
    <template slot="header">
      vk.tade4ex.com
    </template>
    <hr class="my-4">
    <div>
      <p>
        To continue, pleas login.
      </p>
      <b-btn variant="primary" :href="link">Login with VK</b-btn>
    </div>
  </b-jumbotron>
</template>

<script>
  import bJumbotron from 'bootstrap-vue/es/components/jumbotron/jumbotron';
  import bBtn from 'bootstrap-vue/es/components/button/button';

  export default {
    name: 'VkAuth',
    props: ['authVkSuccess', 'vkAccessToken'],
    data: function () {
      let link = 'https://oauth.vk.com/authorize?';
      let params = {
        client_id: 6694308,
        display: 'page',
        redirect_uri: 'http://vk.tade4ex.com',
        scope: 'friends,status,stats,groups',
        response_type: 'token',
        v: 5.85
      };
      link += Object.keys(params).map((name) => name + "=" + params[name]).join('&');
      return {
        link: link,
      };
    },
    components: {
      bJumbotron,
      bBtn
    }
  }
</script>

<style scoped>
</style>
