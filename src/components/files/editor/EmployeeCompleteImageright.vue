<template>
<AdminPageWrapper>
  <ImageRightDoc
    :employee="Object.values(employeeStore.getAll)[0]"
    :employee-address="Object.values(addressStore.getAll)[0]"
    :owner="userStore.getCurrent"
    :owner-address="Object.values(addressStore.getAll)[0]"
    :event="Object.values(eventStore.getAll)[0]"
    :event-address="Object.values(addressStore.getAll)[0]"
    photographer="Kévin Durand"
  />
</AdminPageWrapper>
</template>

<script setup lang="ts">
const employeeStore = useEmployeeStore()
const addressStore = useAddressStore()
const userStore = useUserStore()
const eventStore = useEventStore()
</script>
