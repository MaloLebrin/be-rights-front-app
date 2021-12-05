<template>
	<div v-if="user" class="mt-4 px-4 w-full h-full">
		<form
			class="grid grid-cols-2 gap-4"
			@submit.prevent="submit"
		>
			<BField label="Prénom" labelFor="firstName">
				<BInput
					class="text-white dark:text-blue-dark"
					type="text"
					id="firstName"
					v-model="user.firstName"
				/>
			</BField>
			<BField label="Nom" labelFor="lastName">
				<BInput
					class="text-white dark:text-blue-dark"
					type="text"
					id="lastName"
					v-model="user.lastName"
				/>
			</BField>
			<BField label="E-mail" labelFor="email">
				<BInput
					class="text-white dark:text-blue-dark"
					type="email"
					id="email"
					v-model="user.email"
				/>
			</BField>
			<Select
				:options="userRolesArray"
				default="Sélectionnez votre Role"
				@selected="user.roles = $event"
			/>
		</form>
	</div>
</template>

<script setup lang='ts'>
import { useUserStore } from '@/store'
import { userRolesArray } from '@/types'
import { computed } from 'vue'

interface Props {
	id: number
}

const props = withDefaults(defineProps<Props>(), {
	id: undefined
})

const userStore = useUserStore()

const user = computed(() => userStore.getOne(props.id))

const emits = defineEmits<{
	(e: 'submit', id: number): void
}>()

function submit() {
	emits('submit', props.id)
}

</script>