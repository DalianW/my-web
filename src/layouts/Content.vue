<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    let path = this.$route;
    if (path.name !== 'detail') {
      this.$router.push({
        path: '/list/26',
      });
    }
  },
};
</script>

<style lang="stylus" scoped></style>
