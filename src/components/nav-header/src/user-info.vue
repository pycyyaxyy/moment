<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :src="userAvatarUrl" shape="circle" :size="30"></el-avatar>
        {{ userName }}
      </span>
      <template #dropdown>
        <el-dropdown-menu class="dropdown-menu">
          <el-dropdown-item @click="handleExitClick">
            <el-icon>
              <switch-button />
            </el-icon>
            退出登录
          </el-dropdown-item>

          <el-divider></el-divider>

          <el-dropdown-item>
            <el-icon>
              <user />
            </el-icon>
            用户信息
          </el-dropdown-item>

          <el-dropdown-item>
            <el-icon>
              <setting />
            </el-icon>
            系统管理
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "@/store"
import { useRouter } from "vue-router"

import localCache from "@/utils/cache"

export default defineComponent({
  name: "user-info",
  setup() {
    const store = useStore()
    const router = useRouter()

    const userName = computed(() => store.state.login.userInfo.name)
    const userAvatarUrl = computed(() => store.state.login.userInfo.avatar_url)

    const handleExitClick = () => {
      localCache.deleteCache("token")
      router.push("/login")
    }
    return {
      userName,
      userAvatarUrl,
      handleExitClick,
    }
  },
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
</style>
