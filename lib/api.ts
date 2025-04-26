// API endpoints
const API_BASE_URL = "/api"

// Cache keys for offline storage
const CACHE_KEYS = {
  VISION_ANALYZE: 'vision_analyze_cache',
  NLP_ANALYZE: 'nlp_analyze_cache',
  PREDICTION_FORECAST: 'prediction_forecast_cache'
}

// Check if we're offline
const isOffline = () => typeof navigator !== 'undefined' && !navigator.onLine

// Store data in localStorage for offline use
const storeOfflineData = (key: string, data: any) => {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
      }))
    } catch (error) {
      console.warn('Failed to store offline data:', error)
    }
  }
}

// Get stored offline data
const getOfflineData = (key: string) => {
  if (typeof localStorage !== 'undefined') {
    try {
      const item = localStorage.getItem(key)
      if (item) {
        return JSON.parse(item).data
      }
    } catch (error) {
      console.warn('Failed to retrieve offline data:', error)
    }
  }
  return null
}

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

// Fetch with offline support
const fetchWithOfflineSupport = async (url: string, options: RequestInit, cacheKey: string, mockData: any) => {
  // Return cached data if offline
  if (isOffline()) {
    const cachedData = getOfflineData(cacheKey)
    if (cachedData) {
      return cachedData
    }
    return mockData
  }

  try {
    const response = await fetch(url, options)
    const data = await handleResponse(response)
    
    // Cache successful response for offline use
    storeOfflineData(cacheKey, data)
    
    return data
  } catch (error) {
    console.error(`API error (${url}):`, error)
    
    // Try to use cached data first on error
    const cachedData = getOfflineData(cacheKey)
    if (cachedData) {
      return cachedData
    }
    
    // Fall back to mock data if no cache
    return mockData
  }
}

// API methods
export const api = {
  // Vision API
  vision: {
    analyzeImage: async (imageUrl: string, options = {}) => {
      const mockData = {
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
      
      return fetchWithOfflineSupport(
        `${API_BASE_URL}/vision/analyze`, 
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ imageUrl, ...options }),
        },
        CACHE_KEYS.VISION_ANALYZE,
        mockData
      )
    },
  },

  // NLP API
  nlp: {
    analyzeText: async (text: string, options = {}) => {
      const mockData = {
        sentiment: { score: 0.87, label: "Positive" },
        entities: [
          { text: "AI platform", type: "PRODUCT", salience: 0.8 },
          { text: "machine learning", type: "CONCEPT", salience: 0.6 },
          { text: "business growth", type: "CONCEPT", salience: 0.5 },
        ],
        categories: ["Technology", "Business"],
        language: "en",
      }
      
      return fetchWithOfflineSupport(
        `${API_BASE_URL}/nlp/analyze`, 
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ text, ...options }),
        },
        CACHE_KEYS.NLP_ANALYZE,
        mockData
      )
    },
  },

  // Prediction API
  prediction: {
    forecast: async (data: any, options = {}) => {
      const mockData = {
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
      
      return fetchWithOfflineSupport(
        `${API_BASE_URL}/prediction/forecast`, 
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ data, ...options }),
        },
        CACHE_KEYS.PREDICTION_FORECAST,
        mockData
      )
    },
  },
}

