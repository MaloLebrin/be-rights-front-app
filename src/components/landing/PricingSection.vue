<template>
<section
  id="Pricings"
  class="py-8 DarkModeAnimation"
>
  <div class="container px-2 pt-4 pb-12 mx-auto text-gray-800">
    <h1
      class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800 dark:text-gray-50"
    >
      Choisissez votre
      <span class="text-red-light">Abonnement</span>
    </h1>
    <div class="w-full mb-4">
      <div class="w-64 h-1 py-0 mx-auto my-0 rounded-t opacity-25 gradient" />
    </div>

    <div class="grid grid-cols-1 mt-10 lg:grid-cols-3 md:gap-2">
      <div
        class="flex flex-col px-10 mt-4 text-left transition duration-500 ease-in-out transform bg-white rounded-none shadow-2xl lg:mx-0 md:rounded-lg dark:bg-blue-dark DarkModeAnimation hover:z-20 hover:scale-105 dark:shadow-2xl"
      >
        <div class="flex-1 text-gray-600 dark:text-white">
          <div class="relative py-8 text-3xl font-bold text-left">
            Essentiel
            <div
              class="absolute top-0 right-0 px-2 py-3 text-sm text-white rounded-b-lg bg-red-light"
            >
              1 mois gratuit
            </div>
          </div>
          <div class="w-full pt-4 text-4xl font-bold text-gray-600 dark:text-white">
            3.99€
            <span class="text-base">/mois</span>
          </div>
          <span
            class="text-xs"
          >Vous avez une activité soutenue, vous êtes seul ou avec une équipe restreinte.</span>

          <ul class="w-full text-sm">
            <li class="py-4">
              1 utilisateur
            </li>
            <li class="py-4">
              5 évenements
              <span class="text-base">/mois</span>
            </li>
          </ul>
        </div>
        <div
          class="flex-none p-6 mt-auto bg-white rounded-t-none rounded-b dark:bg-blue-dark DarkModeAnimation"
        >
          <div class="flex items-center justify-center">
            <button
              class="px-8 py-4 mx-auto my-6 font-bold text-black transition duration-300 ease-in-out transform rounded-full shadow-lg lg:mx-0 gradient dark:bg-white DarlModeAnimation focus:outline-none focus:shadow-outline hover:scale-105"
              href="#Newsletter"
            >
              Commencez
            </button>
          </div>
        </div>
      </div>

      <div
        class="z-10 flex flex-col px-10 mt-4 text-left text-white transition duration-300 ease-in-out transform rounded-lg shadow-2xl lg:mx-0 sm:-mt-6 bg-blue-dark dark:bg-white-break DarkModeAnimation dark:text-blue-dark hover:scale-105"
      >
        <div class="flex-1 overflow-hidden rounded-t rounded-b-none DarkModeAnimation">
          <div class="relative py-8 text-3xl font-bold text-blue">
            Pro
            <div
              class="absolute top-0 px-2 py-3 text-sm text-white rounded-b-lg bg-red-light right-5"
            >
              2 mois gratuits
            </div>
          </div>
          <div class="w-full pt-6 text-5xl font-bold">
            9.99€
            <span class="text-base">/mois</span>
          </div>
          <span
            class="text-xs"
          >Vous avez une activité soutenue, vous êtes seul ou avec une équipe restreinte.</span>
          <div class="w-full h-1 py-0 my-0 rounded-t gradient" />
          <ul class="w-full text-base font-bold">
            <li class="py-4">
              3 utilisateurs
            </li>
            <li class="py-4">
              25 événements
              <span class="text-base">/mois</span>
            </li>
          </ul>
        </div>
        <div class="flex-none p-6 mt-auto overflow-hidden rounded-t-none rounded-b">
          <div class="flex items-center justify-center">
            <button
              class="px-8 py-4 mx-auto my-6 font-bold text-black transition duration-300 ease-in-out transform bg-white rounded-full shadow-lg lg:mx-0 gradient dark:bg-blue dark:text-white DarlModeAnimation focus:outline-none focus:shadow-outline hover:scale-105"
              href="#Newsletter"
            >
              Commencez
            </button>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col px-10 mt-4 text-left transition duration-500 ease-in-out transform bg-white rounded-none shadow-2xl lg:mx-0 md:rounded-lg dark:bg-blue-dark DarkModeAnimation hover:z-20 hover:scale-105 dark:shadow-2xl"
      >
        <div class="flex-1 text-gray-600 dark:text-white">
          <div class="relative py-8 text-3xl font-bold text-left">
            Expert
            <div
              class="absolute top-0 right-0 px-2 py-3 text-sm text-white rounded-b-lg bg-red-light"
            >
              3 mois gratuit
            </div>
          </div>
          <div class="w-full pt-4 text-4xl font-bold text-gray-600 dark:text-white">
            19.99€
            <span class="text-base">/mois</span>
          </div>
          <span
            class="text-xs"
          >Vous avez une activité soutenue, vous êtes seul ou avec une équipe restreinte.</span>

          <ul class="w-full text-sm">
            <li class="py-4">
              Utilisateurs ilimités
            </li>
            <li class="py-4">
              Événements ilimités
              <span class="text-base">/mois</span>
            </li>
          </ul>
        </div>
        <div
          class="flex-none p-6 mt-auto bg-white rounded-t-none rounded-b dark:bg-blue-dark DarkModeAnimation"
        >
          <div class="flex items-center justify-center">
            <button
              class="px-8 py-4 mx-auto my-6 font-bold text-black transition duration-300 ease-in-out transform rounded-full shadow-lg lg:mx-0 gradient dark:bg-white DarlModeAnimation focus:outline-none focus:shadow-outline hover:scale-105"
              href="#Newsletter"
            >
              Commencez
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
