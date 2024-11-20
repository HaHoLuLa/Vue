<script setup lang="ts">
import axios from 'axios';
import { reactive, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter()

const form = reactive({
  userId: "",
  userPw: ""
})

const error = ref()

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const { name, value } = target
  error.value = null

  if (name in form) {
    form[name as keyof typeof form] = value
  }
}
const handleLogin = async () => {
  await axios.post("http://localhost:8000/user/login", form, {
    withCredentials: true
  })
    .then(res => { console.log(res.data); router.push("/") })
    .catch(e => { console.error(e); if (e) error.value = true })
}
</script>

<template>
  <div class="container" style="padding-top: 20vh;">
    <h2>Note 로그인</h2>
    <label>
      아이디
      <input type="text" name="userId" v-model="form.userId" @input="handleChange" aria-label="Text" :aria-invalid="error">
      <small v-if="error">아이디 또는 비밀번호 잘못됨</small>
    </label>
    <label>
      비밀번호
      <input type="password" name="userPw" v-model="form.userPw" @input="handleChange" aria-label="Password" :aria-invalid="error">
      <small v-if="error">아이디 또는 비밀번호 잘못됨</small>
    </label>
    <div class="grid">
      <input type="button" @click="handleLogin" value="로그인">
      <router-link to="/register">
        <input type="button" @click="" value="회원가입">
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
}
</style>