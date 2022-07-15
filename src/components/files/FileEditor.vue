<template>
<div
  v-if="editor"
  class="space-y-8"
>
  <div class="flex flex-wrap items-center px-8 space-x-2">
    <button
      :disabled="!editor.can().toggleBold()"
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer',
               { 'is-active': editor.isActive('bold') },
               { 'cursor-not-allowed opacity-60': !editor.can().toggleBold() }]"
      @click="editor.chain().focus().toggleBold().run()"
    >
      bold
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('italic') }]"
      @click="editor.chain().focus().toggleItalic().run()"
    >
      italic
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('strike') }]"
      @click="editor.chain().focus().toggleStrike().run()"
    >
      strike
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('code') }]"
      @click="editor.chain().focus().toggleCode().run()"
    >
      code
    </button>
    <button
      class="px-4 py-2 my-2 border border-gray-500 rounded cursor-pointer"
      @click="editor.chain().focus().unsetAllMarks().run()"
    >
      clear marks
    </button>
    <button
      class="px-4 py-2 my-2 border border-gray-500 rounded cursor-pointer"
      @click="editor.chain().focus().clearNodes().run()"
    >
      clear nodes
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('paragraph') }]"
      @click="editor.chain().focus().setParagraph().run()"
    >
      paragraph
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('heading', { level: 1 }) }]"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    >
      h1
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('heading', { level: 2 }) }]"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      h2
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('heading', { level: 3 }) }]"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
    >
      h3
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('heading', { level: 4 }) }]"
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
    >
      h4
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('heading', { level: 5 }) }]"
      @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
    >
      h5
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('heading', { level: 6 }) }]"
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
    >
      h6
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('bulletList') }]"
      @click="editor.chain().focus().toggleBulletList().run()"
    >
      bullet list
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('orderedList') }]"
      @click="editor.chain().focus().toggleOrderedList().run()"
    >
      ordered list
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('codeBlock') }]"
      @click="editor.chain().focus().toggleCodeBlock().run()"
    >
      code block
    </button>
    <button
      :class="['my-2 px-4 py-2 border border-gray-500 rounded cursor-pointer', { 'is-active': editor.isActive('blockquote') }]"
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
      :class="{ 'cursor-not-allowed opacity-60': !editor.can().undo() }"
      class="px-4 py-2 border border-red-500 rounded cursor-pointer disabled:cursor-not-allowed"
      @click="editor.chain().focus().undo().run()"
    >
      undo
    </button>
    <button
      :disabled="!editor.can().redo()"
      class="px-4 py-2 border border-red-500 rounded cursor-pointer disabled:cursor-not-allowed"
      :class="{ 'cursor-not-allowed opacity-60': !editor.can().redo() }"
      @click="editor.chain().focus().redo().run()"
    >
      redo
    </button>
  </div>
  <article class="prose lg:prose-xl">
    <editor-content :editor="editor" />
  </article>
  <BaseButton @click="getHTML">
    Get HTML
  </BaseButton>
</div>
</template>

<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
// import { imageRightContent } from '@/helpers/imageRightContent'
const userStore = useUserStore()
const { setCreationFormField } = useFileStore()
const router = useRouter()

const editor = useEditor({
  content: `<h1> Autorisation exploitation droit à l’image pour un shooting photos</h1>
      <p>Je soussigné(e) {{prénom}} {{nom}} :</p>
      <p>Demeurant à {{Adresse}}, {{code postal}}, {{ville}} : </p>
      <p>Né(e) Ie {{Date}} : </p><p>Agissant en mon nom personnel.</p>
      <p>Autorise {{photographe}} :  <span style="font-weight:bold">${userStore.getCurrent?.companyName}</span> à me photographier, le (date) : à (lieu) :</p>
      <p>En conséquence de quoi et conformément aux dispositions relatives au droit à l’image, j’autorise <span style="font-weight:bold">${userStore.getCurrent?.companyName}</span> à fixer, reproduire et communiquer au public les photographies prises dans le cadre de la présente.</p>
      <p>Les photographies pourront être exploitées et utilisées par <span style="font-weight:bold">${userStore.getCurrent?.companyName}</span> sous toute forme et tous supports*, dans le monde entier (en effet, dès lors qu’il y a une publication sur un réseau social, elle est disponible dans le monde entier), pendant une durée de 8 ans (cela vous protège pour éviter que votre image ne soit utilisée indéfiniment), intégralement ou par extraits et notamment :</p>
      <blockquote style="font-style: italic;">*Nous entendons tout support audiovisuel et par tous moyens inhérents à ce mode de communication, internet (incluant site web, Intranet, Extranet, Blogs, réseaux sociaux), tous vecteurs de réception confondus (smartphones, tablettes, etc.), médias presse, supports de communication interne, supports promotionnels (PLV, ILV, campagnes d\'affichage en tous lieux, toutes dimensions et sur tous supports (urbain, aéroports, gares, transports en commun, etc.), droit d\'intégration dans une autre œuvre / œuvre multimédia.</blockquote>
      <p>Le bénéficiaire de l’autorisation(<span style="font-weight:bold">${userStore.getCurrent?.companyName}</span>) s’interdit expressément de procéder à une exploitation des photographies susceptibles de porter atteinte à la vie privée ou à la réputation, et d’utiliser les photographies de la présente, dans tout support à caractère pornographique, raciste, xénophobe ou toute autre exploitation préjudiciable. (Ce paragraphe a également pour objectif de vous protéger des utilisations non désirées de votre image) </p>
      <p>Je me reconnais (la personne photographiée) être entièrement rempli de mes droits et je ne pourrai prétendre à aucune rémunération pour l’exploitation des droits visés aux présentes.</p>
      <p>Je garantis(la personne photographiée) que je ne suis pas lié(e) par un contrat exclusif relatif à l’utilisation de mon image ou de mon nom.</p>
      <p>Pour tout litige né de l’interprétation ou de l’exécution des présentes, il est fait attribution expresse de juridiction aux tribunaux français.</p>
      <div class="flex justify-between">
        <p>
          <p>Fait à {{ville}}, le {{signedAt}}</p>
          <p>Nom et prénom de la personne photographiée:</p>
          <p>{{lastName}} {{FirstName}}</p>
          <p>Signature</p>
        </p>
        <p>
          <p>Nom et prénom du représentant de ${userStore.getCurrent?.companyName}</p>
          <p>${userStore.getUserFullName}</p>
          <p>Signature</p>
        </p>
      </div>`,
  extensions: [
    StarterKit,
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl m-5 focus:outline-none',
    },
  },
})

const contented = ref()

function getHTML() {
  if (editor.value) {
    contented.value = editor.value.getJSON()
    setCreationFormField(editor.value.getHTML(), 'content')
  }
}
</script>
