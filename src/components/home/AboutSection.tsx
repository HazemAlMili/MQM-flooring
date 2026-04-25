"use client"

import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimatedSection from "@/components/shared/AnimatedSection"

const tabs = [
  {
    value: "company",
    label: "Company",
    content: `Maqam Al-Emaar was established with a singular mission: to deliver construction excellence that surpasses industry standards. Over the years we have grown into a trusted partner for developers, government entities, and private sector clients across the Middle East. Our multidisciplinary team brings together engineering, project management, and craft expertise — ensuring every project is completed on time, within budget, and to the highest quality.`,
  },
  {
    value: "vision",
    label: "Vision & Mission",
    content: `Our vision is to be the foremost construction and fit-out partner in the Middle East — recognized for technical precision, innovation, and an unwavering commitment to quality. Our mission is to transform client visions into landmark realities, delivering projects that inspire communities and stand the test of time.`,
  },
  {
    value: "values",
    label: "Core Values",
    content: `Integrity guides every decision we make. Excellence is our baseline, not our aspiration. Innovation drives us to find smarter, safer, and more sustainable methods. Collaboration with clients, partners, and communities creates outcomes that benefit everyone. These values are embedded in every project, from planning through to handover.`,
  },
  {
    value: "hse",
    label: "HSE Policy",
    content: `Health, Safety, and Environment are non-negotiable at Maqam Al-Emaar. We operate under a zero-incident philosophy, conducting rigorous risk assessments before every project phase. Our HSE framework exceeds local regulatory requirements and aligns with international standards. All personnel receive regular safety training, and site compliance is monitored continuously throughout construction.`,
  },
]

export default function AboutSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Image */}
          <AnimatedSection className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-card-hover">
            <Image
              src="/og-default.jpg"
              alt="Maqam Al-Emaar — Our Team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Blue accent overlay bottom */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/60 to-transparent" />
            {/* Badge */}
            <div className="absolute bottom-6 left-6 bg-white rounded-xl px-4 py-3 shadow-card">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Est.</p>
              <p className="text-2xl font-bold text-primary font-mono">2010+</p>
            </div>
          </AnimatedSection>

          {/* Right: Tabs */}
          <AnimatedSection delay={0.2} className="space-y-6">
            {/* Section heading */}
            <div>
              <div className="w-10 h-1 bg-primary rounded-full mb-4" />
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                About Maqam Al-Emaar
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                مقام الإعمار — Building excellence across the Middle East since 2010.
              </p>
            </div>

            <Tabs defaultValue="company">
              <TabsList className="w-full grid grid-cols-2 lg:grid-cols-4 h-auto bg-surface rounded-xl p-1">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="text-xs data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-card rounded-lg py-2.5 transition-all"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-6">
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {tab.content}
                  </p>
                </TabsContent>
              ))}
            </Tabs>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
