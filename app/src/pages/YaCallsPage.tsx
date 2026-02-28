import { CaseLayout } from "../components/case/CaseLayout"
import { CaseHero } from "../components/case/CaseHero"
import { SectionBlock } from "../components/case/SectionBlock"
import { TwoColumn } from "../components/case/TwoColumn"
import { CaseImage } from "../components/case/CaseImage"
import { Heading } from "../components/Heading"
import heroStyles from "../components/case/CaseHero.module.scss"
import styles from "../components/case/case.module.scss"

export function YaCallsPage() {
  return (
    <CaseLayout>
      <CaseHero
        date="06.2019 - 09.2019"
        title="Yandex Control system hosted PBX — internal product"
        coverClassName={heroStyles.coverPbx}
      />

      {/* About project */}
      <SectionBlock>
        <TwoColumn
          left={
            <div>
              <p className={styles.uppercaseText}>About project</p>
              <p className={styles.paragraph}>
                Ya.Calls is an internal service at Yandex created specifically
                for monitoring and analyzing the entire flow of incoming calls.
                Due to the scattered nature of external call centers, various
                departments now require their own dedicated call centers.
                Ya.Calls was developed to address this need while helping the
                company save costs.
              </p>
            </div>
          }
          right={
            <div className={`${styles.vflex} ${styles.gap32}`}>
              <div>
                <p className={styles.uppercaseText}>Project objective</p>
                <ul className={styles.list}>
                  <li>
                    Develop and launch a Minimum Viable Product (MVP) version.
                  </li>
                  <li>
                    Re-use and adapt components from the Ya.Telephony (B2B)
                    project.
                  </li>
                </ul>
              </div>
              <div>
                <p className={styles.uppercaseText}>The team</p>
                <p className={styles.paragraph}>
                  The project was developed by the Ya.Telephony team, but only
                  part of the team was involved in the MVP project for Ya.Calls:
                  1 designer led by the head of B2B design department, 2
                  managers, 2 engineers.
                </p>
              </div>
            </div>
          }
        />
      </SectionBlock>

      {/* Research */}
      <SectionBlock>
        <Heading type="heading-h4" as="h2" className={styles.h4}>Research</Heading>
        <TwoColumn
          left={
            <p className={styles.paragraph}>
              Through extensive research involving operators and department
              heads familiar with external call monitoring tools at Yandex, we
              prioritized user needs, conducted comparative analysis, and
              devised an Information Architecture for the MVP of Ya.Calls.
            </p>
          }
          right={
            <p className={styles.paragraph}>
              <strong>
                Key insights revealed operators' proficiency in handling dynamic
                information and their comfort with current tool, prompting us to
                incorporate familiar patterns like dashboards and tables into
                our MVP design
              </strong>
              . This approach ensures a seamless transition and an intuitive
              user experience while meeting essential user requirements.
            </p>
          }
        />
        <CaseImage
          src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cd111eaf7a1e31195654a3_02.png"
          alt="Research"
        />
      </SectionBlock>

      {/* High-Fidelity Designs */}
      <SectionBlock>
        <Heading type="heading-h4" as="h2" className={styles.h4}>High-Fidelity Designs</Heading>
        <TwoColumn
          left={
            <p className={styles.paragraph}>
              <strong>
                In the Administrator or the supervisor role the Information
                Architecture (IA) is divided into two parts: preparation and
                working
              </strong>
              . In the preparation stage, users can add business numbers, units
              like Yandex Taxi Support, operators, and their statuses (online,
              offline, etc.), along with media files and routing configurations.
            </p>
          }
          right={
            <p className={styles.paragraph}>
              In the working phase, they use the dashboard, calls, webphone, and
              reports to manage call center operations efficiently.
            </p>
          }
        />
        <CaseImage
          src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cd19194ce3e19d9dfa800f_03.png"
          alt="Information Architecture"
        />

        <div
          className={`${styles.vflex} ${styles.gap56}`}
          style={{ marginTop: "56px" }}
        >
          <div>
            <Heading type="heading-h5" as="h3" className={styles.h5}>Simplified tables for MVP</Heading>
            <p className={styles.paragraph}>
              In this MVP version of Ya.Calls, we streamline the user experience
              by focusing solely on essential information presented in
              simplified tables.
            </p>
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cd1919f4844ba234b5da18_04.png"
              alt="Simplified tables"
            />
          </div>

          <div>
            <Heading type="heading-h5" as="h3" className={styles.h5}>Units</Heading>
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cd1919b3658c56d9ad26ea_05_1.png"
              alt="Units overview"
            />
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cd1919e2dc78a04c5572c1_05_2.png"
              alt="Units detail"
            />
          </div>

          <div>
            <Heading type="heading-h5" as="h3" className={styles.h5}>Operators</Heading>
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cd1919887f7eeb84ba85ae_06_1.png"
              alt="Operators"
            />
          </div>

          <div>
            <Heading type="heading-h5" as="h3" className={styles.h5}>Routing</Heading>
            <p className={styles.paragraph}>
              We adapted the routing functionality directly from the
              Ya.Telephony project.
            </p>
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cd19197f432918531ef0f8_07_1.png"
              alt="Routing overview"
            />
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cd19195cc5a22ac242d93b_07_2.png"
              alt="Routing detail"
            />
          </div>

          <div>
            <Heading type="heading-h5" as="h3" className={styles.h5}>Dashboard</Heading>
            <p className={styles.paragraph}>
              Initially, we intended to design a customizable and flexible
              dashboard. However, upon discussion with stakeholders, we
              determined that it would be more advantageous to utilize familiar
              patterns instead.
            </p>
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cd191ab48431250e02f97a_08_1.png"
              alt="Dashboard"
            />
          </div>

          <div>
            <Heading type="heading-h5" as="h3" className={styles.h5}>Webphone</Heading>
            <p className={styles.paragraph}>
              The Webphone functionality was adapted from the Ya.Telephony
              project to fulfill the objectives of Ya.Calls. We streamlined the
              original version and its scenarios to better align with our goals.
            </p>
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cd191acb150d278a036a10_09_1.png"
              alt="Webphone"
            />
          </div>

          <div>
            <Heading type="heading-h5" as="h3" className={styles.h5}>Calls</Heading>
            <p className={styles.paragraph}>
              The page displaying calls may seem overwhelming initially, but{" "}
              <strong>
                the primary objective on the call page is to efficiently select
                a single call through the use of filters.
              </strong>
            </p>
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cd191be498f2448cfdcb5d_10_1.png"
              alt="Calls"
            />
          </div>

          <div>
            <Heading type="heading-h5" as="h3" className={styles.h5}>Reports</Heading>
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cd191a4d1b2e4bfa518fe4_11_1.png"
              alt="Reports"
            />
          </div>
        </div>
      </SectionBlock>
    </CaseLayout>
  )
}
