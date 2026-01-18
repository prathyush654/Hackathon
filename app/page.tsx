import LandingPage from "@/components/LandingPage"
import { getNotices, getEvents } from "@/app/actions/admin"

export const dynamic = 'force-dynamic'

export default async function Page() {
  const [notices, events] = await Promise.all([
    getNotices(),
    getEvents()
  ])

  return <LandingPage notices={notices} events={events} />
}
