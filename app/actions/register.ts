"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function registerTeam(formData: FormData) {
    const teamName = formData.get("teamName") as string
    const email = formData.get("email") as string
    const university = formData.get("university") as string
    const members = formData.get("members") as string

    if (!teamName || !email || !university) {
        return { success: false, message: "Missing required fields" }
    }

    try {
        await prisma.registration.create({
            data: {
                teamName,
                email,
                university,
                members, // Stored as plain string for now (comma separated or JSON)
            },
        })

        // In a real app, send email confirmation here

        return { success: true, message: "Registration successful!" }
    } catch (error) {
        console.error("Registration error:", error)
        return { success: false, message: "Something went wrong. Please try again." }
    }
}
