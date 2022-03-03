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
import { ElForm, ElMessage } from "element-plus"
import { useStore } from "vuex"
import { rules } from "../config/account-config"
import LocalCache from "@/utils/cache"

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

    //是否需要弹出弹窗（如果密码符合要求但是服务器中没有改数据）
    // const isValid = ref(false)

    const loginAction = (isKeepPassword: boolean) => {
      //拿到form的组件实例，调用其中的validate方法，里面会传入一个回调函数，参数代表是否验证通过
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            //本地缓存
            LocalCache.setCache("name", account.name)
            LocalCache.setCache("password", account.password)
          } else {
            //清除账号密码
            LocalCache.deleteCache("name")
            LocalCache.deleteCache("password")
          }
          //2.开始进行登录验证（这里搞了一个异常捕获，async函数的出错处理直接可以在外面catch到）
          store
            .dispatch("login/accountLoginAction", { ...account })
            .catch((err) => {
              console.log(err)
              //搞一个出错弹框
              ElMessage.error({
                showClose: true,
                message: err,
              })
            })
        }
      })
    }

    return {
      account,
      rules,
      formRef,
      // isValid,
      loginAction,
    }
  },
})
</script>

<style scoped lang="less"></style>
