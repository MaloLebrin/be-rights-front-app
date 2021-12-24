<template>
	<label
		class="flex flex-col items-center border-4 border-dashed hover:border-gray-300 py-5 cursor-pointer"
	>
		<div class="flex flex-col items-center justify-center h-full w-full">
			<img v-if="imageUrl" :src="imageUrl" alt="alt" />
			<PhotographIconOutline class="overflow-hidden h-12 w-12 text-gray-600" />
			<p class="text-sm tracking-wider text-gray-400 group-hover:text-gray-600 mt-8">{{ message }}</p>
		</div>
		<input type="file" id="file" ref="file" class="opacity-0" @change="emitFile" />
	</label>
</template>
<script setup lang='ts'>

interface Props {
	message?: string
}

withDefaults(defineProps<Props>(), {
	message: 'Sélectionnez des fichiers',
})
const emit = defineEmits<{
	(e: 'upload', file: File): void
}>()

const file = ref<null | HTMLInputElement>(null)

const imageUrl = ref<null | string>(null)

function emitFile() {
	if (file.value && file.value.files) {
		const url = URL.createObjectURL(file.value.files[0])
		imageUrl.value = url
		emit('upload', file.value.files[0])
	}
}

</script>