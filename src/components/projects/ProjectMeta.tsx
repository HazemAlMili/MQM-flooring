import { Project } from "@/types"
import { Calendar, MapPin, Building2, Ruler, User, ClipboardList } from "lucide-react"

interface ProjectMetaProps {
  project: Project
}

const statusStyle: Record<string, string> = {
  "Completed":    "bg-emerald-500 text-white",
  "Ongoing":      "bg-amber-500 text-white",
  "Under Review": "bg-slate-500 text-white",
}

function MetaRow({ 
  label, 
  value, 
  icon: Icon,
  labelAr
}: { 
  label: string; 
  value?: string | number | null;
  icon: React.ElementType;
  labelAr?: string
}) {
  if (!value) return null
  return (
    <div className="flex items-start gap-4 py-5 border-b border-border/50 last:border-none group">
      <div className="mt-1 p-2 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">
            {label}
          </span>
          {labelAr && (
            <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest font-display">
              {labelAr}
            </span>
          )}
        </div>
        <span className="text-foreground font-bold text-sm">{value}</span>
      </div>
    </div>
  )
}

export default function ProjectMeta({ project }: ProjectMetaProps) {
  const statusClass = statusStyle[project.projectStatus] ?? statusStyle["Under Review"]

  return (
    <div className="sticky top-32">
      <div className="bg-white border border-border/50 rounded-2xl shadow-card-hover overflow-hidden">
        {/* Header bar */}
        <div className="bg-foreground px-6 py-4 flex items-center justify-between">
          <p className="text-white text-[10px] font-bold tracking-[0.3em] uppercase">
            Project Overview
          </p>
          <span className="text-white/30 text-[10px] font-bold font-display tracking-widest uppercase">
            نظرة عامة
          </span>
        </div>

        {/* Metadata rows */}
        <div className="px-6 py-2">
          <MetaRow 
            label="Client" 
            labelAr="العميل"
            value={project.clientName} 
            icon={User}
          />
          <MetaRow 
            label="Location" 
            labelAr="الموقع"
            value={project.location} 
            icon={MapPin}
          />
          <MetaRow 
            label="Contract Type" 
            labelAr="نوع العقد"
            value={project.contractType} 
            icon={ClipboardList}
          />
          <MetaRow 
            label="Service" 
            labelAr="الخدمة"
            value={project.serviceCategory?.title} 
            icon={Building2}
          />
          {project.totalAreaSqm && (
            <MetaRow
              label="Total Area"
              labelAr="المساحة"
              value={`${project.totalAreaSqm.toLocaleString()} m²`}
              icon={Ruler}
            />
          )}
          <MetaRow 
            label="Completed" 
            labelAr="تاريخ الإنجاز"
            value={project.completionYear} 
            icon={Calendar}
          />

          {/* Status */}
          {project.projectStatus && (
            <div className="py-6 border-t border-border mt-2">
              <div className="flex items-center justify-between bg-secondary/50 p-4 rounded-xl">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Project Status
                </span>
                <span
                  className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${statusClass}`}
                >
                  {project.projectStatus}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Contact CTA in sidebar */}
      <div className="mt-6 p-6 bg-primary rounded-2xl text-white shadow-lg">
        <h4 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Interested in similar results?
        </h4>
        <p className="text-white/80 text-sm mb-6 leading-relaxed">
          Contact our team to discuss your next construction or fit-out project.
        </p>
        <a 
          href="/contact" 
          className="block w-full py-3 bg-white text-primary text-center font-bold rounded-xl text-sm hover:bg-white/90 transition-colors shadow-btn"
        >
          Discuss Your Project
        </a>
      </div>
    </div>
  )
}
