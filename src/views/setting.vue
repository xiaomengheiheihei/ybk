<template>
  <div class="settingh-wrap">
    <List/>
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/list.vue'

export default {
  name: 'setting',
  components: {
    List
  }
}
</script>
<style lang="scss">
    .settingh-wrap {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
    }
</style>
