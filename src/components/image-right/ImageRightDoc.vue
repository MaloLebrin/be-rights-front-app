<template>
<article class="px-8 space-y-4">
  <h1 class="px-12 mb-10 text-3xl text-center">
    Autorisation exploitation droit à l’image pour un shooting photos
  </h1>
  <p>Je soussigné(e) : {{ getEmployeeFullname(employee) }}</p>
  <p>Demeurant à : {{ employeeAddress.addressLine }}, {{ employeeAddress.postalCode }}, {{ employeeAddress.city }} </p>
  <p>Né(e) Ie {{ toFormat(employee.createdAt, 'D MMMM YYYY') }} : </p>
  <p>Agissant en mon nom personnel.</p>
  <div>
    <span>Autorise {{ photographer }} : </span>
    <span class="font-bold">{{ owner.companyName }}</span>
    <span> à me photographier, le {{ toFormat(event.start, 'D MMMM YYYY') }},</span>
    <span> à {{ eventAddress.addressLine }}, {{ eventAddress.postalCode }}, {{ eventAddress.city }}</span>
  </div>
  <p>En conséquence de quoi et conformément aux dispositions relatives au droit à l’image, j’autorise <span class="font-bold">{{ owner.companyName }}</span> à fixer, reproduire et communiquer au public les photographies prises dans le cadre de la présente.</p>
  <p>Les photographies pourront être exploitées et utilisées par <span class="font-bold">{{ owner.companyName }}</span> sous toute forme et tous supports*, dans le monde entier (en effet, dès lors qu’il y a une publication sur un réseau social, elle est disponible dans le monde entier), pendant une durée de 8 ans (cela vous protège pour éviter que votre image ne soit utilisée indéfiniment), intégralement ou par extraits et notamment :</p>
  <blockquote class="px-4 mx-4 italic border-l-4 border-gray-300 ">
    *Nous entendons tout support audiovisuel et par tous moyens inhérents à ce mode de communication, internet (incluant site web, Intranet, Extranet, Blogs, réseaux sociaux), tous vecteurs de réception confondus (smartphones, tablettes, etc.), médias presse, supports de communication interne, supports promotionnels (PLV, ILV, campagnes d\'affichage en tous lieux, toutes dimensions et sur tous supports (urbain, aéroports, gares, transports en commun, etc.), droit d\'intégration dans une autre œuvre / œuvre multimédia.
  </blockquote>
  <p>Le bénéficiaire de l’autorisation(<span class="font-bold">{{ owner.companyName }}</span>) s’interdit expressément de procéder à une exploitation des photographies susceptibles de porter atteinte à la vie privée ou à la réputation, et d’utiliser les photographies de la présente, dans tout support à caractère pornographique, raciste, xénophobe ou toute autre exploitation préjudiciable. (Ce paragraphe a également pour objectif de vous protéger des utilisations non désirées de votre image) </p>
  <p>Je me reconnais (la personne photographiée) être entièrement rempli de mes droits et je ne pourrai prétendre à aucune rémunération pour l’exploitation des droits visés aux présentes.</p>
  <p>Je garantis(la personne photographiée) que je ne suis pas lié(e) par un contrat exclusif relatif à l’utilisation de mon image ou de mon nom.</p>
  <p>Pour tout litige né de l’interprétation ou de l’exécution des présentes, il est fait attribution expresse de juridiction aux tribunaux français.</p>
  <div class="grid grid-cols-2 py-4">
    <div class="space-y-2">
      <p>Fait à {{ employeeAddress.city }}, le {{ toFormat(new Date(), 'D MMMM YYYY') }}</p>
      <p>Nom et prénom de la personne photographiée:</p>
      <p>{{ getEmployeeFullname(employee) }}</p>
      <p>Signature</p>
    </div>
    <div class="space-y-2">
      <p>Fait à {{ ownerAddress.city }}, le {{ toFormat(new Date(), 'D MMMM YYYY') }}</p>
      <p>Nom et prénom du représentant de {{ owner.companyName }}</p>
      <p>{{ getUserfullName(owner) }}</p>
      <div>
        <p>Signature</p>
        <p class="-rotate-12">
          <span class="text-2xl font-bold font-Kalam">{{ getUserfullName(owner) }}</span>
        </p>
      </div>
    </div>
  </div>
</article>
</template>

<script setup lang="ts">
import type { AddressType, EmployeeType, EventType, UserType } from '@/types'

interface Props {
  employee: EmployeeType
  owner: UserType
  employeeAddress: AddressType
  ownerAddress: AddressType
  photographer: string
  event: EventType
  eventAddress: AddressType
}

defineProps<Props>()
const { toFormat } = dateHook()
const { getUserfullName } = userHook()
const { getEmployeeFullname } = employeeHook()
</script>
