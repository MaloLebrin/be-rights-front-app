<template>
  <section class="dark:bg-blue-dark grid gap-4 grid-cols-1 md:grid-cols-2 justify-center md:flex-row items-center pt-10 DarkModeAnimation">
    <!--Left Col-->
    <div class="flex flex-col justify-center items-center">
      <!-- <p class="uppercase tracking-loose w-full mx-auto">Gérez enfin le droit à l'image de vos clients facilement</p> -->
      <h1 class="text-xl my-4 md:text-5xl font-bold md:leading-snug dark:text-gray-100">
        Gérez enfin le droit à l'image de vos clients facilement !
      </h1>
      <p class="leading-normal text-lg text-center md:text-2xl mb-8 dark:text-gray-400">
        Commencez maintenant avec un mois gratuit.
      </p>
      <button
        class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full
        my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:-translate-y-2 hover:scale-105 duration-300 ease-in-out"
        href="#Newsletter"
      >
        Commencez
      </button>
    </div>
    <!--Right Col-->
    <div class="hidden sm:block shadow-xl bg-transparent rounded-lg">
      <img
        class="w-full z-50 rounded-lg transform duration-300 ease-in-out hover:-translate-x-1"
        src="@/assets/photographer.jpg"
      />
    </div>
  </section>

  <section class="py-8 bg-white dark:bg-blue-dark_bold DarkModeAnimation">
    <div class="container max-w-5xl mx-auto m-8">
      <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800 dark:text-white">
        <span class="text-red-light">Be right</span>, comment ça marche ?
      </h1>
      <div class="w-full mb-4 dark:hidden">
        <div class="h-1 mx-auto gradient bg-red dark:bg-blue w-64 opacity-25 my-0 py-0 rounded-t"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 md:p-0">
          <div class="hidden md:block">
            <img
              class="w-24"
              src="../assets/step1.svg"
              alt="step1"
              height="100px"
              width="100px"
            />
          </div>

          <div class="">
            <h3 class="text-3xl text-gray-800 dark:text-gray-100 font-bold leading-none">
              Sélectionnez un client.
            </h3>
            <p class="text-gray-600 dark:text-gray-50 text-left">
              Vous pouvez choisir un client déjà existant ou en ajouter de nouveaux.
              Vous pouvez directement entrer les coordonnées de la personne avec qui vous collaborez.
            </p>
          </div>
        </div>
        <div />
        <div />

        <div class="p-4 md:p-0">
          <div class="hidden md:block">
            <img
              class="w-28"
              src="../assets/step2.svg"
              alt="step2"
            />
          </div>
          <div class="">
            <div class="align-middle p-2">
              <h3 class="text-3xl text-gray-800 dark:text-gray-100 font-bold leading-none">
                Créez votre événement
              </h3>
              <p class="text-gray-600 dark:text-gray-50 text-left">
                Créer l'événement qui aura lieu avec le client. Vous renseignez la date de l'événement, le lieu, pour une parfaite organisation.
              </p>
            </div>
          </div>
        </div>

        <div class="p-4 md:p-0">
          <div class="hidden md:block">
            <img
              class="w-28"
              src="../assets/step3.svg"
              alt="step3"
            />
          </div>
          <div class="">
            <div class="align-middle">
              <h3 class="text-3xl text-gray-800 dark:text-gray-100 font-bold leading-none">
                Partage de l'accès au client
              </h3>
              <p class="text-gray-600 dark:text-gray-50 text-left">
                Votre client a accès aux événements que vous avez en commun.
                Il peut donc renseigner la liste des destinataires des signatures, relancer les destinataires qui n'auraient pas répondu et télécharger l'ensemble des documents qui le concerne.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
  <section
    id="Solution"
    class="py-8 w-full relative bg-white dark:bg-blue-dark DarkModeAnimation"
  >
    <img
      class="hidden md:inline absolute right-0 transform duration-500 ease-in-out hover:-translate-y-2 animate-fade-in-down"
      src="../assets/mokup-phone.png"
    />
    <div class="container mx-auto flex flex-wrap pt-4 pb-12">
      <h1 class="w-full my-2 text-5xl font-bold leading-tight text-gray-800 dark:text-white mb-6">
        <span class="text-red-light">Be right</span>, qu'est ce que c'est ?
      </h1>
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div class="w-full p-6 px-12 text-left transform hover:-translate-y-2 duration-300 ease-in-out">
          <div class="flex-1 rounded-t rounded-b shadow dark:shadow-xl p-4 bg-white dark:bg-blue-dark DarkModeAnimation">
            <div class="w-full font-bold text-xl text-gray-800 dark:text-white px-6 py-4">
              Une application de gestion dématérialisée & sécurisée
            </div>
            <p class="text-gray-800 dark:text-gray-100 text-base px-6 mb-5 text-left">
              Be right est une plateforme de gestion dématérialisée de vos documents de droits à l'image.
              Avec cette application, vous, photograpges et agences de photos pouvez gérer vos événements et
              faire signer vos documents en seulement quelques clics.
              Pour vérifier l'authenticité des signatures un code de vérification sera envoyé au destinataire.
            </p>
          </div>
        </div>
        <div class="w-full p-6 px-12  text-left transform hover:-translate-y-2 duration-300 ease-in-out">
          <div class="flex-1 rounded-t rounded-b shadow dark:shadow-xl p-4 bg-white dark:bg-blue-dark DarkModeAnimation">
            <div class="w-full font-bold text-xl text-gray-800 dark:text-white px-6 py-4">
              Disponibles sur plusieurs devices
            </div>
            <p class="text-gray-800 dark:text-gray-100 text-base px-6 mb-5">
              Grâce à notre développement en application hybride, notre application est disponible sur internet mais également sur votre tablette ou smartphone via les appstores.
              Vous pouvez alors tout à fait switcher de device comme bon vous semble !
            </p>
          </div>
        </div>
        <div class="w-full p-6 px-12  text-left transform hover:-translate-y-2 duration-300 ease-in-out">
          <div class="flex-1 rounded-t rounded-b shadow dark:shadow-xl p-4 bg-white dark:bg-blue-dark DarkModeAnimation">
            <div class="w-full font-bold text-xl text-gray-800 dark:text-white px-6 py-4">
              Arrivez sereinement sur le lieu de l'événement !
            </div>
            <p class="text-gray-800 dark:text-gray-100 text-base px-6 mb-5">
              Afin de faciliter l'envoi et la réception des documents de droit à l'image, nous avons pensé et conçu <span class="font-bold">be right</span>.
              Cet outil vous permet d'ajouter des clients, leur envoyer automatiquement la demande de droit à l'image, puis recevoir le document signé directement sur la plateforme.
              Fini les envoies de mails à gogo et les documents papiers imprimés !
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section
    id="Pricings"
    class="bg-white dark:bg-blue-dark_bold DarkModeAnimation py-8"
  >
    <div class="container mx-auto px-2 pt-4 pb-12 text-gray-800">
      <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800 dark:text-gray-50">
        Choisissez votre <span class="text-red-light">Abonnement</span>
      </h1>
      <div class="w-full mb-4">
        <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
      </div>
      <div class="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
        <div class="flex flex-col mt-4 w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg 
        bg-white dark:bg-blue-dark DarkModeAnimation hover:z-20 transform transition hover:scale-105 duration-300 ease-in-out dark:shadow-2xl">
          <div class="flex-1 bg-white dark:bg-blue-dark DarkModeAnimation text-gray-600 dark:text-white rounded-t rounded-b-none shadow">
            <div class="p-8 text-3xl font-bold text-center border-b-4 relative">
              Essentiel
              <div class="absolute bg-red-light left-0 px-2 py-3 text-white text-sm rounded-r-lg">1 mois gratuit</div>
            </div>
            <ul class="w-full text-center text-sm">
              <li class="border-b py-4">1 utilisateur</li>
              <li class="border-b py-4">5 évenements<span class="text-base">/mois</span></li>
            </ul>
          </div>
          <div class="flex-none mt-auto bg-white dark:bg-blue-dark DarkModeAnimation rounded-b rounded-t-none  shadow p-6">
            <div class="w-full pt-6 text-3xl text-gray-600 dark:text-white font-bold text-center">
              3.99€
              <span class="text-base">/mois</span>
            </div>
            <div class="flex items-center justify-center">
              <button
                class="mx-auto lg:mx-0 gradient text-black dark:bg-white DarlModeAnimation font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                href="#Newsletter"
              >
                Commencez
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 mt-4 sm:-mt-6 rounded-lg bg-white dark:bg-blue-dark DarkModeAnimation
        shadow-lg z-10 transform transition hover:scale-105 duration-300 ease-in-out">
          <div class="flex-1 bg-white dark:bg-blue-dark DarkModeAnimation rounded-t rounded-b-none overflow-hidden shadow">
            <div class="p-8 text-3xl font-bold text-center dark:text-gray-100 border-b-4 relative">
              Pro
              <div class="absolute bg-red-light left-0 px-2 py-3 text-white text-sm rounded-r-lg">2 mois gratuits</div>
            </div>
            <div class="h-1 w-full gradient my-0 py-0 rounded-t"></div>
            <ul class="w-full text-center text-base font-bold dark:text-white">
              <li class="border-b py-4">3 utilisateurs</li>
              <li class="border-b py-4">25 événements<span class="text-base">/mois</span></li>
            </ul>
          </div>
          <div class="flex-none mt-auto bg-white dark:bg-blue-dark rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div class="w-full pt-6 text-4xl font-bold text-center dark:text-white">
              9.99€
              <span class="text-base">/mois</span>
            </div>
            <div class="flex items-center justify-center">
              <button
                class=" bg-green mx-auto lg:mx-0 gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline
                transform transition hover:scale-105 duration-300 ease-in-out DarkModeAnimation"
                href="#Newsletter"
              >
                Commencez
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white dark:bg-blue-dark DarkModeAnimation
        mt-4 transform transition hover:z-20 hover:scale-105 duration-300 ease-in-out">
          <div class="flex-1 text-gray-600 dark:text-white rounded-t rounded-b-none shadow">
            <div class="p-8 text-3xl font-bold text-center border-b-4 relative">
              Expert
              <div class="absolute bg-red-light left-0 px-2 py-3 text-white text-sm rounded-r-lg">3 mois gratuits</div>
            </div>
            <ul class="w-full text-center text-sm">
              <li class="border-b py-4">Utilisateurs ilimités</li>
              <li class="border-b py-4">Événements ilimités</li>
            </ul>
          </div>
          <div class="flex-none mt-auto bg-white dark:bg-blue-dark DarkModeAnimation rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div class="w-full pt-6 text-3xl text-gray-600 dark:text-white font-bold text-center">
              19.99€
              <span class="text-base">/mois</span>
            </div>
            <div class="flex items-center justify-center">
              <button
                class="mx-auto lg:mx-0 gradient text-black dark:bg-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline
                transform transition hover:scale-105 duration-300 ease-in-out DarkModeAnimation"
                tag="router-link"
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

  <section
    id="Newsletter"
    class="flex flex-col mx-auto text-center py-6 dark:bg-blue-dark dark:text-white DarkModeAnimation items-center"
  >
    <h3 class="my-4 text-3xl leading-tight">
      Restez informé des dernières nouveautés!
    </h3>
    <div v-if="!isSuccess" class="flex flex-col">
      <BInput
        type="email"
        placeholder="Votre e-mail"
        v-model="email"
      />
      <BButton
        :isLoading="isLoading"
        :variant="isDarkTheme ? 'white' : 'primary'"
        class="mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline
        transform transition hover:-translate-y-1 hover:scale-105 duration-300 ease-in-out DarkModeAnimation"
        @click="submit"
      >
        Commencez
      </BButton>
    </div>
    <BToast v-else variant="success">Email enregistré</BToast>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import newsleterHook from '~/hooks/newsletterHook'
import { useMainStore } from '~/store/mainStore'

const { newsletterSignup } = newsleterHook()

const mainStore = useMainStore()
const { isLoading, isDarkTheme } = storeToRefs(mainStore)
// TODO setup vee validate

const email = ref('')
const isSuccess = ref(false)

async function submit() {
  await newsletterSignup({
    email: email.value,
    firstName: null,
    lastName: null,
    companyName: null,
  })
  isSuccess.value = true}

</script>
