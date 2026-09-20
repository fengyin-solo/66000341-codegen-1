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
  word: string; language: string; meaning: string; period: string
  note?: string        // 音变/借词/词义演变说明
  gapBefore?: string   // 若存在，表示该阶段之前文献缺档，值为缺档原因
}
