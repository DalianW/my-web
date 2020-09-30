<template>
  <a-layout id="components-layout-demo-side" style="height: 100vh">
    <a-layout-sider
      v-model="collapsed"
      collapsible
      theme="light"
      :trigger="null"
    >
      <div class="logo">
        <img
          src="img/logo-s.png"
          alt=""
          class="logo-img big"
          v-if="collapsed"
        />
        <img src="img/logo-b.png" alt="" class="logo-img big" v-else />
      </div>
      <SlideMenu
        :menuList="menuList"
        :openKeys="openKeys"
        :currentArray="currentArray"
        @goPage="goPage"
      ></SlideMenu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        style="background: #fff; padding: 0;display: flex;flex-align:center;"
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />

        <Header
          class="header-box flex align-center justify-between"
          :breadcrumb="breadcrumb"
        >
        </Header>
      </a-layout-header>
      <a-layout-content
        style="padding: 20px 20px 0; box-size:border-box; height:(100vh - 193px); overflow-y: auto;"
      >
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            boxSize: 'border-box',
          }"
        >
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import Header from '../layouts/Head';
import Footer from '../layouts/Footer';
import SlideMenu from '../layouts/SlideMenu';
export default {
  components: {
    Header,
    Footer,
    SlideMenu,
  },
  data() {
    return {
      collapsed: false,
      menuList: [],
      openKeys: [],
      saveKeys: [],
      currentArray: [],
      breadcrumb: {
        id: '',
        name: '',
        typeId: '',
        typeName: '',
      },
    };
  },
  watch: {
    collapsed(newV) {
      if (newV) {
        this.saveKeys = this.openKeys;
        this.openKeys = [];
      } else {
        this.openKeys = this.saveKeys;
      }
    },
  },
  mounted() {
    this.getMenu();
  },
  methods: {
    // 获取菜单
    getMenu() {
      let sendData = {
        key: 'xkmov',
        bclassid: 24,
      };

      this.$request({
        url: '/e/wxapi/allclass.php',
        method: 'post',
        params: sendData,
      }).then(res => {
        if (res.result) {
          this.setMenu(res.data);
        }
      });
    },

    // 重新组织菜单结构
    setMenu(data) {
      let list = [];
      for (let i = 0; i < data.topclassid.length; i++) {
        this.openKeys[i] = data.topclassid[i];
        this.setBreadcrumb(data, 0, 0);
        list[i] = {
          id: data.topclassid[i],
          name: data.topclassname[i],
          children: [],
        };
        for (let j = 0; j < data.sonclassname[data.topclassid[i]].length; j++) {
          this.currentArray[0] = data.sonclassid[data.topclassid[0]][0];
          list[i].children[j] = {
            id: data.sonclassid[data.topclassid[i]][j],
            name: data.sonclassname[data.topclassid[i]][j],
          };
        }
      }

      this.menuList = list;
    },

    // 设置面包肖
    setBreadcrumb(data, idNum, typeNum) {
      this.breadcrumb.id = data.topclassid[idNum];
      this.breadcrumb.name = data.topclassname[idNum];
      this.breadcrumb.typeId = data.sonclassid[data.topclassid[idNum]][typeNum];
      this.breadcrumb.typeName =
        data.sonclassname[data.topclassid[idNum]][typeNum];
    },

    // 跳转
    goPage(e, id, name, navId, navName) {
      this.breadcrumb.id = id;
      this.breadcrumb.name = name;
      this.breadcrumb.typeId = navId;
      this.breadcrumb.typeName = navName;
      this.$router.push({
        path: `/list/${e.key}`,
      });
    },
  },
};
</script>

<style lang="less">
#components-layout-demo-side {
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    .logo-img {
      display: block;
      margin: auto;
      height: 100%;
    }
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
}

.header-box {
  float: right;
  padding-right: 20px;
}
</style>
