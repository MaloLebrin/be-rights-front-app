<template>
  <router-view v-slot="{ Component, route }">
    <component
      :is="Component"
      :key="route.path"
    />
  </router-view>
</template>
<script setup lang="ts">
import { watch, onBeforeMount } from 'vue'
import { useMainStore } from '@/store/mainStore'
import userHook from '@/hooks/userHook'
import { useEventStore } from './store/events/eventStore'
import { EventType } from './store/events/types'
    const store = useMainStore()
    const eventStore = useEventStore()
    const { createMany } = eventStore
    const { routesIntermsOfUserRoles } = userHook()

    watch(() => [store.setIsLoggedIn,], async () => {
      await routesIntermsOfUserRoles()
    })

    onBeforeMount(async () => await routesIntermsOfUserRoles())

    const events =[
            {
                documentId: [],
                employeeList: [],
                status: "CREATE",
                creadtedAt: "2021-11-05T13:37:12.030Z",
                updatedAt: "2021-11-05T13:37:12.030Z",
                signatureCount: 0,
                totalSignatureNeeded: 0,
                id: 1,
                name: "Event1",
                start: "2022-09-22T15:00:00.000Z",
                end: "2023-09-22T15:00:00.000Z",
                address: "2 rue de france",
                postalCode: 41000,
                city: "ville",
                country: "France",
                userId: 1,
            },
            {
                documentId: [],
                employeeList: [],
                status: "CREATE",
                creadtedAt: "2021-11-05T13:37:12.030Z",
                updatedAt: "2021-11-05T13:37:12.030Z",
                signatureCount: 0,
                totalSignatureNeeded: 0,
                id: 2,
                name: "Event1",
                start: "2022-09-22T15:00:00.000Z",
                end: "2023-09-22T15:00:00.000Z",
                address: "2 rue de france",
                postalCode: 41000,
                city: "ville",
                country: "France",
                userId: 1,
            },
            {
                documentId: [],
                employeeList: [],
                status: "CREATE",
                creadtedAt: "2021-11-05T13:37:12.030Z",
                updatedAt: "2021-11-05T13:37:12.030Z",
                signatureCount: 0,
                totalSignatureNeeded: 0,
                id: 3,
                name: "Event1",
                start: "2022-09-22T15:00:00.000Z",
                end: "2023-09-22T15:00:00.000Z",
                address: "2 rue de france",
                postalCode: 41000,
                city: "ville",
                country: "France",
                userId: 1,
            },
            {
                documentId: [],
                employeeList: [],
                status: "CREATE",
                creadtedAt: "2021-11-05T13:37:12.030Z",
                updatedAt: "2021-11-05T13:37:12.030Z",
                signatureCount: 0,
                totalSignatureNeeded: 0,
                id: 4,
                name: "Event1",
                start: "2022-09-22T15:00:00.000Z",
                end: "2023-09-22T15:00:00.000Z",
                address: "2 rue de france",
                postalCode: 41000,
                city: "ville",
                country: "France",
                userId: 1,
            },
            {
                documentId: [],
                employeeList: [],
                status: "CREATE",
                creadtedAt: "2021-11-05T13:37:12.030Z",
                updatedAt: "2021-11-05T13:37:12.030Z",
                signatureCount: 0,
                totalSignatureNeeded: 0,
                id: 5,
                name: "Event1",
                start: "2022-09-22T15:00:00.000Z",
                end: "2023-09-22T15:00:00.000Z",
                address: "2 rue de france",
                postalCode: 41000,
                city: "ville",
                country: "France",
                userId: 1,
            }
        ]
    createMany(events as EventType[])

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
}
</style>
