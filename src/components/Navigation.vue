<template>
  <div v-if="authVkSuccess">
    <b-navbar toggleable="md" variant="light" type="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">vk.tade4ex.com</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <div class="nav-item">
            <router-link :to="{ name: '/', params: {}}" class="nav-link">Home</router-link>
          </div>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              {{getProfile()}}
              <b-btn-group>
                <b-btn><img :src="photo" alt="profile foto"> {{firstName}} {{lastName}}</b-btn>
              </b-btn-group>
            </template>
            <b-dropdown-item variant="danger" @click="onLogout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import bJumbotron from 'bootstrap-vue/es/components/jumbotron/jumbotron';
  import bBtn from 'bootstrap-vue/es/components/button/button';
  import bBtnGroup from 'bootstrap-vue/es/components/button-group/button-group';
  import bNavbar from 'bootstrap-vue/es/components/navbar/navbar';
  import bNavbarNav from 'bootstrap-vue/es/components/navbar/navbar-nav';
  import bNavbarBrand from 'bootstrap-vue/es/components/navbar/navbar-brand';
  import bNavbarToggle from 'bootstrap-vue/es/components/navbar/navbar-toggle';
  import bCollapse from 'bootstrap-vue/es/components/collapse/collapse';
  import bNavItem from 'bootstrap-vue/es/components/nav/nav-item';
  import bNavForm from 'bootstrap-vue/es/components/nav/nav-form';
  import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
  import bNavItemDropdown from 'bootstrap-vue/es/components/nav/nav-item-dropdown';
  import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item';

  export default {
    name: 'Navigation',
    props: ['authVkSuccess', 'vkAccessToken'],
    computed: mapState({
      photo: state => state.vkProfile.photo,
      firstName: state => state.vkProfile.firstName,
      lastName: state => state.vkProfile.lastName
    }),
    methods: {
      onLogout() {
        this.$store.dispatch('vkAuth/logout');
      },
      getProfile() {
        this.$store.dispatch('vkProfile/getProfile', this.vkAccessToken);
      }
    },
    components: {
      bJumbotron,
      bBtn,
      bBtnGroup,
      bNavbar,
      bNavbarNav,
      bNavbarBrand,
      bNavbarToggle,
      bCollapse,
      bNavItem,
      bNavForm,
      bFormInput,
      bNavItemDropdown,
      bDropdownItem
    }
  }
</script>
