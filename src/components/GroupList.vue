<template>
  <div class="row">
    <div v-if="groupLists != null">
      <div v-for="item in groupLists.items" class="col-12">
        <b-btn class="col mb-2 text-left" :groupId="item.id" @click="onViewGroupInfo">
          <img :src="item.photo_50" alt="profile foto"> {{item.name.slice(0, 100)}}{{(item.name.length > 100) ? ' (...)'
          : ''}}
        </b-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import bBtn from 'bootstrap-vue/es/components/button/button';
  import bBtnGroup from 'bootstrap-vue/es/components/button-group/button-group';
  import cookies from '@/classes/Cookies';

  export default {
    name: 'GroupList',
    props: ['vkAccessToken'],
    computed: mapState({
      groupLists: state => state.vkGroup.groupLists
    }),
    methods: {
      onViewGroupInfo(e) {
        let groupId = e.target.getAttribute('groupId');
        this.$router.push({name: 'group-info', params: {id: groupId}});
      }
    },
    created() {
      this.$store.dispatch('vkGroup/getGroupLists', {
        accessToken: this.vkAccessToken,
        userId: cookies.getCookie('user_id')
      });
    },
    components: {
      bBtn,
      bBtnGroup
    }
  }
</script>
