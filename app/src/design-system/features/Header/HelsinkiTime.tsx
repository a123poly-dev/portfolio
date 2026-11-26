import { useEffect, useState } from "react"

// Local time in Helsinki as "21.52", ticking over on each new minute
const format = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Helsinki",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(":", ".")

export const HelsinkiTime = () => {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let timer: number
    const schedule = () => {
      const msToNextMinute = 60_000 - (Date.now() % 60_000)
      timer = window.setTimeout(() => {
        setNow(new Date())
        schedule()
      }, msToNextMinute + 50)
    }
    schedule()
    return () => window.clearTimeout(timer)
  }, [])

  return <time dateTime={now.toISOString()}>{format(now)}</time>
}
