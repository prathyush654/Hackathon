import { cookies } from "next/headers"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { adminLogin, adminLogout, getNotices, getRegistrations, addNotice, toggleNotice, addEvent, getEvents } from "@/app/actions/admin"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function AdminPage() {
    const session = cookies().get("admin_session")
    const isLoggedIn = session && session.value === "true"

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-black">
                <div className="w-full max-w-sm p-6 bg-zinc-900 border border-white/10 rounded-xl">
                    <h1 className="text-2xl font-bold text-white mb-4">Admin Login</h1>
                    <form action={async (formData) => {
                        "use server"
                        const result = await adminLogin(formData)
                        if (result.success) {
                            redirect("/admin")
                        }
                    }} className="space-y-4">
                        <Input name="passcode" type="password" placeholder="Enter Passcode" required />
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                </div>
            </div>
        )
    }

    const [registrations, notices, events] = await Promise.all([
        getRegistrations(),
        getNotices(),
        getEvents()
    ])

    return (
        <div className="min-h-screen pt-20 pb-10 px-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <form action={async () => {
                    "use server"
                    await adminLogout()
                    redirect("/admin")
                }}>
                    <Button variant="outline" type="submit">Logout</Button>
                </form>
            </div>

            <div className="space-y-8">
                {/* Registrations Section */}
                <section className="bg-zinc-900/50 border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-blue-400 mb-4">Registrations ({registrations.length})</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-200 uppercase bg-black/50">
                                <tr>
                                    <th className="px-4 py-3">Team</th>
                                    <th className="px-4 py-3">Contact</th>
                                    <th className="px-4 py-3">Members</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map((reg) => (
                                    <tr key={reg.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="px-4 py-3 font-medium text-white">{reg.teamName}</td>
                                        <td className="px-4 py-3">{reg.email}<br /><span className="text-xs opacity-50">{reg.university}</span></td>
                                        <td className="px-4 py-3 max-w-xs truncate">{reg.members}</td>
                                    </tr>
                                ))}
                                {registrations.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-3 text-center opacity-50">No registrations yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Notices Section */}
                    <section className="bg-zinc-900/50 border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-purple-400 mb-4">Manage Notices</h2>

                        <form action={async (formData) => {
                            "use server"
                            await addNotice(formData)
                        }} className="mb-6 space-y-2 p-4 bg-black/30 rounded-lg border border-white/5">
                            <Textarea name="content" placeholder="New notice content..." required />
                            <Input name="image" type="file" accept="image/*" className="text-xs bg-black/50" />
                            <Button type="submit" size="sm">Add Notice</Button>
                        </form>

                        <div className="space-y-3 max-h-[400px] overflow-y-auto">
                            {notices.map((notice) => (
                                <div key={notice.id} className="flex flex-col gap-2 p-3 bg-black/30 rounded border border-white/5">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className={`text-sm ${!notice.active && "opacity-50 line-through"} text-gray-300`}>{notice.content}</p>
                                            {notice.imageUrl && (
                                                <img src={notice.imageUrl} alt="Notice" className="mt-2 h-16 w-auto rounded object-cover opacity-80" />
                                            )}
                                        </div>
                                        <form action={async () => {
                                            "use server"
                                            await toggleNotice(notice.id, notice.active)
                                        }}>
                                            <Button variant="ghost" size="sm" type="submit" className={notice.active ? "text-green-500" : "text-red-500"}>
                                                {notice.active ? "Active" : "Hidden"}
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Events Section */}
                    <section className="bg-zinc-900/50 border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-pink-400 mb-4">Manage Events</h2>

                        <form action={async (formData) => {
                            "use server"
                            await addEvent(formData)
                        }} className="mb-6 space-y-3 p-4 bg-black/30 rounded-lg border border-white/5">
                            <Input name="title" placeholder="Event Title" required />
                            <Textarea name="description" placeholder="Description" required />
                            <div className="grid grid-cols-2 gap-2">
                                <Input name="time" type="datetime-local" className="text-gray-400" required />
                                <Input name="location" placeholder="Location" required />
                            </div>
                            <Input name="image" type="file" accept="image/*" className="bg-black/50" />
                            <Button type="submit" size="sm">Add Event</Button>
                        </form>

                        <div className="space-y-3 max-h-[400px] overflow-y-auto">
                            {events.map((event) => (
                                <div key={event.id} className="p-3 bg-black/30 rounded border border-white/5">
                                    <h3 className="font-bold text-white">{event.title}</h3>
                                    <p className="text-xs text-gray-400">{new Date(event.date).toLocaleString()} @ {event.location}</p>
                                    <p className="text-sm text-gray-300 mt-1 line-clamp-2">{event.description}</p>
                                    {event.imageUrl && (
                                        <img src={event.imageUrl} alt={event.title} className="mt-2 h-20 w-full object-cover rounded opacity-80" />
                                    )}
                                </div>
                            ))}
                            {events.length === 0 && <p className="text-gray-500 text-sm">No events added.</p>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

