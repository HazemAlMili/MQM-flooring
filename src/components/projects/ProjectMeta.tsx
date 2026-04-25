import { Project } from "@/types/sanity"

interface ProjectMetaProps {
  project: Project
}

const statusStyle: Record<string, string> = {
  "Completed":    "bg-primary text-white",
  "Ongoing":      "bg-primary-light/20 text-primary border border-primary/30",
  "Under Review": "bg-surface text-muted-foreground border border-border",
}

function MetaRow({ label, value }: { label: string; value?: string | number | null }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1 py-4 border-b border-border last:border-none">
      <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
        {label}
      </span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  )
}

export default function ProjectMeta({ project }: ProjectMetaProps) {
  const statusClass = statusStyle[project.projectStatus] ?? statusStyle["Under Review"]

  return (
    <div className="sticky top-28">
      <div className="bg-white border border-border rounded-xl shadow-card overflow-hidden">
        {/* Header bar */}
        <div className="bg-primary px-5 py-3">
          <p className="text-white text-xs font-mono tracking-widest uppercase">
            Project Details / تفاصيل المشروع
          </p>
        </div>

        {/* Metadata rows */}
        <div className="px-5">
          <MetaRow label="Contract Type"     value={project.contractType} />
          <MetaRow label="Service Category"  value={project.serviceCategory?.title} />
          <MetaRow label="Client"            value={project.clientName} />
          <MetaRow label="Location"          value={project.location} />
          {project.totalAreaSqm && (
            <MetaRow
              label="Total Area"
              value={`${project.totalAreaSqm.toLocaleString()} m²`}
            />
          )}
          <MetaRow label="Completion Year" value={project.completionYear} />

          {/* Status */}
          {project.projectStatus && (
            <div className="flex flex-col gap-1 py-4">
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
                Status
              </span>
              <span
                className={`inline-flex w-fit text-xs font-medium px-2.5 py-1 rounded-full ${statusClass}`}
              >
                {project.projectStatus}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
