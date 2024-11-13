<template>
  <!-- <div class="toolbar">
    <button v-for="(_, i) in [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]">{{ i + 1 }}</button>
  </div> -->
  <editor-content :editor="editor" class="editor" />
  <div class="viewer">
    <div>{{ data }}</div>
    <div v-html="data"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3'
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlock from '@tiptap/extension-code-block';
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
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
const data = ref()

const editor = useEditor({
  content: data.value,
  extensions: [
    BulletList,
    CharacterCount,
    CodeBlock,
    // CodeBlockLowlight,
    Color,
    Document,
    Dropcursor,
    Focus,
    FontFamily,
    Heading,
    Highlight,
    HorizontalRule,
    Image,
    Link,
    OrderedList,
    Paragraph,
    Placeholder.configure({ placeholder: "내용을 입력하세요" }),
    Subscript,
    Superscript,
    Table,
    TableHeader,
    TableRow,
    TaskItem,
    TaskList,
    TextAlign,
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
  ],
  onUpdate({ editor }) { data.value = editor.getHTML() }, // onUpdate: ({ editor }) => { data.value = editor.getHTML() } 과 동일
})
</script>

<style lang="scss">
@use '@picocss/pico/css/pico.indigo.min.css';

// @mixin layout {
//   margin: 0 auto;
//   width: 50%;
// }

.toolbar {
  @extend .container;
  display: flex;
  justify-content: space-between;

  button {
    @extend .outline;
  }
}

.editor {
  @extend .container;
  padding: 10px;
  border-radius: 10px;
  border: solid 1px #524ED2;
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

ul[data-type="taskList"] {
  // list-style: none;
  padding: 0 10px;
  // margin: 0;

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
p, ul, ol {
  margin-bottom: 0;
}
</style>