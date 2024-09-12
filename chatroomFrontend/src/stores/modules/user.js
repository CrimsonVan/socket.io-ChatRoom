import { ref } from 'vue'
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
    return {
      avatar,
      userInfo,
      roomChatHistory,
      filterPrivateChatList,
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
