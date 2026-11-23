import { CaseFigure } from "../../components/case/synthux"
import { SynthuxCasePage } from "./SynthuxCasePage"
import reportImg from "../assets/synthux/case-1/hifi-4-1.webp"

// Case 1. The body is built in step 2.
export const SynthuxEndToEndPage = () => (
  <SynthuxCasePage
    caseKey="endToEnd"
    cover={
      <CaseFigure
        src={reportImg}
        alt="SynthUX Report screen with the results of a finished test run"
        width={1440}
        height={1100}
        priority
      />
    }
  />
)
