import { ButtonLink } from '@/components/ui/Button';
import { BotanicalMotif } from '@/components/ui/ArchPanel';
import { CupMark } from '@/components/ui/Wordmark';
import { Section, SectionHeading } from '@/components/ui/Section';
import { copy } from '@/content/copy';
import { signatureItems } from '@/content/menu';

/**
 * The signature section, in two modes.
 *
 * With a menu loaded, it features the items listed in `signatureItemIds`.
 *
 * Without one — which is the case today — it falls back to the three things the
 * cafe makes: café, bakery, desserts. That trio comes straight off the brand's
 * own descriptor line, so the section stays truthful and substantial rather
 * than either vanishing or filling itself with invented dishes.
 */
export function Signatures() {
  const items = signatureItems();

  return items.length > 0 ? <SignatureItems items={items} /> : <CraftPillars />;
}

function SignatureItems({ items }: { items: ReturnType<typeof signatureItems> }) {
  return (
    <Section tone="creamDeep" fluted>
      <SectionHeading
        eyebrow="Signature picks"
        title="What people come back for"
        lead="A few things we would put our name on."
      />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.id}>
            <article className="group relative h-full overflow-hidden rounded-2xl bg-cream p-7 shadow-soft transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-lift">
              <BotanicalMotif className="absolute -right-10 -top-6 h-32 w-auto text-maroon/[0.06] transition-opacity duration-500 group-hover:text-maroon/[0.11]" />

              <div className="relative">
                <h3 className="font-display text-xl text-espresso">{item.name}</h3>
                {item.description && (
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                )}
                {item.price !== undefined && (
                  <p className="mt-6 font-display text-lg tabular-nums text-maroon">₹{item.price}</p>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-14 text-center">
        <ButtonLink href="/menu">{copy.home.menuPreview.cta}</ButtonLink>
      </div>
    </Section>
  );
}

function CraftPillars() {
  return (
    <Section tone="creamDeep" fluted>
      <SectionHeading
        eyebrow={copy.home.craft.eyebrow}
        title={copy.home.craft.title}
        lead={copy.home.craft.lead}
      />

      <ul className="grid gap-6 md:grid-cols-3">
        {copy.home.craft.items.map((item, index) => (
          <li key={item.name}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-cream p-9 shadow-soft transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-lift">
              <BotanicalMotif className="pointer-events-none absolute -right-12 -top-8 h-36 w-auto text-maroon/[0.05] transition-colors duration-500 group-hover:text-maroon/[0.09]" />

              <div className="relative">
                {/* A numeral, set as editorial display type. */}
                <span className="font-display text-sm text-gold" aria-hidden="true">
                  0{index + 1}
                </span>

                <h3 className="mt-4 font-display text-2xl text-espresso">{item.name}</h3>

                <div className="mt-4 h-px w-10 bg-gold/50" />

                <p className="mt-5 leading-relaxed text-ink-muted">{item.copy}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-14 flex flex-col items-center gap-5 text-center">
        <CupMark className="h-10 text-maroon/35" />
        <p className="max-w-md text-sm text-ink-muted">{copy.home.menuPreview.leadPending}</p>
      </div>
    </Section>
  );
}
