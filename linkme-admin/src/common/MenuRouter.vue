<template>
  <el-menu class="drawer-router">
    <el-menu-item index="home">
      <el-icon>

      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon>

        </el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item index="user/list">用户列表</el-menu-item>
      <el-menu-item index="user/limit">用户权限</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon></el-icon>
        <span>即时通讯</span>
      </template>
      <el-menu-item index="chat/conversation">会话列表</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon></el-icon>
        <span>上传功能</span>
      </template>
      <el-menu-item index="upload/images">图片管理</el-menu-item>
      <el-menu-item index="upload/files">文件管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.drawer-router {
  border-right: 1px solid lightgray;
  width: 260px;
}

span {
  font-weight: bold;
  font-size: 0.95rem;
}
</style>