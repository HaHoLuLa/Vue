<template>
  <div style="display: flex;">
    <div class="menu">
      <p>
        페이지
        <button @click="handleLogout">로그아웃</button>
      </p>
      <div>
        <div v-if="!props.noteId">
          <span @click="handleSubmit">새 페이지</span>
        </div>
        <div v-for="(item, index) in notes" :key="index"
          :style="item.id === props.noteId ? { backgroundColor: 'var(--bg-color-hover)' } : null">
          <span @click="router.push(`/${props.user}/${item.id}`); handleSubmit(); title = item.title">
            {{ item.id === props.noteId ? title || "새 페이지" : item.title }}
          </span>
          <button @click="handleDelete(item.id)"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="title">
        <input type="text" placeholder="새 페이지" id="title" @input="(e: Event) => {
          const target = e.target as HTMLInputElement
          title = target.value
        }" v-model="title" @keydown="(e) => {
          if (e.key === 'ArrowDown' || e.key === 'Enter') {
            editor?.commands.focus()
          }
        }">
      </div>
      <editor-content :editor="editor" class="editor" />
    </div>
    <bubble :editor="editor" v-if="editor" :tippy-options="{ duration: 100, }" class="bubble">
      <div>
        <div role="group" style="position: relative;">
          <button class="outline" data-tooltip="Heading" disabled><i class="fa-solid fa-heading"></i></button>
        </div>
        <div role="group">
          <button @click="editor.chain().focus().toggleBold().run()" data-tooltip="Bold"
            :class="{ 'outline': !editor.isActive('bold') }"><i class="fa-solid fa-bold"></i></button>
          <button @click="editor.chain().focus().toggleItalic().run()" data-tooltip="Italic"
            :class="{ 'outline': !editor.isActive('italic') }"><i class="fa-solid fa-italic"></i></button>
          <button @click="editor.chain().focus().toggleUnderline().run()" data-tooltip="Underline"
            :class="{ 'outline': !editor.isActive('underline') }"><i class="fa-solid fa-underline"></i></button>
          <button @click="editor.chain().focus().toggleStrike().run()" data-tooltip="Strike"
            :class="{ 'outline': !editor.isActive('strike') }"><i class="fa-solid fa-strikethrough"></i></button>
        </div>
        <div role="group">
          <button @click="editor.chain().focus().toggleCode().run()" data-tooltip="Code"
            :class="{ 'outline': !editor.isActive('code') }"><i class="fa-solid fa-code"></i></button>
          <button @click="editor.chain().focus().toggleCodeBlock().run()" data-tooltip="CodeBlock"
            :class="{ 'outline': !editor.isActive('codeBlock') }"><i class="fa-regular fa-file-code"></i></button>
        </div>
        <div role="group">
          <button @click="editor.chain().focus().toggleLink({ href: '#' }).run()" data-tooltip="Link"
            :class="{ 'outline': !editor.isActive('link') }"><i class="fa-solid fa-link"></i></button>
          <!-- <button @click="editor.chain().focus().setColor('red').run()" data-tooltip="Color" :class="{ 'outline': !editor.isActive('color') }"><i
              class="fa-solid fa-palette"></i></button> -->
          <button @click="editor.chain().focus().toggleHighlight().run()" data-tooltip="Highlight"
            :class="{ 'outline': !editor.isActive('highlight') }"><i class="fa-solid fa-highlighter"></i></button>
          <button @click="editor.chain().focus().toggleSubscript().run()" data-tooltip="Subscript"
            :class="{ 'outline': !editor.isActive('subscript') }"><i class="fa-solid fa-subscript"></i></button>
          <button @click="editor.chain().focus().toggleSuperscript().run()" data-tooltip="Superscript"
            :class="{ 'outline': !editor.isActive('superscript') }"><i class="fa-solid fa-superscript"></i></button>
          <!-- <button @click="editor.chain().focus().setTextAlign('justify').run()" data-tooltip="Justify"><i
              class="fa-solid fa-align-justify"></i></button>
          <button @click="editor.chain().focus().setTextAlign('center').run()" data-tooltip="Center"><i
              class="fa-solid fa-align-center"></i></button>
          <button @click="editor.chain().focus().setTextAlign('left').run()" data-tooltip="Left"><i
              class="fa-solid fa-align-left"></i></button>
          <button @click="editor.chain().focus().setTextAlign('right').run()" data-tooltip="Right"><i
              class="fa-solid fa-align-right"></i></button> -->
        </div>
      </div>
    </bubble>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useEditor, EditorContent, JSONContent, BubbleMenu as bubble } from '@tiptap/vue-3'
import BulletList from '@tiptap/extension-bullet-list';
// import CharacterCount from '@tiptap/extension-character-count';
// import CodeBlock from '@tiptap/extension-code-block';
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Color from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Focus from '@tiptap/extension-focus';
import FontFamily from '@tiptap/extension-font-family';
// import Heading from '@tiptap/extension-heading';
// import Highlight from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
// import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
// import Superscript from '@tiptap/extension-superscript';
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
import CustomLink from '../extends/CustomLink';
import CustomSuperscript from '../extends/CustomSuperscript';
import CustomHeading from '../extends/CustomHeading';
import CustomCodeBlockLowlight from '../extends/CustomCodeBlockLowlight';
import CustomHighlight from '../extends/CustomHighlight';
import Gapcursor from "@tiptap/extension-gapcursor";
// import ImageResize from 'tiptap-extension-resize-image';

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
  await axios.get(`http://localhost:8000/user/profile`, { withCredentials: true }).then(res => console.log(res.data)).catch(e => { console.log(e); router.push("/") })
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
    // CharacterCount,
    // CodeBlockLowlight.configure({
    //   lowlight,
    // }),
    CustomCodeBlockLowlight.configure({
      lowlight
    }),
    // CodeBlock,
    Color.configure({
      // types: ["codeBlockLowlight", "codeBlock", "textStyle", "highlight"]
    }),
    Document,
    Dropcursor.configure({
      // color: "#B2E51A",
      color: "var(--pico-primary)"
    }),
    Focus,
    FontFamily,
    // Heading,
    CustomHeading,
    // Highlight.configure({
    //   multicolor: true
    // }),
    CustomHighlight.configure({
      multicolor: true
    }),
    HorizontalRule,
    Image.configure({
      inline: true,
      allowBase64: true
    }),
    // Link,
    CustomLink,
    OrderedList,
    Paragraph,
    Placeholder.configure({
      placeholder: ({ editor, node }) => {
        // const isFirstLineEmpty = editor.getHTML() === '<p></p>' || editor.getHTML() === '<p><br></p>';

        // // 첫 줄이 비어 있으면 무조건 보이게
        // if (isFirstLineEmpty) {
        //   return '글 작성하기';
        // }

        // 포커스된 경우만 표시
        // console.log(node.type.name)
        let placeholderText;
        switch (node.type.name) {
          case "taskList":
            placeholderText = "      할 일"
            break;
          case "paragraph":
            editor.isFocused ? placeholderText = "글 작성하기" : placeholderText = ""
            // placeholderText = "글 작성하기"
            break;
          case "heading":
            placeholderText = `제목${node.attrs.level}`
            break;
          case "bulletList":
          case "orderedList":
            placeholderText = "리스트"
            break;
          case "codeBlock":
            placeholderText = "코드 블럭"
            break;
          case "blockquote":
            placeholderText = "인용문"
            break;
          default:
            placeholderText = ""
        }

        return placeholderText
      },
    }),
    // Superscript,
    CustomSuperscript,
    Subscript,
    Table.configure({
      resizable: true,
      allowTableNodeSelection: true,
    }),
    // CustomTable.configure({
    //   resizable: true
    // }),
    TableHeader.configure({

    }),
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
    Gapcursor,
    // ImageResize.configure({
    //   // inline: true,
    //   allowBase64: true
    // })
  ],
  onUpdate({ editor }) {
    data.value = editor.getJSON();
  }, // onUpdate: ({ editor }) => { data.value = editor.getHTML() } 과 동일
  editorProps: {
    handleKeyDown: (view, event) => {
      // 에디터 포커스 여부 확인
      const isFocused = view.hasFocus();

      // 문서의 첫 번째 노드와 상태 확인
      const firstNode = view.state.doc.firstChild;
      const isFirstParagraph = firstNode?.type.name === "paragraph";
      // const isFirstEmpty = firstNode?.content.size === 0;

      // 현재 선택된 범위 (커서 위치)
      const selection = view.state.selection;
      const isCursorInFirstLine = selection.$from.depth === 1 && selection.$from.pos === 1;

      // 제목 필드 참조
      const title = document.getElementById("title") as HTMLInputElement;

      if (
        isFocused && // 에디터에 포커스가 있는 상태
        isCursorInFirstLine && // 커서가 첫 번째 줄에 위치한 상태
        (event.key === "Backspace" && isFirstParagraph || event.key === "ArrowUp") // 조건 통합
      ) {
        title.focus(); // 제목 필드로 포커스 이동
      }
    }
  }
})

watch(
  () => props.noteId,
  async (newNoteId) => {
    // title.value = "저장 중..."
    if (newNoteId) {
      try {
        // noteId가 변경되면 새로운 노트 데이터를 가져옵니다.
        await axios.post(`http://localhost:8000/user/view`, { id: props.user, lastView: props.noteId })
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
    router.push(`/${props.user}`)
}

const handleLogout = async () => {
  await axios.post("http://localhost:8000/user/logout", {}, {
    withCredentials: true
  }).then(res => { console.log(res.data); router.push("/") })
}

// const handleFetch = async () => {

// }

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style lang="scss">
@use '@picocss/pico/css/pico.pink.min.css';

:root {
  --bg-color: #1f232a;
  --bg-color-hover: #35383f;
}

body {
  overflow-x: hidden;
}

div.tableWrapper {
  overflow-x: auto;
}

.container {
  max-width: 60%;
}

.menu {
  padding: 0.8rem 0.3rem;
  position: fixed;
  left: 0;
  width: 12rem;
  height: 100vh;
  background-color: var(--bg-color);
  z-index: 10000;

  p {
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      padding: 0;
      border: none;
      @extend .outline;
    }
  }

  div {
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem 0.5rem;
      transition: background-color 0.3s ease;
      border-radius: 0.2rem;

      span {
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      button {
        padding: 0;
        border: none;
        opacity: 0;
        /* 기본적으로 투명 */
        visibility: hidden;
        /* 요소 숨김 */
        transition: opacity 0.3s ease, visibility 0.3s ease;
        /* 부드럽게 나타나도록 설정 */
        @extend .outline;
      }

      &:hover {
        background-color: var(--bg-color-hover);

        span {
          max-width: 9rem;
        }

        button {
          opacity: 1;
          /* 완전 보이도록 */
          visibility: visible;
          /* 요소 표시 */
        }
      }
    }
  }
}

.main {
  width: calc(100% - 12rem);
  position: absolute;
  right: 0;
  // overflow-x: auto;

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
        box-shadow: none;
      }
    }
  }

  .editor {
    @extend .container;
    padding-bottom: 30vh;
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

.tiptap .is-empty::before {
  color: #8a91a2;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.tiptap {
  table {
    .selectedCell {
      background-color: var(--bg-color-hover);
    }
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
}

pre {
  position: relative;

}

pre.is-empty::before {
  color: #8a91a2;
  content: attr(data-placeholder);
  // float: left;
  position: absolute;
  top: 1.1rem;
  left: 0.9rem;
  height: 0;
  pointer-events: none;
}

ul[data-type="taskList"] {
  padding: 0 0.5rem;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    div {

      p {
        margin-bottom: 0.4rem;
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

.bubble {
  div {
    border-radius: 0.5rem;
    padding: 0.2rem;
    display: flex;

    div {
      background-color: #1f232a;

      button {
        padding: 0.2rem 0.5em;
      }
    }

  }
}

@media (prefers-color-scheme: light) {
  :root {
    --bg-color: #eee;
    --bg-color-hover: #ddd;
  }

  .bubble {
    div {
      div {
        background-color: white;
        // box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        border: solid 0.05rem #eee;
      }
    }
  }
}

// @media (prefers-color-scheme: dark) { 
//   button {
//     --pico-background-color: var(--pico-primary);
//     --pico-border-color: var(--pico-primary);
//     &:hover {
//       --pico-background-color: var(--pico-primary-hover);
//       --pico-border-color: var(--pico-primary-hover);
//     }
//   }
// }


</style>