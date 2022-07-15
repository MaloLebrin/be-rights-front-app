<template>
<AdminPageWrapper>
  <div class="h-full px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col h-full mt-8">
      <div class="h-full -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block h-full min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full overflow-visible divide-y divide-gray-300">
              <thead class="bg-gray-50">
              <!-- <HeaderUserTable /> -->
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <template v-if="newsletterArray?.length > 0">
                  <NewsletterItemTable
                    v-for="item in newsletterArray"
                    :key="item.id"
                    :newsletter-item="item"
                  />
                </template>
                <p
                  v-else
                  class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6"
                >
                  Aucune inscription à la newsletter
                </p>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</AdminPageWrapper>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'

const { fetchAll } = newsletterHook()
const { IncLoading, DecLoading } = useUiStore()
const tableStore = useTableStore()
const newsletterStore = useNewsletterStore()
const { setFilters } = useTableStore()

onBeforeRouteLeave(() => {
  setFilters(null)
})

const newsletterArray = computed(() => Object.values(newsletterStore.getAll))

watch(() => tableStore.getFinalUrl, async newValue => {
  IncLoading()
  // newsletterStore.resetState()
  await fetchAll(newValue)
  DecLoading()
})

onMounted(async() => {
  IncLoading()
  await fetchAll(tableStore.getFinalUrl)
  DecLoading()
})
</script>
