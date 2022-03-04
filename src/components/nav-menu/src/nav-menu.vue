<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">coderHub</span>
    </div>
    <el-menu
      :uniqueOpened="true"
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="collapse"
      background-color="#545c64"
      text-color="#ccc"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="1" :route="{ path: '/main/momentList' }">
        <el-icon>
          <orange />
        </el-icon>
        <template #title>动态圈</template>
      </el-menu-item>
      <el-menu-item index="2" :route="{ path: '/main/publishMoment' }">
        <el-icon>
          <message-box />
        </el-icon>
        <template #title>发布动态</template>
      </el-menu-item>
      <el-menu-item index="3" :route="{ path: '/main/myMoment' }">
        <el-icon>
          <notebook />
        </el-icon>
        <template #title>我的动态</template>
      </el-menu-item>
      <!-- <el-menu-item index="4">
        <el-icon>
          <user />
        </el-icon>
        <template #title>个人中心</template>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon>
          <info-filled />
        </el-icon>
        <template #title>项目描述</template>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "nav-menu",
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style scoped lang="less">
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
}
.el-menu {
  border-right: none;
}
</style>
