import { Node, VueNodeViewRenderer, mergeAttributes } from '@tiptap/vue-3'

import SignatureCreator from '@/components/files/editor/SignatureCreator.vue'

export default Node.create({
  name: 'Signature',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      lines: {
        default: [],
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="paper"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'paper' })]
  },

  addNodeView() {
    return VueNodeViewRenderer(SignatureCreator)
  },
})
