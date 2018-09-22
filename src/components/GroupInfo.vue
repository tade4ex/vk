<template>
  <div>
    <img :src="groupPhoto"/>
    <b>{{groupName}}</b>
    <p>{{groupDescription}}</p>
  </div>
</template>

<script>
  export default {
    name: 'GroupInfo',
    props: ['groupPhoto', 'groupName', 'groupDescription']
  }
</script>
