/**
 * Inventario de ilustraciones de las cartas (estilo Guamán Poma de Ayala).
 * Todas viven en /public/images/cartas/ con el patrón NN-slug.webp.
 */
export const CARD_IMAGE_SLUGS: Record<number, string> = {
  0: 'chaski',
  1: 'paqo',
  2: 'mama-quilla',
  3: 'pachamama',
  4: 'apu',
  5: 'amauta',
  6: 'yanantin',
  7: 'qhapaq-nan',
  8: 'puma',
  9: 'ermita-andina',
  10: 'pachakuti',
  11: 'ayni',
  12: 'uku-pacha',
  13: 'mallki',
  14: 'mama-qocha',
  15: 'supay',
  16: 'illapa',
  17: 'chaska',
  18: 'amaru',
  19: 'inti',
  20: 'kuntur',
  21: 'chakana',
}

export function cardImageSrc(id: number): string {
  const slug = CARD_IMAGE_SLUGS[id]
  return `/images/cartas/${String(id).padStart(2, '0')}-${slug}.webp`
}

export const CARD_BACK_SRC = '/images/cartas/reverso.webp'
