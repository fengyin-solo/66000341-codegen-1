import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { COGNATE_SETS, LANGUAGE_FAMILIES, buildGraph, getEvolutionChain, getNoChainReason } from '../mock/data'
import type { CognateSet, EvolutionPath } from '../types'
export { LANGUAGE_FAMILIES, COGNATE_SETS }

const STORAGE_KEY = 'etymology-path-v1'

export const useEtymologyStore = defineStore('etymology', () => {
  const graph = ref(buildGraph())
  const selectedNode = ref<any>(null)
  const searchQuery = ref('')
  const selectedFamily = ref('all')
  // 演化路径视图状态
  const viewMode = ref<'graph' | 'path'>('graph')
  const pathCursor = ref(0)

  const filteredCognates = computed(() =>
    COGNATE_SETS.filter(cs => {
      const q = searchQuery.value.toLowerCase()
      const matchSearch = !q || cs.root.toLowerCase().includes(q) || cs.meaning.includes(q) || Object.values(cs.languages).some((w: string) => w.toLowerCase().includes(q))
      const matchFamily = selectedFamily.value === 'all' || cs.family === selectedFamily.value
      return matchSearch && matchFamily
    })
  )

  // 选中词所属的同源词组
  const selectedCognate = computed<CognateSet | null>(() => {
    const n = selectedNode.value
    if (!n) return null
    const id = String(n.id)
    const ci = id.startsWith('root_') ? Number(id.slice(5)) : Number(id.split('_')[0])
    return COGNATE_SETS[ci] ?? null
  })

  // 选中词所属词根在图谱中的节点 id（用于图谱/词表高亮同步）
  const selectedRootId = computed(() => {
    const cs = selectedCognate.value
    return cs ? 'root_' + COGNATE_SETS.indexOf(cs) : null
  })

  // 演化路径：跟随语系筛选收窄；无关系或缺档时给出断点原因，不补造关联
  const evolutionPath = computed<EvolutionPath>(() => {
    const n = selectedNode.value
    if (!n) return { status: 'none', stages: [], reason: '' }
    if (selectedFamily.value !== 'all' && n.family !== selectedFamily.value) {
      const fam = LANGUAGE_FAMILIES.find(f => f.id === selectedFamily.value)
      return { status: 'filtered', stages: [], reason: `当前语系筛选为「${fam?.name ?? selectedFamily.value}」，该词不属于此语系，路径已按筛选条件收窄` }
    }
    const cs = selectedCognate.value
    if (!cs) return { status: 'empty', stages: [], reason: '未找到该词所属的同源词组' }
    if (n.language === 'Proto-IE') {
      return { status: 'ok', stages: [{ word: cs.root, language: '原始印欧语', meaning: cs.meaning, era: '约公元前4000年', note: '谱系起点（构拟形式）' }], reason: '' }
    }
    const stages = getEvolutionChain(cs.root, n.language)
    if (!stages || stages.length === 0) {
      return {
        status: 'empty',
        stages: [],
        reason: getNoChainReason(cs.root, n.language)
          || `当前词源数据未收录 ${n.word}（${n.language}）自 ${cs.root} 的演化关系，不补造不存在的关联`,
      }
    }
    return { status: 'ok', stages, reason: '' }
  })

  function selectNode(n: any) {
    selectedNode.value = n
    // 新选择的路径游标默认落在最后一个阶段（现代词本身）
    const p = evolutionPath.value
    pathCursor.value = p.status === 'ok' ? p.stages.length - 1 : 0
  }

  function openPath() {
    if (!selectedNode.value) return
    viewMode.value = 'path'
  }

  function closePath() {
    viewMode.value = 'graph'
  }

  function setCursor(i: number) {
    const len = evolutionPath.value.stages.length
    pathCursor.value = len ? Math.max(0, Math.min(len - 1, i)) : 0
  }

  function stepCursor(d: number) {
    setCursor(pathCursor.value + d)
  }

  // 点击同源词表行：选中该词根对应的图谱节点
  function selectCognateRoot(cs: CognateSet) {
    const id = 'root_' + COGNATE_SETS.indexOf(cs)
    const node = graph.value.nodes.find((n: any) => n.id === id)
    if (node) selectNode(node)
  }

  // ---- 持久化：刷新后恢复最近一次有效选择 ----
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        nodeId: selectedNode.value?.id ?? null,
        viewMode: viewMode.value,
        cursor: pathCursor.value,
        family: selectedFamily.value,
      }))
    } catch { /* 忽略存储异常 */ }
  }

  function restoreState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const s = JSON.parse(raw)
      if (typeof s.family === 'string') selectedFamily.value = s.family
      if (!s.nodeId) return
      const node = graph.value.nodes.find((n: any) => n.id === s.nodeId)
      if (!node) return // 数据已变化，旧选择失效则不恢复
      selectedNode.value = node
      viewMode.value = s.viewMode === 'path' ? 'path' : 'graph'
      const p = evolutionPath.value
      const len = p.status === 'ok' ? p.stages.length : 0
      pathCursor.value = len ? Math.max(0, Math.min(len - 1, Number(s.cursor) || 0)) : 0
    } catch { /* 忽略解析异常 */ }
  }

  restoreState()
  watch([selectedNode, viewMode, pathCursor, selectedFamily], saveState)

  return {
    graph, selectedNode, searchQuery, selectedFamily, filteredCognates,
    viewMode, pathCursor, selectedCognate, selectedRootId, evolutionPath,
    selectNode, openPath, closePath, setCursor, stepCursor, selectCognateRoot,
  }
})
