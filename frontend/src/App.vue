<template>
  <div class="min-h-screen bg-slate-900 text-slate-200">
    <header class="border-b border-slate-700 px-6 py-4">
      <h1 class="text-2xl font-bold text-cyan-400">语言词源图谱与多语系演化追踪</h1>
      <p class="text-sm text-slate-500 mt-1">D3.js力导向图 · 印欧语系演化 · 同源词对照 · 演化路径视图 · 500+词根</p>
    </header>
    <div class="p-4 space-y-4">
      <div class="grid lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 bg-slate-800 rounded-lg p-4 border border-slate-700">
          <!-- 图谱视图（v-show 保持挂载，返回图谱时布局与缩放状态不丢失） -->
          <div v-show="store.viewMode === 'graph'">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-bold text-slate-400">词源力导向网络</h3>
              <div class="flex items-center gap-3">
                <div class="flex gap-3 text-xs">
                  <span v-for="f in LANGUAGE_FAMILIES" :key="f.id" class="flex items-center gap-1">
                    <span class="w-3 h-3 rounded-full" :style="{backgroundColor: f.color}"></span>{{ f.name }}
                  </span>
                </div>
                <button @click="store.openPath()" :disabled="!store.selectedNode"
                  class="text-xs px-3 py-1.5 rounded bg-cyan-700 hover:bg-cyan-600 text-white disabled:opacity-30 disabled:cursor-not-allowed">
                  演化路径 →
                </button>
              </div>
            </div>
            <svg ref="svgRef" class="w-full bg-slate-900 rounded" style="height:460px"></svg>
          </div>
          <!-- 演化路径视图 -->
          <PathView v-if="store.viewMode === 'path'" />
        </div>
        <div class="space-y-4">
          <div class="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 class="text-sm font-bold text-slate-400 mb-3">语系概览</h3>
            <div class="space-y-2">
              <div v-for="f in LANGUAGE_FAMILIES" :key="f.id" class="flex items-start gap-2 text-sm">
                <span class="w-3 h-3 rounded-full mt-0.5 flex-shrink-0" :style="{backgroundColor: f.color}"></span>
                <div><div class="font-bold">{{ f.name }}</div><div class="text-xs text-slate-500">{{ f.era }} · {{ f.languages.join('/') }}</div></div>
              </div>
            </div>
          </div>
          <div v-if="store.selectedNode" class="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 class="text-sm font-bold text-slate-400 mb-2">选中节点</h3>
            <div class="text-lg font-bold text-cyan-400">{{ store.selectedNode.word }}</div>
            <div class="text-sm text-slate-400">{{ store.selectedNode.language }} — {{ store.selectedNode.meaning }}</div>
            <button v-if="store.viewMode === 'graph'" @click="store.openPath()"
              class="mt-3 w-full text-xs px-3 py-1.5 rounded bg-cyan-700 hover:bg-cyan-600 text-white">
              查看演化路径 →
            </button>
          </div>
          <div class="bg-slate-800 rounded-lg p-4 border border-slate-700 text-xs text-slate-400">
            <h3 class="text-sm font-bold text-slate-400 mb-2">Grimm定律</h3>
            <div class="space-y-1">
              <div class="bg-slate-900 rounded p-2"><span class="text-cyan-400">p→f: </span>pater → father</div>
              <div class="bg-slate-900 rounded p-2"><span class="text-green-400">t→θ: </span>tres → three</div>
              <div class="bg-slate-900 rounded p-2"><span class="text-orange-400">k→h: </span>cord → heart</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 class="text-sm font-bold text-slate-400 mb-3">同源词对照表</h3>
        <div class="flex gap-2 mb-3">
          <input v-model="store.searchQuery" placeholder="搜索词根/含义..." class="flex-1 bg-slate-900 border border-slate-600 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-cyan-500" />
          <select v-model="store.selectedFamily" class="bg-slate-900 border border-slate-600 rounded px-2 text-sm text-slate-300">
            <option value="all">全部语系</option>
            <option v-for="f in LANGUAGE_FAMILIES" :key="f.id" :value="f.id">{{ f.name }}</option>
          </select>
        </div>
        <div ref="tableWrapRef" class="overflow-x-auto max-h-64 overflow-y-auto">
          <table class="w-full text-xs">
            <thead class="sticky top-0 bg-slate-700">
              <tr>
                <th class="px-2 py-2 text-left text-slate-300">词根</th>
                <th class="px-2 py-2 text-left text-slate-300">含义</th>
                <th class="px-2 py-2 text-left text-cyan-400">英语</th>
                <th class="px-2 py-2 text-left text-blue-400">法语</th>
                <th class="px-2 py-2 text-left text-green-400">德语</th>
                <th class="px-2 py-2 text-left text-orange-400">西班牙语</th>
                <th class="px-2 py-2 text-left text-purple-400">俄语</th>
                <th class="px-2 py-2 text-left text-yellow-400">拉丁语</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cs in store.filteredCognates" :key="cs.root" :data-root="cs.root"
                @click="store.selectCognateRoot(cs)"
                class="border-t border-slate-700 hover:bg-slate-700 cursor-pointer"
                :class="{ 'bg-cyan-900/30': store.selectedCognate?.root === cs.root }">
                <td class="px-2 py-1.5 font-mono text-slate-200 font-bold">{{ cs.root }}</td>
                <td class="px-2 py-1.5 text-slate-400">{{ cs.meaning }}</td>
                <td v-for="lang in TABLE_LANGS" :key="lang" class="px-2 py-1.5 font-mono"
                  :class="[LANG_TEXT[lang], cellClass(cs, lang)]">{{ cs.languages[lang] || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import * as d3 from 'd3'
import { useEtymologyStore, LANGUAGE_FAMILIES } from './store/etymology'
import type { CognateSet } from './types'
import PathView from './components/PathView.vue'

const store = useEtymologyStore()
const svgRef = ref<SVGSVGElement | null>(null)
const tableWrapRef = ref<HTMLElement | null>(null)
const COLORS: Record<string, string> = { ie: '#3b82f6', st: '#22c55e', aa: '#f59e0b', ural: '#8b5cf6' }
const TABLE_LANGS = ['英语', '法语', '德语', '西班牙语', '俄语', '拉丁语']
const LANG_TEXT: Record<string, string> = {
  '英语': 'text-cyan-300', '法语': 'text-blue-300', '德语': 'text-green-300',
  '西班牙语': 'text-orange-300', '俄语': 'text-purple-300', '拉丁语': 'text-yellow-300',
}

// 同源词表中与选中词精确对应的单元格高亮
function cellClass(cs: CognateSet, lang: string) {
  const n = store.selectedNode
  if (!n || store.selectedCognate?.root !== cs.root) return ''
  if (n.language === lang) return 'bg-cyan-800/50 rounded'
  if (n.language === 'Proto-IE') return ''
  return ''
}

let nodeSel: any = null
let linkSel: any = null

// 图谱高亮：选中节点、所属词根、语系收窄（不重建模拟，保留图谱布局）
function updateHighlight() {
  if (!nodeSel) return
  const selId = store.selectedNode?.id
  const rootId = store.selectedRootId
  const fam = store.selectedFamily
  nodeSel.select('circle')
    .attr('stroke', (d: any) => d.id === selId ? '#22d3ee' : (d.id === rootId ? '#67e8f9' : '#1e293b'))
    .attr('stroke-width', (d: any) => d.id === selId ? 3 : (d.id === rootId ? 2 : 1.5))
    .attr('stroke-dasharray', (d: any) => d.id === rootId && d.id !== selId ? '3 2' : null)
  nodeSel.attr('opacity', (d: any) => fam === 'all' || d.family === fam ? 1 : 0.15)
  if (linkSel) {
    linkSel.attr('opacity', (d: any) => {
      if (fam === 'all') return 0.5
      const sid = typeof d.source === 'object' ? d.source.id : d.source
      const tid = typeof d.target === 'object' ? d.target.id : d.target
      const byId = new Map(store.graph.nodes.map((n: any) => [n.id, n]))
      const s = byId.get(sid) as any, t = byId.get(tid) as any
      return s?.family === fam && t?.family === fam ? 0.5 : 0.08
    })
  }
}

function drawGraph() {
  if (!svgRef.value) return
  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove()
  const W = svgRef.value.getBoundingClientRect().width || 700, H = 460
  const nodes = store.graph.nodes.map((n: any) => ({ ...n }))
  const links = store.graph.links.map((l: any) => ({ ...l }))
  const sim = d3.forceSimulation(nodes as any)
    .force('link', d3.forceLink(links as any).id((d: any) => d.id).distance(55))
    .force('charge', d3.forceManyBody().strength(-100))
    .force('center', d3.forceCenter(W / 2, H / 2))
    .force('collision', d3.forceCollide(22))
  const g = svg.append('g')
  svg.call(d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.2, 3]).on('zoom', (e) => g.attr('transform', e.transform)) as any)
  const link = g.append('g').selectAll('line').data(links).join('line')
    .attr('stroke', '#475569').attr('stroke-width', 1).attr('opacity', 0.5)
  const node = g.append('g').selectAll('g').data(nodes).join('g')
    .call(d3.drag<any, any>()
      .on('start', (e, d: any) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y })
      .on('drag', (e, d: any) => { d.fx = e.x; d.fy = e.y })
      .on('end', (e, d: any) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null }))
    .on('click', (_: any, d: any) => { store.selectNode(d) })
  node.append('circle')
    .attr('r', (d: any) => d.language === 'Proto-IE' ? 12 : 7)
    .attr('fill', (d: any) => COLORS[d.family] || '#64748b')
    .attr('stroke', '#1e293b').attr('stroke-width', 1.5)
  node.append('text').attr('dy', -14).attr('text-anchor', 'middle').attr('font-size', 9).attr('fill', '#e2e8f0')
    .text((d: any) => d.word.length > 8 ? d.word.slice(0, 8) + '…' : d.word)
  node.append('title').text((d: any) => `${d.word} (${d.language}): ${d.meaning}`)
  sim.on('tick', () => {
    link.attr('x1', (d: any) => d.source.x).attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x).attr('y2', (d: any) => d.target.y)
    node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
  })
  nodeSel = node
  linkSel = link
  updateHighlight()
}

// 图谱 / 同源词表高亮同步
watch(() => [store.selectedNode, store.selectedFamily, store.selectedRootId], () => {
  updateHighlight()
  nextTick(() => {
    const root = store.selectedCognate?.root
    if (!root || !tableWrapRef.value) return
    tableWrapRef.value.querySelector(`tr[data-root="${CSS.escape(root)}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  })
})

onMounted(() => { setTimeout(drawGraph, 100) })
</script>
