import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Panel, Section, SectionTitle } from '../components/ui/Section'
import { ChakanaMark } from '../components/atmosphere/CosmicBackground'
import { useLanguage } from '../context/LanguageContext'
import { useCopy } from '../content/translations'

export function AboutPage() {
  const { language } = useLanguage()
  const t = useCopy(language)

  return (
    <Section className="py-12 sm:py-16">
      <div className="flex flex-col items-center">
        <ChakanaMark className="h-16 w-16 animate-float text-cyan-soft/70" />
      </div>

      <div className="mt-6">
        <SectionTitle eyebrow={t.aboutEyebrow} title={t.aboutTitle} subtitle={t.aboutText} />
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-5">
        <Panel>
          <h3 className="font-display text-xl text-cyan-soft">{t.aboutInspire}</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist/75">{t.aboutInspireText}</p>
        </Panel>

        <Panel>
          <h3 className="font-display text-xl text-cyan-soft">{t.aboutHow}</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist/75">{t.aboutHowText}</p>
        </Panel>

        <Panel>
          <h3 className="font-display text-xl text-cyan-soft">{t.aboutNext}</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist/75">{t.aboutNextText}</p>
        </Panel>

        <Panel className="border-gold/25 bg-gold/5">
          <h3 className="font-display text-xl text-gold-soft">{t.aboutNotice}</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist/80">{t.aboutNoticeText}</p>
        </Panel>
      </div>

      <div className="mt-10 text-center">
        <Link to="/lecturas">
          <Button className="px-7 py-3">{t.start}</Button>
        </Link>
      </div>
    </Section>
  )
}
