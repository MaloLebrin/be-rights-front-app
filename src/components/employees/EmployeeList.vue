<template>
  <div class="relative mt-32">
    <Loader
      v-if="uiStore.getUIIsLoading"
      :isLoading="uiStore.getUIIsLoading"
      :type="LoaderTypeEnum.BOUNCE"
    />
    <div
      v-else-if="!uiStore.getUIIsLoading && employees.length > 0"
      v-for="(employee, index) in employees"
      :key="employee.id"
    >
      <DashboardItem :index="index">
        <template #title>
          <div class="grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-4">
            <span class="text-sm text-gray-500 dark:text-gray-400">Prénom - Nom</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">Email</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">Téléphone</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">Créé le :</span>
            <span class="dark:text-white">{{ employee.firstName }} {{ employee.lastName }}</span>
            <span class="dark:text-white">{{ employee.email }}</span>
            <span class="dark:text-white">{{ employee.phone }}</span>
            <span class="dark:text-white">{{ getDate(employee.createdAt.toString()) }}</span>
          </div>
        </template>
        <template #extraButton>
          <BLink
            :variant="extraButtonStyle"
            class="EventActionButton"
            @click="updateOneEmployee(employee)"
          >modifier {{ employee.firstName }} {{ employee.lastName }}</BLink>
          <BLink
            :variant="extraButtonStyle"
            class="EventActionButton"
            @click="deleteOneEmployee(employee)"
          >Supprimer {{ employee.firstName }} {{ employee.lastName }}</BLink>
        </template>
      </DashboardItem>
    </div>
    <h4 v-else class="text-2xl font-semibold text-blue-dark dark:text-white">{{ noEventMesssage }}</h4>
  </div>
</template>

<script setup lang="ts">
import { EmployeeType, ModalModeEnum, ModalNameEnum } from '@/types/typesExported'
import { LoaderTypeEnum } from '@/types/globals'
import { useUiStore, useUserStore } from '@/store'
import useMainStore from '@/store/main/mainStore'

interface Props {
  employees: EmployeeType[]
}

withDefaults(defineProps<Props>(), {
  employees: () => [],
})

const uiStore = useUiStore()
const { isCurrentUserAdmin } = useUserStore()
const { isDarkTheme } = useMainStore()
const { setUiModal } = uiStore
const { getDate } = dateHook()

function updateOneEmployee(employee: EmployeeType) {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.ADD_EMPLOYEE,
    modalMode: ModalModeEnum.EDIT,
    data: { employee },
  })
}

function deleteOneEmployee(employee: EmployeeType) {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.ADD_EMPLOYEE,
    modalMode: ModalModeEnum.DELETE,
    data: { employee },
  })
}
const noEventMesssage = computed(() =>
  isCurrentUserAdmin ? 'Aucun destinataire enregistré dans la base de donnée' : 'Vous n\'avez pas de destinataire enregistré dans la base de donnée'
)
const extraButtonStyle = computed(() => isDarkTheme ? 'primary' : "white")
</script>