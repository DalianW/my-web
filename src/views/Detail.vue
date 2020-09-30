<template>
  <div>
    <a-skeleton :loading="loading" v-if="loading"></a-skeleton>
    <div class="page-detail" v-else>
      <div class="article-title">
        <h5>{{ articleObj.title }}</h5>
        <p>
          <a-tag>{{ articleObj.classname }}</a-tag>
          <a-tag>{{ articleObj.username }}</a-tag>
          <a-tag>{{ articleObj.newstime }}</a-tag>
        </p>
      </div>

      <div class="article-list" v-html="articleObj.newstext"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      articleObj: {},
      loading: true,
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let path = this.$route;
      let sendData = {
        key: 'xkmov',
        id: path.params.id,
        classid: path.params.classid,
      };
      this.$request({
        url: '/e/wxapi/news/view.php',
        method: 'post',
        params: sendData,
      }).then(res => {
        this.loading = false;
        if (res.result) {
          this.articleObj = res.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page-detail {
  padding: 30px;
  max-width: 1200px;
}
@media screen and (max-width: 1000px) {
  .page-detail {
    padding: 0;
  }

  .article-title {
    padding: 0 0 20px 0;
    h5 {
      font-size: 18px;
    }
  }
}
.article-title {
  padding: 0 0 30px 0;
  h5 {
    font-size: 28px;
    font-weight: bold;
    color: #333;
  }
}
.article-list,
.article-list /deep/ p {
  color: #555;
  font-size: 16px;
  line-height: 1.6;
  word-wrap: break-word;
}
</style>
