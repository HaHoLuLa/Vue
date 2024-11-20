<template>
  <div style="display: flex;">
    <div class="menu">
      <p style="display: flex; justify-content: space-between;">
        페이지
        <button @click="handleLogout" style="padding: 1px;">로그아웃</button>
      </p>
      <div>
        <div v-if="!props.noteId">
          <span @click="handleSubmit">새 페이지</span>
        </div>
        <div v-for="(item, index) in notes" :key="index" style="display: flex; justify-content: space-between; align-items: center;">
          <span @click="router.push(`/${props.user}/editor/${item.id}`); handleSubmit()">{{ item.title }}</span> <button @click="handleDelete(item.id)" style="padding: 1px;">삭제</button>
        </div>
        <!-- <div class="grid buttons">
          <button @click="handleSubmit">저장</button>
        </div> -->
      </div>
    </div>
    <div class="main">
      <div class="title">
        <input type="text" placeholder="새 페이지" id="title" @input="(e: Event) => {
          const target = e.target as HTMLInputElement
          title = target.value
        }" v-model="title" @keydown="(e) => {
          if (e.key === 'Enter') {
            editor?.commands.focus()
          }
        }">
      </div>
      <editor-content :editor="editor" class="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useEditor, EditorContent, JSONContent } from '@tiptap/vue-3'
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';
// import CodeBlock from '@tiptap/extension-code-block';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Color from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Focus from '@tiptap/extension-focus';
import FontFamily from '@tiptap/extension-font-family';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Text from '@tiptap/extension-text';
import ListItem from '@tiptap/extension-list-item';
import TableCell from '@tiptap/extension-table-cell';
import Blockquote from '@tiptap/extension-blockquote';
import HardBreak from "@tiptap/extension-hard-break";
import Youtube from "@tiptap/extension-youtube";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import ListKeymap from "@tiptap/extension-list-keymap";
import History from "@tiptap/extension-history";
import BubbleMenu from '@tiptap/extension-bubble-menu';
import { all, createLowlight } from "lowlight"
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/atom-one-dark.css';
import axios from 'axios';
import { useRouter } from 'vue-router';

interface Props {
  user: string
  noteId: string
}

interface Notes {
  id: string
  num?: number
  writer: string
  title: string
  content: JSONContent
  regtime: Date
  type: number
}

const router = useRouter()
const data = ref()
const title = ref("")
const notes = ref<Notes[]>([])
const props = defineProps<Props>()
const lowlight = createLowlight(all)
lowlight.register("css", css)
lowlight.register("js", js)
lowlight.register("ts", ts)
lowlight.register("html", html)

onMounted(async () => {
  const title = document.getElementById("title") as HTMLInputElement
  // console.log(lowlight.listLanguages())
  if (title.value === "" && !props.noteId)
    title?.focus()

  await axios.get(`http://localhost:8000/note?writer=${props.user}`).then(res => notes.value = res.data).catch(e => console.error(e))
  console.log(notes.value)
})

const editor = useEditor({
  content: data.value,
  // autofocus: true,
  extensions: [
    BulletList,
    CharacterCount,
    CodeBlockLowlight.configure({
      lowlight,
    }),
    // CodeBlock,
    Color.configure({
      // types: ["codeBlockLowlight", "codeBlock", "textStyle"]
    }),
    Document,
    Dropcursor.configure({
      // color: "#B2E51A",
      color: "#3C71F7"
    }),
    Focus,
    FontFamily,
    Heading,
    Highlight.configure({
      multicolor: true
    }),
    HorizontalRule,
    Image.configure({
      inline: true,
      allowBase64: true
    }),
    Link,
    OrderedList,
    Paragraph,
    Placeholder.configure({
      placeholder: ({ editor }) => {
        // const isFirstLineEmpty = editor.getHTML() === '<p></p>' || editor.getHTML() === '<p><br></p>';

        // // 첫 줄이 비어 있으면 무조건 보이게
        // if (isFirstLineEmpty) {
        //   return '글 작성하기';
        // }

        // 포커스된 경우만 표시
        return editor.isFocused ? "글 작성하기" : ""
      },
    }),
    Superscript,
    Subscript,
    Table,
    TableHeader,
    TableRow,
    TaskItem,
    TaskList,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    // TextAlign,
    TextStyle,
    Typography,
    Underline,
    Text,
    ListItem,
    TableCell,
    Blockquote,
    HardBreak,
    Youtube,
    Bold,
    Code,
    Italic,
    Strike,
    ListKeymap,
    History,
    BubbleMenu,
  ],
  onUpdate({ editor }) { data.value = editor.getJSON() }, // onUpdate: ({ editor }) => { data.value = editor.getHTML() } 과 동일
})

watch(
  () => props.noteId,
  async (newNoteId) => {
    if (newNoteId) {
      try {
        // noteId가 변경되면 새로운 노트 데이터를 가져옵니다.
        const noteResponse = await axios.get(`http://localhost:8000/note/${props.user}?id=${newNoteId}`);
        const note = noteResponse.data;
        console.log(note);

        // 에디터와 제목 초기화
        data.value = note.content;
        title.value = note.title !== "새 페이지" ? note.title : "";

        // editor가 초기화된 후에만 commands 호출
        if (editor.value) {
          editor.value.commands.setContent(note.content);
        }
      } catch (error) {
        console.error(`Error fetching note with id ${newNoteId}:`, error);
      }
    } else {
      // noteId가 없는 경우 에디터를 초기 상태로 설정
      data.value = {};
      title.value = "";
      if (editor.value) {
        editor.value.commands.clearContent();
      }
    }
  },
  { immediate: true } // 컴포넌트가 로드될 때도 즉시 실행
);

const handleSubmit = async () => {
  try {
    // 데이터 저장 요청
    await axios.post("http://localhost:8000/note/write", {
      id: props.noteId,
      title: title.value || "새 페이지",
      content: data.value,
      writer: props.user,
    });

    // 저장 후 notes 값 갱신
    const response = await axios.get(`http://localhost:8000/note?writer=${props.user}`);
    notes.value = response.data;
  } catch (error) {
    console.error("Error during submit or fetching notes:", error);
  }
};

const handleDelete = async (id: string) => {
  await axios.post(`http://localhost:8000/note/delete/${id}`).then(res => console.log(res.data)).catch(e => console.error(e))
  await axios.get(`http://localhost:8000/note?writer=${props.user}`).then(res => notes.value = res.data).catch(e => console.error(e))
  if (props.noteId === id)
    router.push(`/${props.user}/editor`)
}

const handleLogout = async () => {
  await axios.post("http://localhost:8000/user/logout", {}, {
    withCredentials: true
  }).then(res => { console.log(res.data); router.push("/") })
}
</script>

<style lang="scss">
@use '@picocss/pico/css/pico.blue.min.css';

.container {
  max-width: 60%;
}

.menu {
  padding: 0.5rem;
  position: fixed;
  left: 0;
  width: 240px;
  height: 100vh;
  background-color: #1f232a;
}

@media (prefers-color-scheme: light) {
  .menu {
    background-color: #eee;
  }
}

.main {
  width: calc(100% - 240px);
  position: absolute;
  right: 0;

  .title {
    @extend .container;

    input {
      padding: 0;
      margin: 0;
      background-color: inherit;
      border: none;
      margin-top: 15vh;
      margin-bottom: 10px;
      font-size: 2rem;

      &:focus {
        outline: #8a91a2;
        box-shadow: none;
      }
    }
  }

  .editor {
    @extend .container;
    padding-bottom: 30vh;
  }
}

.toolbar {
  @extend .container;
  display: flex;
  justify-content: space-between;
  overflow-x: auto;

  button {
    @extend .outline;
  }
}

.viewer {
  display: flex;
  @extend .container;

  div {
    width: 50%;
  }
}

.ProseMirror:focus {
  outline: none;
}

// .tiptap p.is-editor-empty:first-child::before {
//   color: #888;
//   content: attr(data-placeholder);
//   float: left;
//   height: 0;
//   pointer-events: none;
//   // font-style: italic;
// }

.tiptap p.is-empty::before {
  color: #8a91a2;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

ul[data-type="taskList"] {
  padding: 0 10px;

  li {
    display: flex;
    align-items: center;

    div {

      p {
        margin: auto 0;
      }
    }
  }
}

pre {
  code {
    white-space: pre;
    overflow-x: auto;
  }
}
</style>