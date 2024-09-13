import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const chatRoomUserInfo = defineStore(
  'num',
  () => {
    //个人信息
    const avatar = ref(
      'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/可爱蜘蛛侠.png'
    )
    const userInfo = ref({
      name: '',
      pic: ''
    })
    const setUserInfo = (name, pic) => {
      ;(userInfo.value.name = name), (userInfo.value.pic = pic)
    }
    const removeUserInfo = () => {
      ;(userInfo.value.name = ''), (userInfo.value.pic = '')
    }
    //私人对话聊天
    const privateChatHistory = ref([])
    const addprivateChatHistory = (item) => {
      privateChatHistory.value.push(item)
    }
    const removePrivateChatHistory = () => {
      privateChatHistory.value = []
    }
    const filterPrivateChatList = ref([])
    const setFilterPrivateChatList = (filterArr) => {
      filterPrivateChatList.value = filterArr
    }
    //群聊对话
    const roomChatHistory = ref([])
    const addRoomChatHistory = (item) => {
      roomChatHistory.value.push(item)
    }
    const removeRoomChatHistory = () => {
      roomChatHistory.value = []
    }
    //和ai的聊天历史
    const AIchatlist = ref([
      {
        name: 'AI小天才',
        msg: '你好有什么问题尽管问我哈',
        pic: 'https://mp-e8bb14f6-55c1-481a-9c68-bae5900cd604.cdn.bspapp.com/avatar/智能机器人 - 副本.png'
      }
    ])
    const AIchatlength = computed(() => AIchatlist.value.length - 1)
    const addAIchatlist = (item) => {
      AIchatlist.value.push(item)
    }
    const removeAIchatlist = () => {
      AIchatlist.value = [
        {
          name: 'AI小天',
          msg: '你好我是AI小天!有什么问题尽管问我哈',
          pic: 'https://mp-e8bb14f6-55c1-481a-9c68-bae5900cd604.cdn.bspapp.com/avatar/智能机器人 - 副本.png'
        }
      ]
    }
    return {
      AIchatlist,
      avatar,
      userInfo,
      roomChatHistory,
      filterPrivateChatList,
      AIchatlength,
      addAIchatlist,
      removeAIchatlist,
      setFilterPrivateChatList,
      removePrivateChatHistory,
      removeRoomChatHistory,
      addRoomChatHistory,
      removeUserInfo,
      setUserInfo,
      privateChatHistory,
      addprivateChatHistory
    }
  },
  {
    persist: true
  }
)
