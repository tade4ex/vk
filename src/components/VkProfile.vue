<template>
  <div>
      <b-btn-group>
        <b-btn><img :src="photo" alt="profile foto"> {{firstName}} {{lastName}}</b-btn>
        <b-btn variant="danger" @click="onLogout">Logout</b-btn>
      </b-btn-group>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import bJumbotron from 'bootstrap-vue/es/components/jumbotron/jumbotron';
  import bBtn from 'bootstrap-vue/es/components/button/button';
  import bBtnGroup from 'bootstrap-vue/es/components/button-group/button-group';

  export default {
    name: 'VkProfile',
    props: ['authVkSuccess', 'vkAccessToken'],
    computed: mapState({
      photo: state => state.vkProfile.photo,
      firstName: state => state.vkProfile.firstName,
      lastName: state => state.vkProfile.lastName
    }),
    methods: {
      onLogout() {
        window.location.hash = '';
      }
    },
    created() {
      this.$store.dispatch('vkProfile/getProfile', this.vkAccessToken)
    },
    components: {
      bJumbotron,
      bBtn,
      bBtnGroup
    }
  }
</script>
