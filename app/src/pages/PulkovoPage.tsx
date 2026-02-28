import { CaseLayout } from "../components/case/CaseLayout"
import { CaseHero } from "../components/case/CaseHero"
import { SectionBlock } from "../components/case/SectionBlock"
import { TwoColumn } from "../components/case/TwoColumn"
import { CaseImage } from "../components/case/CaseImage"
import heroStyles from "../components/case/CaseHero.module.scss"
import s from "../components/case/case.module.scss"

export const PulkovoPage = () => {
  return (
    <CaseLayout>
      <CaseHero
        date="01.2021 - 12.2022"
        title={<>Airport Resource Management System.{"\u00A0"}Timeliner</>}
        coverClassName={heroStyles.coverPulkovo}
      />

      {/* About project */}
      <SectionBlock>
        <TwoColumn
          left={
            <div className={`${s.vflex} ${s.gap32}`}>
              <div>
                <p className={s.uppercaseText}>About project</p>
                <h3 className={s.h5}>
                  The Airport Resource Management System (RMS) is being
                  developed to improve airport operations due to more passengers
                  and strict requirements from airlines and the government.
                </h3>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <div className={s.vflex}>
                  <p className={s.uppercaseText}>Users:</p>
                  <h4 className={s.h6}>4,000 employees</h4>
                  <p className={s.paragraph}>with different access levels</p>
                </div>
                <div className={s.vflex}>
                  <p className={s.uppercaseText}>Future plan:</p>
                  <h4 className={s.h6}>Expansion</h4>
                  <p className={s.paragraph}>More departments and users</p>
                </div>
              </div>
            </div>
          }
          right={
            <div className={`${s.vflex} ${s.gap32}`}>
              <div>
                <p className={s.uppercaseText}>Project objective</p>
                <p className={s.paragraph}>
                  The aim is to improve airport operations and transparency. The
                  system will help the airport plan and manage its resources
                  better.
                </p>
              </div>
              <div>
                <p className={s.uppercaseText}>The team</p>
                <p className={s.paragraph}>
                  1 Solo Designer, 6 Engineers, 8 Analysts, 2 Project Managers,
                  and other professionals from internal and external sources.
                </p>
              </div>
              <div>
                <p className={s.uppercaseText}>MY role</p>
                <p className={s.paragraph}>
                  I joined the team a year into the project's development. My
                  role was to dive into the project, establish design processes,
                  enhance user interaction, and address issues. I also
                  contributed to developing new system sections.
                </p>
              </div>
            </div>
          }
        />
      </SectionBlock>

      {/* Research */}
      <SectionBlock>
        <h2 className={s.h4}>Research</h2>
        <TwoColumn
          left={
            <p className={s.paragraph}>
              I base my work on personal experience. Recognizing the need for
              specific expertise in airport dispatching product development, I
              conducted comparative analysis. After convincing stakeholders, I
              gained access to direct users of the timeliner: dispatchers of
              technical units and human resources. They manage equipment units
              and personnel, providing insights into their work conditions,
              current tools, conveniences, and decision-making processes.{" "}
              <strong>
                This Field research yielded valuable information and formed key
                hypotheses.
              </strong>
            </p>
          }
          right={
            <p className={s.paragraph}>
              Initially, dispatchers used multiple systems, resulting in
              multitasking across numerous screens. Yet,{" "}
              <strong>
                they operate in an information-rich environment, accessing
                tooltips, receiving information via radio and phone, and
                collaborating with peers.
              </strong>{" "}
              Engaging them without disrupting workflow was crucial. Factors
              like screen characteristics and room lighting also influenced the
              process.
            </p>
          }
        />
        <CaseImage
          src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5ccb58e6e264cb91cc8ab_01.png"
          alt="Research"
        />
      </SectionBlock>

      {/* Half-Low-Fidelity Designs */}
      <SectionBlock>
        <TwoColumn
          left={
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5d6a61beb2a11689166d0_02.png"
              alt="Low-fidelity designs"
            />
          }
          right={
            <div className={s.vflex}>
              <h2 className={s.h4}>Half-Low-Fidelity Designs</h2>
              <p className={s.paragraph}>
                The developers had already incorporated the Bulma component
                library, shaping most user scenario screens, like tables or
                pop-up windows, from the outset. However, the timeliner began
                with a simplified design, presenting minimal information. The
                forthcoming chapter showcases the final timeline screens,
                portraying a more realistic amount of displayed information.
              </p>
            </div>
          }
        />
        <CaseImage
          src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5d6a762c0d7f4028ad7fd_03.png"
          alt="Low-fidelity wireframes"
        />
      </SectionBlock>

      {/* High-Fidelity Designs */}
      <SectionBlock>
        <div className={`${s.vflex} ${s.gap56}`}>
          <div>
            <h2 className={s.h4}>High-Fidelity Designs</h2>
            <TwoColumn
              left={
                <p className={s.paragraph}>
                  The business aimed to maximize information display on the
                  timeliner and admired the solution our Turkish colleagues
                  implemented. However, it wasn't suitable for Pulkovo even with
                  customization. Still, we used their approach as a reference
                  for information display.
                </p>
              }
              right={
                <p className={s.paragraph}>
                  <strong>
                    Furthermore, the timeliner acts like a traffic light: red
                    signals a problem, yellow suggests attention, and green
                    indicates everything is fine.
                  </strong>{" "}
                  Additionally, elements and tasks currently in focus are
                  highlighted, while those needing less immediate attention
                  appear semi-transparent.
                </p>
              }
            />
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5d6a71566b922478a8df5_04.png"
              alt="High-fidelity timeliner"
            />
          </div>

          <div className={`${s.vflex} ${s.gap24}`}>
            <h3 className={s.h5}>Timeline customization</h3>
            <p className={s.paragraph}>
              The timeliner offers customization settings, granting users
              options like choosing a dark theme or adjusting the zoom level.
              These settings provide flexibility and enable users to personalize
              their experience with the timeliner.
            </p>
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5d6a7201251d291a25a11_05.png"
              alt="Timeline customization light"
            />
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5d6a7ab015425dd4bb7bc_06.png"
              alt="Timeline customization dark"
            />
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5d6a7e3854b0ccfbc88ba_07.png"
              alt="Timeline zoom levels"
            />
          </div>

          <div className={`${s.vflex} ${s.gap24}`}>
            <h3 className={s.h5}>Other states and screens</h3>
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5d6aa17ad9a70d359b27c_08.png"
              alt="Drag and drop a task to another employee"
              caption="Drag and drop a task to another employee"
            />
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5d6a8609ac9326e953ca3_09.png"
              alt="Shift planning light theme"
              caption="Shift planning. Light theme"
            />
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5d6a8c04ed8dbfea760eb_10.png"
              alt="Shift planning dark theme"
              caption="Shift planning. Dark theme"
            />
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5d6a82d408f05fcf055cc_11.png"
              alt="Right drawer with flight information"
              caption="Right drawer with flight information."
            />
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5d6a9f32aeb74ed4e408e_12.png"
              alt="Additional states"
            />
          </div>
        </div>
      </SectionBlock>

      {/* Details */}
      <SectionBlock>
        <h2 className={s.h4}>Details</h2>
        <TwoColumn
          left={
            <p className={s.paragraph}>
              My role in the project was diverse, as the system was extensive in
              scope. However, the most significant and interesting work was done
              on the timeliner, as it is one of the primary tools used for
              managing the airport. Other sections were also designed for
              detailed scenario development, but many of them presented as
              tables, so I will not delve into them extensively in this case.
            </p>
          }
          right={
            <p className={s.paragraph}>
              Certainly, we didn't design all the states directly on the
              timeliner. Instead, various states were created separately, and
              documentation was prepared collaboratively with analysts using
              these components. This method facilitated a more systematic and
              comprehensive understanding of the different states and their
              interactions within the timeliner.
            </p>
          }
        />
        <div className={`${s.vflex} ${s.gap24}`}>
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5d6a9ea7cc03c1f192da1_13.png"
            alt="Component details"
          />
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e5d6a95c163d696e1e6d7c_14.png"
            alt="Component documentation"
          />
        </div>
      </SectionBlock>

      {/* Reflections */}
      <SectionBlock>
        <h2 className={s.h4}>Reflections</h2>
        <TwoColumn
          left={
            <p className={s.paragraph}>
              <strong>Collaboration and Communication are vital:</strong> Close
              collaboration with team members, analysts, developers, and airport
              staff ensured a shared understanding and successful project
              outcomes. Clear communication and documentation were crucial
              throughout the process, enabling us to reach project goals and
              allowing me to find approaches for conducting field research.
            </p>
          }
          right={
            <p className={s.paragraph}>
              <strong>Valuable lessons learned:</strong> The project provided
              valuable insights into complex project and software development
              for the airport, emphasizing the importance of adaptability,
              communication, and documentation for future projects.
              Additionally, involving stakeholders early on and sharing insights
              with them and the team facilitated a deeper understanding of the
              project. Moreover, it helped increase user loyalty because they
              were involved in our process.
            </p>
          }
        />
      </SectionBlock>
    </CaseLayout>
  )
}
