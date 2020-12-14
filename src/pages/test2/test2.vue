<template>
  <view class="content">
    <view>
      <text class="title">{{title}}</text>
      <navigator url="../test/test?from=teset2"
                 hover-class="navigator-hover">
        <button type="default">跳转到test页面</button>
      </navigator>
      <navigator url="../index/index?from=teset2"
                 hover-class="navigator-hover">
        <button type="default">跳转到index页面</button>
      </navigator>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            title: '这是测试页'
        }
    },
    onLoad(data) {
        console.log('onload', data)
    },
    onShow() {
        console.log('onShow')
    },
    onHide() {
        console.log('onHide')
    },
    onReady() {
        console.log('onReady')
    },
    onUnload() {
        console.log('onUnload')
    },
    onResize() {
        console.log('onResize')
    },
    onPullDownRefresh() {
        console.log('onPullDownRefresh')
    },
    onReachBottom() {
        console.log('onReachBottom')
    },
    onTabItemTap() {
        console.log('onTabItemTap')
    },
    // onShareAppMessage(data) {
    //     console.log('onShareAppMessage')
    // },
    onPageScroll(obj) {
        console.log('onPageScroll', obj)
    },
    onNavigationBarButtonTap(obj) {
        console.log('onNavigationBarButtonTap', obj)
    },
    onBackPress(obj) {
        console.log('onBackPress', obj)
    },
    onNavigationBarSearchInputChanged(obj) {
        console.log('onNavigationBarSearchInputChanged', obj)
    },
    onNavigationBarSearchInputConfirmed(obj) {
        console.log('onNavigationBarSearchInputConfirmed', obj)
    },
    onNavigationBarSearchInputClicked() {
        console.log('onNavigationBarSearchInputClicked')
    },
    methods: {}
})
</script>

<style>
.content {
    text-align: center;
    height: 400upx;
}
.logo {
    height: 200upx;
    width: 200upx;
    margin-top: 200upx;
}
.title {
    font-size: 40px;
    color: #8f8f94;
}
</style>
