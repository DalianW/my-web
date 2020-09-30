<template>
  <div>
    <div class="loading-box" v-if="list.length <= 0 && loading">
      <div class="item" v-for="item in 3" :key="item">
        <a-skeleton :loading="loading" active></a-skeleton>
      </div>
    </div>
    <div
      class="item"
      v-for="item in list"
      :key="item.id"
      v-else-if="list.length > 0"
    >
      <router-link :to="`/detail/${item.getclassid}/${item.id}`">
        <h5 class="title">{{ item.title }}</h5>
        <div class="type">
          <a-tag>{{ item.classname }}</a-tag>
          <a-tag>{{ item.username }}</a-tag>
        </div>
        <div class="description">{{ item.smalltext }}</div>

        <div class="tig-list">
          <div class="tig flex"><a-icon type="eye" /> {{ item.onclick }}</div>
          <div class="tig flex"><a-icon type="like" /> {{ item.diggtop }}</div>
          <div class="tig flex">
            <a-icon type="history" /> {{ item.newstime }}
          </div>
        </div>
      </router-link>
    </div>

    <div v-else-if="list.length <= 0 && !loading" class="empty-box">
      <a-empty description="暂无数据" />
    </div>

    <div class="page-box" v-if="list.length > 0">
      <a-pagination
        show-quick-jumper
        :default-current="page"
        :total="total"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      list: [],
      total: 0,
      pageSize: 6,
      loading: true,
    };
  },
  watch: {
    $route() {
      this.page = 1;
      this.list = [];
      this.loading = true;
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    onChange(pageNumber) {
      this.page = pageNumber;
      this.getList();
    },
    getList() {
      let path = this.$route;
      let sendData = {
        key: 'xkmov',
        classid: path.params.id,
        limit: this.pageSize,
        pageIndex: this.page,
      };
      this.$request({
        url: '/e/wxapi/news/list.php',
        method: 'post',
        params: sendData,
      }).then(res => {
        if (res.result) {
          if (res.data.total == 0) {
            this.list = [];
          } else {
            this.setArray(res.data);
          }
          this.loading = false;
        } else {
          this.list = [];
        }
      });
    },

    // 根据返回的数据合并成前端展示的数组
    setArray(data) {
      let newArray = [];
      this.total = Number(data.total);

      for (let i = 0; i < data.id.length; i++) {
        newArray[i] = {
          id: data.id[i],
          getclassid: data.getclassid[i],
          classname: data.classname[i],
          title: data.title[i],
          titlepic: data.titlepic[i],
          smalltext: data.smalltext[i],
          username: data.username[i],
          newstime: data.newstime[i],
          onclick: data.onclick[i],
          diggtop: data.diggtop[i],
          groupid: data.groupid[i],
          userfen: data.userfen[i],
          onclassname: data.onclassname,
        };
      }
      this.list = newArray;
    },
  },
};
</script>

<style lang="less" scoped>
.empty-box {
  padding: 200px 0;
}
.page-box {
  text-align: center;
  padding: 10px 0 20px;
}
.item {
  border-bottom: 1px solid #e9e9e9;
  padding: 0 0 30px;
  margin: 0 0 30px;

  .title {
    font-size: 20px;
    font-weight: bolder;
    color: #333;
  }
  .description {
    max-width: 720px;
    margin: 15px 0 20px;
    font-size: 16px;
    color: #555;
    line-height: 1.6;
  }

  .tig-list {
    display: flex;
    align-content: cener;
    .tig {
      color: #999;
      display: flex;
      align-content: center;
      padding: 0 20px;
      font-size: 16px;
      position: relative;
      &:after {
        content: ' ';
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -5px;
        width: 1px;
        height: 10px;
        background: #e1e1e1;
      }
      &:last-child {
        padding-right: 0;
        &:after {
          display: none;
        }
      }
      &:first-child {
        padding-left: 0;
      }
      vertical-align: middle;
      i {
        margin-right: 5px;
        padding-top: 4px;
      }
    }
  }
}
</style>
