<template>
  <div class="nav-header">
    <i class="fold-menu" @click="handleFoldChange">
      <template v-if="isFold">
        <el-icon>
          <fold />
        </el-icon>
      </template>
      <template v-else>
        <el-icon>
          <expand />
        </el-icon>
      </template>
    </i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "nav-header",
  emits: ["foldChange"],

  setup(props, { emit }) {
    const isFold = ref(false)

    const handleFoldChange = () => {
      isFold.value = !isFold.value
      emit("foldChange", isFold.value)
    }

    return {
      isFold,
      handleFoldChange,
    }
  },
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px;
  }
}
</style>
