import { SubscriptionEnum, SubscriptionTranslationEnum } from "@/store/typesExported"

export default function subscriptionHook() {

  function getSuscriptionTranslation(type: SubscriptionEnum) {
    return SubscriptionTranslationEnum[type]
  }

  return {
    getSuscriptionTranslation,
  }
}