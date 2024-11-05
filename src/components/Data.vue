<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

interface Data {
  num: number
  title: string
  id: string
  writer: string
  regtime: null | string
  hits: null | number
  type: number
}

const data = ref<Data[] | null>(null);
const form = reactive({
  title: "",
  id: "",
  content: "",
  writer: "",
});

onMounted(async () => {
  await axios.get("http://localhost:8000/board")
    .then(res => data.value = res.data)
    .catch(e => console.error(e));
});

const handleWrite = async () => {
  await axios.post("http://localhost:8000/board/write", form)
    .then(res => console.log(res.data))
    .catch(e => console.error(e));
};

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const { name, value } = target;

  if (name in form) {
    form[name as keyof typeof form] = value;
  }
};
</script>

<template>
  <div v-for="(item, index) in data" :key="index">
    <p>{{ item.title }}</p>
  </div>

  <input type="text" name="title" v-model="form.title" @input="handleChange" placeholder="Title" />
  <input type="text" name="id" v-model="form.id" @input="handleChange" placeholder="ID" />
  <input type="text" name="content" v-model="form.content" @input="handleChange" placeholder="Content" />
  <input type="text" name="writer" v-model="form.writer" @input="handleChange" placeholder="Writer" />
  <button @click="handleWrite">Submit</button>
</template>