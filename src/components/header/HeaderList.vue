<template>
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
        <BInput type="text" placeholder="Recherchez"/>
      </div>
    </div>

</template>