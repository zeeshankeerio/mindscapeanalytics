"use client"

import { useEffect, useState } from "react"

export default function FormattedDate({ dateString }: { dateString: string }) {
  const [formattedDate, setFormattedDate] = useState<string>("")

  useEffect(() => {
    setFormattedDate(
      new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    )
  }, [dateString])

  return <time dateTime={dateString}>{formattedDate}</time>
}
