<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-bold text-slate-400">演化路径视图</h3>
      <button @click="store.closePath()"
        class="text-xs px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600">
        ← 返回图谱
      </button>
    </div>

    <!-- 未选中任何词 -->
    <div v-if="!store.selectedNode" class="bg-slate-900 rounded p-6 text-center text-sm text-slate-500" style="min-height:460px">
      <div class="text-3xl mb-3">⌖</div>
      尚未选中任何词。请返回图谱，点击任一现代词节点查看其演化路径。
    </div>

    <!-- 语系筛选收窄 -->
    <div v-else-if="path.status === 'filtered'" class="bg-slate-900 rounded p-6 text-sm" style="min-height:460px">
      <div class="flex items-start gap-3 text-amber-400">
        <span class="text-xl leading-none">⚠</span>
        <div>
          <div class="font-bold mb-1">路径已收窄</div>
          <div class="text-slate-400 text-xs leading-relaxed">{{ path.reason }}</div>
          <button @click="store.selectedFamily = 'all'"
            class="mt-3 text-xs px-3 py-1.5 rounded bg-cyan-700 hover:bg-cyan-600 text-white">
            清除语系筛选
          </button>
        </div>
      </div>
    </div>

    <!-- 无可用关系：断点 -->
    <div v-else-if="path.status === 'empty'" class="bg-slate-900 rounded p-6 text-sm" style="min-height:460px">
      <div class="text-xs text-slate-500 mb-4">
        {{ store.selectedCognate?.root }} → <span class="text-cyan-400 font-bold">{{ store.selectedNode.word }}</span>
        （{{ store.selectedNode.language }}）
      </div>
      <div class="border-2 border-dashed border-amber-600/60 rounded-lg p-5">
        <div class="flex items-start gap-3 text-amber-400">
          <span class="text-xl leading-none">⚠</span>
          <div>
            <div class="font-bold mb-1">断点：无可用演化关系</div>
            <div class="text-slate-400 text-xs leading-relaxed">{{ path.reason }}</div>
          </div>
        </div>
      </div>
      <div class="mt-3 text-[11px] text-slate-600">仅展示词源数据中真实收录的关系，缺失部分不作推测补全。</div>
      <SiblingChips class="mt-5" />
    </div>

    <!-- 正常路径 -->
    <div v-else-if="path.status === 'ok'" class="bg-slate-900 rounded p-4" style="min-height:460px">
      <div class="flex items-center justify-between mb-1">
        <div class="text-xs text-slate-500">
          <span class="font-mono text-slate-300">{{ path.stages[0].word }}</span>
          <span class="mx-1">→</span>
          <span class="font-mono text-cyan-400 font-bold">{{ path.stages[path.stages.length - 1].word }}</span>
          <span class="ml-2">共 {{ path.stages.length }} 个阶段</span>
        </div>
        <div class="flex gap-1.5">
          <button @click="store.stepCursor(-1)" :disabled="store.pathCursor <= 0"
            class="text-xs px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-600">
            ← 上一阶段
          </button>
          <button @click="store.stepCursor(1)" :disabled="store.pathCursor >= path.stages.length - 1"
            class="text-xs px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-600">
            下一阶段 →
          </button>
        </div>
      </div>

      <!-- 时间线 -->
      <div class="mt-2">
        <template v-for="(st, i) in path.stages" :key="i">
          <!-- 中途断档：显示断点与原因 -->
          <div v-if="st.gapBefore" class="flex items-stretch gap-3 py-1 ml-4">
            <div class="w-0 border-l-2 border-dashed border-amber-500/70"></div>
            <div class="flex-1 border border-dashed border-amber-600/60 rounded px-3 py-2 my-1">
              <div class="text-amber-400 text-xs font-bold">⚠ 断档</div>
              <div class="text-[11px] text-slate-500 leading-relaxed">{{ st.gapBefore }}</div>
            </div>
          </div>
          <!-- 正常连接线段 -->
          <div v-else-if="i > 0" class="ml-4 py-0.5">
            <div class="w-0 h-5 border-l-2 border-cyan-700/60"></div>
          </div>
          <!-- 阶段卡片 -->
          <div @click="store.setCursor(i)"
            class="flex items-start gap-3 cursor-pointer rounded-lg px-3 py-2.5 border transition-colors"
            :class="i === store.pathCursor
              ? 'bg-cyan-900/30 border-cyan-500'
              : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'">
            <div class="flex flex-col items-center flex-shrink-0 w-8 pt-0.5">
              <span class="w-2.5 h-2.5 rounded-full"
                :class="i === store.pathCursor ? 'bg-cyan-400' : 'bg-slate-600'"></span>
              <span class="text-[10px] text-slate-600 mt-1">{{ i + 1 }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-baseline gap-2 flex-wrap">
                <span class="font-mono font-bold" :class="i === store.pathCursor ? 'text-cyan-300' : 'text-slate-200'">{{ st.word }}</span>
                <span class="text-xs text-slate-400">{{ st.language }}</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">{{ st.era }}</span>
              </div>
              <div class="text-xs text-slate-500 mt-0.5">词义：{{ st.meaning }}</div>
              <div v-if="st.note" class="text-[11px] text-green-400/90 mt-0.5">※ {{ st.note }}</div>
            </div>
          </div>
        </template>
      </div>

      <SiblingChips class="mt-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue'
import { useEtymologyStore, COGNATE_SETS } from '../store/etymology'

const store = useEtymologyStore()
const path = computed(() => store.evolutionPath)

// 同源词 chips：同一词根组内的相邻图谱节点，点击即可沿相邻节点继续查看
const SiblingChips = defineComponent({
  setup() {
    const siblings = computed(() => {
      const cs = store.selectedCognate
      if (!cs) return []
      const ci = COGNATE_SETS.indexOf(cs)
      const ids = ['root_' + ci, ...Object.keys(cs.languages).filter(l => cs.languages[l] && cs.languages[l] !== '-').map(l => ci + '_' + l)]
      return ids
        .map(id => store.graph.nodes.find((n: any) => n.id === id))
        .filter(Boolean)
    })
    return () => h('div', {}, [
      h('div', { class: 'text-[11px] text-slate-500 mb-1.5' }, '同源词（点击沿相邻节点继续查看）'),
      h('div', { class: 'flex flex-wrap gap-1.5' },
        siblings.value.map((n: any) => h('button', {
          key: n.id,
          class: [
            'text-xs px-2.5 py-1 rounded border font-mono transition-colors',
            store.selectedNode?.id === n.id
              ? 'bg-cyan-800/60 border-cyan-500 text-cyan-200'
              : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-cyan-600 hover:text-cyan-300',
          ],
          onClick: () => store.selectNode(n),
          title: `${n.word} (${n.language})`,
        }, n.language === 'Proto-IE' ? n.word : `${n.word} · ${n.language}`))),
    ])
  },
})
</script>
