<template>
  <div class="publishmoment">
    <!-- 动态内容 -->
    <div class="publish-moment-content">
      <el-input
        type="textarea"
        :rows="20"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
    </div>
    <el-divider></el-divider>

    <!-- 展示选中的标签 -->
    <div class="label-list-already" v-if="momentlabelList.size">
      <div class="title">已选中的标签如下：</div>
      <div class="content">
        <el-tag
          class="item"
          v-for="tag in momentlabelList"
          :key="tag.id"
          closable
          @close="handleCloseTag(tag)"
        >
          {{ tag }}
        </el-tag>
      </div>

      <el-divider></el-divider>
    </div>

    <!-- 渲染待添加的标签列表 -->
    <div class="label-list">
      <div class="title">您可以添加标签：</div>
      <div class="content">
        <template v-for="item in labelList" :key="item.id">
          <el-tag
            hit
            disable-transitions
            type="success"
            class="label"
            @click="chooseLabel(item.name)"
          >
            {{ item.name }}
          </el-tag>
        </template>
      </div>
    </div>

    <!-- 标签分页 -->
    <el-pagination
      class="block"
      small
      layout="prev, pager, next"
      :total="50"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
    >
    </el-pagination>

    <!-- 手动添加标签 -->
    <div class="add-list">
      <el-button type="text" @click="dialogVisible = true">
        或许没有你想要的？您可以点击此处创建标签
      </el-button>
      <!-- 显示添加标签的对话框 -->
      <el-dialog title="请输入标签名字" v-model="dialogVisible" width="30%">
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="newLabel"
          maxlength="10"
          show-word-limit
          clearable
        >
        </el-input>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAddNewLable">
              确 定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <el-divider></el-divider>

    <!-- 上传图片 -->
    <el-upload
      ref="upload"
      action=""
      list-type="picture-card"
      :limit="9"
      :auto-upload="false"
      :on-change="handleChange"
      :on-remove="handleRemove"
      multiple
      show-file-list
    >
      <el-icon>
        <plus />
      </el-icon>
    </el-upload>
    <el-divider></el-divider>

    <!-- 底部按钮 -->
    <div class="footer">
      <el-button @click="handleClearMomment" class="reEdit-btn" autofocus>
        重新编辑
      </el-button>
      <el-button @click="handlePublishMomment" class="publish-btn">
        发表动态
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, reactive } from "vue"
import { ElMessage } from "element-plus"
import { useStore } from "@/store/index"
import forceBlur from "@/utils/forceBlur"

export default defineComponent({
  name: "publishMoment",
  setup() {
    const store = useStore()

    //设置初始size和offset
    let size = 10
    let offset = 0

    onMounted(() => {
      //加载标签列表
      store.dispatch("label/getLabelListAction", {
        offset,
        size,
      })
    })

    //当前的标签页数，默认为1
    const currentPage = ref(1)
    //文字区域
    const textarea = ref("")

    //从state里面拿到最新插入的动态的insertId,为了后续的添加图片和添加标签
    const insertId = computed(() => store.state.moment.insertId)

    //从state里面拿到标签列表
    const labelList = computed(() => store.state.label.labelList)

    //待添加的标签列表(使用set为了不重复给动态添加标签)
    const momentlabelList = reactive(new Set())

    //显示添加标签的对话框
    const dialogVisible = ref(false)

    //待添加的新的标签
    const newLabel = ref("")

    //存放上传的图片
    let uploadFileList = reactive<any[]>([])

    //拿到upload组件
    const upload = ref()

    const handleSizeChange = (val: number) => {
      //size就相当于后端的请求中的size
      //修改size
      size = val
      // console.log("size:", size)
      //修改了之后要根据当前最新的size和offset处理请求
      store.dispatch("label/getLabelListAction", {
        offset,
        size,
      })
    }
    const handleCurrentChange = (val: number) => {
      //这个参数是页数，但是是从1开始，后端的offset从0开始，这里还要转化
      offset = (val - 1) * size
      // console.log("offset", offset)
      currentPage.value = val
      //修改了之后要根据当前最新的size和offset处理请求
      store.dispatch("label/getLabelListAction", {
        offset,
        size,
      })
    }

    //重新编辑
    const handleClearMomment = (event: any) => {
      textarea.value = ""
      momentlabelList.clear()
      forceBlur(event)
    }

    //处理标签选择
    const chooseLabel = (labelName: string) => {
      momentlabelList.add(labelName)
    }

    //处理删除已选择的标签
    const handleCloseTag = (labelName: string) => {
      // console.log("待删除的标签为:", labelName)
      momentlabelList.delete(labelName)
      // console.log("删除之后:", momentlabelList)
    }

    //处理手动添加的标签
    const handleAddNewLable = () => {
      //后台已经实现直接再body中携带未新建的标签，会自动经过一个创建标签的中间件
      momentlabelList.add(newLabel.value)
      dialogVisible.value = false
      newLabel.value = ""
    }

    //处理移除文件
    const handleRemove = (file: any, fileList: any) => {
      console.log("file:", file)
      console.log("fileList:", fileList)

      //每次图片数组变化的时候，将数组的全部数据直接保存在新的数组中
      const arr: any[] = []
      fileList.forEach((item: any) => {
        arr.push(item.raw)
      })
      uploadFileList = [...arr]

      console.log("uploadFileList:", uploadFileList)
    }

    //文件上传会调用这个钩子函数
    const handleChange = (file: any, fileList: any) => {
      console.log("file:", file)
      console.log("fileList:", fileList)

      //每次图片数组变化的时候，将数组的全部数据直接保存在新的数组中
      const arr: any[] = []
      fileList.forEach((item: any) => {
        arr.push(item.raw)
      })
      uploadFileList = [...arr]

      console.log("uploadFileList:", uploadFileList)

      //picture是后台接受的字段名
      //文件名 item.name
      //文件 item.raw
    }

    //处理发布动态
    const handlePublishMomment = async (event: any) => {
      const content = textarea.value

      //内容不能为空
      if (!content) {
        ElMessage({
          showClose: true,
          message: "内容不能为空！",
          type: "error",
        })
        return
      }

      //先发表动态，再添加标签和配图
      await store.dispatch("moment/insertMomentAction", content)

      //给动态添加标签
      await store.dispatch("moment/addLabelsToMomentAction", {
        momentId: insertId.value,
        labels: [...momentlabelList],
      })

      //给动态添加配图
      //1.首先判断是否上传了图片，如果上传了图片，将图片存入到formData中

      const formData = new FormData()
      if (uploadFileList) {
        uploadFileList.forEach((item) => {
          console.log("item：", item)
          formData.append("picture", item)
        })
      }
      // console.log(formData.getAll("picture"))
      //2，调用动态配图接口
      //切记切记已经出现过很多次响应式的值忘了带value直接丢过去的问题了
      await store.dispatch("upload/uploadMomentPicturesAction", {
        momentId: insertId.value,
        fileList: formData,
      })

      //提示发布成功且清空内容
      ElMessage({
        showClose: true,
        message: "发布动态成功！",
        type: "success",
      })
      textarea.value = ""
      momentlabelList.clear()
      upload.value.clearFiles()
      forceBlur(event)
    }

    return {
      textarea,
      labelList,
      currentPage,
      momentlabelList,
      dialogVisible,
      newLabel,
      uploadFileList,
      upload,
      handlePublishMomment,
      handleClearMomment,
      handleSizeChange,
      handleCurrentChange,
      chooseLabel,
      handleCloseTag,
      handleAddNewLable,
      handleRemove,
      handleChange,
    }
  },
})
</script>

<style scoped>
.publish-moment-content {
  padding: 20px;
}

.label-list .title {
  text-align: left;
  color: #909399;
  padding: 10px;
  margin-bottom: 10px;
}

.label-list .content {
  display: flex;
  justify-content: space-evenly;
}

.block {
  display: flex;
  justify-content: space-around;
}

.label:hover {
  cursor: pointer;
}

.label-list-already .content {
  display: flex;
  justify-content: flex-start;
}
.label-list-already .content .item {
  margin: 5px 10px;
}

.label-list-already .title {
  text-align: left;
  color: #909399;
  padding: 10px;
}

.footer {
  text-align: right;
}
.reEdit-btn,
.publish-btn {
  margin: 15px;
}
</style>
