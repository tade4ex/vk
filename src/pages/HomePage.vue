<template>
  <div v-if="authVkSuccess === true">
    <div class="row mt-5">
      <div class="col-12">
        <h1>Get group info by id:</h1>
        <hr>
        <group-by-id-form/>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12">
        <h1>Your groups:</h1>
        <hr>
        <group-list :vkAccessToken="vkAccessToken"/>
      </div>
    </div>
  </div>
</template>

<script>
  import groupList from '@/components/GroupList';
  import groupByIdForm from '@/components/GroupByIdForm';

  export default {
    name: 'HomePage',
    props: ['authVkSuccess', 'vkAccessToken'],
    components: {
      groupList,
      groupByIdForm
    }
  }
</script>
