// @ts-expect-error
import cloneDeep from 'clone-deep'
// import flat from 'array.prototype.flat'
import merge from 'merge'
import { mergeProps } from 'vue'

export const isArray = (value: any) => {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  }
  return Object.prototype.toString.call(value) === '[object Array]'
}

export const isObject = (value: any) => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export const isNumber = (value: any) => {
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(Number(value))
}

export const isFunction = (value: any) => {
  return typeof value === 'function'
}

export const isString = (value: any) => {
  return typeof value === 'string'
}

export const isNull = (value: any) => {
  return !value && value !== 0
}

export const isBoolean = (value: any) => {
  return typeof value === 'boolean'
}

export const isEmpty = (value: any) => {
  if (isArray(value)) {
    return value.length === 0
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0
  }

  return value === '' || value === undefined || value === null
}

export const deepMerge = (a: any, b: any) => {
  let k
  // eslint-disable-next-line guard-for-in
  for (k in b) {
    a[k] = a[k] && a[k].toString() === '[object Object]' ? deepMerge(a[k], b[k]) : (a[k] = b[k])
  }
  return a
}

export function mergeConfig(a: any, b?: any): any {
  return b ? mergeProps(a, b) : a
}

export function debounce(fn: (...args: any[]) => any, delay: number, immediate?: boolean) {
  let timer: any
  let result
  // eslint-disable-next-line consistent-return
  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer)

    if (immediate) {
      if (timer) {
        // eslint-disable-next-line no-return-assign
        timer = setTimeout(() => (timer = null), delay)
      } else {
        result = fn.apply(this, args)
        return result
      }
    } else {
      timer = setTimeout(() => fn.apply(this, args), delay)
    }
  }
}

export function addClass(el: Element, name: string) {
  if (isString(el?.className)) {
    const f = el.className.includes(name)

    if (!f) {
      el.className = `${el.className} ${name}`
    }
  }
}

export { cloneDeep, merge }
