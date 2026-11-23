import { Link } from '@tanstack/react-router'
import type { Project } from '../content/projects'
import { CaseStudyHeader, Section } from './CaseStudySections'
import { fromHome } from './HomeLink'

export function SecondsCaseStudy({ project }: { project: Project }) {
  return (
    <>
      <CaseStudyHeader project={project}>
        Seconds is a website builder where no model writes code. You say in a sentence what the site is for, like
        “a free Saturday coding club for kids in Bristol, with Scratch, Python and little robots”, and in about two
        seconds you get a finished one-page site in three different designs. Then you change it by asking: “make
        it green”, “roomier”, “write it in Spanish”, “undo”. I built it on the side in November.
      </CaseStudyHeader>

      <div className="mt-16 flex flex-col gap-16">
        <Section title="Why I made it">
          <p>
            I wanted to know two things. Could decision models, which pick from options instead of writing,
            power a no-code tool, and how far could I push them? And could a site builder really make a website in
            seconds?
          </p>
          <p>
            Most AI site builders, like Lovable, v0 and Bolt, have a model write the code. That takes minutes,
            costs credits on every change, and an edit can break a page that worked. Relume builds from ready-made
            components instead, but it’s still slow.
          </p>
        </Section>

        <Section title="No model writes code">
          <p>
            Seconds splits the work three ways, so each part does only what it’s good at. Ready-made designs hold
            the taste: 47 whole-page templates, 30-odd colors, 8 sets of lettering and 3 spacing levels. A decision
            model, <a href="https://typesafe.ai">Jev</a>, answers multiple-choice questions: what the site is for,
            and which designs, colors, lettering and sections suit it. A text model writes the words into
            typed fields, like the name, the headline and the services. Then ordinary code draws the page, so the
            same choices always give the same page.
          </p>
          <ThreeDesigns />
        </Section>

        <Section title="From blocks to whole pages">
          <p>
            My first plan was to build each site from blocks: a banner, a menu, a set of questions, chosen and put
            together by the decision model. Blocks give far more variety than templates, and nothing is bound to a
            fixed page. But the parts looked out of sync. Each block looked fine alone, and together they didn’t
            look like one thing, and making them truly coherent turned out to be the hardest part.
          </p>
          <p>
            I also tested whether the decision model has taste. Thirty briefs were each built three ways: by the
            model, by sensible defaults written in code, and by random choices. I rated the pairs blind. The model
            needed to win 20 of 30 against the defaults to earn its place. It won 14, and against random choices it
            tied.
          </p>
          <p>
            So I moved to whole-page templates, and Seconds never relies on a model for taste. Every template has to
            look good for any site, with any words, in any color, with or without photos, and the model
            matches good options to the brief. I still want to go back to blocks. More granular parts should make
            better sites, once I can make them fit together.
          </p>
        </Section>

        <Section title="The rules are in code">
          <p>
            The safety rules aren’t left to the models. A phone number, address or email appears on the page only
            if the owner typed it, so a site never invents a way to reach anyone. Every edit is checked to make
            sure it changed only what was asked, and “make it green” never rewrites the headline.
          </p>
          <p>
            Photos come from Pixabay. A small vision model looks at the candidates and keeps only real photos that
            fit the site. Where nothing fits, the page uses art drawn by{' '}
            <Link to="/work/$slug" params={{ slug: 'surfaces' }} state={fromHome}>
              Surfaces
            </Link>{' '}
            instead.
          </p>
        </Section>

        <Section title="How fast, and for how much">
          <p>
            Measured on my laptop against the live model APIs, a new site’s page arrives in about 1.7 seconds, the
            median of seven builds, and its photos by about 4.4. A change of color, design or spacing takes 0.3 to
            0.4 seconds, and new words take one to three. A test round of about 120 builds and edits cost 40 cents
            for the text model, well under a cent each.
          </p>
        </Section>

        <Section title="How far it goes">
          <p>
            I don’t think it’s near its limit. Every new template, design and option gives the decision model more
            to choose from, and the sites get more varied and more fitting.
          </p>
          <p>
            AI has already made building a site much faster: what took hours or days in a no-code builder now takes
            minutes in Lovable or Bolt. I think the next step is seconds, for every change and not only the first
            draft. When each change takes minutes, you think hard before asking for it. When it takes a second, you
            can just try things: ask, look, undo and ask again.
          </p>
        </Section>
      </div>
    </>
  )
}

// One sentence, built once: the three designs Seconds offered for it, in the order it
// showed them. Screenshots of the preview, taken at 1200 by 800.
const designs = [
  { name: 'Low light', file: 'ramen-low-light' },
  { name: 'Split', file: 'ramen-split' },
  { name: 'Board', file: 'ramen-board' },
]

function ThreeDesigns() {
  return (
    <figure className="my-4">
      <div className="grid gap-x-4 gap-y-5 sm:grid-cols-3">
        {designs.map((design) => (
          <div key={design.file}>
            <img
              src={`/images/seconds/${design.file}.webp`}
              width={1200}
              height={800}
              loading="lazy"
              // The name under it and the caption say what it is.
              alt=""
              className="block h-auto w-full shadow-painting"
            />
            <p className="mt-2 font-mono text-xs text-muted">{design.name}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 font-mono text-xs text-muted">
        Tonkotsu Lab, a made-up ramen bar in Glasgow, from one of Seconds’ example sentences: the three designs it
        offered, built in 1.7 seconds.
      </figcaption>
    </figure>
  )
}
