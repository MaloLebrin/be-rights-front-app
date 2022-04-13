<template>
<div
  class="relative min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform dark:bg-blue-dark pl-14"
>
  <HeaderList>
    <template #title>
      <InformationCircleIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />
      <span class="w-full">Signaler un bug ou Remarque</span>
    </template>
  </HeaderList>

  <div class="mt-24 space-y-4">
    <BaseMessage type="warning">
      <div class="flex flex-col space-y-2">
        <span>Ce formulaire vous permet de nous signaler un problème sur la plateforme.</span>
        <span>Vous pouvez aussi nous soumettre vos recommendations et suggestions.</span>
      </div>
    </BaseMessage>

    <BugCreationForm />
  </div>
</div>
</template>
