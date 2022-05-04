<template>
<div v-if="editor">
  <div class="flex flex-wrap items-center px-8 py-2 space-x-2 space-y-2">
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('bold') }]"
      @click="editor.chain().focus().toggleBold().run()"
    >
      bold
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('italic') }]"
      @click="editor.chain().focus().toggleItalic().run()"
    >
      italic
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('strike') }]"
      @click="editor.chain().focus().toggleStrike().run()"
    >
      strike
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('code') }]"
      @click="editor.chain().focus().toggleCode().run()"
    >
      code
    </button>
    <button
      class="px-4 py-2 border border-gray-500 rounded cursor-pointer"
      @click="editor.chain().focus().unsetAllMarks().run()"
    >
      clear marks
    </button>
    <button
      class="px-4 py-2 border border-gray-500 rounded cursor-pointer"
      @click="editor.chain().focus().clearNodes().run()"
    >
      clear nodes
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('paragraph') }]"
      @click="editor.chain().focus().setParagraph().run()"
    >
      paragraph
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('heading', { level: 1 }) }]"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    >
      h1
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('heading', { level: 2 }) }]"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      h2
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('heading', { level: 3 }) }]"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
    >
      h3
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('heading', { level: 4 }) }]"
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
    >
      h4
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('heading', { level: 5 }) }]"
      @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
    >
      h5
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('heading', { level: 6 }) }]"
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
    >
      h6
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('bulletList') }]"
      @click="editor.chain().focus().toggleBulletList().run()"
    >
      bullet list
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('orderedList') }]"
      @click="editor.chain().focus().toggleOrderedList().run()"
    >
      ordered list
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('codeBlock') }]"
      @click="editor.chain().focus().toggleCodeBlock().run()"
    >
      code block
    </button>
    <button
      :class="['px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('blockquote') }]"
      @click="editor.chain().focus().toggleBlockquote().run()"
    >
      blockquote
    </button>
    <button
      class="px-4 py-2 border border-gray-500 rounded cursor-pointer"
      @click="editor.chain().focus().setHorizontalRule().run()"
    >
      horizontal rule
    </button>
    <button
      class="px-4 py-2 border border-gray-500 rounded cursor-pointer"
      @click="editor.chain().focus().setHardBreak().run()"
    >
      hard break
    </button>
    <button
      :disabled="!editor.can().undo()"
      class="px-4 py-2 border border-red-500 rounded cursor-pointer disabled:cursor-not-allowed"
      @click="editor.chain().focus().undo().run()"
    >
      undo
    </button>
    <button
      :disabled="!editor.can().redo()"
      class="px-4 py-2 border border-red-500 rounded cursor-pointer disabled:cursor-not-allowed"
      @click="editor.chain().focus().redo().run()"
    >
      redo
    </button>
  </div>
  <article class="prose lg:prose-xl">
    <editor-content :editor="editor" />
  </article>
</div>
</template>

<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit,
  ],
})
</script>
