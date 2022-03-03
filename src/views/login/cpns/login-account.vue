<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import { ElForm } from "element-plus"
import { useStore } from "vuex"
import { rules } from "../config/account-config"

export default defineComponent({
  name: "login-account",
  setup() {
    const account = reactive({
      name: "",
      password: "",
    })

    //拿到表单实例
    const formRef = ref<InstanceType<typeof ElForm>>()

    //vuex
    const store = useStore()

    const loginAction = (isKeepPassword: boolean) => {
      //拿到form的组件实例，调用其中的validate方法，里面会传入一个回调函数，参数代表是否验证通过
      formRef.value?.validate((valid) => {
        if (valid) {
          //执行真正的登录逻辑
          console.log("执行真正的登录逻辑")
        }
      })
    }

    return {
      account,
      rules,
      formRef,
      loginAction,
    }
  },
})
</script>

<style scoped lang="less"></style>
