import LandingPage from "@/components/LandingPage"
import { notices, events } from "@/lib/data"



export default function Page() {
  return <LandingPage notices={notices} events={events} />
}
