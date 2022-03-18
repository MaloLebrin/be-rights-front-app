<template>
  <div class="relative mt-32">
    <Loader
      v-if="uiStore.getUIIsLoading"
      :isLoading="uiStore.getUIIsLoading"
      :type="LoaderTypeEnum.BOUNCE"
    />

    <div
      v-else-if="!uiStore.getUIIsLoading && bugs.length > 0"
      v-for="(bug, index) in bugs"
      :key="bug.id"
    >
      <DashboardItem :index="index">
        <template #title>{{ bug.name }}</template>
      </DashboardItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '@/store'
import { BugReportType, LoaderTypeEnum } from '@/types/typesExported'

interface Props {
  bugs: BugReportType[]
}

withDefaults(defineProps<Props>(), {
  bugs: () => [],
})

const uiStore = useUiStore()

</script>