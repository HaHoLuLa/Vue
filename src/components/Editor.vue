<template>
  <div class="toolbar">
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
  </div>
  <editor-content :editor="editor" class="editor" />
  <div class="viewer">
    <div>{{ data }}</div>
    <div v-html="data"></div>
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { ref } from 'vue';
const data = ref()

const editor = useEditor({
  content: data.value,
  extensions: [StarterKit, Underline, Highlight, Link, Placeholder.configure({ placeholder: "내용을 작성하세요" })],
  onUpdate({ editor }) { data.value = editor.getHTML() }, // onUpdate: ({ editor }) => { data.value = editor.getHTML() } 과 동일
})
</script>

<style lang="scss">
@use '@picocss/pico/css/pico.lime.min.css';

// @mixin layout {
//   margin: 0 auto;
//   width: 50%;
// }

.toolbar {
  @extend .container;

  button {
    @extend .outline;
  }
}

.editor {
  @extend .container;
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

.tiptap p.is-editor-empty:first-child::before {
  color: darkgray;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
  font-style: italic;
}

mark {
  background-color: rgba(178, 229, 26, 10);
  color: #000
}
</style>