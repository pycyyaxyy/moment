<template>
  <div class="login-panel">
    <h1 class="title">coderhub程序员之家</h1>
    <el-tabs type="border-card" v-model="currentTab" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon>
              <avatar />
            </el-icon>
            账号登录
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-button" @click="handleLoginClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import LoginAccount from "./login-account.vue"
import LoginPhone from "./login-phone.vue"

export default defineComponent({
  name: "login-panel",
  components: {
    LoginAccount,
    LoginPhone,
  },
  setup() {
    const isKeepPassword = ref(true)

    //拿到组件实例
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    //默认选中的当前的tab页
    const currentTab = ref("account")

    const handleLoginClick = () => {
      if (currentTab.value === "account") {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        //执行手机登录操作
      }
    }

    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick,
    }
  },
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 180px;
  width: 320px;

  .title {
    text-align: center;
  }
}
.account-control {
  display: flex;
  justify-content: space-between;
}
.login-button {
  width: 100%;
  margin-top: 10px;
}
</style>
