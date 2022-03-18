import { SubscriptionEnum, SubscriptionTranslationEnum } from "@/types/typesExported"

export default function subscriptionHook() {

  function getSuscriptionTranslation(type: SubscriptionEnum) {
    return SubscriptionTranslationEnum[type]
  }

  return {
    getSuscriptionTranslation,
  }
}