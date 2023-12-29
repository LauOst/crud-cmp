import { defineComponent, h, inject, ref, reactive } from 'vue'
import { useCore, useTools } from '../../hooks'
import { mergeConfig } from '../../utils'
import { useRender } from './helper.tsx'

export default defineComponent({
  name: 'LTable',
  props: {
    // 列配置
    columns: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { expose }) {
    const { crud } = useCore()
    const { getValue, style } = useTools()

    // 配置
    const config = reactive<ClTable.Config>(mergeConfig(props, inject('useTable__options') || {}))

    // el-table
    const Table = ref()

    // 列表项动态处理
    config.columns = (config.columns || []).map((e) => getValue(e))

    const ctx = {
      Table,
      columns: config.columns,
    }

    expose(ctx)

    return () => {
      const { renderColumn } = useRender()
      return h(
        <el-table class="l-table" ref={Table} v-loading={crud.loading} />,
        {
          size: style.size,
          border: true,
        },
        {
          default() {
            return renderColumn(ctx.columns)
          },
        },
      )
    }
  },
})
