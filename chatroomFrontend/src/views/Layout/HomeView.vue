<template>
  <div class="home">
    <div class="chatWindow">
      <!-- 群员列表 -->
      <div class="leftWindow">
        <div class="empty">
          <!-- 退出聊天室 -->
          <div
            @click="logout"
            style="
              cursor: pointer;
              margin-top: 27px;
              margin-left: 10px;
              color: #fff;
            "
          >
            <el-icon><ArrowLeftBold /></el-icon>
          </div>
        </div>
        <div class="list">
          <div class="leftTitle" style="color: #fff">
            <h2>贝壳网络趣味聊天室</h2>
          </div>
          <div class="roomList">
            <div
              style="
                margin-bottom: 10px;
                margin-top: 20px;
                color: rgb(176, 178, 189);
              "
            >
              群聊名称
            </div>
            <div
              class="roomEnter"
              :class="{ activeEnter: false }"
              @click="enterRoom"
            >
              <avatarPart></avatarPart>
              <span style="color: #fff; margin-left: 20px; font-weight: 400"
                >嗨皮群聊</span
              >

              <span> </span>
            </div>
            <div
              style="
                margin-bottom: 10px;
                margin-top: 20px;
                color: rgb(176, 178, 189);
              "
            >
              群员列表
            </div>
            <!-- :class="{ activeEnter: item.name === userStore.userInfo.name }" -->

            <div
              class="roomEnter"
              @click="otoChat(item)"
              v-for="(item, index) in members"
              :key="index"
              style="margin-top: 10px"
            >
              <div
                style="
                  height: 50px;
                  width: 50px;
                  border-radius: 50%;
                  overflow: hidden;
                "
              >
                <img style="height: 100%; width: 100%" :src="item.pic" alt="" />
              </div>
              <span style="color: #fff; margin-left: 20px; font-weight: 400">{{
                item.name
              }}</span>
              <span
                v-if="item.name === userStore.userInfo.name"
                style="color: #fff; margin-left: 20px; font-weight: 400"
                >(我){{ mysocketId }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 群聊区域 -->
      <div class="rightWindow">
        <!-- 聊天室名称 -->
        <div v-if="!isPrivateValue" class="roomTitle">
          <div class="titlespace">
            <avatarPart></avatarPart>
            <div class="roomName">嗨皮群聊({{ chatRoomNum }})</div>
          </div>
        </div>
        <!-- 聊天对象名字 -->
        <div v-else class="roomTitle">
          <div class="titlespace">
            <div
              style="
                height: 50px;
                width: 50px;
                border-radius: 50%;
                overflow: hidden;
              "
            >
              <img
                style="height: 100%; width: 100%"
                :src="otoUser.pic"
                alt=""
              />
            </div>
            <div class="roomName">{{ otoUser.name }}</div>
          </div>
        </div>
        <!-- 聊天区域 -->
        <div class="chat">
          <div class="chatroom">
            <messageboxPart
              :isPrivate="isPrivateValue"
              ref="messageBoxPartRef"
            ></messageboxPart>
            <!-- 发送按钮 -->
            <div class="send">
              <div class="chatInputs">
                <input v-model="inpMsg" class="inp" />
                <div class="sendBtn" @click="sendMsg">
                  <img
                    style="width: 65%; height: 65%"
                    src="../../assets/images/img/emoji/rocket.png"
                    alt=""
                  />
                </div>
                <div class="sendBtn">
                  <img
                    style="width: 100%; height: 90%; text-align: center"
                    src="../../assets/images/img/相机.png"
                    alt=""
                  />
                  <input
                    class="inputImg"
                    style="height: 50px; width: 50px"
                    @change="sendImg($event)"
                    type="file"
                  />
                </div>

                <div class="sendBtn">
                  <el-popover
                    popper-class="monitor-yt-popover"
                    placement="top-start"
                    :width="400"
                    @click="openEmoji"
                    v-model:visible="isEmojiVisible"
                  >
                    <div
                      style="
                        /* background-color: rgb(29, 144, 245); */

                        width: 100%;
                        height: 160px;

                        display: flex;
                        flex-wrap: wrap;
                      "
                    >
                      <div
                        v-for="(item, index) in emojiList"
                        :key="index"
                        style="
                          width: 20%;
                          height: 80px;

                          cursor: pointer;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        "
                      >
                        <img
                          @click="sendEmoji(item)"
                          style="width: 85%; height: 82%"
                          :src="item"
                          alt=""
                        />
                      </div>
                    </div>
                    <template #reference>
                      <img
                        style="width: 86%; height: 80%; text-align: center"
                        src="../../assets/images/img/emoji/clown-face.png"
                        alt=""
                      />
                    </template>
                  </el-popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import avatarPart from '@/components/avatarPart.vue'
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'
import { useRouter } from 'vue-router'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { chatRoomUserInfo } from '@/stores/modules/user'
import messageboxPart from '@/components/messageboxPart.vue'
// import { isVisible } from 'element-plus/es/utils'
const router = useRouter()
const messageBoxPartRef = ref('')
const userStore = chatRoomUserInfo()
const isEmojiVisible = ref(false)
// const showChatWindow = ref(true)
const chatRoomNum = ref(0)
const otoUser = ref({})
const activeIndex = ref(0)
const index = ref(1)
const isPrivateValue = ref(false)
const inpMsg = ref(null)
const members = ref([])
const mysocketId = ref(null)
const imgurl = ref(null)
const emojiList = ref([
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/emoji/face-vomiting.png',
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/emoji/lips.png',
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/emoji/jack-o-lantern.png',
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/emoji/loudly-crying-face.png',
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/emoji/ghost.png',
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/emoji/face-with-tongue.png',
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/emoji/clown-face.png',
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/emoji/face-screaming-in-fear.png',
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/emoji/slightly-smiling-face.png'
])
const openEmoji = () => {
  isEmojiVisible.value = true
}
let socket = io(`http://127.0.0.1:3008`, {
  autoConnect: false
})

const logout = () => {
  socket.disconnect() // 断开连接
  router.push('/login')
  userStore.removeUserInfo()

  userStore.removePrivateChatHistory()
  userStore.removeRoomChatHistory()
}
const enterRoom = () => {
  isPrivateValue.value = false
  activeIndex.value = index.value
  messageBoxPartRef.value.scrollbottom()
}

const sendMsg = () => {
  if (!inpMsg.value && !imgurl.value) {
    ElMessage.error('输入不准为空')
    return
  }
  if (!isPrivateValue.value) {
    const sendform = {
      myself: true,
      pic: userStore.userInfo.pic,
      name: userStore.userInfo.name,
      msg: inpMsg.value
    }
    if (imgurl.value) {
      sendform.imgurl = imgurl.value
    }
    // chatList.value.push(sendform)
    userStore.addRoomChatHistory(sendform)
    console.log('打印群聊信息存储', userStore.roomChatHistory)

    // scrollbottom()
    messageBoxPartRef.value.scrollbottom()
    socket.emit('message', sendform)
    inpMsg.value = null
  } else {
    const sendform = {
      myself: true,
      pic: userStore.userInfo.pic,
      name: userStore.userInfo.name,
      msg: inpMsg.value,
      id: otoUser.value.id,
      otoname: otoUser.value.name
    }
    if (imgurl.value) {
      sendform.imgurl = imgurl.value
    }
    // privateChatList.value.push(sendform)
    userStore.addprivateChatHistory(sendform)

    console.log('打印pinia里的历史一对一对话', userStore.privateChatHistory)
    //过滤后只有 我发给现在的聊天对象的 和 现在的聊天对象发给我的 对话列表
    let res = userStore.privateChatHistory.filter(
      (item) =>
        (item.otoname === otoUser.value.name &&
          item.name === userStore.userInfo.name) ||
        (item.otoname === userStore.userInfo.name &&
          item.name === otoUser.value.name)
    )
    userStore.setFilterPrivateChatList(res)
    // scrollbottom()
    messageBoxPartRef.value.scrollbottom()

    socket.emit('sendPrivate', sendform)
    inpMsg.value = null
  }
}
const sendImg = (event) => {
  let selectedFile = event.target.files[0]
  console.log('打印上传图片', event.target.files[0])
  let fr = new FileReader()
  fr.readAsDataURL(selectedFile)
  fr.onload = function () {
    console.log('打印base64格式图片', fr.result)
    if (fr.result) {
      imgurl.value = fr.result
      sendMsg()
      imgurl.value = null
    }
  }
}
const sendEmoji = (item) => {
  isEmojiVisible.value = false
  imgurl.value = item
  sendMsg()

  imgurl.value = null
}
const otoChat = (item) => {
  isPrivateValue.value = true
  messageBoxPartRef.value.scrollbottom()
  otoUser.value.name = item.name
  otoUser.value.pic = item.pic
  otoUser.value.id = item.uid
  //过滤后只有 我发给现在的聊天对象的 和 现在的聊天对象发给我的 对话列表
  let res = userStore.privateChatHistory.filter(
    (item) =>
      (item.otoname === otoUser.value.name &&
        item.name === userStore.userInfo.name) ||
      (item.otoname === userStore.userInfo.name &&
        item.name === otoUser.value.name)
  )
  userStore.setFilterPrivateChatList(res)
}
onMounted(() => {
  socket.connect() // 连接
  socket.on('connect', () => {
    // 监听后端的news
    socket.on('news', (msg) => {
      console.log('打印服务器返回的消息', msg.news)
    })

    socket.emit('join', userStore.userInfo)
    // scrollbottom()
    messageBoxPartRef.value.scrollbottom()

    socket.on('welcome', (roommates) => {
      chatRoomNum.value = roommates.length
      let res = roommates.find((item) => item.name === userStore.userInfo.name)
      mysocketId.value = res?.uid
      members.value = roommates.filter(
        (item) => item.name !== userStore.userInfo.name
      )
      //更新id后再次修改所聊天者信息
      if (otoUser.value.name) {
        let res = members.value.find((item) => item.name === otoUser.value.name)
        console.log('更新跟你聊天的对象', res)
        otoUser.value.name = res?.name
        otoUser.value.id = res?.uid
      }

      console.log('打印自己的uid', mysocketId)
    })
    socket.on('myself', (roommates) => {
      // mysocketId.value = roommates.find(
      //   (item) => item.name === userStore.userInfo.name
      // ).uid
      chatRoomNum.value = roommates.length
      let res = roommates.find((item) => item.name === userStore.userInfo.name)
      mysocketId.value = res?.uid
      members.value = roommates.filter(
        (item) => item.name !== userStore.userInfo.name
      )
      //更新id后再次修改所聊天者信息
      if (otoUser.value.name) {
        let res = members.value.find((item) => item.name === otoUser.value.name)
        console.log('更新跟你聊天的对象', res)
        otoUser.value.name = res?.name
        otoUser.value.id = res?.uid
      }
      console.log('打印自己的uid', mysocketId)
    })
    socket.on('backMsg', (msg) => {
      messageBoxPartRef.value.scrollbottom()

      console.log('打印服务器广播的消息', msg)
      // chatList.value.push(msg)
      userStore.addRoomChatHistory(msg)
      console.log('打印群聊信息存储', userStore.roomChatHistory)
    })
    socket.on('backPrivateMsg', (sendform) => {
      // scrollbottom()
      messageBoxPartRef.value.scrollbottom()

      // console.log('打印服务器一对一私聊返回结果', sendform)
      // privateChatList.value.push(sendform)
      userStore.addprivateChatHistory(sendform)
      console.log('private长度', userStore.privateChatHistory.length)
      let res = userStore.privateChatHistory.filter(
        (item) =>
          (item.otoname === otoUser.value.name &&
            item.name === userStore.userInfo.name) ||
          (item.otoname === userStore.userInfo.name &&
            item.name === otoUser.value.name)
      )
      userStore.setFilterPrivateChatList(res)
      console.log('filterPrivate长度', userStore.filterPrivateChatList.length)
    })
  })
})
</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-color: #979da7;
  display: flex;
  justify-content: center;
  align-items: center;

  .chatWindow {
    background-color: #272a37;
    width: 90vw;
    height: 88vh;
    border-radius: 16px;
    display: flex;
    overflow: hidden;
    .leftWindow {
      width: 400px;
      height: 100%;
      // background-color: pink;
      display: flex;
      .empty {
        width: 140px;
        height: 100%;
        // background-color: cornflowerblue;
      }
      .list {
        flex: 1;
        // background-color: sandybrown;
        display: flex;
        flex-direction: column;
        .leftTitle {
          width: 100%;
          height: 80px;
          // background-color: palegoldenrod;
        }
        .roomList {
          flex: 1;
          // background-color: seagreen;
          .roomEnter {
            width: 100%;
            height: 80px;
            border-radius: 10px;
            background-color: rgb(50, 54, 68);
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            padding-left: 10px;
            transition: 0.3s;
            // box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);
            cursor: pointer;
            // &:hover {
            //   box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
            //   background-color: rgb(29, 144, 245);
            // }
          }
          .activeEnter {
            box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
            background-color: rgb(29, 144, 245);
          }
        }
      }
    }
    .rightWindow {
      flex: 1;
      display: flex;
      flex-direction: column;
      .roomTitle {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        padding-top: 10px;
        .titlespace {
          width: 94%;
          height: 100%;
          display: flex;
          .roomAvatar {
            width: 50px;
            height: 50px;
            background-color: #272a37;
            border-radius: 50%;
            border: 2px solid rgb(255, 255, 255);
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

            &::before {
              content: '';
              width: 15px;
              height: 15px;
              z-index: 1;
              display: block;
              border-radius: 50%;
              background-color: rgb(144, 225, 80);
              position: absolute;
              right: 0;
              top: 0;
            }
            .avatarImg {
              width: 42px;
              height: 42px;
              border-radius: 50%;
              overflow: hidden;
            }
          }
          .roomName {
            min-width: 80px;
            height: 40px;
            margin-left: 20px;
            margin-top: 5px;
            font-size: 20px;
            font-weight: 600;
            color: #fff;
          }
        }
      }
      .chat {
        flex: 1;
        // background-color: cornflowerblue;
        display: flex;
        justify-content: center;
        align-items: center;
        .chatroom {
          width: 94%;
          height: 90%;
          background-color: #323644;
          border-radius: 16px;
          display: flex;
          flex-direction: column;

          // .messagebox {
          //   // background-color: #fff;
          //   // flex: 1;
          //   width: 100%;
          //   height: 500px;
          //   overflow-y: auto;

          //   padding: 0 40px 20px;
          //   // overflow: hidden;
          //   &::-webkit-scrollbar {
          //     width: 0;
          //     height: 0;
          //     display: none;
          //   }
          //   .msgBox {
          //     width: 100%;
          //     min-height: 110px;
          //     // background-color: pink;
          //     margin-top: 40px;
          //     display: flex;
          //     .leftMsg {
          //       // background-color: gold;
          //       min-height: 110px;
          //       min-width: 10px;
          //       margin-right: auto;
          //       // display: inline-block;
          //       display: flex;
          //       align-items: flex-start;
          //       position: relative;

          //       .avatar {
          //         width: 50px;
          //         height: 50px;
          //         border-radius: 50%;
          //         overflow: hidden;
          //         margin-right: 6px;
          //       }
          //       .text {
          //         min-height: 70px;
          //         min-width: 50px;
          //         // background-color: goldenrod;
          //         display: flex;
          //         flex-direction: column;
          //         .msg {
          //           margin-top: 10px;
          //           background-color: rgb(66, 70, 86);

          //           min-height: 40px;
          //           max-width: 300px;
          //           min-width: 40px;
          //           border-radius: 10px 0 10px 10px;
          //           display: flex;
          //           justify-content: center;
          //           align-items: center;
          //           padding: 8px;
          //           color: #fff;
          //           flex-wrap: wrap;
          //         }
          //         .name {
          //           color: #fff;
          //           height: 16px;
          //           font-size: 12px;
          //           min-width: 40px;
          //           font-weight: 600;
          //           // background-color: #ccc;
          //           display: flex;
          //           justify-content: flex-start;
          //         }
          //       }
          //     }
          //     .rightMsg {
          //       margin-left: auto;
          //       // background-color: gold;
          //       min-height: 110px;
          //       min-width: 10px;
          //       display: flex;
          //       align-items: flex-start;
          //       position: relative;
          //       .avatar {
          //         width: 50px;
          //         height: 50px;
          //         border-radius: 50%;
          //         overflow: hidden;
          //         margin-left: 6px;
          //       }

          //       .text {
          //         min-height: 70px;
          //         min-width: 50px;
          //         // background-color: goldenrod;
          //         display: flex;
          //         flex-direction: column;
          //         .msg {
          //           margin-top: 10px;
          //           background-color: rgb(29, 144, 245);
          //           min-height: 40px;
          //           max-width: 300px;
          //           min-width: 40px;
          //           border-radius: 10px 0 10px 10px;
          //           display: flex;
          //           justify-content: center;
          //           align-items: center;
          //           padding: 8px;
          //           color: #fff;
          //           flex-wrap: wrap;
          //         }
          //         .name {
          //           color: #fff;
          //           height: 16px;
          //           font-size: 12px;
          //           min-width: 40px;
          //           font-weight: 600;
          //           // background-color: #ccc;
          //           display: flex;
          //           justify-content: flex-end;
          //         }
          //       }
          //     }
          //   }
          // }
          .send {
            width: 100%;
            height: 80px;
            // background-color: slateblue;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            .chatInputs {
              width: 90%;
              height: 50px;
              // background-color: gold;
              display: flex;
              justify-content: space-around;
              .inp {
                width: 76%;
                height: 50px;
                background-color: rgb(66, 70, 86);
                border-radius: 12px;
                border: 2px solid rgb(34, 135, 225);
                font-size: 20px;
                color: #fff;
                font-weight: 100;
                // margin: 0 20px;
                padding: 10px;
                &:focus {
                  outline: none;
                }
              }

              .sendBtn {
                background-color: rgb(29, 144, 245);
                height: 50px;
                width: 50px;
                border-radius: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: 0.3s;
                box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);
                cursor: pointer;
                position: relative;

                .inputImg {
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  bottom: 0;
                  right: 0;
                  opacity: 0;
                  cursor: pointer;
                }
                &:hover {
                  box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style>
.el-popover.monitor-yt-popover {
  border-color: rgb(29, 144, 245);
  background-color: rgb(29, 144, 245);
}
</style>
