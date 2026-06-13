export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string
  title: string
  /**
   * Project period for display and sorting.
   * Use "MM.YYYY" format. Omit `end` for ongoing projects.
   */
  period: {
    /** Start date (e.g., "05.2025"). */
    start: string
    /** End date; leave undefined for "Present". */
    end?: string
  }
  /** Public URL (site, repository, demo, or video). */
  link: string
  /** Dedicated GitHub repository link. */
  github?: string
  /** Tags/technologies for chips or filtering. */
  skills: string[]
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string
  /** Logo image URL (absolute or path under /public). */
  logo?: string
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean
  /** Project image/mockup preview. */
  projectImage?: string
  /** Background image or CSS class gradient. */
  backgroundImage?: string
  /** Project status (e.g. Completed, Ongoing, Building). */
  status?: string
  /** Whether the project is pinned. */
  pinned?: boolean
  /** Optional video preview link. */
  projectVideo?: string
  /** Optional single-line short description. */
  shortDescription?: string
  /** Dynamic accent color for project background glow. */
  themeColor?: string
}
