<template>
  <el-menu background-color="#1976d2" class="el-menu" mode="horizontal" :ellipsis="false">
    <header>Linkme 后台管理系统</header>
    <div class="flex-grow"></div>
    <ElAvatar />
  </el-menu>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

header {
  margin: 16px;
  color: #FFF;
  font-size: 1.4rem;
  font-weight: bold;
}


.el-menu {
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 0 16px;
  box-shadow: gray 0px 0px 16px;
  border: 0;
}
</style>