"use server"

import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

const prisma = new PrismaClient()
const ADMIN_PASSCODE = "admin123" // Change this!

async function uploadFile(file: File | null): Promise<string | null> {
    if (!file || file.size === 0) return null

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const uploadDir = join(process.cwd(), "public", "uploads")

    try {
        await mkdir(uploadDir, { recursive: true })
        await writeFile(join(uploadDir, filename), buffer)
        return `/uploads/${filename}`
    } catch (error) {
        console.error("Error uploading file:", error)
        return null
    }
}

export async function adminLogin(formData: FormData) {
    const passcode = formData.get("passcode") as string
    if (passcode === ADMIN_PASSCODE) {
        cookies().set("admin_session", "true", { httpOnly: true, secure: process.env.NODE_ENV === "production" })
        return { success: true }
    }
    return { success: false, message: "Invalid passcode" }
}


export async function adminLogout() {
    cookies().delete("admin_session")
    return { success: true }
}

export async function getRegistrations() {
    return await prisma.registration.findMany({
        orderBy: { createdAt: "desc" }
    })
}

export async function addNotice(formData: FormData) {
    const content = formData.get("content") as string
    const imageFile = formData.get("image") as File

    if (!content) return { success: false }

    const imageUrl = await uploadFile(imageFile)

    await prisma.notice.create({
        data: {
            content,
            imageUrl,
            active: true
        }
    })
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
}

export async function toggleNotice(id: number, currentStatus: boolean) {
    await prisma.notice.update({
        where: { id },
        data: { active: !currentStatus }
    })
    revalidatePath("/")
    revalidatePath("/admin")
}

export async function deleteNotice(id: number) {
    await prisma.notice.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/admin")
}

export async function getNotices() {
    return await prisma.notice.findMany({
        orderBy: { createdAt: "desc" }
    })
}

export async function addEvent(formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const timeStr = formData.get("time") as string
    const location = formData.get("location") as string
    const imageFile = formData.get("image") as File

    if (!title || !description || !timeStr || !location) {
        return { success: false, message: "Missing required fields" }
    }

    const imageUrl = await uploadFile(imageFile)

    try {
        await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(timeStr),
                location,
                imageUrl
            }
        })
        revalidatePath("/")
        revalidatePath("/admin")
        return { success: true }
    } catch (error) {
        console.error("Failed to add event:", error)
        return { success: false, message: "Error adding event" }
    }
}

export async function getEvents() {
    return await prisma.event.findMany({
        orderBy: { date: "asc" }
    })
}

