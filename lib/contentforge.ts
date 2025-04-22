export interface ContentGenerationParams {
  contentType: "blog" | "social" | "email" | "ad"
  topic: string
  keywords?: string
  tone?: string
}

export async function generateContent(params: ContentGenerationParams) {
  try {
    const response = await fetch("/api/contentforge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error("Failed to generate content")
    }

    const data = await response.json()
    return data.content
  } catch (error) {
    console.error("Error generating content:", error)
    throw error
  }
} 