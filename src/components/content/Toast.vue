<template>
  <div v-if="isActive" class="absolute inset-0 flex items-center justify-center shadow-2xl">
    <div class="Toast px-6 py-4 border-0 rounded-2xl relative mb-4 shadow-2xl" :class="classes">
      <span class="inline-block align-middle">
        <slot />
      </span>
      <button
        v-if="isCloseable"
        class="absolute -top-1 -right-1 bg-white border-2 border-black-light text-black rounded-full cursor-pointer"
        @click="closeAlert()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          style=" fill:#000000;"
        >
          <path
            d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToastVariantsEnum, ToastVariantsMap } from '@/types/typesExported'

const { resetUiToastState } = useUiStore()

interface Props {
	variant?: ToastVariantsEnum
	isCloseable?: boolean
	isToastOpen: boolean
	toastDuration?: number
}
const props = withDefaults(defineProps<Props>(), {
	variant: ToastVariantsEnum.PRIMARY,
	isCloseable: true,
	isToastOpen: false,
	toastDuration: 1000,
})
const emit = defineEmits<{
	(e: 'close'): void
}>()


const isActive = ref(props.isToastOpen)

const classes = computed(() => ToastVariantsMap[props.variant])

watch(() => props.isToastOpen, newValue => {
	isActive.value = newValue
	if (isActive.value) {
		setTimeout(() => closeAlert(), props.toastDuration)
	}
})

function closeAlert() {
	isActive.value = false
	emit('close')
	resetUiToastState()
}

</script>
