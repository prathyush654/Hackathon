"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function RegisterPage() {
    return (
        <div className="min-h-screen pt-20 pb-10 flex items-center justify-center bg-black bg-grid-white/[0.02]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl text-center"
            >
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                    Register Team
                </h1>
                <p className="text-gray-400 mb-8">Join the IEEE Innovation Hackathon</p>

                <div className="space-y-6">
                    <p className="text-gray-300">
                        Registration for this event is handled via Google Forms. Please click the button below to register your team.
                    </p>

                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6">
                        <Link href="https://forms.google.com/your-form-url" target="_blank" rel="noopener noreferrer">
                            Go to Registration Form
                        </Link>
                    </Button>

                    <p className="text-xs text-gray-500 mt-4">
                        If you have any issues, please contact us at <a href="mailto:support@example.com" className="underline text-blue-400">support@example.com</a>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
