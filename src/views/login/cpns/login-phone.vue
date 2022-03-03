<template>
  <div class="login-phone">
    <el-form label-width="60px" :model="phone" :rules="rules">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" class="code-input" />
          <el-button type="primary"> 获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { rules } from "../config/phone-config"

export default defineComponent({
  name: "login-phone",

  setup() {
    const phone = reactive({
      num: "",
      code: "",
    })

    return {
      phone,
      rules,
    }
  },
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
}
.code-input {
  margin-right: 10px;
}
</style>
