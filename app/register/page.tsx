"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { registerTeam } from "@/app/actions/register"
import { motion } from "framer-motion"

export default function RegisterPage() {
    const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)
        setStatus(null)

        const formData = new FormData(event.currentTarget)
        const result = await registerTeam(formData)

        setStatus(result)
        setIsSubmitting(false)

        if (result.success) {
            event.currentTarget.reset()
        }
    }

    return (
        <div className="min-h-screen pt-20 pb-10 flex items-center justify-center bg-black bg-grid-white/[0.02]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
            >
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-2 text-center">
                    Register Team
                </h1>
                <p className="text-gray-400 text-center mb-8">Join the IEEE Innovation Hackathon</p>

                {status && (
                    <div className={`mb-6 p-4 rounded-lg text-sm text-center ${status.success ? "bg-green-500/20 text-green-300 border border-green-500/50" : "bg-red-500/20 text-red-300 border border-red-500/50"}`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Team Name</label>
                        <Input name="teamName" placeholder="e.g. Logic Legends" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Contact Email</label>
                        <Input name="email" type="email" placeholder="leader@university.edu" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">University</label>
                        <Input name="university" placeholder="University of Bridgeport" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Team Members</label>
                        <Input name="members" placeholder="Name 1, Name 2, Name 3, Name 4" required />
                        <p className="text-xs text-gray-500">Enter names separated by commas (Max 4)</p>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                        {isSubmitting ? "Registering..." : "Submit Registration"}
                    </Button>
                </form>
            </motion.div>
        </div>
    )
}
