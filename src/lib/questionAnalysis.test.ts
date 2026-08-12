import { describe, expect, it } from 'vitest'
import { analizarPregunta, requiereTiradaAccion } from './questionAnalysis'

describe('análisis local de la pregunta', () => {
  it('detecta una acción de otra persona con horizonte hoy', () => {
    expect(analizarPregunta('¿Vendrá hoy?')).toEqual(expect.objectContaining({
      sujetoPrincipal: 'otra_persona',
      objetoDePregunta: 'acciones',
      horizonteTemporal: 'hoy',
      respuestaConcretaEsperada: 'venir o no venir',
    }))
  })

  it('recomienda la tirada de acción solo desde Carta del día', () => {
    expect(requiereTiradaAccion('carta-del-dia', '¿Vendrá hoy?')).toBe(true)
    expect(requiereTiradaAccion('accion-tres', '¿Vendrá hoy?')).toBe(false)
  })
})
