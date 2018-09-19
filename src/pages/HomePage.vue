<template>
  <div v-if="authVkSuccess === true">
    <b-form @submit="onSubmit">
      <b-form-group
        label="Get group by id"
        description="ex. exclusive_muzic"
      >
        <b-input-group prepend="Group id">
          <b-form-input v-model="form.groupId"/>
          <b-input-group-append>
            <b-btn type="submit" variant="primary">Get</b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-form>
    <div>
      <img :src="groupPhoto"/>
      <b>{{groupName}}</b>
      <p>{{groupDescription}}</p>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import bForm from 'bootstrap-vue/es/components/form/form';
  import bBtn from 'bootstrap-vue/es/components/button/button';
  import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
  import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
  import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group';
  import bInputGroupAppend from 'bootstrap-vue/es/components/input-group/input-group-append';

  export default {
    name: 'HomePage',
    props: ['authVkSuccess', 'vkAccessToken'],
    data() {
      return {
        form: {
          groupId: ''
        }
      }
    },
    computed: mapState({
      groupName: state => state.vkGroup.name,
      groupDescription: state => state.vkGroup.description,
      groupPhoto: state => state.vkGroup.photo
    }),
    methods: {
      onSubmit(e) {
        e.preventDefault();
        this.$store.dispatch('vkGroup/getGroup', {
          accessToken: this.vkAccessToken,
          groupId: this.form.groupId
        });
        return false;
      }
    },
    components: {
      bForm,
      bBtn,
      bFormInput,
      bFormGroup,
      bInputGroup,
      bInputGroupAppend
    }
  }
</script>
