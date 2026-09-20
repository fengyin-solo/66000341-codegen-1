import type { CognateSet, LanguageFamily, EvolutionStage } from '../types'

export const LANGUAGE_FAMILIES: LanguageFamily[] = [
  { id: 'ie', name: '印欧语系', color: '#3b82f6', languages: ['英语','法语','德语','西班牙语','俄语','拉丁语'], era: '公元前4000年' },
  { id: 'st', name: '汉藏语系', color: '#22c55e', languages: ['汉语','藏语','缅甸语'], era: '公元前4000年' },
  { id: 'aa', name: '亚非语系', color: '#f59e0b', languages: ['阿拉伯语','希伯来语'], era: '公元前6000年' },
  { id: 'ural', name: '乌拉尔语系', color: '#8b5cf6', languages: ['芬兰语','匈牙利语'], era: '公元前5000年' },
]

export const COGNATE_SETS: CognateSet[] = [
  { root: '*pṓds', meaning: '脚/足', languages: { '英语': 'foot', '法语': 'pied', '德语': 'Fuß', '西班牙语': 'pie', '俄语': 'ступня', '拉丁语': 'pēs' }, period: 'PIE', family: 'ie' },
  { root: '*mātér', meaning: '母亲', languages: { '英语': 'mother', '法语': 'mère', '德语': 'Mutter', '西班牙语': 'madre', '俄语': 'мать', '拉丁语': 'māter' }, period: 'PIE', family: 'ie' },
  { root: '*pṓtr', meaning: '父亲', languages: { '英语': 'father', '法语': 'père', '德语': 'Vater', '西班牙语': 'padre', '俄语': 'отец', '拉丁语': 'pater' }, period: 'PIE', family: 'ie' },
  { root: '*h₂épo', meaning: '水', languages: { '英语': 'aqua', '法语': 'eau', '德语': 'Au', '西班牙语': 'agua', '俄语': 'вода', '拉丁语': 'aqua' }, period: 'PIE', family: 'ie' },
  { root: '*dʰómos', meaning: '家', languages: { '英语': 'dome', '法语': 'maison', '德语': 'Dom', '西班牙语': 'domo', '俄语': 'дом', '拉丁语': 'domus' }, period: 'PIE', family: 'ie' },
  { root: '*wḗdr̥', meaning: '水/Water', languages: { '英语': 'water', '法语': 'eau', '德语': 'Wasser', '俄语': 'вода', '拉丁语': 'unda' }, period: 'PIE', family: 'ie' },
  { root: '*sol-', meaning: '太阳', languages: { '英语': 'sun', '法语': 'soleil', '德语': 'Sonne', '西班牙语': 'sol', '俄语': 'солнце', '拉丁语': 'sol' }, period: 'PIE', family: 'ie' },
  { root: '*luks-', meaning: '光/亮', languages: { '英语': 'light', '法语': 'lumière', '德语': 'Licht', '西班牙语': 'luz', '俄语': 'луч', '拉丁语': 'lux' }, period: 'PIE', family: 'ie' },
  { root: '*nokʷt-', meaning: '夜晚', languages: { '英语': 'night', '法语': 'nuit', '德语': 'Nacht', '西班牙语': 'noche', '俄语': 'ночь', '拉丁语': 'nox' }, period: 'PIE', family: 'ie' },
  { root: '*okʷ-', meaning: '眼睛', languages: { '英语': 'eye', '法语': 'oeil', '德语': 'Auge', '西班牙语': 'ojo', '俄语': 'oko', '拉丁语': 'oculus' }, period: 'PIE', family: 'ie' },
  { root: '*ed-', meaning: '吃', languages: { '英语': 'eat', '德语': 'essen', '俄语': 'есть', '拉丁语': 'edere' }, period: 'PIE', family: 'ie' },
  { root: '*ǵneh₃-', meaning: '知道', languages: { '英语': 'know', '德语': 'kennen', '西班牙语': 'conocer', '俄语': 'знать', '拉丁语': 'gnoscere' }, period: 'PIE', family: 'ie' },
  { root: '*h₃érō', meaning: '鹰', languages: { '英语': 'eagle', '法语': 'aigle', '德语': 'Adler', '西班牙语': 'águila', '拉丁语': 'aquila' }, period: 'PIE', family: 'ie' },
  { root: '*sker-', meaning: '切割', languages: { '英语': 'shear', '德语': 'scheren', '俄语': 'резать', '拉丁语': 'scindere' }, period: 'PIE', family: 'ie' },
  { root: '*gʷen-', meaning: '女人', languages: { '英语': 'queen', '德语': 'Frau', '俄语': 'жена' }, period: 'PIE', family: 'ie' },
]

// 演化谱系链：键为图谱节点 id（`${同源组序号}_${语言}`），值为从原始词根到现代词的有序阶段。
// 仅收录有文献/构拟依据的谱系；无记录的词不建链，由路径视图显示断点而非补造关联。
export const EVOLUTION_CHAINS: Record<string, EvolutionStage[]> = {
  '0_英语': [
    { word: '*pṓds', language: '原始印欧语', meaning: '脚/足', period: '约公元前4500–2500年' },
    { word: '*fōts', language: '原始日耳曼语', meaning: '脚', period: '约公元前500年', note: 'Grimm定律：p→f' },
    { word: 'fōt', language: '古英语', meaning: '脚', period: '约700–1100年' },
    { word: 'foot', language: '现代英语', meaning: '脚', period: '现代' },
  ],
  '0_德语': [
    { word: '*pṓds', language: '原始印欧语', meaning: '脚/足', period: '约公元前4500–2500年' },
    { word: '*fōts', language: '原始日耳曼语', meaning: '脚', period: '约公元前500年', note: 'Grimm定律：p→f' },
    { word: 'fuoz', language: '古高地德语', meaning: '脚', period: '约750–1050年' },
    { word: 'Fuß', language: '现代德语', meaning: '脚', period: '现代' },
  ],
  '0_拉丁语': [
    { word: '*pṓds', language: '原始印欧语', meaning: '脚/足', period: '约公元前4500–2500年' },
    { word: '*pēs', language: '原始意大利语族', meaning: '脚', period: '约公元前1000年', note: '构拟形式' },
    { word: 'pēs', language: '古典拉丁语', meaning: '脚', period: '约公元前75年–公元200年', note: '属格 pedis' },
  ],
  '0_法语': [
    { word: '*pṓds', language: '原始印欧语', meaning: '脚/足', period: '约公元前4500–2500年' },
    { word: 'pēs / pedem', language: '拉丁语', meaning: '脚', period: '约公元前75年–公元200年' },
    { word: '*pedem', language: '俗拉丁语', meaning: '脚', period: '约200–600年', note: '宾格构拟形式' },
    { word: 'pié', language: '古法语', meaning: '脚', period: '约842–1400年' },
    { word: 'pied', language: '现代法语', meaning: '脚', period: '现代' },
  ],
  '0_西班牙语': [
    { word: '*pṓds', language: '原始印欧语', meaning: '脚/足', period: '约公元前4500–2500年' },
    { word: 'pēs / pedem', language: '拉丁语', meaning: '脚', period: '约公元前75年–公元200年' },
    { word: '*pedem', language: '俗拉丁语', meaning: '脚', period: '约200–600年', note: '宾格构拟形式' },
    { word: 'pie', language: '古西班牙语', meaning: '脚', period: '约1100–1450年' },
    { word: 'pie', language: '现代西班牙语', meaning: '脚', period: '现代' },
  ],
  '1_英语': [
    { word: '*mātér', language: '原始印欧语', meaning: '母亲', period: '约公元前4500–2500年' },
    { word: '*mōdēr', language: '原始日耳曼语', meaning: '母亲', period: '约公元前500年' },
    { word: 'mōdor', language: '古英语', meaning: '母亲', period: '约700–1100年' },
    { word: 'mother', language: '现代英语', meaning: '母亲', period: '现代' },
  ],
  '1_德语': [
    { word: '*mātér', language: '原始印欧语', meaning: '母亲', period: '约公元前4500–2500年' },
    { word: '*mōdēr', language: '原始日耳曼语', meaning: '母亲', period: '约公元前500年' },
    { word: 'muoter', language: '古高地德语', meaning: '母亲', period: '约750–1050年' },
    { word: 'Mutter', language: '现代德语', meaning: '母亲', period: '现代' },
  ],
  '1_拉丁语': [
    { word: '*mātér', language: '原始印欧语', meaning: '母亲', period: '约公元前4500–2500年' },
    { word: '*mātēr', language: '原始意大利语族', meaning: '母亲', period: '约公元前1000年', note: '构拟形式' },
    { word: 'māter', language: '古典拉丁语', meaning: '母亲', period: '约公元前75年–公元200年' },
  ],
  '1_法语': [
    { word: '*mātér', language: '原始印欧语', meaning: '母亲', period: '约公元前4500–2500年' },
    { word: 'māter / mātrem', language: '拉丁语', meaning: '母亲', period: '约公元前75年–公元200年' },
    { word: 'mere', language: '古法语', meaning: '母亲', period: '约842–1400年' },
    { word: 'mère', language: '现代法语', meaning: '母亲', period: '现代' },
  ],
  '1_西班牙语': [
    { word: '*mātér', language: '原始印欧语', meaning: '母亲', period: '约公元前4500–2500年' },
    { word: 'māter / mātrem', language: '拉丁语', meaning: '母亲', period: '约公元前75年–公元200年' },
    { word: 'madre', language: '古西班牙语', meaning: '母亲', period: '约1100–1450年' },
    { word: 'madre', language: '现代西班牙语', meaning: '母亲', period: '现代' },
  ],
  '1_俄语': [
    { word: '*mātér', language: '原始印欧语', meaning: '母亲', period: '约公元前4500–2500年' },
    { word: '*mātē', language: '原始波罗的-斯拉夫语', meaning: '母亲', period: '约公元前1500年', note: '构拟形式' },
    { word: '*mati', language: '原始斯拉夫语', meaning: '母亲', period: '约500–800年' },
    { word: 'мати', language: '古东斯拉夫语', meaning: '母亲', period: '约1000–1400年' },
    { word: 'мать', language: '现代俄语', meaning: '母亲', period: '现代' },
  ],
  '2_英语': [
    { word: '*ph₂tḗr', language: '原始印欧语', meaning: '父亲', period: '约公元前4500–2500年' },
    { word: '*fadēr', language: '原始日耳曼语', meaning: '父亲', period: '约公元前500年', note: 'Grimm定律 p→f；Verner定律 t→d' },
    { word: 'fæder', language: '古英语', meaning: '父亲', period: '约700–1100年' },
    { word: 'father', language: '现代英语', meaning: '父亲', period: '现代' },
  ],
  '2_德语': [
    { word: '*ph₂tḗr', language: '原始印欧语', meaning: '父亲', period: '约公元前4500–2500年' },
    { word: '*fadēr', language: '原始日耳曼语', meaning: '父亲', period: '约公元前500年', note: 'Grimm定律 p→f' },
    { word: 'fater', language: '古高地德语', meaning: '父亲', period: '约750–1050年' },
    { word: 'Vater', language: '现代德语', meaning: '父亲', period: '现代' },
  ],
  '2_拉丁语': [
    { word: '*ph₂tḗr', language: '原始印欧语', meaning: '父亲', period: '约公元前4500–2500年' },
    { word: '*patēr', language: '原始意大利语族', meaning: '父亲', period: '约公元前1000年', note: '构拟形式' },
    { word: 'pater', language: '古典拉丁语', meaning: '父亲', period: '约公元前75年–公元200年' },
  ],
  '2_法语': [
    { word: '*ph₂tḗr', language: '原始印欧语', meaning: '父亲', period: '约公元前4500–2500年' },
    { word: 'pater / patrem', language: '拉丁语', meaning: '父亲', period: '约公元前75年–公元200年' },
    { word: 'pere', language: '古法语', meaning: '父亲', period: '约842–1400年' },
    { word: 'père', language: '现代法语', meaning: '父亲', period: '现代' },
  ],
  '2_西班牙语': [
    { word: '*ph₂tḗr', language: '原始印欧语', meaning: '父亲', period: '约公元前4500–2500年' },
    { word: 'pater / patrem', language: '拉丁语', meaning: '父亲', period: '约公元前75年–公元200年' },
    { word: 'padre', language: '古西班牙语', meaning: '父亲', period: '约1100–1450年' },
    { word: 'padre', language: '现代西班牙语', meaning: '父亲', period: '现代' },
  ],
  '6_英语': [
    { word: '*sol- / *sóh₂wl̥', language: '原始印欧语', meaning: '太阳', period: '约公元前4500–2500年' },
    { word: '*sunnōn', language: '原始日耳曼语', meaning: '太阳', period: '约公元前500年', note: '词干异形替换' },
    { word: 'sunne', language: '古英语', meaning: '太阳', period: '约700–1100年' },
    { word: 'sun', language: '现代英语', meaning: '太阳', period: '现代' },
  ],
  '6_德语': [
    { word: '*sol- / *sóh₂wl̥', language: '原始印欧语', meaning: '太阳', period: '约公元前4500–2500年' },
    { word: '*sunnōn', language: '原始日耳曼语', meaning: '太阳', period: '约公元前500年' },
    { word: 'sunna', language: '古高地德语', meaning: '太阳', period: '约750–1050年' },
    { word: 'Sonne', language: '现代德语', meaning: '太阳', period: '现代' },
  ],
  '6_拉丁语': [
    { word: '*sol- / *sóh₂wl̥', language: '原始印欧语', meaning: '太阳', period: '约公元前4500–2500年' },
    { word: '*sāwol', language: '原始意大利语族', meaning: '太阳', period: '约公元前1000年', note: '构拟形式' },
    { word: 'sol', language: '古典拉丁语', meaning: '太阳', period: '约公元前75年–公元200年', note: '长元音 sōl' },
  ],
  '6_法语': [
    { word: 'sōl / sōlem', language: '拉丁语', meaning: '太阳', period: '约公元前75年–公元200年' },
    { word: '*soliculus', language: '俗拉丁语', meaning: '太阳（指小词）', period: '约200–600年', note: '指小词构拟形式' },
    { word: 'soleil', language: '古法语', meaning: '太阳', period: '约842–1400年' },
    { word: 'soleil', language: '现代法语', meaning: '太阳', period: '现代' },
  ],
  '6_西班牙语': [
    { word: 'sōl / sōlem', language: '拉丁语', meaning: '太阳', period: '约公元前75年–公元200年' },
    { word: 'sol', language: '古西班牙语', meaning: '太阳', period: '约1100–1450年' },
    { word: 'sol', language: '现代西班牙语', meaning: '太阳', period: '现代' },
  ],
  '6_俄语': [
    { word: '*sol- / *sóh₂wl̥', language: '原始印欧语', meaning: '太阳', period: '约公元前4500–2500年' },
    { word: '*sъlnice', language: '原始斯拉夫语', meaning: '太阳', period: '约500–800年', note: '指小构拟形式' },
    { word: 'слъньце', language: '古东斯拉夫语', meaning: '太阳', period: '约1000–1400年' },
    { word: 'солнце', language: '现代俄语', meaning: '太阳', period: '现代' },
  ],
  '7_英语': [
    { word: '*lewk-', language: '原始印欧语', meaning: '光/亮', period: '约公元前4500–2500年' },
    { word: '*leuhtą', language: '原始日耳曼语', meaning: '光', period: '约公元前500年', note: 'Grimm定律：k→h' },
    { word: 'lēoht', language: '古英语', meaning: '光', period: '约700–1100年' },
    { word: 'light', language: '现代英语', meaning: '光', period: '现代' },
  ],
  '7_德语': [
    { word: '*lewk-', language: '原始印欧语', meaning: '光/亮', period: '约公元前4500–2500年' },
    { word: '*leuhtą', language: '原始日耳曼语', meaning: '光', period: '约公元前500年', note: 'Grimm定律：k→h' },
    { word: 'lioht', language: '古高地德语', meaning: '光', period: '约750–1050年' },
    { word: 'Licht', language: '现代德语', meaning: '光', period: '现代' },
  ],
  '7_拉丁语': [
    { word: '*lewk-', language: '原始印欧语', meaning: '光/亮', period: '约公元前4500–2500年' },
    { word: '*louks', language: '原始意大利语族', meaning: '光', period: '约公元前1000年', note: '构拟形式' },
    { word: 'lux', language: '古典拉丁语', meaning: '光', period: '约公元前75年–公元200年', note: '属格 lūcis' },
  ],
  '7_法语': [
    { word: '*lewk-', language: '原始印欧语', meaning: '光/亮', period: '约公元前4500–2500年' },
    { word: 'lūmen', language: '拉丁语', meaning: '光源', period: '约公元前75年–公元200年', note: '经由 lūmen「光源」支系' },
    { word: 'lumiere', language: '古法语', meaning: '光', period: '约842–1400年' },
    { word: 'lumière', language: '现代法语', meaning: '光', period: '现代' },
  ],
  '7_西班牙语': [
    { word: 'lūx / lūcem', language: '拉丁语', meaning: '光', period: '约公元前75年–公元200年' },
    { word: 'luz', language: '古西班牙语', meaning: '光', period: '约1100–1450年' },
    { word: 'luz', language: '现代西班牙语', meaning: '光', period: '现代' },
  ],
  '7_俄语': [
    { word: '*lewk-', language: '原始印欧语', meaning: '光/亮', period: '约公元前4500–2500年' },
    { word: '*lučь', language: '原始斯拉夫语', meaning: '光线', period: '约500–800年', gapBefore: '原始斯拉夫语之前的中间形态缺乏直接文献，仅存构拟依据', note: '词义由「光」引申为「光线」' },
    { word: 'лучь', language: '古东斯拉夫语', meaning: '光线', period: '约1000–1400年' },
    { word: 'луч', language: '现代俄语', meaning: '光线/光束', period: '现代' },
  ],
  '8_英语': [
    { word: '*nókʷts', language: '原始印欧语', meaning: '夜晚', period: '约公元前4500–2500年' },
    { word: '*nahts', language: '原始日耳曼语', meaning: '夜晚', period: '约公元前500年', note: 'Grimm定律：kʷ→h' },
    { word: 'niht', language: '古英语', meaning: '夜晚', period: '约700–1100年' },
    { word: 'night', language: '现代英语', meaning: '夜晚', period: '现代' },
  ],
  '8_德语': [
    { word: '*nókʷts', language: '原始印欧语', meaning: '夜晚', period: '约公元前4500–2500年' },
    { word: '*nahts', language: '原始日耳曼语', meaning: '夜晚', period: '约公元前500年' },
    { word: 'naht', language: '古高地德语', meaning: '夜晚', period: '约750–1050年' },
    { word: 'Nacht', language: '现代德语', meaning: '夜晚', period: '现代' },
  ],
  '8_拉丁语': [
    { word: '*nókʷts', language: '原始印欧语', meaning: '夜晚', period: '约公元前4500–2500年' },
    { word: '*noks', language: '原始意大利语族', meaning: '夜晚', period: '约公元前1000年', note: '构拟形式' },
    { word: 'nox', language: '古典拉丁语', meaning: '夜晚', period: '约公元前75年–公元200年', note: '属格 noctis' },
  ],
  '8_法语': [
    { word: 'nox / noctem', language: '拉丁语', meaning: '夜晚', period: '约公元前75年–公元200年' },
    { word: 'nuit', language: '古法语', meaning: '夜晚', period: '约842–1400年' },
    { word: 'nuit', language: '现代法语', meaning: '夜晚', period: '现代' },
  ],
  '8_西班牙语': [
    { word: 'nox / noctem', language: '拉丁语', meaning: '夜晚', period: '约公元前75年–公元200年' },
    { word: 'noche', language: '古西班牙语', meaning: '夜晚', period: '约1100–1450年' },
    { word: 'noche', language: '现代西班牙语', meaning: '夜晚', period: '现代' },
  ],
  '8_俄语': [
    { word: '*nókʷts', language: '原始印欧语', meaning: '夜晚', period: '约公元前4500–2500年' },
    { word: '*noťь', language: '原始斯拉夫语', meaning: '夜晚', period: '约500–800年' },
    { word: 'ночь', language: '古东斯拉夫语', meaning: '夜晚', period: '约1000–1400年' },
    { word: 'ночь', language: '现代俄语', meaning: '夜晚', period: '现代' },
  ],
  '9_英语': [
    { word: '*h₃ekʷ-', language: '原始印欧语', meaning: '眼睛', period: '约公元前4500–2500年' },
    { word: '*augō', language: '原始日耳曼语', meaning: '眼睛', period: '约公元前500年' },
    { word: 'ēage', language: '古英语', meaning: '眼睛', period: '约700–1100年' },
    { word: 'eye', language: '现代英语', meaning: '眼睛', period: '现代' },
  ],
  '9_德语': [
    { word: '*h₃ekʷ-', language: '原始印欧语', meaning: '眼睛', period: '约公元前4500–2500年' },
    { word: '*augō', language: '原始日耳曼语', meaning: '眼睛', period: '约公元前500年' },
    { word: 'ouga', language: '古高地德语', meaning: '眼睛', period: '约750–1050年' },
    { word: 'Auge', language: '现代德语', meaning: '眼睛', period: '现代' },
  ],
  '9_拉丁语': [
    { word: '*h₃ekʷ-', language: '原始印欧语', meaning: '眼睛', period: '约公元前4500–2500年' },
    { word: '*okʷelos', language: '原始意大利语族', meaning: '眼睛', period: '约公元前1000年', note: '构拟形式' },
    { word: 'oculus', language: '古典拉丁语', meaning: '眼睛（指小形式）', period: '约公元前75年–公元200年' },
  ],
  '9_俄语': [
    { word: '*h₃ekʷ-', language: '原始印欧语', meaning: '眼睛', period: '约公元前4500–2500年' },
    { word: '*oko', language: '原始斯拉夫语', meaning: '眼睛', period: '约500–800年' },
    { word: 'око', language: '古东斯拉夫语', meaning: '眼睛', period: '约1000–1400年' },
    { word: 'oko', language: '现代俄语', meaning: '眼睛（书面/古语）', period: '现代', note: '西里尔字母拼作 око；现代口语多用 глаз' },
  ],
  '11_英语': [
    { word: '*ǵneh₃-', language: '原始印欧语', meaning: '知道', period: '约公元前4500–2500年' },
    { word: '*knēaną', language: '原始日耳曼语', meaning: '知道', period: '约公元前500年', note: 'Grimm定律：ǵ→k' },
    { word: 'cnāwan', language: '古英语', meaning: '知道', period: '约700–1100年' },
    { word: 'know', language: '现代英语', meaning: '知道', period: '现代', note: '词首 k- 于近代英语中不再发音' },
  ],
  '11_德语': [
    { word: '*ǵneh₃-', language: '原始印欧语', meaning: '知道', period: '约公元前4500–2500年' },
    { word: '*kannijaną', language: '原始日耳曼语', meaning: '使知道/认识', period: '约公元前500年', note: '使役构词' },
    { word: 'irkennen', language: '古高地德语', meaning: '认识', period: '约750–1050年', gapBefore: '西日耳曼语支早期形态缺乏直接文献，存在缺档' },
    { word: 'kennen', language: '现代德语', meaning: '认识/知道', period: '现代' },
  ],
  '11_拉丁语': [
    { word: '*ǵneh₃-', language: '原始印欧语', meaning: '知道', period: '约公元前4500–2500年' },
    { word: '*gnōskō', language: '原始意大利语族', meaning: '知道', period: '约公元前1000年', note: '构拟形式' },
    { word: 'gnoscere', language: '古典拉丁语', meaning: '知道/认识', period: '约公元前75年–公元200年', note: '亦拼作 gnōscere' },
  ],
  '11_俄语': [
    { word: '*ǵneh₃-', language: '原始印欧语', meaning: '知道', period: '约公元前4500–2500年' },
    { word: '*znati', language: '原始斯拉夫语', meaning: '知道', period: '约500–800年' },
    { word: 'знати', language: '古东斯拉夫语', meaning: '知道', period: '约1000–1400年' },
    { word: 'знать', language: '现代俄语', meaning: '知道', period: '现代' },
  ],
  '12_英语': [
    { word: '*h₃érō', language: '原始印欧语', meaning: '鹰', period: '约公元前4500–2500年' },
    { word: '*akʷilā', language: '原始意大利语族', meaning: '鹰', period: '约公元前1000年', note: '构拟形式' },
    { word: 'aquila', language: '拉丁语', meaning: '鹰', period: '约公元前75年–公元200年' },
    { word: 'aigle', language: '古法语', meaning: '鹰', period: '约842–1400年' },
    { word: 'egle', language: '中古英语', meaning: '鹰', period: '约1100–1500年', note: '自法语借入，非日耳曼语继承词' },
    { word: 'eagle', language: '现代英语', meaning: '鹰', period: '现代' },
  ],
  '12_法语': [
    { word: 'aquila', language: '拉丁语', meaning: '鹰', period: '约公元前75年–公元200年' },
    { word: 'aigle', language: '古法语', meaning: '鹰', period: '约842–1400年' },
    { word: 'aigle', language: '现代法语', meaning: '鹰', period: '现代' },
  ],
  '12_西班牙语': [
    { word: 'aquila', language: '拉丁语', meaning: '鹰', period: '约公元前75年–公元200年' },
    { word: '*acula', language: '俗拉丁语', meaning: '鹰', period: '约200–600年', note: '构拟形式' },
    { word: 'águila', language: '现代西班牙语', meaning: '鹰', period: '现代' },
  ],
  '12_拉丁语': [
    { word: '*h₃érō', language: '原始印欧语', meaning: '鹰', period: '约公元前4500–2500年' },
    { word: '*akʷilā', language: '原始意大利语族', meaning: '鹰', period: '约公元前1000年', note: '构拟形式' },
    { word: 'aquila', language: '古典拉丁语', meaning: '鹰', period: '约公元前75年–公元200年' },
  ],
  '14_英语': [
    { word: '*gʷen-', language: '原始印欧语', meaning: '女人', period: '约公元前4500–2500年' },
    { word: '*kwēniz', language: '原始日耳曼语', meaning: '女人/妻子', period: '约公元前500年' },
    { word: 'cwēn', language: '古英语', meaning: '王后', period: '约700–1100年', note: '词义由「女人」窄化' },
    { word: 'queen', language: '现代英语', meaning: '女王/王后', period: '现代' },
  ],
  '14_俄语': [
    { word: '*gʷen-', language: '原始印欧语', meaning: '女人', period: '约公元前4500–2500年' },
    { word: '*žena', language: '原始斯拉夫语', meaning: '女人/妻子', period: '约500–800年' },
    { word: 'жена', language: '古东斯拉夫语', meaning: '妻子', period: '约1000–1400年' },
    { word: 'жена', language: '现代俄语', meaning: '妻子', period: '现代' },
  ],
}

export function buildGraph() {
  const nodes: any[] = []
  const links: any[] = []
  COGNATE_SETS.forEach((cs, ci) => {
    const rootId = 'root_' + ci
    nodes.push({ id: rootId, word: cs.root, language: 'Proto-IE', meaning: cs.meaning, family: 'ie', era: '公元前5000年' })
    Object.entries(cs.languages).forEach(([lang, word]) => {
      if (!word || word === '-') return
      const nid = ci + '_' + lang
      nodes.push({ id: nid, word, language: lang, meaning: cs.meaning, family: 'ie', era: '现代' })
      links.push({ source: rootId, target: nid, type: 'derived' })
    })
  })
  return { nodes, links }
}
