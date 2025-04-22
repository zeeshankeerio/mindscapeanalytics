// API endpoints
const API_BASE_URL = "/api"

// Error handling helper
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    // Try to parse error message from response
    try {
      const errorData = await response.json()
      throw new Error(errorData.message || `Error: ${response.status}`)
    } catch (e) {
      throw new Error(`Network error: ${response.status} ${response.statusText}`)
    }
  }

  // Check if response is JSON
  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return response.json()
  }

  return response.text()
}

// Simple headers
const getHeaders = () => ({
  "Content-Type": "application/json",
})

// API methods
export const api = {
  // Vision API
  vision: {
    analyzeImage: async (imageUrl: string, options = {}) => {
      try {
        const response = await fetch(`${API_BASE_URL}/vision/analyze`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ imageUrl, ...options }),
        })
        return handleResponse(response)
      } catch (error) {
        console.error("Vision API error:", error)
        // Return mock data for demo purposes
        return {
          objects: [
            { label: "Person", confidence: 0.992, bbox: [50, 100, 200, 300] },
            { label: "Laptop", confidence: 0.987, bbox: [250, 200, 150, 100] },
            { label: "Coffee Cup", confidence: 0.943, bbox: [400, 250, 50, 75] },
          ],
          attributes: {
            scene: "Office",
            lighting: "Indoor",
            colors: ["Black", "White", "Brown"],
          },
        }
      }
    },
  },

  // NLP API
  nlp: {
    analyzeText: async (text: string, options = {}) => {
      try {
        const response = await fetch(`${API_BASE_URL}/nlp/analyze`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ text, ...options }),
        })
        return handleResponse(response)
      } catch (error) {
        console.error("NLP API error:", error)
        // Return mock data for demo purposes
        return {
          sentiment: { score: 0.87, label: "Positive" },
          entities: [
            { text: "AI platform", type: "PRODUCT", salience: 0.8 },
            { text: "machine learning", type: "CONCEPT", salience: 0.6 },
            { text: "business growth", type: "CONCEPT", salience: 0.5 },
          ],
          categories: ["Technology", "Business"],
          language: "en",
        }
      }
    },
  },

  // Prediction API
  prediction: {
    forecast: async (data: any, options = {}) => {
      try {
        const response = await fetch(`${API_BASE_URL}/prediction/forecast`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ data, ...options }),
        })
        return handleResponse(response)
      } catch (error) {
        console.error("Prediction API error:", error)
        // Return mock data for demo purposes
        return {
          forecast: [
            { period: "Q1", value: 120, confidence: [110, 130] },
            { period: "Q2", value: 140, confidence: [125, 155] },
            { period: "Q3", value: 165, confidence: [145, 185] },
            { period: "Q4", value: 190, confidence: [165, 215] },
          ],
          growth: 0.273,
          confidence: 0.921,
          factors: ["Seasonality", "Marketing Campaign", "Product Launch"],
        }
      }
    },
  },
}

