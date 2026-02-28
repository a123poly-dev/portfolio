import { CaseLayout } from "../components/case/CaseLayout"
import { SectionBlock } from "../components/case/SectionBlock"
import { TwoColumn } from "../components/case/TwoColumn"
import { CaseImage } from "@design-system/features/CaseImage"
import { VideoEmbed } from "../components/case/VideoEmbed"
import { Heading } from "@design-system/common/Heading"
import s from "../components/case/case.module.scss"

export const OkeySitePage = () => {
  return (
    <CaseLayout>
      {/* Hero */}
      <SectionBlock>
        <div className={s.mt56} />
        <p className={s.paragraph} style={{ marginBottom: "4px" }}>
          06.2021 - 08.2021
        </p>
        <Heading type="heading-h2" as="h1" className={s.mb40}>
          Concept for online store &quot;O&apos;KEY&quot;
        </Heading>

        <Heading type="heading-h5" as="h3" className={s.mb40}>
          O&apos;KEY Group is a major Russian supermarket chain with stores in
          cities across the country. Since O&apos;KEY was planning to transition
          to a microservice architecture to ensure high speed and fault
          tolerance of systems, this was an excellent opportunity to completely
          redesign the mobile application to improve the user experience.
        </Heading>

        <TwoColumn
          left={
            <div>
              <p className={s.uppercaseText}>Challenges</p>
              <p className={s.paragraph}>
                The goal of the project is to create a concept for the
                O&apos;KEY website that aligns stylistically and functionally
                with the already successful mobile applications. Despite the
                transition to microservices, which accelerated the performance
                of the website and mobile apps, the website currently lags in
                terms of usability. It is essential to provide a unified and
                user-friendly experience across both online platforms.
              </p>
            </div>
          }
          right={
            <div className={`${s.vflex} ${s.gap32}`}>
              <div>
                <p className={s.uppercaseText}>team</p>
                <p className={s.paragraph}>
                  The design team consists of two designers: a junior designer
                  and myself. In the assessment of the complete project for the
                  new website, we collaborated with 10+ engineers and 3
                  analysts.
                </p>
              </div>
              <div>
                <p className={s.uppercaseText}>My role</p>
                <p className={s.paragraph}>
                  My primary tasks included estimating the redesign effort for
                  the website based on my experience with O&apos;KEY&apos;s
                  mobile applications. I took charge of crafting the concept for
                  the website&apos;s key pages to showcase our vision. I
                  collaborated with the junior designer.
                </p>
              </div>
            </div>
          }
        />
      </SectionBlock>

      {/* Quote */}
      <SectionBlock>
        <h2 className={s.gradientGreen}>
          In the competitive world of shopping, users demand top-notch
          usability. For O&apos;KEY to stay relevant, continuous improvement is
          crucial
        </h2>
      </SectionBlock>

      {/* Research */}
      <SectionBlock>
        <Heading type="heading-h4" as="h2" className={s.h4}>
          Research
        </Heading>
        <TwoColumn
          left={
            <p className={s.paragraph}>
              As a designer who worked on website support and designed new
              mobile applications for O&apos;KEY, I had access to a wealth of
              valuable information. During the research phase, we carefully
              reviewed the entire structure of the current website and formed
              hypotheses to simplify it. Although we didn&apos;t conduct user
              testing on these hypotheses, we validated them through statistical
              analysis.
            </p>
          }
          right={
            <div>
              <p className={s.paragraph}>
                For example, we noticed that the advanced search feature,
                requiring users to fill in 9 fields, was utilized by less than
                0.3% of users. Based on this data, we concluded that the general
                search needed modernization, and the advanced search could be
                removed to enhance user experience.
              </p>
              <p className={s.paragraph}>
                Additionally, we conducted thorough analyses of both direct and
                indirect competitors to gain valuable insights for the project.
              </p>
            </div>
          }
        />
        <CaseImage
          src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c555f94fbe08b47fe100a1_06.png"
          alt="Research analysis"
        />
      </SectionBlock>

      {/* High-Fidelity Designs */}
      <SectionBlock>
        <Heading type="heading-h4" as="h2" className={s.h4}>
          High-Fidelity Designs of site
        </Heading>
        <TwoColumn
          left={
            <p className={s.paragraph}>
              Our main focus was on improving usability and creating a visually
              lightweight design to avoid overwhelming users with excessive
              content. For example, one major problem was the lack of hierarchy
              in buttons. There were multiple actions available, such as going
              back to shopping, adding all items to a list, adding items from a
              list, printing the cart, viewing available coupons, and completing
              the order. All of these actions were represented by buttons,
              making it difficult for users to quickly select the right option.
            </p>
          }
          right={
            <p className={s.paragraph}>
              Below, you can see the results of our work, showcasing the
              redesign of the main pages. Additionally, we have included
              prototypes for both the desktop and responsive versions.
            </p>
          }
        />
        <div className={`${s.vflex} ${s.gap24}`}>
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c5552ec6aaf37110af2784_05.png"
            alt="Homepage design"
          />
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c5552d45a4c36fcfba9cf3_04.png"
            alt="Catalog page"
          />
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c5552c4e8053b433b68315_03.png"
            alt="Product page"
          />
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c5553167694090d989451b_02.png"
            alt="Cart page"
          />
        </div>
      </SectionBlock>

      {/* Adaptive version */}
      <SectionBlock>
        <Heading type="heading-h4" as="h2" className={s.h4}>
          Adaptive version
        </Heading>
        <CaseImage
          src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c5552d4e8053b433b68441_01.png"
          alt="Adaptive version"
        />
      </SectionBlock>

      {/* Prototype */}
      <SectionBlock>
        <div className={s.prototypeSection}>
          <Heading type="heading-h3" as="h2" className={s.headingCenter}>
            Let&apos;s see the prototype of desktop &amp; adaptive versions
          </Heading>
          <a
            href="https://www.figma.com/proto/0Wgx2umO3HMR6easnPKQ4Y/concept_prototype?page-id=107%3A1957&type=design&node-id=157-203&viewport=1008%2C-15164%2C0.37&t=mWJoPfFoJptBlyFh-1&scaling=min-zoom&starting-point-node-id=157%3A203&mode=design"
            target="_blank"
            rel="noopener noreferrer"
            className={s.button}
          >
            Desktop version of Prototype
          </a>
          <VideoEmbed vimeoId="919300857" width={580} height={727} />
          <a
            href="https://www.figma.com/proto/0Wgx2umO3HMR6easnPKQ4Y/concept_prototype?page-id=336%3A25&type=design&node-id=382-14696&viewport=3792%2C360%2C0.42&t=N3w8mGg7o42YdJtl-1&scaling=scale-down&starting-point-node-id=382%3A14532&mode=design"
            target="_blank"
            rel="noopener noreferrer"
            className={s.button}
          >
            Prototype link in Figma
          </a>
        </div>
      </SectionBlock>
    </CaseLayout>
  )
}
