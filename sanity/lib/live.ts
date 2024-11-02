import { defineLive } from "next-sanity"
import { client } from "./client"
import "server-only"


export const { sanityFetch, SanityLive } = defineLive({ client })