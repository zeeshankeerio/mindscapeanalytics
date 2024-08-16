import React from "react"
import {
  AreaChart,
  BarChart3,
  BrainCircuit,
  Database,
  DraftingCompass,
  MonitorCheck,
  PanelsTopLeft,
} from "lucide-react"

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"

export function BentoGridLayout() {
  return (
    <BentoGrid className="mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          services={item.services}
          icon={item.icon}
          className={i === 1 || i === 2 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  )
}
const Skeleton = () => (
  <div className="min-h-[16rem]z flex size-full flex-1 rounded-xl bg-gradient-to-br"></div>
)
const items = [
  {
    title: "Business Intelligence",
    services: (
      <ul>
        <li>Tableau & Power BI Dashboard</li>
        <li>Performance appraisal model creation</li>
        <li>Complex formulation and customized report</li>
        <li>Automated Looker studio and google sheets</li>
        <li>Real time data integration with dashboard (API)</li>
      </ul>
    ),
    header: <Skeleton />,
    icon: (
      <AreaChart className="text-primary-foreground size-10 rounded-full border p-1" />
    ),
  },
  {
    title: "Modern Web Development",
    services: (
      <ul>
        <li>Landing Pages</li>
        <li>E-commerce Webites</li>
        <li>Saas (Software as a Service) Products</li>
        <li>Data Dashboards with Third Party Integration</li>
        <li>Portals with role based and orginization based auth</li>
      </ul>
    ),
    header: <Skeleton />,
    icon: (
      <PanelsTopLeft className="text-primary-foreground size-10 rounded-full border p-1" />
    ),
  },
  {
    title: "Data Science | ML | DL",
    services: (
      <ul>
        <li>Data Analysis & Data Visualization</li>
        <li>Crypto I Stock Portfolio optimization</li>
        <li>Anomaly Detection And Data Pre-Processing</li>
        <li>Experiment Design And Strategy Development</li>
        <li> Predictive Analytics And Prescriptive Analytics</li>
      </ul>
    ),
    header: <Skeleton />,
    icon: (
      <BrainCircuit className="text-primary-foreground size-10 rounded-full border p-1" />
    ),
  },
  {
    title: "Designing",
    services: (
      <ul>
        <li>Web and Mobile Design</li>
        <li>Custom Graphic Design</li>
        <li>2D and 3D Logo Design</li>
        <li>Social Media Graphics</li>
        <li>Markiting materials for Web and Print Designs</li>
      </ul>
    ),
    header: <Skeleton />,
    icon: (
      <DraftingCompass className="text-primary-foreground size-10 rounded-full border p-1" />
    ),
  },
  {
    title: "Big Data | Data Engineering",
    services: (
      <ul>
        <li>Big Data | Data Engineering</li>
        <li>Cloudera Services Management</li>
        <li>Servker Config and linus node managemaent</li>
        <li>SSI-/TLS, HDFS and Table Issue Resolution</li>
        <li>Streamsets Pipeline Development & Job Creation</li>
      </ul>
    ),
    header: <Skeleton />,
    icon: (
      <Database className="text-primary-foreground size-10 rounded-full border p-1" />
    ),
  },
  {
    title: "Prescriptive Analytics",
    services: (
      <ul>
        <li>Resource Allocation</li>
        <li>Portfolio Optimization</li>
        <li>Actionable Recommendations & Optimization</li>
        <li>Revenue Maximization & Risk Management</li>
        <li>Resource Allocation & Production Planning</li>
      </ul>
    ),
    header: <Skeleton />,
    icon: (
      <BarChart3 className="text-primary-foreground size-10 rounded-full border p-1" />
    ),
  },
  {
    title: "Information Technology",
    services: (
      <ul>
        <li>ERD and UML Design</li>
        <li>Network Setup and Config</li>
        <li>Digital Marketing & SEO Rank</li>
        <li>Project Design & Engineering</li>
        <li>OS & Software installation Online Support</li>
      </ul>
    ),
    header: <Skeleton />,
    icon: (
      <MonitorCheck className="text-primary-foreground size-10 rounded-full border p-1" />
    ),
  },
]
