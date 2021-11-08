<template>
  <div class="bg-white-light dark:bg-blue-dark min-h-screen transform ease-in-out transition-all duration-500 py-6 text-left pl-14 pr-8">
    <div class="grid grid-cols-3 items-center mb-14">
      <h3 class="text-2xl font-semibold text-gray-800 dark:text-white flex items-center max-w-xs mt">
        <HomeIcon class="h-8 mr-4 dark:bg-red rounded-lg p-1" />
        Événements
      </h3>
      <div class="flex col-span-2 items-center justify-center">
        <BButton class="mr-2 dark:text-black">Tout</BButton>
        <BButton class="mr-2 dark:text-black">En cours</BButton>
        <BButton class="mr-2 dark:text-black">À venir</BButton>
        <BButton class="mr-2 dark:text-black">Terminés</BButton>
        <BInput type="text" placeholder="Recherchez" v-model="search" />
      </div>
    </div>

  <div
    v-for="event in events"
    :key="event.id"
    class="flex items-center"
  >
    <BAccordion
      class="flex flex-col items-center mb-6 bg-white dark:bg-blue-dark_bold rounded-full shadow-2xl
      hover:-translate-y-2 animate-fade-in-down max-w-3xl pb-4"
    >
      <template #title>
        <div class="flex items-center justify-between px-5 py-2 font-semibold">
          <div>{{ event.id }}</div>
          <span class="bg-gray">{{ event.name }}</span>
          <span>{{ getDate(new Date(event.start)) }}</span>
          <button class="px-2 py-1 border-2 border-green rounded-lg text-green font-medium
          hover:text-white hover:bg-green">
            Relancer
          </button>
          <div class="flex items-center">
            {{ event.signatureCount}}/{{ event.totalSignatureNeeded }}
            <!-- // TODO algo to calcul the percentage -->
            <div class="ml-2 rounded-full border-red border-4 w-5 h-5" />
          </div>
          <span :class="getEventStatusColor(event.status)">{{ getEventStatusTranslation(event.status) }}</span>
        </div>
      </template>

      <div class="px-4 mt-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis quae neque maiores velit itaque nisi, maxime repellat mollitia laudantium distinctio voluptate veritatis natus fugit accusamus iure illo minima molestias inventore.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus laboriosam voluptatum maiores commodi nam, dignissimos a dolore assumenda excepturi repellat rerum non asperiores fugit vitae ea illo facilis neque! Quis!
      </div>
    </BAccordion>
    <div class="flex flex-col justify-around h-full ml-3 cursor-pointer">
      <div class="rounded-full bg-gray-500 h-1 w-1 mb-1" />
      <div class="rounded-full bg-gray-500 h-1 w-1 mb-1" />
      <div class="rounded-full bg-gray-500 h-1 w-1" />
    </div>

    <div class="flex flex-col ml-4 px-4 py-2 rounded-xl text-xs">
      <BLink variant="white" class="bg-gray-500 rounded mb-1 py-2 px-4 font-medium hover:translate-x-3 transform transition-all duration-500">modifier</BLink>
      <BLink variant="white" class="bg-gray-500 rounded mb-1 py-2 px-4 font-medium hover:translate-x-3 transform transition-all duration-500">+ Ajouter</BLink>
      <BLink variant="white" class="bg-gray-500 rounded mb-1 py-2 px-4 font-medium hover:translate-x-3 transform transition-all duration-500">Supprimer</BLink>
      <BLink variant="white" class="bg-gray-500 rounded mb-1 py-2 px-4 font-medium hover:translate-x-3 transform transition-all duration-500">Tout télécharger</BLink>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
</script>

<route>
{meta: {
  layout: "AdminDashboardLayout"
}
}
</route>
