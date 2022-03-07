<template>
  <div class="momentlist">
    <!-- 页面标题 -->
    <h2 class="slogan">Life is short , sharing your moment!</h2>

    <!-- 页面内容 -->
    <div class="page-content">
      <el-row>
        <el-col :span="18">
          <template v-for="item in momentList" :key="item.id">
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
                    <span>评论数:{{ item.commentCount }}</span>
                    <time class="time">{{
                      //这里把utc时间转成标准时间
                      new Date(item.createTime).toLocaleString()
                    }}</time>
                    <el-button
                      type="text"
                      class="button"
                      @click="checkMomentDetail(item.id)"
                      >详情
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
        :total="1000"
      >
      </el-pagination>
    </div>

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

        <!-- 发布评论 -->
        <div class="publish-comment">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
          <el-button @click="handlePublishComment">发表评论</el-button>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue"
import { useStore } from "@/store/index"
import { ElMessage } from "element-plus"
import forceBlur from "@/utils/forceBlur"

export default defineComponent({
  name: "momentList",
  components: {},
  setup() {
    const store = useStore()

    //设置初始size和offset
    let size = 5
    let offset = 0
    onMounted(() => {
      //这里先直接写死偏移量和size
      //初次请求只展示5条数据
      store.dispatch("moment/getMomentListAction", {
        offset,
        size,
      })
    })

    //设置遮罩层
    const drawer = ref(false)

    //当前的页数，默认为1
    const currentPage = ref(1)

    //评论内容
    const textarea = ref("")

    //遮罩层弹出方向
    const direction = ref("rtl")

    //从vuex中获取动态列表和单条动态详情
    const momentList = computed(() => store.state.moment.momentList)
    const sigleMomentDetail = computed(
      () => store.state.moment.singleMomentDetail
    )

    //获取反转后的动态列表（可以显示最新发布的动态）这里不能这么搞，待会搞完其他的再来搞这个
    // const momentList_reverse = momentList.value.reverse()

    const handleSizeChange = (val: number) => {
      //size就相当于后端的请求中的size
      //修改size
      size = val
      // console.log("size:", size)
      //修改了之后要根据当前最新的size和offset处理请求
      store.dispatch("moment/getMomentListAction", {
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
      store.dispatch("moment/getMomentListAction", {
        offset,
        size,
      })
    }

    //显示动态详情
    const checkMomentDetail = (id: number) => {
      // console.log("动态id:", id)
      //拿到动态id之后，展示遮罩层，在遮罩层里面显示动态详情。
      //1.先拿到动态详情数据
      store.dispatch("moment/getSingleMomentDetialAction", id)
      // console.log("单条动态详情：", sigleMomentDetail)

      //2.显示遮罩层
      drawer.value = true
    }

    //提交评论
    const handlePublishComment = async (event: any) => {
      //首先拿到输入框的内容
      const content = textarea.value
      //再拿到需要评论的动态id
      const momentId = store.state.moment.singleMomentDetail?.id

      console.log("content:", content)
      console.log("momentId:", momentId)

      //派发事件(根据动态id发表评论)
      //这里逻辑不是很清晰，由于我在moment里面查单独的动态信息是联合comment来查询
      //所以对应的store里面已经有comment的信息，那么我直接在这里调用comment的service插入新的评论即可
      //本来定义了一个comment的store感觉这里没用上
      //后续如果我搞一个我的评论列表可能在用上这个comment的store
      //这里还是用store吧 好以后修改

      // 1.插入评论,dispatch 返回一个promise 那么这里需要将函数改造成异步函数，加await阻塞，
      // 下面的dispatch也要阻塞，这样才能保证顺序，先发布评论成功，再刷新动态详情更新vuex，才能做到实时响应
      await store.dispatch("comment/publishCommentAction", {
        momentId,
        content,
      })

      //2.刷新vuex中的动态信息和动态列表信息，因为已经增加了一条评论
      await store.dispatch("moment/getSingleMomentDetialAction", momentId)
      await store.dispatch("moment/getMomentListAction", {
        offset,
        size,
      })

      //3.提示添加评论成功
      ElMessage({
        showClose: true,
        message: "评论成功",
        type: "success",
      })

      //4.把textarea的内容清空，等待下一次输入
      textarea.value = ""
      forceBlur(event)
    }

    return {
      size,
      momentList,
      sigleMomentDetail,
      currentPage,
      drawer,
      direction, //控制弹出方向
      textarea,
      handleSizeChange,
      handleCurrentChange,
      checkMomentDetail,
      handlePublishComment,
    }
  },
})
</script>

<style scoped>
.slogan {
  color: #303133;
  font-style: oblique;
}
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
