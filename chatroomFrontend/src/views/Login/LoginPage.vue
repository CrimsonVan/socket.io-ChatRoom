<template>
  <div class="home">
    <div class="chatWindow">
      <div class="loginForm">
        <!-- 用户头像选择 -->
        <div class="formTop">
          <div class="roomAvatar">
            <div class="avatarImg">
              <img style="width: 100%; height: 100%" :src="pic" alt="" />
            </div>
          </div>
          <div class="arrowDown" @click="selectAvatar">
            <el-icon><ArrowDown /></el-icon>
          </div>
        </div>
        <div class="formBottom">
          <input
            v-model="username"
            type="text"
            class="inp"
            placeholder="请输入一个名字"
          />
          <!-- <button class="inp"></button> -->
        </div>
        <div
          style="
            width: 100%;
            height: 30px;
            margin-top: 30px;
            display: flex;
            justify-content: center;
          "
        >
          <el-button @click="goHome" type="primary">进入</el-button>
        </div>
        <!-- 用户昵称设置 -->
      </div>
      <el-dialog v-model="dialogVisible" width="500" class="dialog" center>
        <div class="avatarList">
          <div
            class="roomAvatar"
            :class="{ active: activeAvatarIndex === index }"
            @click="selectImg(index, item)"
            v-for="(item, index) in avatarList"
            :key="index"
          >
            <div class="avatarImg">
              <img style="width: 100%; height: 100%" :src="item" alt="" />
            </div>
          </div>
        </div>
        <template #footer>
          <el-button type="primary" @click="dialogVisible = false">
            确认
          </el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
// import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { chatRoomUserInfo } from '@/stores/modules/user'
const userStore = chatRoomUserInfo()
const router = useRouter()
const username = ref(null)
const dialogVisible = ref(false)
const activeAvatarIndex = ref(null)
const pic = ref(
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/head_portrait1.jpg'
)
const avatarList = ref([
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/可爱蜘蛛侠.png',
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/cloudstorage/047026fd-b8f4-4050-aaa2-03cafb59162e.png',
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/cloudstorage/02978c34-7739-40cb-915a-715f044c9e78.png',
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/cloudstorage/0880c68f-f03d-40ad-9367-e2c638c49ce6.png',
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/cloudstorage/0eb2f3f0-6810-425d-94fa-344170f595f4.png',
  'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/cloudstorage/2c001113-0290-4ffa-9820-8d3085b3f21c.png'
])
const goHome = () => {
  if (username.value) {
    // localStorage.setItem(
    //   'userInfo',
    //   JSON.stringify({
    //     name: username.value,
    //     pic: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/head_portrait1.jpg'
    //   })
    // )
    userStore.setUserInfo(username.value, pic)
    router.push('/')
  } else {
    ElMessage.error('请输入昵称')
  }
}
const selectImg = (index, item) => {
  activeAvatarIndex.value = index
  pic.value = item
}
const selectAvatar = () => {
  dialogVisible.value = true
}
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
    justify-content: center;
    align-items: center;
    .loginForm {
      width: 400px;
      height: 40%;
      background-color: rgb(50, 54, 68);
      box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      // justify-content: space-around;
      justify-content: center;
      .formTop {
        width: 100%;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .roomAvatar {
          width: 80px;
          height: 80px;
          background-color: #272a37;
          border-radius: 50%;
          border: 2px solid rgb(255, 255, 255);
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;

          .avatarImg {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            overflow: hidden;
          }
        }
        .arrowDown {
          position: absolute;
          color: #fff;
          cursor: pointer;
          top: 40px;
          right: 136px;
        }
      }
      .formBottom {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        margin-top: 30px;
        .inp {
          width: 80%;
          height: 50px;
          border-radius: 14px;
          padding: 0px auto;
          border: 2px solid rgb(34, 135, 225);
          background-color: rgb(66, 70, 86);
          font-size: 20px;
          color: #fff;
          font-weight: 100;
          &:focus {
            outline: none;
          }
        }
      }
    }
    .dialog {
      .avatarList {
        // background-color: pink;
        width: 100%;
        height: 300px;
        display: flex;
        flex-wrap: wrap;
        padding-top: 10px;
        // justify-content: space-around;
        .roomAvatar {
          cursor: pointer;
          margin-left: 10px;
          width: 80px;
          height: 80px;
          background-color: #272a37;
          border-radius: 50%;
          border: 2px solid rgb(255, 255, 255);
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            border: 2px solid rgb(34, 135, 225);
          }

          .avatarImg {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            overflow: hidden;
          }
        }
        .active {
          border: 2px solid rgb(34, 135, 225);
        }
      }
    }
  }
}
</style>
