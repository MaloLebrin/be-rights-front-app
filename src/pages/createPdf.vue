<template>
<div class="flex flex-col space-y-12">
  <h1 class="text-2xl font-semibold text-center">
    Autorisation d'exploitation droit à l'image pour un shooting photos
  </h1>
  <div class="flex items-center justify-center">
    <BaseButton
      :is-loading="uiStore.getUIIsLoading"
      @click="testingDownload"
    >
      download
    </BaseButton>
  </div>
  <!-- <template v-if="html">
    <div
      id="doc"
      ref="doc"
      v-html="html"
    />
  </template> -->
</div>
</template>

<script setup lang="ts">
import html2pdf from 'html2pdf.js'
import type { EmployeeType } from '@/types'
import API from '@/helpers/api'

const { getEmployeeFullname } = employeeHook()
const { toFormat } = dateHook()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const html = ref<null | string>(null)
const doc = ref<null | HTMLElement>(null)
// onMounted(() => {
//   window.print()
// })
async function testingDownload() {
  IncLoading()
  const toast = useToast()
  try {
    const api = new API()
    const res = await api.get(`pdf/answer/${1}`)
    html.value = res
    html2pdf(res, {
      margin: 2,
  		filename: 'i-was-html.pdf',
    })
    // const file = new File([new Blob([res], { type: 'text/html' })], 'index.html', { type: 'text/html' })
    // const fileURL = window.URL.createObjectURL(file)
    // const fileLink = document.createElement('a')

    // fileLink.href = fileURL
    // fileLink.setAttribute('download', 'file.pdf')
    // document.body.appendChild(fileLink)

    // fileLink.click()
  } catch (error) {
    toast.error(error.message)
  }
  DecLoading()
}
</script>
