<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const form = reactive({
  userId: "",
  userPw: "",
  userName: ""
})

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const { name, value } = target

  if (name in form) {
    form[name as keyof typeof form] = value
  }
}
const handleRegister = async () => {
  await axios.post("http://localhost:8000/user/register", form, {
    withCredentials: true
  })
    .then(res => {console.log(res.data); router.push("/login")})
    .catch(e => console.error(e))
}
</script>

<template>
  <div class="container" style="padding-top: 20vh;">
    <h2>Note 회원가입</h2>
    <label>
      아이디
      <input type="text" name="userId" v-model="form.userId" @input="handleChange" aria-label="Text">
    </label>
    <label>
      비밀번호
      <input type="password" name="userPw" v-model="form.userPw" @input="handleChange" aria-label="Password">
    </label>
    <label>
      이름
      <input type="text" name="userName" v-model="form.userName" @input="handleChange" aria-label="Text">
    </label>
    <div class="grid">
      <input type="button" @click="handleRegister" value="회원가입">
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
}
</style>