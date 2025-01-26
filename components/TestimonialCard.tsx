import Image from "next/image"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  company: string
  testimonial: string
  image: string
}

export function TestimonialCard({
  name,
  role,
  company,
  testimonial,
  image,
}: TestimonialCardProps) {
  return (
    <div className="relative flex h-[400px] w-full flex-col overflow-hidden rounded-xl p-6 shadow-lg">
      <div className="bg-primary/10 absolute right-0 top-0 size-20 rounded-bl-full" />
      <Quote className="text-primary/20 absolute right-4 top-4 size-8" />
      <div className="mb-4 flex items-center">
        <Image
          src={image}
          alt={name}
          width={64}
          height={64}
          className="border-primary mr-4 rounded-full border-2"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm">
            {role} at {company}
          </p>
        </div>
      </div>
      <div className="relative z-10 mt-4 grow overflow-y-auto italic">
        <p className="text-sm leading-relaxed">{testimonial}</p>
      </div>
    </div>
  )
}
