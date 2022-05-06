import { ThemeEnum } from '@/types/typesExported'

export function defaultState() {
  return {
    theme: ThemeEnum.LIGHT,
    areCookiesAccepted: false,
  }
}
