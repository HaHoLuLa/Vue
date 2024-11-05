<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';

const form = reactive({
  id: "",
  pw: ""
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
    .then(res => console.log(res.data))
    .catch(e => console.error(e))
}
const handleLogout = async () => {
  await axios.post("http://localhost:8000/user/logout", {}, {
    withCredentials: true
  })
    .then(res => console.log(res.data))
    .catch(e => console.error(e))
}
const handleProfile = async () => {
  await axios.get("http://localhost:8000/user/profile", { withCredentials: true })
    .then(res => console.log(res.data))
    .catch(e => console.error(e))
}
</script>

<template>
  <input type="text" name="id" v-model="form.id" @input="handleChange">
  <input type="password" name="pw" v-model="form.pw" @input="handleChange">
  <input type="submit" @click="handleLogin">
  <button @click="handleLogout">로그아웃</button>
  <button @click="handleProfile">정보</button>
</template>