<template>
  <div>
    <router-view></router-view>
    <!-- <div v-for="(item, index) in obj" :key="index">
      {{ item }}
      <p v-for="(item, index) in item" :key="index">{{ item }}</p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // obj: { 'a': [1, 2, 3], b: [1, 2, 3], c: [1, 2, 3], d: [1, 2, 3] }
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style>
button {
  width: 300px;
  height: 80px;
  font-size: 60px;
}
</style>
