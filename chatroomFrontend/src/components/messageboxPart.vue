<template>
  <div v-if="!isAI" ref="messageboxRef" class="messagebox">
    <div
      class="msgBox"
      v-for="(item, index) in isPrivate
        ? userStore.filterPrivateChatList
        : userStore.roomChatHistory"
      :key="index"
    >
      <!-- 我的信息（在右边） -->
      <div v-if="item.name === userStore.userInfo.name" class="rightMsg">
        <div class="text">
          <div class="name">{{ item.name }}</div>

          <div
            v-if="item.imgurl"
            class="msg"
            style="max-width: 180px; background-color: transparent"
          >
            <div
              style="
                height: 100%;
                width: 100%;
                border-radius: 10px;
                overflow: hidden;
              "
            >
              <img
                style="height: 100%; width: 100%"
                :src="item.imgurl"
                alt=""
              />
            </div>
          </div>
          <div v-else class="msg">{{ item.msg }}</div>
        </div>

        <div class="avatar">
          <img style="height: 100%; width: 100%" :src="item.pic" alt="" />
        </div>
      </div>
      <!-- 群友信息（在左边） -->
      <div v-else class="leftMsg">
        <div class="avatar">
          <img style="height: 100%; width: 100%" :src="item.pic" alt="" />
        </div>
        <div class="text">
          <div class="name">{{ item.name }}</div>

          <div
            v-if="item.imgurl"
            class="msg"
            style="max-width: 180px; background-color: transparent"
          >
            <div
              style="
                height: 100%;
                width: 100%;
                border-radius: 10px;
                overflow: hidden;
              "
            >
              <img
                style="height: 100%; width: 100%"
                :src="item.imgurl"
                alt=""
              />
            </div>
          </div>
          <div v-else class="msg">{{ item.msg }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else ref="messageboxRef" class="messagebox">
    <div
      class="msgBox"
      v-for="(item, index) in userStore.AIchatlist"
      :key="index"
    >
      <!-- 我的信xi -->
      <div v-if="item.name === userStore.userInfo.name" class="rightMsg">
        <div class="text">
          <div class="name">{{ item.name }}</div>
          <div class="msg">{{ item.msg }}</div>
        </div>

        <div class="avatar">
          <img style="height: 100%; width: 100%" :src="item.pic" alt="" />
        </div>
      </div>

      <!-- AI信息 -->
      <div v-else class="leftMsg">
        <div class="avatar">
          <img style="height: 100%; width: 100%" :src="item.pic" alt="" />
        </div>
        <div class="text">
          <div class="name">{{ item.name }}</div>

          <div class="msg">
            {{ item.msg }}
            <div
              style="
                width: 100%;
                height: 20px;
                /* background-color: pink; */
                margin-top: 2px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
              "
            >
              <div
                @click="copyAIText(item.msg)"
                style="
                  /* background-color: rgb(29, 144, 245); */
                  background-color: transparent;
                  cursor: pointer;
                  /* background-color: rgb(66, 70, 86); */
                  width: fit-content;
                  font-size: small;
                  color: #ccc;
                  height: 18px;
                  font-weight: 500;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-right: 2px;
                "
              >
                <span>点击复制</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isThinking"
      style="
        width: 100%;
        height: 10px;
        margin-top: 25px;
        text-align: center;
        line-height: 10px;
        color: #fff;
        margin-bottom: 20px;
      "
    >
      AI小天正在思考中捏,亲稍等会哈...
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { chatRoomUserInfo } from '@/stores/modules/user'
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  } else {
    const pivot = arr[0]
    const left = []
    const right = []

    for (let i = 1; i < arr.length; i++) {
      arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
    }

    return [...quickSort(left), pivot, ...quickSort(right)]
  }
}
console.log('测试ai的快速排序', quickSort([2, 1, 3, 4]))

const copyAIText = async (item) => {
  await toClipboard(item)
  ElMessage.success('复制成功')
}

defineProps({
  isPrivate: {
    type: Boolean,
    default: false
  },
  isAI: {
    type: Boolean,
    default: false
  },
  isThinking: {
    type: Boolean,
    default: false
  }
})

const userStore = chatRoomUserInfo()
const messageboxRef = ref('')
const scrollbottom = () => {
  console.log('')

  setTimeout(() => {
    let el = messageboxRef.value

    if (el?.scrollHeight) {
      el.scrollTop = el.scrollHeight
    } else {
      console.log('还没有scrollHeight')

      return
    }
  }, 100)
}
defineExpose({
  scrollbottom
})
</script>
<style lang="scss" scoped>
.messagebox {
  width: 100%;
  height: 500px;
  overflow-y: auto;
  padding: 0 40px 20px;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  .msgBox {
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
    display: flex;
    .leftMsg {
      // background-color: gold;
      min-height: 50px;
      min-width: 10px;
      margin-right: auto;
      // display: inline-block;
      display: flex;
      align-items: flex-start;
      position: relative;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 6px;
      }
      .text {
        min-height: 50px;
        min-width: 50px;
        // background-color: goldenrod;
        display: flex;
        flex-direction: column;
        .msg {
          margin-top: 10px;
          background-color: rgb(66, 70, 86);

          min-height: 50px;
          max-width: 300px;
          min-width: 40px;
          border-radius: 0 10px 10px 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8px;
          color: #fff;
          flex-wrap: wrap;
          .highlights {
            border-radius: 10px;
            overflow-x: auto;
            max-width: 284px;
            min-width: 24px;
            height: fit-content;
          }
        }
        .name {
          color: #fff;
          height: 16px;
          font-size: 12px;
          min-width: 40px;
          font-weight: 600;
          // background-color: #ccc;
          display: flex;
          justify-content: flex-start;
        }
      }
    }
    .rightMsg {
      margin-left: auto;
      // background-color: gold;
      min-height: 50px;
      min-width: 10px;
      display: flex;
      align-items: flex-start;
      position: relative;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 6px;
      }

      .text {
        min-height: 50px;
        min-width: 50px;
        // background-color: goldenrod;
        display: flex;
        flex-direction: column;
        .msg {
          margin-top: 10px;
          background-color: rgb(29, 144, 245);
          min-height: 40px;
          max-width: 300px;
          min-width: 40px;
          border-radius: 10px 0 10px 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8px;
          color: #fff;
          flex-wrap: wrap;
        }
        .name {
          color: #fff;
          height: 16px;
          font-size: 12px;
          min-width: 40px;
          font-weight: 600;
          // background-color: #ccc;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
