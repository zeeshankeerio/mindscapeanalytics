"use client"

import { z } from "zod"

export const formSchema = z.object({
  Name: z.string().min(2).max(50),
  Email: z.string().email(),
  Message: z.string().min(10).max(500),
})
