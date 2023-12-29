import { inject, isRef, useSlots } from 'vue'
import { Browser } from './browser.ts'
import { isFunction } from '../utils'

export function useGlobal() {
  return inject('globalOptions') as GlobalOptions
}
export const useTools = () => {
  const browser = inject('browser') as Browser
  const global = useGlobal()
  const slots = useSlots()

  function getValue(data: any, params?: any) {
    if (isRef(data)) {
      return data.value
    }
    if (isFunction(data)) {
      return data(params)
    }
    return data
  }

  return { browser, ...global, slots, getValue }
}

export function useCore() {
  const crud = inject('crud') as ClCrud.Provide
  const mitt = inject('mitt') as Emitter

  return {
    crud,
    mitt,
  }
}

export const useEventListener = (name: string, cb: () => any) => {
  window.removeEventListener(name, cb)
  window.addEventListener(name, cb)
}
