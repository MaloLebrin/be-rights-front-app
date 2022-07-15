<template>
<AdminPageWrapper>
  <EventCreationStepper :current-step-index="currentStepIndex" />
  <template v-if="isEventCreation">
    <EventForm :mode="ModalModeEnum.CREATE" />
  </template>

  <AddressForm
    v-if="isAddressEventCreation"
  />

  <PhotographerForm
    v-if="isPhotographerCreation"
    @submitted="submit"
  />
  <div
    v-else-if="isEnd"
    class="mt-6 space-y-2"
  >
    <h4 class="text-center">
      Merci d'avoir rempli le formulaire
    </h4>
    <div>
      <h4 class="sr-only">
        Status
      </h4>
      <p class="text-sm font-medium text-gray-900">
        Enregistrement des données...
      </p>
      <div
        class="mt-6"
        aria-hidden="true"
      >
        <div class="overflow-hidden bg-gray-200 rounded-full">
          <div
            class="h-2 bg-indigo-600 rounded-full"
            :style="`width: ${progressBarProgession}%`"
          />
        </div>
        <div class="hidden grid-cols-5 mt-6 text-sm font-medium text-gray-600 sm:grid">
          <div :class="progressBarProgession === 0 ? 'text-indigo-600' : ''">
            L'événement
          </div>
          <div
            class="text-center"
            :class="isSubmitStepComplete(20).value ? 'text-indigo-600' : ''"
          >
            Destinataires
          </div>
          <div
            class="text-center"
            :class="isSubmitStepComplete(40).value ? 'text-indigo-600' : ''"
          >
            Adresse
          </div>
          <div
            class="text-center"
            :class="isSubmitStepComplete(60).value ? 'text-indigo-600' : ''"
          >
            Photographe
          </div>
          <div
            class="text-right"
            :class="isSubmitStepComplete(100).value ? 'text-indigo-600' : ''"
          >
            ok
          </div>
        </div>
      </div>
    </div>
  </div>
</AdminPageWrapper>
</template>

<script setup lang="ts">
import router from '@/router'
import type { EventTypeCreate } from '@/types'
import { ModalModeEnum } from '@/types'
const route = useRoute()
const eventStore = useEventStore()
const { resetCreationForm: resetEventForm } = eventStore
const userStore = useUserStore()
const { resetPhotographerForm } = userStore
const addressStore = useAddressStore()
const { resetCreationForm: resetAddressForm } = addressStore
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore

const { postOne: postOneEvent } = eventHook()
const { postMany: postManyAnswers } = answerHook()
const { postOne: postOneAddress } = addressHook()
const { postPhotographer } = userHook()

const isEventCreation = computed(() => route.query.step === 'event' || route.query.step === undefined)
const isAddressEventCreation = computed(() => route.query.step === 'address')
const isPhotographerCreation = computed(() => route.query.step === 'photographer')
const isEnd = computed(() => route.query.step === 'end')

const currentStepIndex = computed(() => {
  if (isEventCreation.value) {
    return 0
  }
  if (isAddressEventCreation.value) {
    return 1
  }
  if (isPhotographerCreation.value) {
    return 2
  }
  if (isEnd.value) {
    return 3
  }
  return 0
})

const progressBarProgession = ref<number>(0)
const isSubmitStepComplete = (purcent: number) => computed(() => purcent >= progressBarProgession.value)

async function submit() {
  IncLoading()

  const photographer = await postPhotographer({
    ...userStore.photographerForm,
  })
  resetPhotographerForm()
  progressBarProgession.value = 20
  if (photographer && eventStore.creationForm.createdByUser) {
    const userId = eventStore.creationForm.createdByUser
    const newEvent = await postOneEvent({
      ...eventStore.creationForm as Omit<EventTypeCreate, 'photographerId'>,
      photographerId: photographer.id,
      createdByUser: userId,
    }, userId)
    progressBarProgession.value = 40
    if (newEvent) {
      resetEventForm()
      await postManyAnswers(newEvent.id, eventStore.creationForm.employeeIds)
      progressBarProgession.value = 60
      await postOneAddress({
        address: { ...addressStore.creationForm },
        eventId: newEvent.id,
      })
      progressBarProgession.value = 100
      resetAddressForm()
      router.push({
        name: userStore.isCurrentUserAdmin ? 'admin.events.show' : 'user.events.show',
        params: {
          eventId: newEvent.id,
        },
      })
    }
  }
  DecLoading()
}

</script>
