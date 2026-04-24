import { Project } from "@/types/sanity"

interface ProjectMetaProps {
  project: Project
}

const statusStyle: Record<string, string> = {
  "Completed": "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  "Ongoing": "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  "Under Review": "bg-slate-500/20 text-slate-400 border border-slate-500/30",
}

function MetaRow({ label, value }: { label: string; value?: string | number | null }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1 py-4 border-b border-white/5 last:border-none">
      <span className="text-xs text-foreground/50 uppercase tracking-widest font-mono">{label}</span>
      <span className="text-foreground/90">{value}</span>
    </div>
  )
}

export default function ProjectMeta({ project }: ProjectMetaProps) {
  const statusClass = statusStyle[project.projectStatus] ?? statusStyle["Under Review"]

  return (
    <div className="sticky top-32">
      <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm p-6">
        <h3 className="text-lg font-serif text-white mb-2">Project Details</h3>
        <div className="border-t border-white/10 mt-4">
          <MetaRow label="Contract Type" value={project.contractType} />
          <MetaRow label="Service Category" value={project.serviceCategory?.title} />
          <MetaRow label="Client" value={project.clientName} />
          <MetaRow label="Location" value={project.location} />
          {project.totalAreaSqm && (
            <MetaRow label="Total Area" value={`${project.totalAreaSqm.toLocaleString()} m²`} />
          )}
          <MetaRow label="Completion Year" value={project.completionYear} />

          {/* Status badge */}
          {project.projectStatus && (
            <div className="flex flex-col gap-1 py-4">
              <span className="text-xs text-foreground/50 uppercase tracking-widest font-mono">Status</span>
              <span className={`inline-flex w-fit text-xs font-medium px-2.5 py-1 rounded-full ${statusClass}`}>
                {project.projectStatus}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
