<template>
<section class="pt-10 md:mx-auto md:container">
  <div
    class="grid items-center justify-center grid-cols-1 gap-4 md:grid-cols-2 md:flex-row DarkModeAnimation"
  >
    <div class="flex flex-col items-center justify-center mx-auto">
      <h1
        class="my-4 text-xl font-bold md:text-5xl md:leading-snug dark:text-gray-100"
      >
        Gérez enfin le droit à l'image de vos clients facilement !
      </h1>
      <p
        class="mb-8 text-lg leading-normal text-center md:text-2xl dark:text-gray-400"
      >
        Commencez maintenant avec un mois gratuit.
      </p>
      <button
        class="px-8 py-4 mx-auto my-6 font-bold text-gray-800 transition duration-300 ease-in-out transform bg-white rounded-full shadow-lg lg:mx-0 hover:underline focus:outline-none focus:shadow-outline hover:-translate-y-2 hover:scale-105"
        href="#Newsletter"
      >
        Commencez
      </button>
    </div>
    <!--Right Col-->
    <div class="hidden bg-transparent rounded-lg shadow-xl sm:block">
      <img
        class="z-50 w-full duration-300 ease-in-out transform rounded-lg hover:-translate-x-1"
        src="@/assets/photographer.jpg"
        alt="photographer"
      >
    </div>
  </div>
</section>
</template>
