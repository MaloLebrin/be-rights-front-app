<template>
  <section class="grid gap-4 grid-cols-1 md:grid-cols-2 justify-center md:flex-row items-center mt-10">
    <!--Left Col-->
    <div class="flex flex-col justify-center items-center">
      <!-- <p class="uppercase tracking-loose w-full mx-auto">Gérez enfin le droit à l'image de vos clients facilement</p> -->
      <h1 class="text-xl my-4 md:text-5xl font-bold md:leading-snug">
        Gérez enfin le droit à l'image de vos clients facilement !
      </h1>
      <p class="leading-normal text-lg text-center md:text-2xl mb-8">
        Commencez maintenant avec un mois gratuit.
      </p>
      <button
        class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full
        my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        @click="toggleNewsletterModal"
      >
        Commencez
      </button>
    </div>
    <!--Right Col-->
    <div class="hidden sm:block shadow-xl bg-transparent rounded-lg">
      <img
        class="w-full z-50 rounded-lg"
        src="@/assets/photographer.jpg"
      />
    </div>
  </section>

  <section class="bg-white border-b py-8">
    <div class="container max-w-5xl mx-auto m-8">
      <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
        <span class="text-red-light">Be right</span>, comment ça marche ?
      </h1>
      <div class="w-full mb-4">
        <div class="h-1 mx-auto gradient bg-red w-64 opacity-25 my-0 py-0 rounded-t"></div>
      </div>

      <div class="flex flex-col sm:flex-row">
        <div class="p-2 md:p-6 mt-6 flex justify-center md:block">
          <img
            src="../assets/step1.svg"
            alt="step1"
            height="100px"
            width="100px"
          />
        </div>

        <div class="w-full sm:w-1/2 p-2 md:mt-12 md:ml-8">
          <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
            Sélectionnez un client.
          </h3>
          <p class="text-gray-600 text-left md:mb-8">
            Vous pouvez choisir un client déjà existant ou en ajouter de nouveaux.
            Vous pouvez directement entrer les coordonnées de la personne avec qui vous collaborez.
          </p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row">
        <div class="sm:w-1/3" />
        <div class="p-6 mt-6 flex justify-center md:block">
          <img
            src="../assets/step2.svg"
            alt="step2"
            height="150px"
            width="150px"
          />
        </div>
        <div class="sm:w-1/2 md:mt-28 md:ml-10">
          <div class="align-middle p-2">
            <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
              Créez votre événement
            </h3>
            <p class="text-gray-600 text-left md:mb-8">
              Créer l'événement qui aura lieu avec le client. Vous renseignez la date de l'événement, le lieu, pour une parfaite organisation.
            </p>
          </div>
        </div>
        <div class="sm:w-1/3" />
      </div>

      <div class="flex flex-col sm:flex-row">
        <div class="hidden md:block sm:w-2/3" />
        <div class="p-6 mt-6 flex justify-center md:block">
          <img
            src="../assets/step3.svg"
            alt="step3"
            height="150px"
            width="150px"
          />
        </div>
        <div class="sm:w-1/2 md:mt-28 md:ml-10 p-2">
          <div class="align-middle">
            <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
              Partage de l'accès au client
            </h3>
            <p class="text-gray-600 text-left md:mb-8">
              Votre client a accès aux événements que vous avez en commun.
              Il peut donc renseigner la liste des destinataires des signatures, relancer les destinataires qui n'auraient pas répondu et télécharger l'ensemble des documents qui le concerne.
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
  <section
    id="Solution"
    class="bg-white border-b py-8"
  >
    <div class="container mx-auto flex flex-wrap pt-4 pb-12">
      <h1 class="w-full my-2 text-5xl font-bold leading-tight text-gray-800">
        <span class="text-red-light">Be right</span>, qu'est ce que c'est ?
      </h1>
      <div class="w-full mb-4">
        <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
      </div>
      <div class="w-full md:w-1/2 p-6 px-12 flex flex-col flex-grow flex-shrink text-left">
        <div class="flex-1 bg-white rounded-t rounded-b overflow-hidden shadow">
          <div class="w-full font-bold text-xl text-gray-800 px-6 py-4">
            Une application de gestion dématérialisée & sécurisée
          </div>
          <p class="text-gray-800 text-base px-6 mb-5 text-left">
            Be right est une plateforme de gestion dématérialisée de vos documents de droits à l'image.
            Avec cette application, vous, photograpges et agences de photos pouvez gérer vos événements et
            faire signer vos documents en seulement quelques clics.
            Pour vérifier l'authenticité des signatures un code de vérification sera envoyé au destinataire.
          </p>
        </div>
      </div>
      <div class="w-full md:w-1/2 p-6 px-12 flex flex-col flex-grow flex-shrink text-left">
        <div class="flex-1 bg-white rounded-t rounded-b overflow-hidden shadow">
          <div class="w-full font-bold text-xl text-gray-800 px-6 py-4">
            Arrivez sereinement sur le lieu de l'événement !
          </div>
          <p class="text-gray-800 text-base px-6 mb-5">
            Afin de faciliter l'envoi et la réception des documents de droit à l'image, nous avons pensé et conçu <span class="font-bold">be right</span>.
            Cet outil vous permet d'ajouter des clients, leur envoyer automatiquement la demande de droit à l'image, puis recevoir le document signé directement sur la plateforme.
            Fini les envoies de mails à gogo et les documents papiers imprimés !
          </p>
        </div>
      </div>
    </div>
  </section>
  <section
    id="Pricings"
    class="bg-gray-100 py-8"
  >
    <div class="container mx-auto px-2 pt-4 pb-12 text-gray-800">
      <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
        Choisissez votre <span class="text-red-light">Abonnement</span>
      </h1>
      <div class="w-full mb-4">
        <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
      </div>
      <div class="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
        <div class="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4 hover:z-20 transform transition hover:scale-105 duration-300 ease-in-out">
          <div class="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
            <div class="p-8 text-3xl font-bold text-center border-b-4 relative">
              Essentiel
              <div class="absolute bg-red-light left-0 px-2 py-3 text-white text-sm rounded-r-lg">1 mois gratuit</div>
            </div>
            <ul class="w-full text-center text-sm">
              <li class="border-b py-4">1 utilisateur</li>
              <li class="border-b py-4">5 évenements<span class="text-base">/mois</span></li>
            </ul>
          </div>
          <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div class="w-full pt-6 text-3xl text-gray-600 font-bold text-center">
              3.99€
              <span class="text-base">/mois</span>
            </div>
            <div class="flex items-center justify-center">
              <button
                class="mx-auto lg:mx-0 gradient text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                @click="toggleNewsletterModal"
              >
                Commencez
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10 transform transition hover:scale-105 duration-300 ease-in-out">
          <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <div class="p-8 text-3xl font-bold text-center border-b-4 relative">
              Pro
              <div class="absolute bg-red-light left-0 px-2 py-3 text-white text-sm rounded-r-lg">2 mois gratuits</div>
            </div>
            <div class="h-1 w-full gradient my-0 py-0 rounded-t"></div>
            <ul class="w-full text-center text-base font-bold">
              <li class="border-b py-4">3 utilisateurs</li>
              <li class="border-b py-4">25 événements<span class="text-base">/mois</span></li>
            </ul>
          </div>
          <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div class="w-full pt-6 text-4xl font-bold text-center">
              9.99€
              <span class="text-base">/mois</span>
            </div>
            <div class="flex items-center justify-center">
              <button
                class=" bg-green mx-auto lg:mx-0 gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                @click="toggleNewsletterModal"
              >
                Commencez
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4 transform transition hover:z-20 hover:scale-105 duration-300 ease-in-out">
          <div class="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
            <div class="p-8 text-3xl font-bold text-center border-b-4 relative">
              Expert
              <div class="absolute bg-red-light left-0 px-2 py-3 text-white text-sm rounded-r-lg">3 mois gratuits</div>
            </div>
            <ul class="w-full text-center text-sm">
              <li class="border-b py-4">Utilisateurs ilimités</li>
              <li class="border-b py-4">Événements ilimités</li>
              <!-- <li class="border-b py-4">Thing</li> -->
            </ul>
          </div>
          <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div class="w-full pt-6 text-3xl text-gray-600 font-bold text-center">
              19.99€
              <span class="text-base">/mois</span>
            </div>
            <div class="flex items-center justify-center">
              <button
                class="mx-auto lg:mx-0 gradient text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                @click="toggleNewsletterModal"
              >
                Commencez
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Change the colour #f8fafc to match the previous section colour -->
  <svg
    class="wave-top"
    viewBox="0 0 1439 147"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g
        transform="translate(-1.000000, -14.000000)"
        fill-rule="nonzero"
      >
        <g
          class="wave"
          fill="#f8fafc"
        >
          <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"></path>
        </g>
        <g
          transform="translate(1.000000, 15.000000)"
          fill="#FFFFFF"
        >
          <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
            <path
              d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
              opacity="0.100000001"
            ></path>
            <path
              d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
              opacity="0.100000001"
            ></path>
            <path
              d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
              opacity="0.200000003"
            ></path>
          </g>
        </g>
      </g>
    </g>
  </svg>

  <section class="container mx-auto text-center py-6 mb-12">
    <div class="w-full mb-4">
      <div class="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
    </div>
    <h3 class="my-4 text-3xl leading-tight">
      Dématérialisez votre gestion des droits à l'image!
    </h3>
    <button
      class="mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      @click="toggleNewsletterModal"
    >
      Commencez
    </button>
  </section>

  <BCardModal
    :is-active="isModaleOpen"
    class="z-10"
  >
    <template #title>
      Inscrivez pour être au courant des dernières nouveautés
    </template>
    <BField label="Votre email">
      <BInput
        type="email"
        v-model="email"
      />
    </BField>
    <BField label="Votre prénom">
      <BInput v-model="firstName" />
    </BField>
    <BField label="Votre nom">
      <BInput v-model="lastName" />
    </BField>
    <BField label="Le nom de votre entreprise">
      <BInput v-model="companyName" />
    </BField>

    <BButton
      variant="success"
      @click="submit"
    >
      je m'inscris
    </BButton>
  </BCardModal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import newsleterHook from '~/hooks/newsletterHook'

export default defineComponent({
  name: 'Home',
  setup() {
    const { newsletterSignup } = newsleterHook()
    // TODO setup vee validate
    const form = reactive({
      email: '',
      firstName: '',
      lastName: '',
      companyName: '',
      isModaleOpen: false,
    })

    function toggleNewsletterModal() {
      form.isModaleOpen = !form.isModaleOpen
    }

    async function submit() {
      await newsletterSignup({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        companyName: form.companyName,
      })
    }

    return {
      ...toRefs(form),
      toggleNewsletterModal,
      submit
    }
  },
})
</script>
