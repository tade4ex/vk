<template>
  <div>
    <h1>{{testName1}}</h1>
    <vk-auth :testName="testName"/>
  </div>
</template>

<script>

  import VkAuth from './VkAuth';
  import bAlert from 'bootstrap-vue/es/components/alert/alert'

  export default {
    name: 'HelloWorld',
    props: ['testName1'],
    components: {
      VkAuth,
      bAlert
    },
    data: function () {
      return {
        testName: 'testname'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
