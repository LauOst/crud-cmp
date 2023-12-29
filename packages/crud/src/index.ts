import { App } from 'vue'
import { useComponent } from './components'
import { useBrowser } from './hooks'
import { emitter } from './emitter'
import { deepMerge } from './utils'

const Crud = {
  install(app: App, options?: Options) {
    // 兼容
    if (options?.crud) {
      options = {
        ...options.crud,
        ...options,
      }
    }

    // 合并配置
    const config = deepMerge(
      {
        permission: {
          update: true,
          page: true,
          info: true,
          list: true,
          add: true,
          delete: true,
        },
        dict: {
          primaryId: 'id',
          api: {
            list: 'list',
            add: 'add',
            update: 'update',
            delete: 'delete',
            info: 'info',
            page: 'page',
          },
          pagination: {
            page: 'page',
            size: 'size',
          },
          search: {
            keyWord: 'keyWord',
            query: 'query',
          },
          sort: {
            order: 'order',
            prop: 'prop',
          },
        },
        style: {},
        events: {},
        render: {
          autoHeight: true,
          functionSlots: {
            exclude: ['el-date-picker', 'el-cascader', 'el-time-select'],
          },
        },
      },
      options || {},
    )

    // 初始化事件
    if (config.events) {
      emitter.init(config.events)
    }

    // 全局配置
    app.provide('globalOptions', config)

    useBrowser(app)

    // 设置组件
    useComponent(app)

    return {
      name: 'l-crud',
    }
  },
}

export default Crud
