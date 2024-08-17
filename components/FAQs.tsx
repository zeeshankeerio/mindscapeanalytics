import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const faqs = [
  {
    question: "What services do you offer?",
    answer: (
      <>
        <p>
          <strong>Business Intelligence:</strong> Power BI, Tableau dashboards,
          data integration, and performance models.
        </p>

        <p>
          <strong>Data Science & Machine Learning:</strong> Data analysis,
          predictive analytics, model deployment, and training.
        </p>

        <p>
          <strong>Big Data & Data Engineering:</strong> Cloudera management,
          Streamsets pipelines, SSL/TLS resolution, and Linux server setup.
        </p>

        <p>
          <strong>Web Development:</strong> Modern web apps using Next.js,
          React, Tailwind CSS, and TypeScript.
        </p>

        <p>
          <strong>Graphic Design:</strong> 2D/3D logos, social media graphics,
          marketing materials, and custom illustrations.
        </p>

        <p>
          <strong>IT Services:</strong> OS/software installation, digital
          marketing, SEO, network setup, and online IT support.
        </p>

        <p>
          <strong>Prescriptive Analytics:</strong> Optimization, resource
          allocation, risk management, and dynamic pricing.
        </p>
      </>
    ),
  },
  {
    question: "How can I contact you for a project?",
    answer: (
      <>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:admin@mindscapeanaytics.com">
            admin@mindscapeanaytics.com
          </a>
        </p>
        <p>
          Feel free to get in touch with us to discuss your project needs and
          how we can assist you. We&apos;re here to help you succeed!
        </p>
      </>
    ),
  },
  {
    question: "What sets your design approach apart?",
    answer: (
      <>
        <p>
          <strong>Expertise:</strong> Our team of seasoned professionals brings
          years of experience, ensuring top-notch quality and creativity in
          every project.
        </p>

        <p>
          <strong>Innovation:</strong> We stay ahead of industry trends,
          continuously innovating to deliver cutting-edge and impactful designs.
        </p>

        <p>
          <strong>Customization:</strong> We tailor our designs to meet your
          unique needs, ensuring that your brand&apos;s identity is clearly and
          effectively communicated.
        </p>

        <p>
          <strong>Support:</strong> We provide comprehensive support from the
          initial concept through to the final delivery, ensuring your
          satisfaction every step of the way.
        </p>

        <p>
          Our commitment to excellence and personalized service ensures that our
          designs not only meet but exceed your expectations.
        </p>
      </>
    ),
  },
  {
    question: "Can you work on remote projects?",
    answer: (
      <>
        <p>
          <strong>Yes, we can work on remote projects.</strong> Our team is
          equipped to handle projects from anywhere, leveraging online
          collaboration tools and communication channels to ensure smooth and
          efficient project management. Feel free to contact us to discuss your
          remote project needs and how we can assist you.
        </p>
      </>
    ),
  },
  {
    question: "How do you handle feedback?",
    answer: (
      <>
        <p>
          <strong>Active Listening:</strong> We carefully listen to your
          feedback to understand your concerns and preferences.
        </p>

        <p>
          <strong>Prompt Response:</strong> We address feedback promptly to
          ensure timely improvements and adjustments.
        </p>

        <p>
          <strong>Continuous Improvement:</strong> We use your feedback to
          refine our processes and enhance our services, ensuring we meet and
          exceed your expectations.
        </p>

        <p>
          <strong>Collaboration:</strong> We work closely with you to implement
          changes and ensure that the final result aligns with your vision and
          goals.
        </p>

        <p>
          Your feedback is valuable to us, and we are committed to using it to
          deliver the best possible outcomes.
        </p>
      </>
    ),
  },
  {
    question: "Can I see examples of your work?",
    answer: (
      <>
        <p>
          <strong>Yes, you can see examples of our work.</strong> We have a
          portfolio showcasing various projects, including web development,
          graphic design, and data analytics. You can view our past work and see
          how we&apos;ve helped other clients achieve their goals.{" "}
          <Link href="/projects">Visit our portfolio</Link> to explore examples
          of our projects and get a sense of our capabilities.
        </p>
      </>
    ),
  },
]

const FAQs = () => {
  return (
    <MaxWidthWrapper>
      <div className="container mx-auto flex flex-col items-start space-y-24 px-4 py-20 text-center md:px-0 md:text-start">
        <h3 className="text-3xl font-bold sm:text-6xl">
          FREQUENTLY ASKED QUESTIONS
        </h3>
        <div className="size-full">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-9 md:w-2/3"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="">
                <AccordionTrigger className="text-start text-lg font-normal md:text-2xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default FAQs
