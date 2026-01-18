"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Trophy, Users, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface LandingPageProps {
    notices: { id: number; content: string; active: boolean; imageUrl?: string | null }[]
    events: { id: number; title: string; description: string; date: Date; location: string; imageUrl?: string | null }[]
}

export default function LandingPage({ notices, events }: LandingPageProps) {
    const activeNotices = notices.filter(n => n.active)
    const displayNotices = activeNotices.length > 0
        ? activeNotices
        : [{ id: 0, content: "Welcome to the IEEE Innovation Hackathon! Register now to secure your spot.", active: true, imageUrl: null }]

    const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0)

    useEffect(() => {
        if (displayNotices.length <= 1) return
        const timer = setInterval(() => {
            setCurrentNoticeIndex((prev) => (prev + 1) % displayNotices.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [displayNotices.length])

    const nextNotice = () => setCurrentNoticeIndex((prev) => (prev + 1) % displayNotices.length)
    const prevNotice = () => setCurrentNoticeIndex((prev) => (prev - 1 + displayNotices.length) % displayNotices.length)

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-grow flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-blue-400 font-bold tracking-widest uppercase mb-4 text-sm md:text-base">IEEE Computer Society & SYP Activities</h2>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 glow-text">
                            INNOVATE . BUILD . WIN
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Build the Future: IEEE Innovation Hackathon <br />
                            <span className="text-base text-gray-400 mt-2 block">Smart sustainable solution for everyday life. Join us for a day of high-impact problem-solving with AI.</span>
                        </p>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
                            <Link href="/register">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-blue-900/50">
                                    Register Now
                                </Button>
                            </Link>
                            <Link href="#about">
                                <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-blue-500/30 hover:bg-blue-900/20 text-blue-200">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Notices Slideshow */}
                    <div className="relative w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden min-h-[120px] md:min-h-[160px] flex items-center mb-8">
                        <div className="absolute left-2 z-20">
                            <button onClick={prevNotice} className="p-2 text-white/50 hover:text-white transition-colors"><ChevronLeft /></button>
                        </div>
                        <div className="absolute right-2 z-20">
                            <button onClick={nextNotice} className="p-2 text-white/50 hover:text-white transition-colors"><ChevronRight /></button>
                        </div>

                        <div className="w-full h-full p-6 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentNoticeIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col md:flex-row items-center gap-6 w-full max-w-3xl"
                                >
                                    {displayNotices[currentNoticeIndex].imageUrl && (
                                        <img
                                            src={displayNotices[currentNoticeIndex].imageUrl!}
                                            alt="Notice"
                                            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg border border-white/10 shadow-lg"
                                        />
                                    )}
                                    <div className="text-center md:text-left flex-1">
                                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-blue-400 font-bold uppercase tracking-wider text-xs">
                                            <AlertCircle className="w-4 h-4" /> Notice
                                        </div>
                                        <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                                            {displayNotices[currentNoticeIndex].content}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section id="events" className="py-20 bg-black/50 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500 mb-12 text-center">Upcoming Events</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div key={event.id} className="group bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
                                {event.imageUrl ? (
                                    <div className="h-48 overflow-hidden">
                                        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ) : (
                                    <div className="h-48 bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center">
                                        <Calendar className="w-12 h-12 text-white/20" />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-blue-400 px-2 py-1 bg-blue-900/30 rounded uppercase tracking-wider">Event</span>
                                        <span className="text-xs text-gray-400 flex items-center"><Calendar className="w-3 h-3 mr-1" /> {new Date(event.date).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{event.description}</p>
                                    <div className="flex items-center text-gray-500 text-xs gap-4">
                                        <span className="flex items-center"><Users className="w-3 h-3 mr-1" /> IEEE</span>
                                        <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {event.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {events.length === 0 && (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                <p>More events coming soon. Stay tuned!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* About / Flyer Info */}
            <section id="about" className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6">Event Details</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Calendar className="w-6 h-6 text-blue-500 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-white">March 28</h3>
                                        <p className="text-gray-400">08:00 AM (24 HRS)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-blue-500 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-white">Student Center</h3>
                                        <p className="text-gray-400">University of Bridgeport</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Users className="w-6 h-6 text-blue-500 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-white">Eligibility</h3>
                                        <ul className="text-gray-400 list-disc ml-5 mt-1">
                                            <li>Team size 1-4 players</li>
                                            <li>Enrolled in university in the United States</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-1 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 glow-box">
                            <div className="bg-black/80 rounded-xl p-8 h-full backdrop-blur-sm border border-white/10">
                                <h3 className="text-2xl font-bold text-white mb-4">Theme</h3>
                                <p className="text-xl text-blue-300 font-light italic">"Powering AI-Driven Community in Connecticut"</p>
                                <p className="mt-4 text-gray-400">
                                    Food & accommodation will be provided. Join us to innovate with AI!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prizes Section */}
            <section className="py-20 bg-gradient-to-b from-black to-blue-950/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-12 flex items-center justify-center gap-3">
                        <Trophy className="text-yellow-500" /> Awards
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:scale-105 transition-transform">
                            <div className="text-4xl font-bold text-gray-400 mb-2">2nd</div>
                            <div className="text-2xl font-bold text-white mb-4">$1000</div>
                            <div className="text-sm text-gray-500">Runner Up</div>
                        </div>
                        <div className="p-8 bg-blue-900/20 border border-blue-500/50 rounded-xl transform scale-110 shadow-xl shadow-blue-900/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-bl-lg">WINNER</div>
                            <div className="text-5xl font-bold text-yellow-400 mb-2">1st</div>
                            <div className="text-3xl font-bold text-white mb-4">$1500</div>
                            <div className="text-sm text-blue-200">Grand Prize</div>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:scale-105 transition-transform">
                            <div className="text-4xl font-bold text-yellow-700 mb-2">3rd</div>
                            <div className="text-2xl font-bold text-white mb-4">$750</div>
                            <div className="text-sm text-gray-500">Second Runner Up</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sponsors */}
            <section id="sponsors" className="py-20 bg-black border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-400 mb-8 uppercase tracking-widest">Powered By</h2>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholders for logos - text for now */}
                        <div className="text-2xl font-bold text-white">IEEE</div>
                        <div className="text-xl font-bold text-white">University of Bridgeport</div>
                        <div className="text-xl font-bold text-white">SGA</div>
                    </div>
                    <div className="mt-12">
                        <p className="text-gray-500 text-sm">Contact Details : psuresh@my.bridgeport.edu</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
