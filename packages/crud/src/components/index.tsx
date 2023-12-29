import { App } from 'vue'
import Crud from './crud'
import Table from './table'

export const components: { [key: string]: any } = {
  Crud,
  Table,
}

export function useComponent(app: App) {
  // eslint-disable-next-line guard-for-in
  for (const i in components) {
    app.component(components[i].name, components[i])
  }
}
