"use client"

import * as z from "zod"

const searchValidation = z.object({
  searchString: z.string().min(2, {message: 'too short'}).max(20, {message: 'too large'}),
})

export default searchValidation
