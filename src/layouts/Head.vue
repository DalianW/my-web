<template>
  <div class="">
    <a-breadcrumb>
      <a-breadcrumb-item>{{ breadcrumb.name }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ breadcrumb.typeName }}</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumb: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="stylus" scoped></style>
