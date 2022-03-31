<template>
  <div class="relative min-h-screen py-6 pr-8 text-left pl-14">
    <div class="flex items-center">
      <UserIconOutlineIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />
      <h1
        class="flex items-center max-w-xs text-2xl font-semibold text-gray-800 dark:text-white mt"
      >Créer un Destinataire</h1>
    </div>
  </div>
  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <EmployeeForm />
  </transition>
</template>

