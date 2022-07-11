<template>
<div class="w-full h-full px-4 mt-4">
  <form class="grid grid-cols-2 gap-4">
    <div class="col-span-2 space-y-2">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Adresse&nbsp;*&nbsp;:</label>
      <BaseInput
        id="addressLine"
        v-model="addressLine"
        type="text"
        :error="addressLineError"
      />
    </div>

    <div class="col-span-2 space-y-2">
      <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Addresse complément&nbsp;:</label>
      <BaseInput
        id="addressLine2"
        v-model="addressLine2"
        type="text"
        :error="addressLine2Error"
      />
    </div>

    <div class="space-y-2">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Code postal&nbsp;*&nbsp;:</label>
      <BaseInput
        id="postalCode"
        v-model="postalCode"
        :error="postalCodeError"
      />
    </div>

    <div class="space-y-2">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Ville&nbsp;*&nbsp;:</label>
      <BaseInput
        id="city"
        v-model="city"
        type="tel"
        :error="cityError"
      />
    </div>
    <div class="space-y-2">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Pays&nbsp;*&nbsp;:</label>
      <BaseInput
        id="country"
        v-model="country"
        type="tel"
        :error="countryError"
      />
    </div>

    <!-- <div
      v-if="userStore.isCurrentUserAdmin && mode !== ModalModeEnum.EDIT"
      class="space-y-2 md:col-span-2"
    >
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Id de l'utilisateur&nbsp;*&nbsp;:</label>
      <InputSearchSelect
        base-url="user"
        @selected="onSelectUser"
      />
      <p
        v-if="userIdError?.length"
        class="text-sm text-red-500"
      >
        {{ userIdError }}
      </p>
    </div> -->
  </form>

  <div class="flex items-center justify-center mt-6">
    <BaseButton
      :disabled="!meta.valid || !meta.dirty"
      @click.prevent="submit"
    >
      <template #icon>
        <SaveIconOutline />
      </template>
      {{ mode === ModalModeEnum.CREATE ? 'Créer' : 'Enregistrer' }}
    </BaseButton>
  </div>
</div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
import type { AddressType, AddressTypeCreate } from '@/types'
import { ModalModeEnum } from '@/types/typesExported'

interface Props {
  address?: AddressType | null
  mode?: ModalModeEnum
}

const props = withDefaults(defineProps<Props>(), {
  address: null,
  mode: ModalModeEnum.CREATE,
})

const { IncLoading, DecLoading } = useUiStore()

const schema = object({
  addressLine: string().required('L\'adresse est requise'),
  addressLine2: string(),
  postalCode: string().required('Le code postal est requis'),
  city: string().required('La ville est requise'),
  country: string().required('Le pays est requis'),
})

const { meta } = useForm({ validationSchema: schema })
const { errorMessage: addressLineError, value: addressLine } = useField<string>('addressLine', undefined, {
  initialValue: props.address ? props.address.addressLine : '',
})
const { errorMessage: addressLine2Error, value: addressLine2 } = useField<string>('addressLine2', undefined, {
  initialValue: props.address ? props.address.addressLine2 : '',
})
const { errorMessage: postalCodeError, value: postalCode } = useField<string>('postalCode', undefined, {
  initialValue: props.address ? props.address.postalCode : '',
})
const { errorMessage: cityError, value: city } = useField<string>('city', undefined, {
  initialValue: props.address ? props.address.city : '',
})

const { errorMessage: countryError, value: country } = useField<string>('country', undefined, {
  initialValue: props.address ? props.address.country : '',
})

const emit = defineEmits<{
  (e: 'submit', address: AddressTypeCreate): void
}>()

async function submit() {
  IncLoading()
  const addressPayload = {
    addressLine: addressLine.value,
    addressLine2: addressLine2.value,
    postalCode: postalCode.value,
    city: city.value,
    country: country.value,
  }
  emit('submit', addressPayload)
  DecLoading()
}
</script>
