<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const data = ref<Record<string, string[]> | null>(null);

onMounted(async () => {
  axios.get("http://localhost:8000/users")
    .then(res => data.value = res.data)
    .catch(e => console.error(e))
})
</script>

<template>
  <div>{{ data }}</div>
  <p v-for="(item, index) in data?.users" :key="index">
    {{ item }}
  </p>
</template>