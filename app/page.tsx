import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Globe } from "@/components/ui/globe"
import { LinkPreview } from "@/components/ui/link-preview"
import { BentoGridLayout } from "@/components/BentoGridLayout"
import FoundersCircleProfile from "@/components/Founders_Circle_Profile"
import { WorldGlobe } from "@/components/Globe"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const logos = [
  {
    src: "/svg/devicon_googlecloud.svg",
    alt: "Google Cloud",
  },
  {
    src: "/svg/devicon_python.svg",
    alt: "Python",
  },
  {
    src: "/svg/sanity-plain.svg",
    alt: "Python",
  },
  {
    src: "/svg/nextjs-original.svg",
    alt: "NextJS",
  },
  {
    src: "/svg/sentry-original.svg",
    alt: "NextJS",
  },
  {
    src: "/svg/devicon_figma.svg",
    alt: "Figma",
  },
  {
    src: "/svg/logos_aws.svg",
    alt: "AWS",
  },
  {
    src: "/svg/logos_azure.svg",
    alt: "Azure",
  },
]

const recentProjects = [
  {
    Name: "Portfolio (Farhan)",
    tag: "Designed & Developed",
    link: "https://farhanmurad.framer.website/",
  },
  {
    Name: "KAI Tools",
    tag: "Designed & Developed",
    link: "https://www.kaitools.tech/",
  },
]

const ourTeam = [
  {
    Image: "zeeshan.jpeg",
    Name: "Zeeshan Keerio",
    Designation: "Founder & CEO Mindscape Analytics",
    Description:
      "I am Zeesham, a Data Scientist having years of exprerience. I have worked on multiple projects and have a good understanding of the latest technologies.",

    portfolio: "https://www.linkedin.com/in/zeeshan-keerio/",
  },
  {
    Image: "M.Atif.png",
    Name: "Muhammad Atif",
    Designation: "FullStack Developer",
    Description:
      "I am Muhammad Atif, a self-taught full-stack developer having 3 years of exprerience. I have worked on multiple projects and have a good understanding of the latest technologies.",
    portfolio: "https://mak-dev.vercel.app/",
  },
  {
    Image: "Farhan.png",
    Name: "Farhan Murad",
    Designation: "UI/UX designer & Framer developer",
    Description:
      "I'm a UI/UX designer and Framer developer. My passion for design, technology, and innovation helps me create visually appealing interfaces that provide exceptional user experiences.",
    portfolio: "http://farhanmurad.framer.website/",
  },
]

const features = [
  {
    no: 1,
    title: "Expertise",
    description:
      "Our team comprises seasoned professionals with years of experience in their respective fields, ensuring the highest quality of service and training.",
  },
  {
    no: 2,
    title: "Innovation",
    description:
      "We stay at the forefront of industry trends and technologies, continuously innovating to deliver solutions that drive results and exceed expectations.",
  },
  {
    no: 3,
    title: "Customization",
    description:
      "We understand that every client is unique, which is why we offer personalized solutions and training programs tailored to your specific goals and requirements.",
  },
  {
    no: 4,
    title: "Support",
    description:
      "From initial consultation to ongoing support, we are committed to providing exceptional customer service and guidance every step of the way",
  },
]

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="relative">
          <div className="mx-auto flex flex-col items-center space-y-12 px-4 py-20 text-center md:px-0 md:text-start">
            <div className="flex flex-col space-y-4 md:flex-row">
              <h1 className="text-primary bg-clip-text text-5xl font-extrabold sm:text-6xl md:bg-gradient-to-r md:text-7xl md:leading-[107px]">
                More Than Just <br className="hidden md:block" /> A Creative
                Agency
              </h1>
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="group w-full">
                  <Link
                    href="/contact"
                    className="text-md bg-primary/75 text-primary-foreground group-hover:bg-primary/90 -mx-0 flex w-full items-center justify-between rounded-full px-8 py-4 transition md:-mx-10 md:gap-36 md:text-lg"
                  >
                    <h2 className="tracking-widest">Get Started</h2>
                    <ArrowUpRight
                      size={42}
                      className="bg-primary group-hover:bg-primary/75 rounded-full p-2 transition"
                    />
                  </Link>
                </div>
                <div className="text-muted-foreground mt-4 w-full leading-relaxed md:w-2/3 md:px-6">
                  <p>
                    We believe we can provide advanced solutions that help
                    businesses and individuals succeed in today&apos;s
                    ever-changing world. Our solutions are designed to make life
                    easier, efficient & productive.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-primary h-96 w-full rounded-3xl shadow-inner">
              <div className="flex size-full flex-col items-end px-8 py-4 md:flex-row">
                <div className="absolute flex w-full items-center justify-center">
                  <WorldGlobe />
                </div>

                <div className="mt-4 flex w-full justify-end md:mt-0">
                  <div className="text-primary-foreground ring-primary/5 flex w-full flex-col items-center gap-4 rounded-full bg-white/20 px-4 py-3 shadow-md ring-1 backdrop-blur-lg md:w-fit md:flex-row">
                    <FoundersCircleProfile />
                    <p className="text-lg font-semibold">Our Founders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="relative">
          <div className="mx-auto flex flex-col items-center space-y-24 px-4 py-20 text-center md:px-0 md:text-start">
            <h3 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Technologies We are using
            </h3>
            <div className="w-full">
              <div className="grid w-full grid-cols-4 items-center justify-center gap-12 md:grid-cols-8">
                {logos.map((logo, index) => (
                  <Image
                    key={index}
                    src={logo.src}
                    alt={logo.alt}
                    width={100}
                    height={100}
                    className="object-contain object-center"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="relative px-4 md:px-0">
          <div className="bg-muted flex flex-col items-center justify-between gap-x-12 rounded-[42px] p-2 text-center shadow-md md:flex-row md:px-14 md:py-12 md:text-start">
            <div className="flex w-full flex-col p-4 md:w-2/3 md:p-0">
              <div className="space-y-6">
                <h3 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                  About Us
                </h3>
                <p className="text-muted-foreground text-justify text-sm leading-snug md:text-base">
                  At Mindscape Analytics we specialize in delivering innovative
                  solutions in AI, data science, React development, UX/UI
                  design, and big data management. Our expert team transforms
                  data into actionable insights, builds dynamic web
                  applications, and creates captivating user experiences. We
                  also develop microservices and generative AI applications to
                  keep you at the forefront of technology. With extensive
                  experience in big data administration using Apache Hadoop and
                  Cloudera, we ensure optimal performance and security for your
                  data environments. Our services include system maintenance,
                  technical support for data engineers and scientists, and the
                  integration of new tools to enhance data processing
                  capabilities. Additionally, our expertise in financial data
                  analysis allows us to automate reporting, develop BI
                  dashboards, and transform complex business requirements into
                  effective technical solutions.
                  <br className="mt-2"></br>
                  Partner with us to elevate your business and achieve your
                  goals with cutting-edge technology and tailored strategies.
                </p>
              </div>
              <div className="my-14 flex justify-center gap-4 md:mb-0 md:justify-start">
                <Link href="/about" className={`${buttonVariants()}`}>
                  Learn More
                </Link>

                <Link
                  href="/contact"
                  className={`${buttonVariants({ variant: "outline" })}`}
                >
                  Support &rarr;
                </Link>
              </div>
            </div>
            <div className="size-full">
              <Image
                src="/images/about_section.png"
                alt="hero"
                width={2500}
                height={2500}
                className="size-full rounded-[42px] object-contain object-center"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="relative">
          <div className="flex flex-col items-center justify-between gap-x-12 px-4 py-12 md:flex-row md:px-0">
            <div className="flex size-full flex-col text-center">
              <div className="space-y-24">
                <h3 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                  Our Services
                </h3>
                <div className="relative">
                  <BentoGridLayout />
                </div>
                <Link href="/services" className={`${buttonVariants()}`}>
                  All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="flex flex-col items-center justify-between gap-x-12 px-4 py-12 md:flex-row md:px-0">
          <div className="flex size-full flex-col text-center">
            <div className="space-y-24">
              <h3 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                Recent Work
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Image
                  src="/projects/project one.png"
                  alt="recent projects"
                  width={500}
                  height={500}
                  className="size-full rounded-3xl object-cover object-center"
                />
                <Image
                  src="/projects/project two.png"
                  alt="recent projects"
                  width={500}
                  height={500}
                  className="size-full rounded-3xl object-cover object-center"
                />
                <Image
                  src="/projects/project three.png"
                  alt="recent projects"
                  width={500}
                  height={500}
                  className="size-full rounded-3xl object-cover object-center"
                />
                <Image
                  src="/projects/project four.png"
                  alt="recent projects"
                  width={500}
                  height={500}
                  className="size-full rounded-3xl object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex size-full flex-col justify-start px-4 py-12 md:px-0">
          <div className="space-y-3">
            <h4 className="text-primary font-mono text-lg">Recent Work</h4>
            <div className="bg-primary h-px w-full" />
          </div>
          <div className="">
            {recentProjects.map((project: any, index: any) => (
              <div key={index}>
                <div className="text-primary flex items-center justify-between font-mono">
                  <LinkPreview url={project.link} target="_blank">
                    <h4 className="hover:text-primary/70 my-10 text-3xl">
                      {project.Name}
                    </h4>
                  </LinkPreview>
                  <p>{project.tag}</p>
                </div>
                <div className="bg-primary h-px w-full" />
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="flex flex-col justify-between gap-x-12 px-4 py-12 md:flex-row md:px-0">
          <div className="flex size-full flex-col space-y-24 text-center">
            <div className="">
              <h3 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                Our Team
              </h3>
            </div>
            <div className="grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-3">
              {ourTeam.map((member, index) => (
                <div
                  key={index}
                  className="w-md flex flex-col items-center justify-center space-y-2"
                >
                  <Image
                    src={`/images/${member.Image}`}
                    alt={`${member.Name}, ${member.Designation}`}
                    className="border-primary size-[200px] rounded-full border-2 object-cover object-center"
                    width={200}
                    height={200}
                  />
                  <Link href={member.portfolio} target="_blank">
                    <h4 className="text-lg font-bold">{member.Name}</h4>
                    <p className="text-mono text-primary font-medium">
                      {member.Designation}
                    </p>
                  </Link>
                  <p className="text-muted-foreground">{member.Description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="flex flex-col gap-12 px-4 py-12 sm:flex-row md:px-0">
          <div className="w-full space-y-6 sm:w-fit">
            <h3 className="md:w-xs w-full text-4xl font-semibold uppercase tracking-tight sm:text-5xl md:text-6xl">
              Why Work <br className="hidden sm:block" /> With Us
            </h3>
            <p className="text-muted-foreground w-full md:w-3/4">
              In the world of design, collaboration is key, and here&apos;s why
              partnering with me is the right choice.
            </p>
            <div className="mt-8 space-y-6">
              <h4 className="text-3xl font-medium md:text-5xl">
                Why Choose Us
              </h4>
              <p className="text-muted-foreground w-full md:w-3/4">
                When you partner with Mindscape Analytics, you gain access to a
                wealth of knowledge, expertise, and resources dedicated to
                helping you achieve your goals. Whether you&apos;re a beginner
                looking to break into the world of data science or a seasoned
                professional seeking to enhance your skills, we have the tools
                and training programs to help you succeed.
              </p>
            </div>
            <Link href={"/contact"} className={`${buttonVariants()} mt-8`}>
              Get Started
            </Link>
          </div>
          <div className="flex w-full flex-col">
            {features.map((feature, index) => (
              <div key={index} className="mb-12 flex flex-col sm:flex-row">
                <h4 className="text-4xl sm:mr-4 md:text-6xl">{feature.no}.</h4>
                <div className="flex flex-col items-start space-y-5">
                  <h4 className="text-3xl md:text-5xl">{feature.title}</h4>
                  <div className="bg-muted-foreground h-px w-full" />
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  )
}
