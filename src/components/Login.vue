<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter()

const form = reactive({
  userId: "",
  userPw: ""
})

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const { name, value } = target

  if (name in form) {
    form[name as keyof typeof form] = value
  }
}
const handleLogin = async () => {
  await axios.post("http://localhost:8000/user/login", form, {
    withCredentials: true
  })
    .then(res => {console.log(res.data); router.push("/")})
    .catch(e => console.error(e))
}
// const handleLogout = async () => {
//   await axios.post("http://localhost:8000/user/logout", {}, {
//     withCredentials: true
//   })
//     .then(res => console.log(res.data))
//     .catch(e => console.error(e))
// }
// const handleProfile = async () => {
//   await axios.get("http://localhost:8000/user/profile", { withCredentials: true })
//     .then(res => console.log(res.data))
//     .catch(e => console.error(e))
// }
</script>

<template>
  <div class="container" style="padding-top: 20vh;">
    <h2>로그인</h2>
    <label>
      아이디
      <input type="text" name="userId" v-model="form.userId" @input="handleChange" aria-label="Text">
    </label>
    <label>
      비밀번호
      <input type="password" name="userPw" v-model="form.userPw" @input="handleChange" aria-label="Password">
    </label>
    <div class="grid">
      <input type="button" @click="handleLogin" value="로그인">
      <!-- <router-link to="/editor">
        <input type="button" @click="" value="로그인">
      </router-link> -->
      <router-link to="/register">
        <!-- <input type="button" @click="handleLogin" value="로그인"> -->
        <input type="button" @click="" value="회원가입">
      </router-link>
    </div>
    <!-- <input type="button" @click="handleLogout" value="로그아웃"> -->
    <!-- <input type="button" @click="handleProfile" value="정보"></input> -->
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
}
</style>