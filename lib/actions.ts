"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils"
import slugify from "slugify"
import { writeClient } from "@/sanity/lib/write-client"

export const createPitch = async (
    state: any,
    form: FormData,
    pitch: string
) => {
    const session = await auth()

    if (!session) {
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR"
        })
    }

    const { title, description, category, link, userVisits } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch')
        // Object.entries(form).filter(([key]) => key !== 'pitch') {we can also do it like this}
    )

    const formVals = Object.fromEntries(form)
    // console.log(formVals)

    const slug = slugify(title as string, {lower: true, strict: true})

    // Ensure userVisits is an array of strings
    const userVisitsArray = typeof userVisits === 'string' ? JSON.parse(userVisits) : []

    const updatedUserVisits = userVisitsArray.includes(session.id) ? userVisits : [...userVisitsArray, session.id]

    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug
            },
            author: {
                _type: "reference",
                _ref: session?.id
            },
            pitch,
            views: 1,
            userVisits: updatedUserVisits
        }

        console.log("Startup details: ", startup)

        const result = await writeClient.create({
            _type: "startup",
            ...startup
        })

        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS"
        })

    } catch (error) {
        console.log(error)

        return parseServerActionResponse({
            error: error,
            status: "ERROR"
        })
    }
}