import type { Metadata } from 'next'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

type ProductBrochureRecord = Prisma.ProductGetPayload<{
  include: {
    category: true
    features: {
      orderBy: {
        sortOrder: 'asc'
      }
    }
    nutrientSpecs: {
      orderBy: {
        sortOrder: 'asc'
      }
    }
  }
}>

type BrochureProduct = {
  name: string
  category: string
  summary: string
  emphasis: string
  features: string[]
  nutrients: string[]
}

const fallbackProducts: BrochureProduct[] = [
  {
    name: 'AgriAce Balanced NPK',
    category: 'General crop nutrition',
    summary:
      'A dependable all-purpose formulation designed to support uniform crop establishment, stronger vegetative growth, and steady field performance.',
    emphasis: 'Built for consistent everyday feeding',
    features: [
      'Suitable for broad-acre and mixed farming programs',
      'Supports early vigor and balanced crop development',
      'Easy to position as a foundation fertilizer in seasonal plans',
    ],
    nutrients: ['Nitrogen support', 'Phosphorus support', 'Potassium support'],
  },
  {
    name: 'AgriAce Crop-Specific Blends',
    category: 'Targeted nutrition',
    summary:
      'Purpose-led blends prepared for growers who need sharper crop alignment across vegetables, field crops, and commercial production cycles.',
    emphasis: 'Configured around crop-stage requirements',
    features: [
      'Helps tailor fertility plans to crop demand',
      'Suitable for structured dealer recommendations',
      'Designed for clear program positioning across seasons',
    ],
    nutrients: ['Macro nutrient balance', 'Crop-stage alignment', 'Field-ready usage'],
  },
  {
    name: 'AgriAce Micronutrient Support',
    category: 'Plant health support',
    summary:
      'A support range focused on correcting visible stress signals and improving nutrient completeness where intensive production needs tighter control.',
    emphasis: 'Complements primary nutrition programs',
    features: [
      'Useful in intensive and quality-sensitive crops',
      'Supports stronger visual crop uniformity',
      'Fits into corrective or supplementary programs',
    ],
    nutrients: ['Micronutrient enrichment', 'Supportive blending', 'Completeness focus'],
  },
]

const qualityPillars = [
  {
    title: 'Professional positioning',
    copy:
      'Clear product presentation for distributors, retailers, and commercial growers who expect a serious agricultural brand.',
  },
  {
    title: 'Field-oriented product story',
    copy:
      'Every section is framed around crop performance, practical application, and buying confidence instead of generic marketing language.',
  },
  {
    title: 'Ready for PDF export',
    copy:
      'The brochure layout is optimized for browser print so it can be exported as a clean shareable PDF without extra tooling.',
  },
]

const serviceHighlights = [
  'Balanced formulations for dependable crop nutrition',
  'Portfolio structure suitable for retail and dealer conversations',
  'Professional brand presentation for quotations and product pitches',
  'Supportive copy for both screen viewing and printed handouts',
]

const cropApplications = [
  'Field crops',
  'Vegetables',
  'Fruit orchards',
  'Nursery programs',
  'Protected cultivation',
  'Seasonal dealer supply',
]

export const metadata: Metadata = {
  title: 'AgriAce Fertilizers Brochure',
  description: 'Professional brochure page for AgriAce fertilizers.',
}

function mapProduct(product: ProductBrochureRecord): BrochureProduct {
  const features = product.features.slice(0, 3).map((feature) => feature.value)
  const nutrients = product.nutrientSpecs
    .slice(0, 4)
    .map((spec) => `${spec.nutrient}: ${spec.amount}`)

  return {
    name: product.name,
    category: product.category?.name ?? 'Crop nutrition',
    summary: product.shortDescription,
    emphasis: product.isFeatured
      ? 'Featured formulation from the AgriAce range'
      : 'Positioned for practical grower use',
    features: features.length > 0 ? features : fallbackProducts[0].features,
    nutrients: nutrients.length > 0 ? nutrients : fallbackProducts[0].nutrients,
  }
}

async function getBrochureProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: 'PUBLISHED',
      },
      include: {
        category: true,
        features: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
        nutrientSpecs: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { sortOrder: 'asc' },
        { publishedAt: 'desc' },
        { createdAt: 'desc' },
      ],
      take: 4,
    })

    if (products.length === 0) {
      return {
        products: fallbackProducts,
        hasLiveCatalog: false,
      }
    }

    return {
      products: products.map(mapProduct),
      hasLiveCatalog: true,
    }
  } catch {
    return {
      products: fallbackProducts,
      hasLiveCatalog: false,
    }
  }
}

export default async function BrochurePage() {
  const { products, hasLiveCatalog } = await getBrochureProducts()

  return (
    <main className="brochure-page min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="brochure-screen-only mx-auto mb-4 flex max-w-6xl items-center justify-between gap-4 rounded-[24px] border border-[rgba(76,95,46,0.14)] bg-[rgba(251,247,236,0.92)] px-5 py-3 text-sm text-[rgba(69,59,38,0.88)] shadow-[0_16px_34px_rgba(36,40,21,0.08)]">
        <p>
          {hasLiveCatalog
            ? 'Brochure synced with published catalog products.'
            : 'Brochure is showing polished fallback copy because live published products are unavailable.'}
        </p>
        <p className="font-medium text-[rgba(88,73,39,0.9)]">
          Use browser print to export PDF
        </p>
      </div>

      <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-[rgba(94,107,57,0.18)] bg-[linear-gradient(180deg,#fbf7ec_0%,#f6f0e1_100%)] text-[#1f2614] shadow-[0_30px_90px_rgba(33,39,19,0.14)]">
        <section className="brochure-section relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
          <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,rgba(113,142,57,0.22),transparent_48%),radial-gradient(circle_at_top_right,rgba(174,127,40,0.18),transparent_38%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_360px]">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(76,95,46,0.16)] bg-[rgba(255,255,255,0.72)] px-4 py-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#5f6f35]">
                AgriAce Fertilizers
              </div>
              <h1 className="mt-6 max-w-3xl text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[#233018] sm:text-[3.5rem]">
                Performance-focused plant nutrition with a clean professional
                market presence.
              </h1>
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-[rgba(54,55,37,0.84)]">
                AgriAce presents fertilizer solutions with a sharper commercial
                standard: balanced product storytelling, practical crop
                positioning, and brochure-ready presentation for growers,
                distributors, and retail channels.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {serviceHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-[rgba(84,97,51,0.15)] bg-[rgba(255,255,255,0.72)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.66)]"
                  >
                    <p className="text-sm font-medium leading-6 text-[rgba(43,49,28,0.88)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="relative rounded-[30px] border border-[rgba(75,94,45,0.16)] bg-[linear-gradient(180deg,rgba(42,58,24,0.98)_0%,rgba(28,36,18,1)_100%)] p-6 text-[#eef3df] shadow-[0_24px_50px_rgba(24,31,14,0.24)]">
              <div className="rounded-[24px] border border-[rgba(203,222,168,0.18)] bg-[rgba(255,255,255,0.05)] p-5">
                <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#c6d7a2]">
                  Brand focus
                </p>
                <h2 className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-[-0.04em] text-white">
                  Fertilizer communication that feels credible in front of real buyers.
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="rounded-[18px] border border-[rgba(206,223,173,0.12)] bg-[rgba(255,255,255,0.06)] px-4 py-4">
                    <p className="text-sm font-medium text-[#f2f6e8]">
                      Product range
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#cbd6b1]">
                      Built for clear category positioning and faster product
                      understanding.
                    </p>
                  </div>
                  <div className="rounded-[18px] border border-[rgba(206,223,173,0.12)] bg-[rgba(255,255,255,0.06)] px-4 py-4">
                    <p className="text-sm font-medium text-[#f2f6e8]">
                      Commercial presentation
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#cbd6b1]">
                      Suitable for printouts, WhatsApp sharing, quotations, and
                      dealer packets.
                    </p>
                  </div>
                  <div className="rounded-[18px] border border-[rgba(206,223,173,0.12)] bg-[rgba(255,255,255,0.06)] px-4 py-4">
                    <p className="text-sm font-medium text-[#f2f6e8]">
                      Sales use
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#cbd6b1]">
                      Structured to support product pitches, lead conversations,
                      and dealership outreach.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="brochure-section border-y border-[rgba(95,103,65,0.12)] bg-[rgba(255,255,255,0.45)] px-6 py-5 sm:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[22px] border border-[rgba(96,109,62,0.14)] bg-white/70 px-5 py-4">
              <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#708044]">
                Positioning
              </p>
              <p className="mt-2 text-sm leading-6 text-[rgba(47,48,32,0.84)]">
                Professional brochure design aligned with an agricultural B2B audience.
              </p>
            </div>
            <div className="rounded-[22px] border border-[rgba(96,109,62,0.14)] bg-white/70 px-5 py-4">
              <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#708044]">
                Portfolio
              </p>
              <p className="mt-2 text-sm leading-6 text-[rgba(47,48,32,0.84)]">
                Product highlight cards show live catalog entries when they are available.
              </p>
            </div>
            <div className="rounded-[22px] border border-[rgba(96,109,62,0.14)] bg-white/70 px-5 py-4">
              <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#708044]">
                Output
              </p>
              <p className="mt-2 text-sm leading-6 text-[rgba(47,48,32,0.84)]">
                Screen-first presentation with print rules for direct PDF export.
              </p>
            </div>
          </div>
        </section>

        <section className="brochure-section px-6 py-8 sm:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#6d7d44]">
                Product portfolio
              </p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.04em] text-[#243018]">
                Fertilizer lines presented for confident sales conversations.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[rgba(54,55,37,0.76)]">
              The brochure surfaces the strongest product signals first:
              category, short value story, practical features, and visible
              nutrient references.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.name}
                className="brochure-card rounded-[28px] border border-[rgba(92,105,56,0.15)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(248,244,235,0.95)_100%)] p-6 shadow-[0_20px_50px_rgba(43,49,28,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#7b6b37]">
                      {product.category}
                    </p>
                    <h3 className="mt-3 text-[1.35rem] font-semibold leading-tight tracking-[-0.03em] text-[#263118]">
                      {product.name}
                    </h3>
                  </div>
                  <span className="rounded-full border border-[rgba(110,127,63,0.16)] bg-[rgba(240,246,225,0.88)] px-3 py-1 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[#65763a]">
                    AgriAce
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-[rgba(44,47,30,0.82)]">
                  {product.summary}
                </p>

                <div className="mt-5 rounded-[20px] border border-[rgba(107,120,67,0.12)] bg-[rgba(247,249,239,0.82)] px-4 py-4">
                  <p className="text-sm font-medium leading-6 text-[#334122]">
                    {product.emphasis}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#6f7f44]">
                    Key points
                  </p>
                  <ul className="mt-3 space-y-2">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-[16px] border border-[rgba(93,109,58,0.1)] bg-white/75 px-4 py-3 text-sm leading-6 text-[rgba(46,49,32,0.8)]"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#6f7f44]">
                    Nutrient view
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.nutrients.map((nutrient) => (
                      <span
                        key={nutrient}
                        className="rounded-full border border-[rgba(122,131,82,0.16)] bg-[rgba(255,255,255,0.78)] px-3 py-2 text-xs font-medium text-[rgba(61,64,43,0.85)]"
                      >
                        {nutrient}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="brochure-section grid gap-6 bg-[linear-gradient(180deg,rgba(240,236,223,0.72)_0%,rgba(249,245,236,0.9)_100%)] px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
          <div>
            <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#6d7d44]">
              Why this works
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.04em] text-[#243018]">
              A brochure structure shaped for agriculture, not a generic template.
            </h2>
            <div className="mt-7 grid gap-4">
              {qualityPillars.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-[rgba(93,108,57,0.12)] bg-[rgba(255,255,255,0.76)] px-5 py-5"
                >
                  <h3 className="text-base font-semibold text-[#2d381d]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[rgba(50,52,35,0.78)]">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-[rgba(84,97,51,0.14)] bg-[linear-gradient(180deg,#2b391a_0%,#1f2814_100%)] p-6 text-[#ecf2dd] shadow-[0_24px_48px_rgba(26,31,17,0.22)]">
            <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#c6d8a1]">
              Applications
            </p>
            <h3 className="mt-4 text-[1.6rem] font-semibold leading-tight tracking-[-0.04em] text-white">
              Built to speak to multiple crop and channel scenarios.
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {cropApplications.map((item) => (
                <div
                  key={item}
                  className="rounded-[18px] border border-[rgba(206,223,173,0.12)] bg-[rgba(255,255,255,0.06)] px-4 py-4 text-sm font-medium text-[#edf3e0]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[22px] border border-[rgba(205,223,173,0.12)] bg-[rgba(255,255,255,0.05)] px-5 py-5">
              <p className="text-sm leading-7 text-[#cad5b0]">
                Contact AgriAce for quotations, product guidance, and dealership
                discussions. This brochure page is designed to be exported,
                shared, and updated alongside your live fertilizer catalog.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
