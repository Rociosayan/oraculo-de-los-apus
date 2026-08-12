import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Panel, Section, SectionTitle } from '../components/ui/Section'
import { ChakanaMark } from '../components/atmosphere/CosmicBackground'

export function AboutPage() {
  return (
    <Section className="py-12 sm:py-16">
      <div className="flex flex-col items-center">
        <ChakanaMark className="h-16 w-16 animate-float text-cyan-soft/70" />
      </div>

      <div className="mt-6">
        <SectionTitle
          eyebrow="Acerca del oráculo"
          title="Un puente entre la montaña y tu pregunta"
          subtitle="El Oráculo de los Apus nace del deseo de acercar la contemplación andina a la vida contemporánea, con respeto por las culturas originarias."
        />
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-5">
        <Panel>
          <h3 className="font-display text-xl text-cyan-soft">
            Inspiración, no apropiación
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-mist/75">
            Las cartas se inspiran en símbolos andinos ampliamente documentados
            —el cóndor, el puma, la serpiente, los apus, Pachamama, Inti, Mama
            Quilla, la chakana, el lago sagrado y el camino inca— reinterpretados
            como imágenes para la reflexión personal. No reproducen rituales
            cerrados ni pretenden representar a ninguna comunidad concreta.
          </p>
        </Panel>

        <Panel>
          <h3 className="font-display text-xl text-cyan-soft">Cómo funciona</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist/75">
            Escribes tu pregunta, las cartas se barajan y eliges las que te
            llaman. Al voltearlas recibes tres capas de lectura: el significado
            general, el mensaje andino y un consejo práctico para llevar a tu
            día. Puedes guardar cada lectura en tu diario o compartirla.
          </p>
        </Panel>

        <Panel>
          <h3 className="font-display text-xl text-cyan-soft">Lo que viene</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist/75">
            La aplicación está preparada para incorporar cuentas de usuario,
            sincronización en base de datos e interpretaciones ampliadas
            generadas con inteligencia artificial, manteniendo siempre el mismo
            criterio: acompañar, no predecir.
          </p>
        </Panel>

        <Panel className="border-gold/25 bg-gold/5">
          <h3 className="font-display text-xl text-gold-soft">Aviso importante</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist/80">
            Las lecturas tienen fines orientativos, simbólicos y de
            entretenimiento. No sustituyen asesoramiento profesional médico,
            psicológico, legal ni financiero. Ante una dificultad seria, busca
            apoyo especializado.
          </p>
        </Panel>
      </div>

      <div className="mt-10 text-center">
        <Link to="/lecturas">
          <Button className="px-7 py-3">Iniciar una lectura</Button>
        </Link>
      </div>
    </Section>
  )
}
