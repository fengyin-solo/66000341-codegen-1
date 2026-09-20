export interface WordNode {
  id: string; word: string; language: string; meaning: string
  family: string; era?: string; x?: number; y?: number
}
export interface WordLink {
  source: string; target: string
  type: 'cognate' | 'derived' | 'borrowed' | 'reconstructed'
  description?: string
}
export interface CognateSet {
  root: string; meaning: string
  languages: Record<string, string>
  period: string; family: string
}
export interface LanguageFamily {
  id: string; name: string; color: string; languages: string[]; era: string
}
export interface EvolutionStage {
  word: string; language: string; meaning: string; era: string
  note?: string      // 音变/借词等演变说明
  gapBefore?: string // 与上一阶段之间存在断档时的原因说明（不补造缺失关联）
}
export type EvolutionPathStatus = 'none' | 'ok' | 'empty' | 'filtered'
export interface EvolutionPath {
  status: EvolutionPathStatus
  stages: EvolutionStage[]
  reason: string
}
