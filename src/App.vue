<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  data() {
    return {
      locale: zhCN,
    };
  },
};
</script>

<style lang="less">
pre {
  display: block;
  background: #193549;
  color: #90ffee;
  padding: 20px;
  border-left: 5px solid #20435c;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 10px auto;
}
table {
  width: 100%;
}
table td {
  border: 1px solid #e5e5e5;
  padding: 10px;
  background: #fff;
  color: #555;
  line-height: 1.4;
}
::-webkit-scrollbar-track-piece {
  //滚动条凹槽的颜色，还可以设置边框属性
  background-color: #f8f8f8;
}
::-webkit-scrollbar {
  //滚动条的宽度
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-thumb {
  //滚动条的设置
  background-color: #ccc;
  background-clip: padding-box;
  min-height: 28px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}

.flex {
  display: flex;
}

.basis-xs {
  flex-basis: 20%;
}

.basis-sm {
  flex-basis: 40%;
}

.basis-df {
  flex-basis: 50%;
}

.basis-lg {
  flex-basis: 60%;
}

.basis-xl {
  flex-basis: 80%;
}

.flex-sub {
  flex: 1;
}

.flex-twice {
  flex: 2;
}

.flex-treble {
  flex: 3;
}

.flex-direction {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.align-start {
  align-items: flex-start;
}

.align-end {
  align-items: flex-end;
}

.align-center {
  align-items: center;
}

.align-stretch {
  align-items: stretch;
}

.self-start {
  align-self: flex-start;
}

.self-center {
  align-self: flex-center;
}

.self-end {
  align-self: flex-end;
}

.self-stretch {
  align-self: stretch;
}
.align-stretch {
  align-items: stretch;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.relative{
  position: relative;
}
.absolute{
  position: absolute;
}
.fixed{
  position: fixed;
}
</style>
