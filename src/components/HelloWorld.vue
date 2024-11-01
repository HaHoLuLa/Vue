<script setup lang="ts">
import { onMounted, ref } from 'vue';

const hi = ref<string>("Hello World")
onMounted(() => console.log(hi.value))
</script>

<template>
  <h1>{{ hi }}</h1>
  <input @input="(e: Event) => {
    const target = e.target as HTMLInputElement
    hi = target.value
  }" :value="hi" type="text" placeholder="Hello World">
  <button>a</button>
</template>