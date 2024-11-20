<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

onMounted(async () => {
  await axios.get("http://localhost:8000/user/profile", { withCredentials: true })
  .then(res => {console.log(res.data); router.push(`/${res.data.user.id}/editor`) })
  .catch(e => {console.error(e); router.push("/login")})
})
</script>

<template>
  <!-- <h1>인덱스</h1>
  <p>
    <router-link to="/hello">hello</router-link>
  </p>
  <p>
    <router-link to="/data">data</router-link>
  </p>
  <p>
    <router-link to="/login">login</router-link>
  </p>
  <p>
    <router-link to="/editor">editor</router-link>
  </p> -->
</template>