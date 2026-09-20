<template>
  <div class="bg-slate-900 rounded p-4 overflow-y-auto" style="height:460px">
    <!-- 未选择节点 -->
    <div v-if="store.pathResult.status === 'none'" class="h-full flex flex-col items-center justify-center text-slate-500 text-sm gap-2">
      <div class="text-3xl">🧭</div>
      <div>请先在图谱中选择一个现代词，查看其从原始词根开始的完整演化谱系。</div>
      <button class="mt-2 px-3 py-1.5 text-xs rounded bg-slate-700 hover:bg-slate-600 text-slate-200" @click="store.viewMode = 'graph'">返回图谱选择</button>
    </div>

    <template v-else>
      <!-- 头部：当前词 + 返回 -->
      <div class="flex items-start justify-between mb-3">
        <div>
          <div class="text-lg font-bold text-cyan-400 font-mono">{{ store.selectedNode?.word }}</div>
          <div class="text-xs text-slate-400">{{ store.selectedNode?.language }} — {{ store.selectedNode?.meaning }}</div>
          <div v-if="store.selectedFamily !== 'all'" class="text-xs text-amber-400 mt-1">
            路径已按「{{ familyName(store.selectedFamily) }}」收窄
          </div>
        </div>
        <button class="px-3 py-1.5 text-xs rounded bg-slate-700 hover:bg-slate-600 text-slate-200 flex-shrink-0" @click="store.viewMode = 'graph'">← 返回图谱</button>
      </div>

      <!-- 断点：无可用关系 / 缺档 / 被语系筛选排除 -->
      <div v-if="store.pathResult.status === 'blocked'" class="border border-dashed border-red-500/60 bg-red-500/10 rounded p-4">
        <div class="text-sm font-bold text-red-400 mb-1">⚠ 演化路径中断</div>
        <div class="text-xs text-slate-300 leading-relaxed">{{ store.pathResult.reason }}</div>
      </div>

      <template v-else>
        <!-- 阶段导航 -->
        <div class="flex items-center justify-between mb-3 text-xs">
          <span class="text-slate-400">共 {{ store.pathResult.stages.length }} 个阶段 · 当前第 {{ store.clampedStageIndex + 1 }} 阶段</span>
          <div class="flex gap-2">
            <button class="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="store.clampedStageIndex <= 0" @click="store.activeStageIndex = store.clampedStageIndex - 1">← 上一阶段</button>
            <button class="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="store.clampedStageIndex >= store.pathResult.stages.length - 1" @click="store.activeStageIndex = store.clampedStageIndex + 1">下一阶段 →</button>
          </div>
        </div>

        <!-- 谱系时间线 -->
        <div class="relative pl-5">
          <div class="absolute left-[7px] top-2 bottom-2 w-px bg-slate-600"></div>
          <template v-for="(st, i) in store.pathResult.stages" :key="i">
            <!-- 中途缺档断点 -->
            <div v-if="st.gapBefore" class="relative mb-3 -ml-5 pl-5">
              <div class="border border-dashed border-amber-500/60 bg-amber-500/10 rounded px-3 py-2 text-xs">
                <span class="text-amber-400 font-bold">⚠ 缺档断点：</span>
                <span class="text-slate-300">{{ st.gapBefore }}</span>
              </div>
            </div>
            <div class="relative mb-3 cursor-pointer group" @click="store.activeStageIndex = i">
              <span class="absolute -left-5 top-2 w-3.5 h-3.5 rounded-full border-2 transition-colors"
                :class="i === store.clampedStageIndex ? 'bg-cyan-400 border-cyan-300' : 'bg-slate-700 border-slate-500 group-hover:border-cyan-500'"></span>
              <div class="rounded border px-3 py-2 transition-colors"
                :class="i === store.clampedStageIndex ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-700 bg-slate-800 group-hover:border-slate-500'">
                <div class="flex items-center justify-between gap-2">
                  <span class="font-mono font-bold" :class="i === store.clampedStageIndex ? 'text-cyan-300' : 'text-slate-200'">{{ st.word }}</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 whitespace-nowrap">{{ st.period }}</span>
                </div>
                <div class="text-xs text-slate-400 mt-0.5">{{ st.language }} — {{ st.meaning }}</div>
                <div v-if="st.note" class="text-xs text-amber-300/90 mt-1">※ {{ st.note }}</div>
              </div>
            </div>
          </template>
        </div>

        <div v-if="store.pathResult.isRoot" class="text-xs text-slate-500 border-t border-slate-700 pt-3 mt-1">
          当前选中的是原始词根。从下方相邻节点中选择一个现代词，即可查看从该词根出发的完整谱系。
        </div>
      </template>

      <!-- 相邻节点：沿图谱关系继续查看 -->
      <div v-if="store.neighbors.length" class="border-t border-slate-700 pt-3 mt-3">
        <div class="text-xs font-bold text-slate-400 mb-2">相邻节点（{{ store.neighbors.length }}）</div>
        <div class="flex flex-wrap gap-2">
          <button v-for="nb in store.neighbors" :key="nb.id"
            class="px-2 py-1 text-xs rounded bg-slate-800 border border-slate-600 hover:border-cyan-500 hover:text-cyan-300 font-mono"
            :title="`${nb.word} (${nb.language}): ${nb.meaning}`"
            @click="store.selectNode(nb.id)">
            {{ nb.word }}<span class="text-slate-500 font-sans"> · {{ nb.language }}</span>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useEtymologyStore, LANGUAGE_FAMILIES } from '../store/etymology'

const store = useEtymologyStore()
const familyName = (id: string) => LANGUAGE_FAMILIES.find(f => f.id === id)?.name ?? id
</script>
