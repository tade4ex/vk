<template>
  <b-form @submit="onSubmit">
    <b-form-group>
      <b-input-group prepend="Group id">
        <b-form-input v-model="form.groupId"/>
        <b-input-group-append>
          <b-btn type="submit" variant="primary">Get information</b-btn>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
  </b-form>
</template>

<script>
  import bForm from 'bootstrap-vue/es/components/form/form';
  import bBtn from 'bootstrap-vue/es/components/button/button';
  import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
  import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
  import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group';
  import bInputGroupAppend from 'bootstrap-vue/es/components/input-group/input-group-append';

  export default {
    name: 'GroupByIdForm',
    data() {
      return {
        form: {
          groupId: ''
        }
      };
    },
    methods: {
      onSubmit(e) {
        e.preventDefault();
        this.$router.push({name: 'group-info', params: {id: this.form.groupId}});
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
