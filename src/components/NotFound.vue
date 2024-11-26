<template>
  <div>
    <h1>페이지를 찾을 수 없습니다</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push("/")
  }, 2000)
})
</script>

<style lang="scss" scoped>
div {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    text-align: center;
  }
}
</style>