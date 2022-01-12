<template>
	<label
		:class="[{ 'border-4 border-dashed': !imageUrl },
		'flex flex-col items-center hover:border-gray-300 py-5 cursor-pointer']"
	>
		<div v-if="!imageUrl" class="flex flex-col items-center justify-center h-full w-full">
			<PhotographIconOutline class="overflow-hidden h-12 w-12 text-gray-600" />
			<p class="text-sm tracking-wider text-gray-400 group-hover:text-gray-600 mt-8">{{ message }}</p>
		</div>
		<img v-else :src="imageUrl" alt="Logo" class="rounded-full h-72 w-72" />
		<input type="file" id="file" ref="file" class="opacity-0" @change="emitFile" />
	</label>
</template>

<script setup lang="ts">
import { FileType } from '@/store/typesExported'

interface Props {
	message?: string
	logo?: FileType
	url?: string
}

const props = withDefaults(defineProps<Props>(), {
	message: 'Sélectionnez des fichiers',
	file: undefined,
	url: undefined,
})
const emit = defineEmits<{
	(e: 'upload', file: File): void
}>()

const file = ref<null | HTMLInputElement>(null)

const imageUrl = ref<undefined | string>(props.url)

function emitFile() {
	if (file.value && file.value.files) {
		const url = URL.createObjectURL(file.value.files[0])
		imageUrl.value = url
		emit('upload', file.value.files[0])
	}
}

</script>