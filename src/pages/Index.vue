<template>
  <section class="container pt-10 mx-auto">
    <div
      class="grid items-center justify-center grid-cols-1 gap-4 md:grid-cols-2 md:flex-row DarkModeAnimation"
    >
      <div class="flex flex-col items-center justify-center mx-auto">
        <h1
          class="my-4 text-xl font-bold md:text-5xl md:leading-snug dark:text-gray-100"
        >Gérez enfin le droit à l'image de vos clients facilement !</h1>
        <p
          class="mb-8 text-lg leading-normal text-center md:text-2xl dark:text-gray-400"
        >Commencez maintenant avec un mois gratuit.</p>
        <button
          class="px-8 py-4 mx-auto my-6 font-bold text-gray-800 transition duration-300 ease-in-out transform bg-white rounded-full shadow-lg lg:mx-0 hover:underline focus:outline-none focus:shadow-outline hover:-translate-y-2 hover:scale-105"
          href="#Newsletter"
        >Commencez</button>
      </div>
      <!--Right Col-->
      <div class="hidden bg-transparent rounded-lg shadow-xl sm:block">
        <img
          class="z-50 w-full duration-300 ease-in-out transform rounded-lg hover:-translate-x-1"
          src="../assets/photographer.jpg"
          alt="photographer"
        />
      </div>
    </div>
  </section>

  <section id="Solution" class="relative w-full py-8 DarkModeAnimation">
    <img
      class="absolute right-0 hidden duration-500 ease-in-out transform md:inline hover:-translate-y-2 animate-fade-in-down"
      src="../assets/mokup-phone.png"
      alt="mokup"
    />
    <div class="container flex flex-wrap pt-4 pb-12 mx-auto">
      <h1 class="w-full my-2 mb-6 text-5xl font-bold leading-tight text-gray-800 dark:text-white">
        <span class="text-red-light">Be right</span>, qu'est ce que c'est ?
      </h1>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          class="w-full p-6 px-12 text-left duration-300 ease-in-out transform hover:-translate-y-2"
        >
          <div
            class="flex-1 p-4 bg-white rounded-t rounded-b shadow dark:shadow-xl dark:bg-blue-dark_bold DarkModeAnimation"
          >
            <div
              class="w-full px-6 py-4 text-xl font-bold text-gray-800 dark:text-white"
            >Une application de gestion dématérialisée & sécurisée</div>
            <p class="px-6 mb-5 text-base text-left text-gray-800 dark:text-gray-100">
              Be right est une plateforme de gestion dématérialisée de vos documents de droits à l'image.
              Avec cette application, vous, photograpges et agences de photos pouvez gérer vos événements et
              faire signer vos documents en seulement quelques clics.
              Pour vérifier l'authenticité des signatures un code de vérification sera envoyé au destinataire.
            </p>
          </div>
        </div>
        <div
          class="w-full p-6 px-12 text-left duration-300 ease-in-out transform hover:-translate-y-2"
        >
          <div
            class="flex-1 p-4 bg-white rounded-t rounded-b shadow dark:shadow-xl dark:bg-blue-dark_bold DarkModeAnimation"
          >
            <div
              class="w-full px-6 py-4 text-xl font-bold text-gray-800 dark:text-white"
            >Disponibles sur plusieurs devices</div>
            <p class="px-6 mb-5 text-base text-gray-800 dark:text-gray-100">
              Grâce à notre développement en application hybride, notre application est disponible sur internet mais également sur votre tablette ou smartphone via les appstores.
              Vous pouvez alors tout à fait switcher de device comme bon vous semble !
            </p>
          </div>
        </div>
        <div
          class="w-full p-6 px-12 text-left duration-300 ease-in-out transform hover:-translate-y-2"
        >
          <div
            class="flex-1 p-4 bg-white rounded-t rounded-b shadow dark:shadow-xl dark:bg-blue-dark_bold DarkModeAnimation"
          >
            <div
              class="w-full px-6 py-4 text-xl font-bold text-gray-800 dark:text-white"
            >Arrivez sereinement sur le lieu de l'événement !</div>
            <p class="px-6 mb-5 text-base text-gray-800 dark:text-gray-100">
              Afin de faciliter l'envoi et la réception des documents de droit à l'image, nous avons pensé et conçu
              <span
                class="font-bold"
              >be right</span>.
              Cet outil vous permet d'ajouter des clients, leur envoyer automatiquement la demande de droit à l'image, puis recevoir le document signé directement sur la plateforme.
              Fini les envoies de mails à gogo et les documents papiers imprimés !
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-8 bg-white dark:bg-blue-dark_bold DarkModeAnimation">
    <div class="container max-w-5xl m-8 mx-auto">
      <h1
        class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800 dark:text-white"
      >
        <span class="text-red-light">Be right</span>, comment ça marche ?
      </h1>
      <div class="w-full mb-4 dark:hidden">
        <div class="w-64 h-1 py-0 mx-auto my-0 rounded-t opacity-25 gradient bg-red dark:bg-blue"></div>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="p-4 md:p-0">
          <div class="hidden md:block">
            <img class="w-24" src="../assets/step1.svg" alt="step1" height="100px" width="100px" />
          </div>

          <div class>
            <h3
              class="text-3xl font-bold leading-none text-gray-800 dark:text-gray-100"
            >Sélectionnez un client.</h3>
            <p class="text-left text-gray-600 dark:text-gray-50">
              Vous pouvez choisir un client déjà existant ou en ajouter de nouveaux.
              Vous pouvez directement entrer les coordonnées de la personne avec qui vous collaborez.
            </p>
          </div>
        </div>
        <div />
        <div />

        <div class="p-4 md:p-0">
          <div class="hidden md:block">
            <img class="w-28" src="../assets/step2.svg" alt="step2" />
          </div>
          <div class>
            <div class="p-2 align-middle">
              <h3
                class="text-3xl font-bold leading-none text-gray-800 dark:text-gray-100"
              >Créez votre événement</h3>
              <p
                class="text-left text-gray-600 dark:text-gray-50"
              >Créer l'événement qui aura lieu avec le client. Vous renseignez la date de l'événement, le lieu, pour une parfaite organisation.</p>
            </div>
          </div>
        </div>

        <div class="p-4 md:p-0">
          <div class="hidden md:block">
            <img class="w-28" src="../assets/step3.svg" alt="step3" />
          </div>
          <div class>
            <div class="align-middle">
              <h3
                class="text-3xl font-bold leading-none text-gray-800 dark:text-gray-100"
              >Partage de l'accès au client</h3>
              <p class="text-left text-gray-600 dark:text-gray-50">
                Votre client a accès aux événements que vous avez en commun.
                Il peut donc renseigner la liste des destinataires des signatures, relancer les destinataires qui n'auraient pas répondu et télécharger l'ensemble des documents qui le concerne.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="Pricings" class="py-8 DarkModeAnimation">
    <div class="container px-2 pt-4 pb-12 mx-auto text-gray-800">
      <h1
        class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800 dark:text-gray-50"
      >
        Choisissez votre
        <span class="text-red-light">Abonnement</span>
      </h1>
      <div class="w-full mb-4">
        <div class="w-64 h-1 py-0 mx-auto my-0 rounded-t opacity-25 gradient"></div>
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
              >1 mois gratuit</div>
            </div>
            <div class="w-full pt-4 text-4xl font-bold text-gray-600 dark:text-white">
              3.99€
              <span class="text-base">/mois</span>
            </div>
            <span
              class="text-xs"
            >Vous avez une activité soutenue, vous êtes seul ou avec une équipe restreinte.</span>

            <ul class="w-full text-sm">
              <li class="py-4">1 utilisateur</li>
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
              >Commencez</button>
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
              >2 mois gratuits</div>
            </div>
            <div class="w-full pt-6 text-5xl font-bold">
              9.99€
              <span class="text-base">/mois</span>
            </div>
            <span
              class="text-xs"
            >Vous avez une activité soutenue, vous êtes seul ou avec une équipe restreinte.</span>
            <div class="w-full h-1 py-0 my-0 rounded-t gradient"></div>
            <ul class="w-full text-base font-bold">
              <li class="py-4">3 utilisateurs</li>
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
              >Commencez</button>
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
              >3 mois gratuit</div>
            </div>
            <div class="w-full pt-4 text-4xl font-bold text-gray-600 dark:text-white">
              19.99€
              <span class="text-base">/mois</span>
            </div>
            <span
              class="text-xs"
            >Vous avez une activité soutenue, vous êtes seul ou avec une équipe restreinte.</span>

            <ul class="w-full text-sm">
              <li class="py-4">Utilisateurs ilimités</li>
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
              >Commencez</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section
    id="Newsletter"
    class="flex flex-col items-center py-6 mx-auto text-center dark:bg-blue-dark dark:text-white DarkModeAnimation"
  >
    <h3 class="my-4 text-3xl leading-tight">Restez informé des dernières nouveautés!</h3>
    <div v-if="!isSuccess" class="flex flex-col">
      <BInput type="email" placeholder="Votre e-mail" v-model="email" />
      <BButton
        :isLoading="uiStore.getUIIsLoading"
        :variant="isDarkTheme ? 'white' : 'primary'"
        class="px-8 py-4 mx-auto my-6 font-bold text-white transition duration-300 ease-in-out transform bg-white rounded-full shadow-lg lg:mx-0 dark:text-black focus:outline-none focus:shadow-outline hover:-translate-y-1 hover:scale-105 DarkModeAnimation"
        @click="submit"
      >Commencez</BButton>
    </div>
    <BToast v-else variant="success">Email enregistré</BToast>
  </section>
</template>

<script setup lang="ts">
import { useUiStore } from '@/store'

const { newsletterSignup } = newsletterHook()

const mainStore = useMainStore()
const { isDarkTheme } = storeToRefs(mainStore)
const uiStore = useUiStore()

const email = ref('')
const isSuccess = ref(false)

async function submit() {
  await newsletterSignup({
    email: email.value,
    firstName: null,
    lastName: null,
    companyName: null,
  })
  isSuccess.value = true
}

</script>
