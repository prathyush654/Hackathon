import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            IEEE Hackathon
                        </span>
                        <p className="text-gray-400 text-sm mt-1">
                            Innovate. Build. Win.
                        </p>
                    </div>
                    <div className="flex space-x-6">
                        <Link href="#" className="text-gray-400 hover:text-white text-sm">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-white text-sm">
                            Terms of Service
                        </Link>
                        <Link href="/admin" className="text-gray-600 hover:text-gray-400 text-sm">
                            Admin Login
                        </Link>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} IEEE Student Chapter. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
