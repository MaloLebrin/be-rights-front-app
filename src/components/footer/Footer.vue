<template>
  <footer>
    <div class="mx-auto">
      <div class="w-full flex flex-col md:flex-row ">
        <div class="flex-1 mb-6 text-black justify-between py-6">
          <BButton
            class="mb-4 mt-4 text-white shadow-lg transform transition hover:scale-105 duration-300 ease-in-out"
            variant="danger"
          >
            Commencer avec un mois gratuit
          </BButton>
          <SimpleLogo />
          {{ `© Be Right ${new Date().getFullYear()}` }}
        </div>
        <div class="flex-1 bg-gray-800 py-6">
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
    </div>
  </footer>

</template>
