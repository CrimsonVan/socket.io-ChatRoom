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
            <h2>网络实时聊天室</h2>
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
            <div
              style="
                margin-bottom: 10px;
                margin-top: 20px;
                color: rgb(176, 178, 189);
              "
            >
              AI小天才
            </div>
            <div @click="chatToAI" class="roomEnter" style="margin-top: 10px">
              <div
                style="
                  height: 50px;
                  width: 50px;
                  border-radius: 50%;
                  overflow: hidden;
                "
              >
                <img
                  style="height: 100%; width: 100%; background-color: #fff"
                  src="https://mp-e8bb14f6-55c1-481a-9c68-bae5900cd604.cdn.bspapp.com/avatar/智能机器人 - 副本.png"
                  alt=""
                />
              </div>
              <span style="color: #fff; margin-left: 20px; font-weight: 400"
                >AI小天才</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 群聊区域 -->
      <div class="rightWindow">
        <!-- 聊天室名称 -->
        <div v-if="!isPrivateValue && !isAI" class="roomTitle">
          <div class="titlespace">
            <avatarPart></avatarPart>
            <div class="roomName">嗨皮群聊({{ chatRoomNum }})</div>
          </div>
        </div>
        <!-- AI名字 -->
        <div v-else-if="isAI" class="roomTitle">
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
                src="https://mp-e8bb14f6-55c1-481a-9c68-bae5900cd604.cdn.bspapp.com/avatar/智能机器人 - 副本.png"
                alt=""
              />
            </div>
            <div class="roomName">AI小天</div>
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
              :isAI="isAI"
              :isThinking="isThinking"
              ref="messageBoxPartRef"
            ></messageboxPart>
            <!-- 发送按钮 -->
            <!-- 非AI版本 -->
            <div v-if="!isAI" class="send">
              <div class="chatInputs">
                <input v-model="inpMsg" class="inp" />
                <div class="sendBtn" @click="sendMsg">
                  <img
                    style="width: 65%; height: 65%"
                    src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/emoji/rocket.png"
                    alt=""
                  />
                </div>
                <div class="sendBtn">
                  <img
                    style="width: 100%; height: 90%; text-align: center"
                    src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/emoji/相机.png"
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
                        src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/emoji/clown-face.png"
                        alt=""
                      />
                    </template>
                  </el-popover>
                </div>
              </div>
            </div>
            <!-- AI版本 -->
            <div v-else class="send">
              <div class="chatInputs">
                <input v-model="inpMsg" style="width: 92%" class="inp" />
                <div class="sendBtn" @click="sendMsg">
                  <img
                    style="width: 65%; height: 65%"
                    src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/emoji/rocket.png"
                    alt=""
                  />
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
import * as base64 from 'base-64'
import CryptoJs from 'crypto-js'
// import { isVisible } from 'element-plus/es/utils'
const router = useRouter()
const messageBoxPartRef = ref('')
const userStore = chatRoomUserInfo()
const isEmojiVisible = ref(false)
const isThinking = ref(false)
const isAI = ref(false)
const chatRoomNum = ref(0)
const otoUser = ref({})
const activeIndex = ref(0)
const index = ref(1)
const isPrivateValue = ref(false)
const inpMsg = ref(null)
const members = ref([])
const mysocketId = ref(null)
const imgurl = ref(null)
let requestObj = {
  APPID: '030bc106',
  APISecret: 'Mjg0MmNiYTExOWQxMzY4OTM5MDE1ZTE2',
  APIKey: 'dba9b5fea20fd102ec1e854547e56d4f',
  Uid: 'red润',
  sparkResult: ''
}
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
  if (isAI.value) {
    return
  }
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
  userStore.removeAIchatlist()
}
const enterRoom = () => {
  isAI.value = false
  isPrivateValue.value = false
  activeIndex.value = index.value
  messageBoxPartRef.value.scrollbottom()
}

const sendMsg = async () => {
  if (!inpMsg.value && !imgurl.value) {
    ElMessage.error('输入不准为空')
    return
  }
  // console.log('打印ai', isAI.value)
  if (!isAI.value) {
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
  } else {
    isThinking.value = true
    console.log('开始和ai对话')
    const sendMsg = {
      name: userStore.userInfo.name,
      msg: inpMsg.value,
      pic: userStore.userInfo.pic
    }
    userStore.addAIchatlist(sendMsg)
    inpMsg.value = ''
    messageBoxPartRef.value.scrollbottom()
    let myUrl = await getWebsocketUrl()
    console.log('测试获取myUrl', myUrl)
    let socket = new WebSocket(myUrl)
    socket.onopen = (event) => {
      console.log('开启连接！！', event)

      // 发送消息
      let params = {
        header: {
          app_id: requestObj.APPID,
          uid: 'redrun'
        },
        parameter: {
          chat: {
            domain: 'general',
            temperature: 0.5,
            max_tokens: 1024
          }
        },
        payload: {
          message: {
            // 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
            // 注意：text里面的所有content内容加一起的tokens需要控制在8192以内，开发者如有较长对话需求，需要适当裁剪历史信息
            text: [
              { role: 'user', content: '你是谁' }, //# 用户的历史问题
              { role: 'assistant', content: '我是AI助手' }, //# AI的历史回答结果
              // ....... 省略的历史对话
              { role: 'user', content: sendMsg.msg } //# 最新的一条问题，如无需上下文，可只传最新一条问题
            ]
          }
        }
      }
      console.log('发送消息')
      socket.send(JSON.stringify(params))
    }
    const AISendMsg = {
      name: 'AI小天才',
      msg: '',
      pic: 'https://mp-e8bb14f6-55c1-481a-9c68-bae5900cd604.cdn.bspapp.com/avatar/智能机器人 - 副本.png'
    }
    let AIreply = ''
    socket.addEventListener('message', (event) => {
      let data = JSON.parse(event.data)
      console.log('收到消息！！', data)
      // requestObj.sparkResult += data.payload.choices.text[0].content
      if (data.header.code !== 0) {
        isThinking.value = false
        console.log('出错了', data.header.code, ':', data.header.message)
        AISendMsg.msg = data.header.message
        userStore.addAIchatlist(AISendMsg)
        messageBoxPartRef.value.scrollbottom()

        // 出错了"手动关闭连接"
        socket.close()
      }
      if (data.header.code === 0) {
        //ai输出第一句话时候
        if (data.payload.choices.text && data.header.status === 0) {
          isThinking.value = false
          AISendMsg.msg = data.payload.choices.text[0].content
          AIreply = data.payload.choices.text[0].content
          userStore.addAIchatlist(AISendMsg)
          console.log('打印长度减一', userStore.AIchatlength)

          messageBoxPartRef.value.scrollbottom()
        }
        //ai发送进行中
        if (data.payload.choices.text && data.header.status === 1) {
          AIreply += data.payload.choices.text[0].content
          console.log('打印AIreply', AIreply)

          userStore.AIchatlist[userStore.AIchatlength].msg = AIreply
          messageBoxPartRef.value.scrollbottom()
        }
        // 对话已经完成
        if (data.payload.choices.text && data.header.status === 2) {
          AIreply += data.payload.choices.text[0].content
          console.log('打印AIreply', AIreply)

          userStore.AIchatlist[userStore.AIchatlength].msg = AIreply
          // requestObj.sparkResult += data.payload.choices.text[0].content;
          setTimeout(() => {
            // "对话完成，手动关闭连接"
            AIreply = ''
            socket.close()
          }, 1000)

          messageBoxPartRef.value.scrollbottom()
        }
      }
      // addMsgToTextarea(requestObj.sparkResult);
    })
    socket.addEventListener('close', (event) => {
      console.log('连接关闭！！', event)
      // 对话完成后socket会关闭，将聊天记录换行处理
      // requestObj.sparkResult = requestObj.sparkResult + "&#10;"
      // addMsgToTextarea(requestObj.sparkResult);
      // 清空输入框
      // questionInput.value = ''
    })
    socket.addEventListener('error', (event) => {
      console.log('连接发送错误！！', event)
    })
  }
}
// 鉴权url地址
const getWebsocketUrl = () => {
  return new Promise((resovle) => {
    let url = 'wss://spark-api.xf-yun.com/v1.1/chat'
    // let url = "wss://spark-api.xf-yun.com/v3/chat";

    let host = 'spark-api.xf-yun.com'
    let apiKeyName = 'api_key'
    let date = new Date().toGMTString()
    let algorithm = 'hmac-sha256'
    let headers = 'host date request-line'
    let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`
    // let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v3/chat HTTP/3`;

    let signatureSha = CryptoJs.HmacSHA256(
      signatureOrigin,
      requestObj.APISecret
    )
    let signature = CryptoJs.enc.Base64.stringify(signatureSha)

    let authorizationOrigin = `${apiKeyName}="${requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`

    let authorization = base64.encode(authorizationOrigin)

    // 将空格编码
    url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`

    resovle(url)
  })
}
const sendImg = (event) => {
  console.log('打印isAI状态', isAI.value)

  if (isAI.value) {
    return
  }
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
  console.log('打印isAI状态', isAI.value)

  if (isAI.value) {
    return
  }
  isEmojiVisible.value = false
  imgurl.value = item
  sendMsg()

  imgurl.value = null
}
const otoChat = (item) => {
  isAI.value = false
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
const chatToAI = () => {
  console.log('测试打开ai')

  isAI.value = true
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
