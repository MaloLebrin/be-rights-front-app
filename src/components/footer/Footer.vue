<template>
  <footer class="shadow-3xl dark:bg-blue-dark_bold DarkModeAnimation">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="flex flex-col mb-6 text-black justify-between mx-auto items-center py-6 dark:text-white">
        <SimpleLogo class="mb-10" />
        <DarkModeToggle />
        {{ `© Be Right ${new Date().getFullYear()}` }}
      </div>
      <div class="flex-1 py-6 bg-gray-800 dark:bg-transparent">
        <p class="uppercase lg:mt-4 text-gray-200 md:mb-6">Menu</p>
        <ul class="list-reset mb-6">
          <li class="mt-2 inline-block mr-2 md:block md:mr-0">
            <a
              href="#"
              class="no-underline hover:underline text-white hover:text-red-light"
            >Se connecter</a>
          </li>
          <li class="mt-2 inline-block mr-2 md:block md:mr-0">
            <a
              href="#"
              class="no-underline hover:underline text-white hover:text-red-light"
            >s'inscrire</a>
          </li>
          <li class="mt-2 inline-block mr-2 md:block md:mr-0">
            <a
              href="#"
              class="no-underline hover:underline text-white hover:text-red-light"
            >Accueil</a>
          </li>
        </ul>
        <p class="text-xs text-gray-500">designed by digital campus students</p>
      </div>
    </div>
  </footer>
</template>
