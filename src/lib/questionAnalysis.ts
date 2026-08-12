import type { EnfoqueConsulta, TipoRespuestaEsperada } from '../types'
import { extraerEnfoqueConsulta } from './interpretacion'

export const LIMITE_PREGUNTA = 500

function normalizar(texto: string): string {
  return texto.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function tipoRespuesta(objeto: EnfoqueConsulta['objetoDeLaPregunta']): TipoRespuestaEsperada {
  switch (objeto) {
    case 'acciones': return 'movimiento probable'
    case 'sentimientos': return 'sentimiento predominante'
    case 'pensamientos': return 'pensamiento predominante'
    case 'intenciones': return 'intención probable'
    case 'resultado': return 'tendencia o resultado'
    default: return 'orientación contextual'
  }
}

export function analizarPregunta(pregunta: string) {
  const enfoque = extraerEnfoqueConsulta(pregunta)
  const q = normalizar(pregunta)
  const restricciones = [...enfoque.restriccionesExplicitas]
  if (
    enfoque.sujetoPrincipal === 'otra_persona' &&
    /no (?:a|sobre|de|respecto a|hables de) mi|respecto a (?:el|ella|esa persona)/.test(q)
  ) {
    restricciones.unshift('no centrar la interpretación en la consultante')
  }
  return {
    sujetoPrincipal: enfoque.sujetoPrincipal,
    objetoDePregunta: enfoque.objetoDeLaPregunta,
    personaGramatical: enfoque.personaGramatical,
    restriccionesExplicitas: [...new Set(restricciones)],
    tipoDeRespuestaEsperada: tipoRespuesta(enfoque.objetoDeLaPregunta),
    horizonteTemporal: /\bhoy\b/.test(q)
      ? 'hoy'
      : /\b(?:manana|esta semana|proximos dias)\b/.test(q)
        ? 'proximos_dias'
        : 'sin_plazo',
    respuestaConcretaEsperada: /vendra/i.test(q)
      ? 'venir o no venir'
      : enfoque.objetoDeLaPregunta === 'acciones'
        ? 'acción o movimiento más probable'
        : tipoRespuesta(enfoque.objetoDeLaPregunta),
  }
}

export function requiereTiradaAccion(spreadId: string, pregunta: string): boolean {
  const analisis = analizarPregunta(pregunta)
  return spreadId === 'carta-del-dia' &&
    analisis.sujetoPrincipal === 'otra_persona' &&
    analisis.objetoDePregunta === 'acciones'
}
