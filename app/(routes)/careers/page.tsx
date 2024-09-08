import React from "react"
import Link from "next/link"
import {
  Briefcase,
  GraduationCap,
  Handshake,
  HeartHandshake,
  PenIcon,
  ProjectorIcon,
  Rocket,
} from "lucide-react"

import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const careerData = [
  {
    title: "Professional Development Opportunities",
    icon: <GraduationCap className="text-primary text-4xl" />,
    items: [
      {
        title: "Training Programs",
        description:
          "Access internal and external training programs to enhance your skills in emerging technologies.",
      },
      {
        title: "Certifications",
        description:
          "We support certifications aligned with your career goals and professional advancement.",
      },
    ],
  },
  {
    title: "Career Advancement",
    icon: <Rocket className="text-primary text-4xl" />,
    items: [
      {
        title: "Career Pathways",
        description:
          "We offer clear career progression pathways, helping you achieve your career aspirations.",
      },
      {
        title: "Promotions and Role Changes",
        description:
          "Regular reviews and discussions help identify opportunities for advancement and role changes.",
      },
    ],
  },
  {
    title: "Skill Development",
    icon: <PenIcon className="text-primary text-4xl" />,
    items: [
      {
        title: "Workshops and Seminars",
        description:
          "Participate in workshops and seminars to stay updated on industry trends and technologies.",
      },
      {
        title: "Mentorship Programs",
        description:
          "Benefit from mentorship programs where experienced professionals help you grow in your career.",
      },
    ],
  },
  {
    title: "Learning Resources",
    icon: <Briefcase className="text-primary text-4xl" />,
    items: [
      {
        title: "Knowledge Sharing",
        description:
          "Engage in knowledge-sharing sessions, learning from colleagues and industry experts.",
      },
      {
        title: "Learning Platforms",
        description:
          "Utilize our learning platforms and resources for courses relevant to your field.",
      },
    ],
  },
  {
    title: "Innovation and Projects",
    icon: <ProjectorIcon className="text-primary text-4xl" />,
    items: [
      {
        title: "Innovative Projects",
        description:
          "Work on cutting-edge projects that challenge you and expand your skills.",
      },
      {
        title: "Cross-Functional Teams",
        description:
          "Collaborate with different teams on diverse projects to broaden your expertise.",
      },
    ],
  },
  {
    title: "Feedback and Support",
    icon: <Handshake className="text-primary text-4xl" />,
    items: [
      {
        title: "Performance Reviews",
        description:
          "Receive regular feedback and evaluations to understand your strengths and areas of improvement.",
      },
      {
        title: "Career Counseling",
        description:
          "Benefit from career counseling and support to achieve your professional goals.",
      },
    ],
  },
  // {
  //   title: "Work-Life Balance",
  //   icon: <ScaleIcon className="text-primary text-4xl" />,
  //   items: [
  //     {
  //       title: "Flexible Working",
  //       description:
  //         "Enjoy flexible working arrangements that support a healthy work-life balance.",
  //     },
  //   ],
  // },
]

const Career = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="relative">
          <div className="mx-auto flex flex-col space-y-12 px-4 py-20 text-center md:px-0 md:text-start">
            <div className="space-y-4">
              <h1 className="text-muted-foreground text-lg uppercase md:text-2xl ">
                Careers /
              </h1>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:mx-0">
                We are committed to your professional growth. Continuous
                learning and development are key to both personal and
                organizational success. Here&apos;s how we support your career
                journey:
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <div className="mx-auto flex flex-col space-y-12 px-4 py-20 text-center md:px-0 md:text-start">
          <div></div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <div className="mx-auto flex flex-col space-y-12 px-4 py-20 text-center md:px-0 md:text-start">
          <div className="text-primary-foreground to-primary relative mt-12 rounded-3xl bg-gradient-to-r from-red-500 p-8 shadow-lg">
            <div className="absolute inset-0 rounded-3xl bg-[url('/path-to-your-background-image.jpg')] bg-cover bg-center opacity-30 blur-sm"></div>
            <div className="relative z-10 flex flex-col items-center space-y-6 p-8 text-center">
              <div className="bg-background mb-6 flex items-center justify-center rounded-full p-4 shadow-lg">
                <HeartHandshake className="text-primary text-5xl" />
              </div>
              <h3 className="mb-4 text-3xl font-bold ">Workplace Policy</h3>
              <p className="mb-6 max-w-xl text-lg ">
                Discover our comprehensive workplace policies designed to foster
                a positive and respectful work environment. Our policies ensure
                that all employees can thrive and feel secure in their roles.
              </p>
              <Link
                href="/careers/workplace-policy"
                className="bg-background text-primary rounded-full px-8 py-3 text-lg font-semibold shadow-lg transition-transform hover:scale-105 "
              >
                View Workplace Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default Career
