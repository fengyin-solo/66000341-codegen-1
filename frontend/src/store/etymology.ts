import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { COGNATE_SETS, LANGUAGE_FAMILIES, EVOLUTION_CHAINS, buildGraph } from '../mock/data'
import type { EvolutionStage } from '../types'
export { LANGUAGE_FAMILIES, COGNATE_SETS }

export interface PathResult {
  status: 'none' | 'ok' | 'blocked'
  stages: EvolutionStage[]
  reason?: string
  isRoot?: boolean
}

const STORAGE_KEY = 'etymology:last-selection'

export const useEtymologyStore = defineStore('etymology', () => {
  const graph = ref(buildGraph())
  const selectedNode = ref<any>(null)
  const searchQuery = ref('')
  const selectedFamily = ref('all')
  const viewMode = ref<'graph' | 'path'>('graph')
  const activeStageIndex = ref(0)

  // 刷新后恢复最近一次有效选择（节点必须仍存在于图谱中）
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (saved && typeof saved.nodeId === 'string') {
      const node = graph.value.nodes.find((n: any) => n.id === saved.nodeId)
      if (node) {
        selectedNode.value = node
        if (saved.viewMode === 'path') viewMode.value = 'path'
        if (Number.isInteger(saved.stageIndex) && saved.stageIndex >= 0) activeStageIndex.value = saved.stageIndex
      }
    }
  } catch { /* 忽略损坏的本地缓存 */ }

  watch([selectedNode, viewMode, activeStageIndex], () => {
    if (selectedNode.value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        nodeId: selectedNode.value.id,
        viewMode: viewMode.value,
        stageIndex: activeStageIndex.value,
      }))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  })

  const filteredCognates = computed(() =>
    COGNATE_SETS.filter(cs => {
      const q = searchQuery.value.toLowerCase()
      const matchSearch = !q || cs.root.toLowerCase().includes(q) || cs.meaning.includes(q) || Object.values(cs.languages).some((w: string) => w.toLowerCase().includes(q))
      const matchFamily = selectedFamily.value === 'all' || cs.family === selectedFamily.value
      return matchSearch && matchFamily
    })
  )

  // 演化路径：跟随语系筛选收窄；无关系或缺档时给出断点原因，不补造关联
  const pathResult = computed<PathResult>(() => {
    const n = selectedNode.value
    if (!n) return { status: 'none', stages: [] }
    if (selectedFamily.value !== 'all' && n.family !== selectedFamily.value) {
      const fam = LANGUAGE_FAMILIES.find(f => f.id === selectedFamily.value)
      return { status: 'blocked', stages: [], reason: `当前语系筛选为「${fam?.name ?? selectedFamily.value}」，「${n.word}」（${n.language}）不在该语系内，演化路径已随筛选收窄。` }
    }
    if (String(n.id).startsWith('root_')) {
      return { status: 'ok', isRoot: true, stages: [{ word: n.word, language: n.language, meaning: n.meaning, period: n.era || '原始时期' }] }
    }
    const hasRelation = graph.value.links.some((l: any) => l.source === n.id || l.target === n.id)
    if (!hasRelation) return { status: 'blocked', stages: [], reason: '该词在图谱中没有任何可用的词源关系。' }
    const chain = EVOLUTION_CHAINS[n.id]
    if (!chain || !chain.length) {
      const rootLink = graph.value.links.find((l: any) => l.target === n.id)
      const rootNode = rootLink ? graph.value.nodes.find((x: any) => x.id === rootLink.source) : null
      return { status: 'blocked', stages: [], reason: `图谱标注了「${n.word}」与词根 ${rootNode?.word ?? ''} 的关联，但缺少中间阶段的谱系文献记录，无法还原完整演化路径（不作补造）。` }
    }
    return { status: 'ok', stages: chain }
  })

  // 路径位置（阶段下标）随谱系长度收敛，避免越界
  const clampedStageIndex = computed(() => {
    const len = pathResult.value.stages.length
    if (!len) return 0
    return Math.min(activeStageIndex.value, len - 1)
  })

  // 图谱中的相邻节点（词根 ⇄ 同源现代词），用于沿相邻节点继续查看
  const neighbors = computed(() => {
    const n = selectedNode.value
    if (!n) return []
    return graph.value.links
      .filter((l: any) => l.source === n.id || l.target === n.id)
      .map((l: any) => {
        const otherId = l.source === n.id ? l.target : l.source
        return graph.value.nodes.find((x: any) => x.id === otherId)
      })
      .filter(Boolean)
  })

  // 选中节点所属同源组序号，用于同源词表高亮联动
  const selectedRootIndex = computed(() => {
    const n = selectedNode.value
    if (!n) return -1
    const id = String(n.id)
    const ci = id.startsWith('root_') ? Number(id.slice(5)) : Number(id.split('_')[0])
    return Number.isNaN(ci) ? -1 : ci
  })

  function selectNode(nodeOrId: any) {
    const id = typeof nodeOrId === 'string' ? nodeOrId : nodeOrId?.id
    const node = graph.value.nodes.find((n: any) => n.id === id)
    if (!node) return
    selectedNode.value = node
    const len = pathResult.value.stages.length
    activeStageIndex.value = len ? len - 1 : 0
  }

  return {
    graph, selectedNode, searchQuery, selectedFamily, filteredCognates,
    viewMode, activeStageIndex, clampedStageIndex, pathResult, neighbors,
    selectedRootIndex, selectNode,
  }
})
