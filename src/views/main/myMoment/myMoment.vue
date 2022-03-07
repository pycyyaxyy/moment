<template>
  <div class="mymoment">
    <!-- 动态列表 -->
    <div class="page-content">
      <el-row>
        <el-col :span="18">
          <template
            v-for="item in userMoment.slice(
              (currentPage - 1) * size,
              currentPage * size
            )"
            :key="item.id"
          >
            <div class="cardItem">
              <el-card :body-style="{ padding: '20px' }">
                <template v-if="item.images">
                  <el-image
                    style="width: 250px; height: 250px"
                    :src="item.images[0]"
                    :preview-src-list="item.images"
                  ></el-image>
                  <el-divider></el-divider>
                </template>
                <!-- 卡片的文字内容 -->
                <div style="padding: 14px">
                  <div>
                    <span>{{ item.content }}</span>
                  </div>

                  <div class="bottom">
                    <span class="author">
                      <el-avatar
                        class="authorAvatar"
                        shape="circle"
                        :size="30"
                        :src="item.author.avatarUrl"
                      ></el-avatar>
                      {{ item.author.name }}
                    </span>

                    <span v-if="item.comments">
                      评论数:{{ item.comments.length }}
                    </span>
                    <span v-else> 评论数:0 </span>
                    <time class="time">
                      发布日期：
                      {{
                        //这里把utc时间转成标准时间
                        new Date(item.createTime).toLocaleString()
                      }}
                    </time>

                    <time class="time">
                      更新日期：
                      {{
                        //这里把utc时间转成标准时间
                        new Date(item.updateTime).toLocaleString()
                      }}
                    </time>
                    <el-button
                      type="text"
                      class="button"
                      @click="checkMomentDetail(item.id)"
                      >详情
                    </el-button>
                    <el-button
                      type="text"
                      class="button"
                      @click="editMomentDetail(item.id)"
                      >编辑内容
                    </el-button>

                    <el-button
                      type="text"
                      class="button"
                      @click="deleteMomentDetail(item.id)"
                      >删除
                    </el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </template>
        </el-col>
      </el-row>
    </div>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="size"
        layout=" sizes, prev, pager, next, jumper"
        :total="totalMomentNum"
      >
      </el-pagination>
    </div>

    <!-- 展示动态详情 -->
    <!-- 动态详情 -->
    <div class="moment-detail">
      <el-drawer
        title="动态详情"
        v-model="drawer"
        :direction="direction"
        size="50%"
        destroy-on-close
      >
        <!-- 展示评论详情中的图片 -->
        <template v-if="sigleMomentDetail.images">
          <div class="picture">
            <template v-for="item in sigleMomentDetail.images" :key="item">
              <span class="picture-item">
                <el-image
                  :src="item"
                  style="width: 150px; height: 150px"
                ></el-image>
              </span>
            </template>
          </div>
          <el-divider></el-divider>
        </template>

        <!-- 展示动态详情中的标签内容 -->
        <template v-if="sigleMomentDetail.labels">
          <div class="labels">
            <template v-for="item in sigleMomentDetail.labels" :key="item.id">
              <el-tag type="warning">{{ item.name }}</el-tag>
            </template>
          </div>
          <el-divider></el-divider>
        </template>

        <!-- 展示动态详情中的内容 -->
        <div class="content">
          <p>{{ sigleMomentDetail.content }}</p>
        </div>
        <el-divider></el-divider>

        <!-- 展示评论列表 -->
        <template v-if="sigleMomentDetail.comments">
          <div class="comments">
            <template v-for="item in sigleMomentDetail.comments" :key="item.id">
              <div class="comment-item">
                <span class="author">
                  <el-avatar
                    class="authorAvatar"
                    shape="circle"
                    :size="30"
                    :src="item.user.avatarUrl"
                  ></el-avatar>
                  {{ item.user.name }}
                </span>
                <span>: &nbsp; </span>
                {{ item.content }}
              </div>
            </template>
          </div>
          <el-divider></el-divider>
        </template>
      </el-drawer>
    </div>

    <!-- 展示编辑动态页面 -->
    <el-dialog title="提示" v-model="dialogVisible" width="70%">
      <!-- 动态内容 -->
      <div class="publish-moment-content">
        <el-input
          type="textarea"
          :rows="18"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
      </div>
      <el-divider></el-divider>

      <!-- 最后两个按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit"> 确 定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue"
import { useStore } from "@/store/index"
import { ElMessage } from "element-plus"

export default defineComponent({
  name: "myMoment",
  setup() {
    const store = useStore()

    //之前在登录的时候就已经请求过一次用户的动态信息，但是那个应该是不准确的，
    //因为用户在后面可能会添加动态等，所以加载这个组件的时候需要再发送一次网络请求，获得最新的用户动态信息

    const userId = computed(() => store.state.login.userInfo.id)

    onMounted(() => {
      //获取用户的动态列表
      store.dispatch("login/getUserMomentListAction", userId.value)
    })

    //用户动态列表，这里如果数据量大，但是由于后端我没有写分页，我就采用前端分页的方式进行
    const userMoment = computed(() => store.state.login.userMoment)

    //分页操作
    //当前的页数，默认为1
    const currentPage = ref(1)
    //一页的动态数量，默认为5
    const size = ref(5)
    //总的动态数量(这里由于上面的取动态列表会有延迟,所以这里需要搞一个响应式)
    const totalMomentNum = computed(() => store.state.login.userMoment.length)
    const handleSizeChange = (val: number) => {
      // console.log(`每页r${val}条`)
      size.value = val
    }
    const handleCurrentChange = (val: number) => {
      currentPage.value = val
    }

    //展示动态详情
    //从vuex里面拿到单条动态
    const sigleMomentDetail = computed(
      () => store.state.moment.singleMomentDetail
    )
    //设置遮罩层
    const drawer = ref(false)
    //遮罩层弹出方向
    const direction = ref("rtl")

    //点击查看详情
    const checkMomentDetail = (momentId: number) => {
      // console.log("展示动态详情")
      // console.log("动态id:", id)
      //拿到动态id之后，展示遮罩层，在遮罩层里面显示动态详情。
      //1.先拿到动态详情数据
      store.dispatch("moment/getSingleMomentDetialAction", momentId)
      // console.log("单条动态详情：", sigleMomentDetail)

      //2.显示遮罩层
      drawer.value = true
    }

    //编辑动态内容
    const dialogVisible = ref(false)
    const textarea = ref("")
    //开始编辑
    const editMomentDetail = async (momentId: number) => {
      console.log("要编辑的动态的momentId:", momentId)

      //显示编辑动态界面
      dialogVisible.value = true

      //动态界面应该要展示动态的详情
      //1.先拿到动态详情数据
      await store.dispatch("moment/getSingleMomentDetialAction", momentId)

      //2.把原先的表单数据全部填充进去
      //2.1填充原来的content
      const originContent = computed(
        () => store.state.moment.singleMomentDetail?.content
      )
      textarea.value = originContent.value!

      //2.2填充原来已经选择的标签，注意这里已经不能再删除原先已经选择的标签
      //未完待续  这里不做这么复杂了 仅仅就修改一下动态内容算了
      //后续要把组件抽取一下才好做，现在太乱了，很难做
    }

    //确认编辑
    const submitEdit = async () => {
      //1.拿到当前编辑的动态的id
      const momentId = computed(() => store.state.moment.singleMomentDetail?.id)
      console.log("要确认修改的动态id:", momentId.value)

      //2.编辑动态
      await store.dispatch("moment/patchMomentAction", {
        momentId: momentId.value,
        content: textarea.value,
      })

      //3.刷新当前的动态列表，重新更新vuex
      await store.dispatch("login/getUserMomentListAction", userId.value)

      //4.显示提示框，并关闭编辑界面
      ElMessage({
        showClose: true,
        message: "修改动态成功",
        type: "success",
      })
      dialogVisible.value = false
    }

    //删除动态
    const deleteMomentDetail = async (momentId: number) => {
      console.log(`删除动态的id为${momentId}`)
      //1.删除动态
      await store.dispatch("moment/deleteMomentAction", momentId)
      //2.重新更新vuex数据
      await store.dispatch("login/getUserMomentListAction", userId.value)
      //3.提示删除动态成功
      ElMessage({
        showClose: true,
        message: "删除动态成功",
        type: "success",
      })
    }

    return {
      userMoment,
      totalMomentNum,
      currentPage,
      size,
      sigleMomentDetail,
      drawer,
      direction,
      dialogVisible,
      textarea,
      handleSizeChange,
      handleCurrentChange,
      editMomentDetail,
      checkMomentDetail,
      deleteMomentDetail,
      submitEdit,
    }
  },
})
</script>

<style scoped>
.momentlist {
  padding: 10px;
  background: rgba(203, 204, 190, 0.4);
}

.page-content {
  margin: 10px auto;
}
.el-row {
  justify-content: space-around;
}
.cardItem {
  margin: 20px 0;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #999;
}

.authorAvatar {
  vertical-align: middle;
}
.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 50%;
  display: block;
}

.block {
  display: flex;
  justify-content: space-around;
}
.moment-detail .picture {
  display: flex;
  justify-content: space-around;
  flex-flow: wrap;
  align-content: space-around;
}
.picture-item {
  margin: 20px 20px;
}

.labels {
  display: flex;
  justify-content: space-evenly;
}

.moment-detail .content {
  padding: 10px;
}

.comments {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.comment-item {
  margin: 5px 2px;
}

.publish-comment {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
