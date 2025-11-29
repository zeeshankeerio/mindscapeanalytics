import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Quote } from "lucide-react"
import Image from 'next/image'

interface TestimonialCardProps {
  quote: string
  author: string
  position: string
  image?: string
}

export default function TestimonialCard({ quote, author, position, image }: TestimonialCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <Quote className="h-8 w-8 text-primary/20 mb-4" />
        <p className="text-lg italic">{quote}</p>
      </CardContent>
      <CardFooter className="flex items-center space-x-4 pt-0">
        {image ? (
          <Image 
            src={image || "/placeholder.svg"} 
            alt={author} 
            width={48} 
            height={48} 
            className="rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-medium text-lg">{author.charAt(0)}</span>
          </div>
        )}
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{position}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

