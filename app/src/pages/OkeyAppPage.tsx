import { CaseLayout } from "../components/case/CaseLayout"
import { SectionBlock } from "../components/case/SectionBlock"
import { TwoColumn } from "../components/case/TwoColumn"
import { CaseImage } from "../components/case/CaseImage"
import { VideoEmbed } from "../components/case/VideoEmbed"
import styles from "../components/case/case.module.scss"

export const OkeyAppPage = () => (
  <CaseLayout>
    {/* Hero */}
    <SectionBlock>
      <div className={styles.mt56} />
      <p className={styles.paragraph} style={{ marginBottom: "4px" }}>
        09.2019 - 12.2021
      </p>
      <h1
        style={{
          fontFamily: "var(--font-family-2)",
          color: "var(--black)",
          fontSize: "49px",
          lineHeight: "120%",
          marginBottom: "40px",
        }}
      >
        New mobile app for food retailer &quot;O&apos;key&quot;
      </h1>

      <CaseImage
        src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d56046e7c8df4c80ef2b_01.png"
        alt="O'key mobile app cover"
      />

      <h3 className={styles.h5} style={{ marginTop: "40px" }}>
        O&apos;KEY Group is a major Russian supermarket chain with stores in
        cities across the country. Since O&apos;KEY was planning to transition
        to a microservice architecture to ensure high speed and fault tolerance
        of systems, this was an excellent opportunity to completely redesign the
        mobile application to improve the user experience.
      </h3>

      {/* Metrics */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <p className={styles.uppercaseText}>Date of launch:</p>
          <h4 className={styles.h6Red}>March 2021</h4>
          <p className={styles.paragraph}>
            New mobile app updated on App store &amp; Play Market.
          </p>
        </div>
        <div className={styles.metricCard}>
          <p className={styles.uppercaseText}>New rating:</p>
          <h4 className={styles.h6Red}>4.7 in 2022</h4>
          <p className={styles.paragraph}>The old rating was 3,5 in 2019</p>
        </div>
        <div className={styles.metricCard}>
          <p className={styles.uppercaseText}>Orders from app:</p>
          <h4 className={styles.h6Red}>Over 47%</h4>
          <p className={styles.paragraph}>From annual report 2020</p>
        </div>
      </div>
    </SectionBlock>

    {/* Project info */}
    <SectionBlock>
      <TwoColumn
        left={
          <div>
            <p className={styles.uppercaseText}>Project objective</p>
            <p className={styles.paragraph}>
              O&apos;KEY aims to redesign its app to cater to the diverse needs
              of customers across different cities while maintaining a
              consistent user experience. This includes integrating offline and
              online shopping experiences seamlessly, ensuring the app can
              handle high user loads without performance issues, and enhancing
              customer satisfaction through personalized shopping
              recommendations and deals.
            </p>
          </div>
        }
        right={
          <div className={`${styles.vflex} ${styles.gap32}`}>
            <div>
              <p className={styles.uppercaseText}>My role</p>
              <p className={styles.paragraph}>
                I estimated project workload, collaborated with engineers,
                conducted research, and made decisions. I presented solutions,
                coordinated layout approvals, and ensured creative alignment.
                After launch, I maintained layout updates and supported both
                website and app development.
              </p>
            </div>
            <div>
              <p className={styles.uppercaseText}>The team</p>
              <p className={styles.paragraph}>
                The project involved a diverse team consisting of a solo
                designer, 10+ engineers with a team lead, 1 analyst, 1 project
                managers, 4+ testers.
              </p>
            </div>
          </div>
        }
      />
    </SectionBlock>

    {/* Research */}
    <SectionBlock>
      <h2 className={styles.h4}>Research</h2>
      <CaseImage
        src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55d3f3a95657ceeed62_02.png"
        alt="Customer Journey Map"
        caption="CJM have created before starting project"
      />
      <div className={styles.mt40} />
      <TwoColumn
        left={
          <div>
            <h3 className={styles.h5}>Research Phase Challenges</h3>
            <p className={styles.paragraph}>
              Convincing the client of the research's necessity was challenging.
              We worked with limited resources and respondents, mainly using
              internal company resources.{" "}
              <strong>
                I analyzed the old app, collected user feedback from sources
                like app store reviews, articles, and surveyed current and new
                users.
              </strong>{" "}
              This formed a Customer Journey Map with potential solutions. The
              marketing team found this tool valuable for pitching to the
              client.
            </p>
          </div>
        }
        right={
          <div>
            <CaseImage
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55dd6d587f67ecf6b08_03.png"
              alt="Old app version since 2015"
              caption="Version since 2015"
            />
          </div>
        }
      />
    </SectionBlock>

    {/* Dividing Screen */}
    <SectionBlock>
      <TwoColumn
        left={
          <div className={`${styles.vflex} ${styles.gap32}`}>
            <h2 className={styles.h4}>Dividing screen</h2>
            <div>
              <h3 className={styles.h5}>Omnichannel Integration.</h3>
              <p className={styles.paragraph}>
                The company decided to merge new offline features for O&apos;KEY
                hypermarkets into the existing online shopping app instead of
                creating a separate one. This choice was made because the new
                features were unique and not offered by competitors.
              </p>
            </div>
            <div>
              <h3 className={styles.h5}>Omnichannel Integration.</h3>
              <p className={styles.paragraph}>
                Explaining the concept of offline functionality, only available
                in the store, proved challenging as online shopping is already
                familiar to users. To ease into it, we took a small step.
                O&apos;KEY had paper catalogs that users could access as PDFs on
                the app or website. We separated these products, allowing users
                to create lists specific to a hypermarket, track availability,
                prices, and view current promotions.
              </p>
              <p className={styles.paragraph}>
                In the future, this offline functionality may expand to display
                all products available in a specific store, search for items or
                sections, and navigate routes and so on.
              </p>
            </div>
          </div>
        }
        right={
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e7894c84a63ca700287ca2_02_1.png"
            alt="Dividing screen concept"
          />
        }
      />
      <CaseImage
        src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e7894ae29d143b915b3739_02_2.png"
        alt="Dividing screen designs"
      />
    </SectionBlock>

    {/* Usability Study */}
    <SectionBlock>
      <TwoColumn
        left={
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55f421289816f0ab990_04.png"
            alt="Usability study"
          />
        }
        right={
          <div>
            <h3 className={styles.h5}>Usability study</h3>
            <p className={styles.paragraph}>
              Initially, we had only two design options for the dividing screen
              based on the client's needs. A quick the Hallway testing showed
              that it's challenging even for our office staff. To address this,
              I created more versions. With our analyst, we formed a focus
              group.{" "}
              <strong>
                Through iterative testing, we examined eight scenarios, refining
                our approach until we found the version that aligned with our
                audience and met the client's needs.
              </strong>
            </p>
          </div>
        }
      />
    </SectionBlock>

    {/* Prototype Video */}
    <SectionBlock>
      <div className={styles.prototypeSection}>
        <h2 className={styles.headingCenter}>
          Let&apos;s see the video of dividing screen
        </h2>
        <VideoEmbed vimeoId="919800181" width={580} height={722} />
        <a
          href="https://www.figma.com/proto/Gz0JIOLVHoHspjLYUklk1U/Portfolio-2019-22?page-id=811%3A33659&type=design&node-id=811-37622&viewport=588%2C387%2C0.08&t=z4l4noC8BJjdBngM-1&scaling=scale-down&starting-point-node-id=811%3A37622&mode=design"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Prototype link in Figma
        </a>
      </div>
    </SectionBlock>

    {/* High-Fidelity Designs */}
    <SectionBlock>
      <h2 className={styles.h4}>High-Fidelity Designs of app</h2>
      <TwoColumn
        left={
          <p className={styles.paragraph}>
            Each scenario was individually reviewed and approved by O&apos;KEY
            representatives. We created three component libraries: core
            components (like logos and colors), iOS, and Android.
            <br />
            <br />
            Initially, the client hesitated to invest time in their own
            component libraries. However, during the final layout approval
            process, I could quickly make changes right in front of them, such
            as rearranging content blocks.{" "}
            <strong>
              This greatly reduced approval time, and the client appreciated the
              usefulness of the component libraries.
            </strong>
          </p>
        }
        right={
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55c4c80d0d902635b48_06.png"
            alt="Component libraries"
          />
        }
      />
    </SectionBlock>

    {/* Hi-fi screens */}
    <SectionBlock>
      <div className={`${styles.vflex} ${styles.gap56}`}>
        <div>
          <h3 className={styles.h5}>
            Main screen of online shop &amp; offline functionality
          </h3>
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55feacc0e64c601b81a_07.png"
            alt="Main screen"
          />
        </div>
        <div>
          <h3 className={styles.h5}>Booking a delivery time in advance</h3>
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d562f426f043548f056a_08.png"
            alt="Booking delivery"
          />
        </div>
        <div>
          <h3 className={styles.h5}>Login &amp; Sign up</h3>
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55e3c418fcfa367d207_09.png"
            alt="Login"
          />
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55ed97c9b1a685b5df7_10.png"
            alt="Sign up"
          />
        </div>
        <div>
          <h3 className={styles.h5}>Catalog. Different type of products</h3>
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55ffb4555c9c6b92779_11.png"
            alt="Catalog"
          />
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55e0cdf353667d089b3_12.png"
            alt="Product types"
          />
        </div>
        <div>
          <h3 className={styles.h5}>
            My goods. Favorites &amp; Shopping lists
          </h3>
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55f8ae2fbad54f50ee4_13.png"
            alt="Favorites"
          />
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55eeacc0e64c601b70d_14.png"
            alt="Shopping lists"
          />
        </div>
        <div>
          <h3 className={styles.h5}>Cart with personal discounts</h3>
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55e1cfc3a7a94fc353b_15.png"
            alt="Cart"
          />
        </div>
        <div>
          <h3 className={styles.h5}>Profile</h3>
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55e58c1180ab11ceccf_16.png"
            alt="Profile"
          />
        </div>
        <div>
          <h3 className={styles.h5}>My orders</h3>
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55e91bab8e99c68df5e_17.png"
            alt="My orders"
          />
        </div>
        <div>
          <h3 className={styles.h5}>Personal discount</h3>
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55ed36247b6a37f5df1_18.png"
            alt="Personal discount"
          />
        </div>
        <div>
          <h3 className={styles.h5}>Statistics</h3>
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55e395078c0e43217db_19.png"
            alt="Statistics"
          />
        </div>
        <div>
          <h3 className={styles.h5}>Help &amp; Onbordings</h3>
          <CaseImage
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55f27a3bbe0191c28d1_20.png"
            alt="Help and onboarding"
          />
        </div>
      </div>
    </SectionBlock>
  </CaseLayout>
)
