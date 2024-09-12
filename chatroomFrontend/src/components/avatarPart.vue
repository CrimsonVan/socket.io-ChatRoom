<template>
  <div class="roomAvatar">
    <div class="avatarImg">
      <img
        style="width: 100%; height: 100%"
        src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/head_portrait1.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
