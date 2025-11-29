"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Globe } from "lucide-react"

interface Office {
  id: string
  city: string
  country: string
  address: string
  phone: string
  email: string
  website: string
  coordinates: {
    lat: number
    lng: number
  }
}

const offices: Office[] = [
  {
    id: "sf",
    city: "San Francisco",
    country: "USA",
    address: "123 AI Boulevard, San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    email: "sf@mindscape.ai",
    website: "mindscape.ai",
    coordinates: {
      lat: 37.7749,
      lng: -122.4194,
    },
  },
  {
    id: "ny",
    city: "New York",
    country: "USA",
    address: "456 Tech Avenue, New York, NY 10001",
    phone: "+1 (555) 234-5678",
    email: "ny@mindscape.ai",
    website: "mindscape.ai",
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  {
    id: "london",
    city: "London",
    country: "UK",
    address: "789 Innovation Street, London EC1A 1BB",
    phone: "+44 20 7123 4567",
    email: "london@mindscape.ai",
    website: "mindscape.ai",
    coordinates: {
      lat: 51.5074,
      lng: -0.1278,
    },
  },
  {
    id: "singapore",
    city: "Singapore",
    country: "Singapore",
    address: "321 Digital Road, Singapore 018956",
    phone: "+65 6789 0123",
    email: "singapore@mindscape.ai",
    website: "mindscape.ai",
    coordinates: {
      lat: 1.3521,
      lng: 103.8198,
    },
  },
  {
    id: "tokyo",
    city: "Tokyo",
    country: "Japan",
    address: "654 Future Lane, Tokyo 100-0001",
    phone: "+81 3-1234-5678",
    email: "tokyo@mindscape.ai",
    website: "mindscape.ai",
    coordinates: {
      lat: 35.6762,
      lng: 139.6503,
    },
  },
]

export default function InteractiveMap() {
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null)

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        {offices.map((office) => (
          <Card
            key={office.id}
            className={`bg-black/40 backdrop-blur-md border border-white/10 cursor-pointer transition-colors duration-300 ${
              selectedOffice?.id === office.id ? "border-red-500/50" : "hover:border-red-500/30"
            }`}
            onClick={() => setSelectedOffice(office)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{office.city}</h3>
                  <p className="text-white/70">{office.country}</p>
            </div>
                <Badge variant="outline" className="border-white/10">
                  {office.id.toUpperCase()}
                </Badge>
          </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
        {selectedOffice ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{selectedOffice.city}</h3>
              <p className="text-white/70">{selectedOffice.country}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Address</h4>
                  <p className="text-white/70">{selectedOffice.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-white/70">{selectedOffice.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-white/70">{selectedOffice.email}</p>
                </div>
                  </div>

              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Website</h4>
                  <p className="text-white/70">{selectedOffice.website}</p>
                </div>
              </div>
            </div>

            <div className="aspect-video bg-black/60 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${selectedOffice.coordinates.lat},${selectedOffice.coordinates.lng}`}
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-white/50">
            Select an office to view details
          </div>
        )}
      </div>
    </div>
  )
}

