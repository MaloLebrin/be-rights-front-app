<template>
<div class="space-y-8">
  <editor-content :editor="editor" />
  <BaseButton @click="getSignature">
    getSignatureHTML
  </BaseButton>
</div>
</template>

<script setup lang="ts">
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/vue-3'

import Signature from '@/helpers/Signature'

const editor = useEditor({
  extensions: [
    Document.extend({
      content: 'Signature',
    }),
    Text,
    Signature,
  ],
})

function getSignature() {
  if (editor.value) {
    // console.log(editor.value.getHTML(), '<==== editor.value.getHTML getSignature')
    console.log(editor.value.getHTML(), '<==== editor.value.getHTML getSignature')
  }
}

onBeforeUnmount(() => editor.value?.destroy())
</script>
