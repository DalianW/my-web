<template>
  <a-menu
    theme="light"
    :default-selected-keys="currentArray"
    mode="inline"
    :open-keys.sync="openKeysPath"
    style="overflow-y:auto;overflow-x:hidden; height:calc(100vh - 64px);"
    class="menu-list"
  >
    <a-sub-menu v-for="item in menuList" :key="item.id">
      <span slot="title">{{ item.name }}</span>
      <a-menu-item
        :key="nav.id"
        v-for="nav in item.children"
        @click="goPage($event, item.id, item.name, nav.id, nav.name)"
      >
        {{ nav.name }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
export default {
  name: 'slide-menu',
  data() {
    return {
      openKeysPath: [],
    };
  },
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
    currentArray: {
      type: Array,
      default: () => [],
    },
    openKeys: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    openKeys(newV) {
      this.openKeysPath = newV;
    },
  },
  mounted() {
    this.openKeysPath = this.openKeys;
  },
  methods: {
    goPage(e, id, name, navId, navName) {
      this.$emit('goPage', e, id, name, navId, navName);
    },
  },
};
</script>

<style lang="less" scoped>
.menu-list /deep/ .ant-menu-submenu > .ant-menu-submenu-title {
  padding-left: 20px !important;
}
</style>
