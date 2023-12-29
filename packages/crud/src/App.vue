<template>
  <div>
    <LCrud>
      <LTable />
    </LCrud>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue'
import LTable from './components/table'
import LCrud from './components/crud'
import { useCrud, useTable } from './hooks'

// cl-crud
const Crud = useCrud({ service: 'test' }, (app) => {
  app.refresh()
})

const options = reactive({
  status: [
    {
      label: '启用',
      type: 'success',
      value: 1,
    },
    {
      label: '禁用',
      type: 'danger',
      value: 0,
    },
  ],
  tags: [
    {
      label: 'A',
      value: 1,
    },
    {
      label: 'B',
      value: 2,
    },
  ],
})

const Table = useTable({
  columns: [
    {
      label: '标签',
      prop: 'tags',
      dict: computed(() => {
        return {
          text: false,
          separator: '-',
          options: options.tags,
        }
      }),
    },
    {
      label: '状态',
      prop: 'status',
      sortable: 'custom',
      dict: computed(() => options.status),
    },
    {
      label: '创建时间',
      prop: 'createTime',
      sortable: 'desc',
    },
  ],
})
</script>
<style scoped></style>
