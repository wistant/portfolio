# portfolio

## 1.0.7-rc.4

### Patch Changes

- a6cbbd9: - 3c2e204: feat(projects): assign random backgrounds from public directory to project previews
  - e2feb6f: fix(eslint): fix cascading renders in cover and random background effects
  - a49187f: fix(lint): resolve unused import warning in certifications page
  - 9396562: style(format): format opensource list and page files with Prettier
  - 7a1cd33: feat(layout): integrate RandomBackground backdrop overlay for premium look
  - 2c3dbb9: feat(cover): implement theme cycle animation loop and click interaction for ProfileCover
  - c14938d: style(images): compress backgrounds directory files to optimized WebP format with ffmpeg
  - f37eff0: style(images): compress cover images to optimized WebP format with ffmpeg
  - 8e75f23: feat(opensource): support personal repo filtering, pinned order sorting, and interactive header links
  - fe9de76: refactor(opensource): extract project card subcomponents to client file for event handler serialization
  - 7bb44c3: feat(opensource): implement home preview block and dedicated filters page
  - 5fa2a65: feat(opensource): create type definitions, configuration schema and data structures
  - f8be192: chore(git): ignore local .protocols directory
  - 39ab176: update gitignore and remove protocols folder to project

## 1.0.7-rc.3

### Patch Changes

- 8a4fb6e: - b4787a8: style(llms): format LLM text route endpoints with Prettier
  - d70343f: refactor(llms): aggregate active sponsor tiers and contributions
  - 0d19c6b: refactor(llms): aggregate full text of all professional certifications
  - 23fceb5: docs(llms): document development tooling and atomic commit protocols
  - 6fb1d01: docs(llms): add shadcn UI component registry compilation instructions
  - b3db710: refactor(llms): append codebase directory map and basic command guidelines
  - 7f083c3: refactor(llms): update general index with stack specs and source repository

## 1.0.7-rc.2

### Patch Changes

- cf9fd87: - a8dae81: release: switch 1.0.7-beta.1 from beta to rc
  - 887f214: style(app): format page.tsx
  - 12ae97c: style(app): format index.tsx
  - 1831a38: style(app): format insights.tsx
  - 2e97908: style(app): format index.tsx
  - ff02276: style(app): format index.tsx
  - bbea31b: style(app): format about.tsx
  - a6077d9: style(app): format index.tsx
  - a44e4c1: style(app): format header.tsx
  - cf5c80c: style(app): format brand.tsx
  - 2041333: style(app): format page.tsx
  - 7158811: ui(button): refine styling and update config metadata
  - 04aed37: refactor(ui): promote Panel, IconSwap, and Tabs to shared components
  - 1c4cb5c: refactor(layout): relocate and decompose site footer and not found components
  - 2b02c86: refactor(pages): colocate blog, projects, certifications, and sponsors components
  - fccf989: refactor(gallery): colocate gallery component under page components
  - f56e0d8: refactor(ui): consolidate duplicate separators into blocks-separator
  - e8861bf: refactor(home): colocate homepage components under home subfolders
  - f4be7c0: refactor: remove blog posts
  - e9c2bc1: fix(welcome): resolve duplicate image key in frontmatter
  - 99a6c23: docs(squareui): adjust creation and update dates
  - e3a4e0e: docs(welcome): update image reference and metadata dates
  - 83537b6: docs(blog): add design.md generative ai ui guide
  - f1366c6: style(projects): update default thumbnail image for the line project
  - 38e4d7e: feat(portfolio): register the line studio clone in projects data
  - 281e87c: docs(projects): add case study for the line animation studio clone

## 1.0.7-beta.1

### Patch Changes

- b269228: - d9d86ac: release: switch 1.0.7-alpha.0 from alpha to beta
  - 13d87d6: style(style): format nestjs-for-beginners-complete-guide.mdx
  - 8e1a500: style(project): update readme preview image path and refine guide header
  - 1621a0b: docs(blog): update squareui blog post and add new blog assets
  - 31ebdc1: docs(blog): rewrite nestjs guide for beginners with express comparison
  - aa7cbfe: docs(blog): add in-depth nestjs architecture guide
  - e4c2890: docs(blog): add blog post on square ui open-source nextjs templates

## 1.0.7-alpha.0

### Patch Changes

- 4b88503: - a57b958: release: switch 1.0.6 from Stable to alpha
  - 5ed0383: style(app): format profile-cover.tsx
  - 7de8f5e: ui(home): assemble cover banner, compact profile header, and metadata grid on home page
  - 7ebec4f: ui(home): create structured profile metadata grid component with actions
  - bf606ca: ui(home): restructure profile header layout to be compact and role-focused
  - 400fc21: feat(home): create masked profile cover banner component with canvas particles

## 1.0.6

### Patch Changes

- 35d8bbc: - release: switch 1.0.5 from Stable to alpha
  - style(components): format tech-tag.tsx
  - style(app): format site-footer.tsx
  - style(app): format project-item.tsx
  - style(app): format experience-position-item.tsx
  - ui(footer): remove interactive logotype from footer
  - feat(tech-stack): add html, css, prisma, and typeorm with local icon resolution
  - feat(experiences): render work experience and project tags as tech stack badges
  - ui(tech-stack): make stack items and image logos rectangular with rounded-xs shape
  - ui(tech-stack): group stack items with tooltips and rectangular badges
- 116f912: - release: switch 1.0.6-alpha.0 from alpha to beta
  - feat(projects): add dynamic themeColor radial glow background and border accent animation
  - refactor(projects): decompose ProjectCard into modular preview, header, and action subcomponents
  - ui(projects): remove popup dialog and route card clicks to details page
  - fix(projects): solve client-side bundler error by passing hasLocalPage prop to ProjectCard
  - style(projects): apply prettier code formatting to project files
  - ui(projects): render projects page categories as grids of ProjectCards
  - ui(projects): render homepage projects as a 2x2 grid of ProjectCards
  - ui(projects): add ProjectCard component with rich hover animations and modal dialog
  - refactor(projects): extend project types and data with card metadata
- e57d9d5: - style(style): format tech-stack.ts
  - style(components): format tech-tag.tsx
  - style(app): format tech-stack.tsx
  - style(app): format project-card.tsx
  - style(app): format project-card-preview.tsx
  - style(app): format page.tsx
  - feat(tech-stack): centralize icon mappings, add vercel and github actions, and support logos for all tags
  - fix(providers): suppress next-themes hydration and script console errors in dev
  - ui(projects): configure 'current'/'completed' status values and display status only in header
  - ui(projects): fix project card alignment and height in grid
  - ui(projects): align project card grid visual separation and breakpoints with blog list
  - feat(projects): boost extracted color saturation and add diverse pattern variations based on project ID hash
  - feat(projects): add automatic dominant color extraction for project card backgrounds
  - fix(fetch): add 2-second timeout to external fetches and simplify log output
- 9baa7fd: - style(app): format page.tsx
  - content(projects): remove placeholder quaric and zadark template projects
  - content(projects): revamp all descriptions, pin only portfolio and shoperzz
  - feat(projects): auto-sort by pin+date, logo fallback in preview and OG metadata
- dde9698: - 07f465f: feat(data): update site data
  - 9207484: feat(projects): update projects data
  - b3376b7: feat(projects): show projectImage/logo as cover on slug page when MDX image is absent
  - 4ed20d0: fix(tooling): prefix commit hash in changeset body entries
  - 24dfba7: style(style): format github.ts
  - 61f9b77: style(app): format project-card-preview.tsx
  - 7bbc36f: style(app): format project-card-actions.tsx
  - ab19b99: style(app): format index.tsx
  - f71eb99: style(app): format page.tsx
  - 1ad9a3a: style(style): format github.ts
  - 5bdcb9f: style(app): format project-card-preview.tsx
  - 9043fe9: style(app): format project-card-actions.tsx
  - c6c315a: style(app): format index.tsx
  - 21e18ef: style(app): format page.tsx
  - c437ec2: ui(projects): add github icon next to stars in preview badge
  - 0064353: ui(projects): move github stars badge to top-left of preview card
  - c8c6d0f: feat(projects): show live GitHub star count on project cards
- 60786a8: - 2df0669: release: switch 1.0.6-beta.3 from beta to rc
  - 5ccaa8a: style(style): format tech-stack.ts
  - 46ba451: style(components): format tech-tag.tsx
  - 10b53ad: style(components): format providers.tsx
  - fcc293c: style(components): format keyboard-shortcuts.tsx
  - a43b5fa: style(app): format project-card.tsx
  - 3c7352a: style(app): format experience-position-item.tsx
  - f36bd6b: ui(layout): enable global lenis smooth scrolling
  - 2e7c191: style(icons): optimize and add local svg icons
  - 81eb06b: chore(projects): update projects metadata and remove zadark
  - d7a2d4a: ui(nav): conditionally display sponsors links and shortcuts
  - 4651ca6: feat(sponsors): hide page and exclude from sitemap when empty
  - 637b466: feat(tech-stack): use local icons and filter primary skills

## 1.0.6-rc.4

### Patch Changes

- 60786a8: - 2df0669: release: switch 1.0.6-beta.3 from beta to rc
  - 5ccaa8a: style(style): format tech-stack.ts
  - 46ba451: style(components): format tech-tag.tsx
  - 10b53ad: style(components): format providers.tsx
  - fcc293c: style(components): format keyboard-shortcuts.tsx
  - a43b5fa: style(app): format project-card.tsx
  - 3c7352a: style(app): format experience-position-item.tsx
  - f36bd6b: ui(layout): enable global lenis smooth scrolling
  - 2e7c191: style(icons): optimize and add local svg icons
  - 81eb06b: chore(projects): update projects metadata and remove zadark
  - d7a2d4a: ui(nav): conditionally display sponsors links and shortcuts
  - 4651ca6: feat(sponsors): hide page and exclude from sitemap when empty
  - 637b466: feat(tech-stack): use local icons and filter primary skills

## 1.0.6-beta.3

### Patch Changes

- dde9698: - 07f465f: feat(data): update site data
  - 9207484: feat(projects): update projects data
  - b3376b7: feat(projects): show projectImage/logo as cover on slug page when MDX image is absent
  - 4ed20d0: fix(tooling): prefix commit hash in changeset body entries
  - 24dfba7: style(style): format github.ts
  - 61f9b77: style(app): format project-card-preview.tsx
  - 7bbc36f: style(app): format project-card-actions.tsx
  - ab19b99: style(app): format index.tsx
  - f71eb99: style(app): format page.tsx
  - 1ad9a3a: style(style): format github.ts
  - 5bdcb9f: style(app): format project-card-preview.tsx
  - 9043fe9: style(app): format project-card-actions.tsx
  - c6c315a: style(app): format index.tsx
  - 21e18ef: style(app): format page.tsx
  - c437ec2: ui(projects): add github icon next to stars in preview badge
  - 0064353: ui(projects): move github stars badge to top-left of preview card
  - c8c6d0f: feat(projects): show live GitHub star count on project cards

## 1.0.6-beta.2

### Patch Changes

- e57d9d5: - style(style): format tech-stack.ts
  - style(components): format tech-tag.tsx
  - style(app): format tech-stack.tsx
  - style(app): format project-card.tsx
  - style(app): format project-card-preview.tsx
  - style(app): format page.tsx
  - feat(tech-stack): centralize icon mappings, add vercel and github actions, and support logos for all tags
  - fix(providers): suppress next-themes hydration and script console errors in dev
  - ui(projects): configure 'current'/'completed' status values and display status only in header
  - ui(projects): fix project card alignment and height in grid
  - ui(projects): align project card grid visual separation and breakpoints with blog list
  - feat(projects): boost extracted color saturation and add diverse pattern variations based on project ID hash
  - feat(projects): add automatic dominant color extraction for project card backgrounds
  - fix(fetch): add 2-second timeout to external fetches and simplify log output
- 9baa7fd: - style(app): format page.tsx
  - content(projects): remove placeholder quaric and zadark template projects
  - content(projects): revamp all descriptions, pin only portfolio and shoperzz
  - feat(projects): auto-sort by pin+date, logo fallback in preview and OG metadata

## 1.0.6-beta.1

### Patch Changes

- 116f912: - release: switch 1.0.6-alpha.0 from alpha to beta
  - feat(projects): add dynamic themeColor radial glow background and border accent animation
  - refactor(projects): decompose ProjectCard into modular preview, header, and action subcomponents
  - ui(projects): remove popup dialog and route card clicks to details page
  - fix(projects): solve client-side bundler error by passing hasLocalPage prop to ProjectCard
  - style(projects): apply prettier code formatting to project files
  - ui(projects): render projects page categories as grids of ProjectCards
  - ui(projects): render homepage projects as a 2x2 grid of ProjectCards
  - ui(projects): add ProjectCard component with rich hover animations and modal dialog
  - refactor(projects): extend project types and data with card metadata

## 1.0.6-alpha.0

### Patch Changes

- 35d8bbc: - release: switch 1.0.5 from Stable to alpha
  - style(components): format tech-tag.tsx
  - style(app): format site-footer.tsx
  - style(app): format project-item.tsx
  - style(app): format experience-position-item.tsx
  - ui(footer): remove interactive logotype from footer
  - feat(tech-stack): add html, css, prisma, and typeorm with local icon resolution
  - feat(experiences): render work experience and project tags as tech stack badges
  - ui(tech-stack): make stack items and image logos rectangular with rounded-xs shape
  - ui(tech-stack): group stack items with tooltips and rectangular badges

## 1.0.5

### Patch Changes

- 9a5d65e: - chore(deps): remove unused dependencies and clean up boilerplate form component
  - feat(seo): optimize dynamic sitemap routes and allow explicit robots indexing
  - ui(footer): elevate and polish site footer layout and typography
  - style(projects): format imports according to project conventions
  - ui(projects): replace collapsible with link redirecting to projects page on home
  - feat(projects): add github repository links to list and case study pages
  - refactor(llm): optimize routing and format split for llms endpoints
  - chore: formatting and metadata improvements across blog and gallery pages
  - docs(projects): add mdx case studies for newly integrated projects
  - ui(projects): restore collapsible list with sorted chronological categories and simple framed cover
  - ui(mdx): integrate iphone device mockup component and mdx showcase utility
  - ui(gallery): create dynamic gallery route with animated masonry grid
  - fix(routing): set dynamicParams to true for dynamic documents loading
  - docs(blog): add 10 advanced tailwind and shadcn ui libraries post
  - ui(social): configure whatsapp link with E.164 phone number and predefined message
  - add works and projects images and assets
  - style(style): format github-contributions.ts
  - style(components): format avatar-lights.tsx
  - style(app): format profile-header.tsx
  - style(app): format profile-cover.tsx
  - style(app): format index.tsx
  - fix(profile): nest flip sentences children correctly to resolve eslint error
  - ui(experiences): add local company logo image files
  - ui(experiences): link local image logos for unity link and devia technologies
  - ui(experiences): add work experiences for unity link and devia technologies
  - fix(github): improve contribution graph colors and data fetching robustness
  - ui(social): add reddit and bluesky with local svg icons
  - ui(profile): integrate flip sentences into header metadata box
  - ui(profile): remove bio description and use premium square contact button
  - ui(cover): remove central logo and integrate minimal cyber-premium status badges
  - refactor(profile): simplify Overview component to render occupations exclusively
  - ui(profile): redesign ProfileHeader into premium X-style profile layout
  - ui(avatar): support square shape variants with rounded corners
  - style(style): format vendure-headless-commerce.mdx
  - style(style): format shoperzz-open-source-commerce-engine.mdx
  - style(style): format magicui-inspiration.mdx
  - docs(blog): remove legacy template blog posts
  - docs(blog): add magicui inspiration blog post
  - docs(blog): add vendure headless commerce blog post
  - docs(blog): add shoperzz open source commerce engine blog post
  - ui(blog): render cover image using FramedImage under description
  - feat(release): generate cumulative stable release notes since last stable tag
- f7c01dc: - release: switch 1.0.4 from Stable to alpha
  - style(style): format release-1780375502.md
  - release: 1.0.4
- ea1880f: - release: switch 1.0.4 from alpha to beta
  - chore: remove old file of changeset
  - chore(config): adjust allowed dev origins and remote patterns in next.config.ts
  - feat(config): support explicit id fields for social link redirects
  - chore(config): remove legacy redirects from next.config.ts
  - chore(config): dynamically generate redirects for social links
  - chore(portfolio): configure experiences, sponsors, social links, and tech stack
  - ui(tech-stack): re-order entries and add linux, bash, and antigravity
  - ui(tech-stack): fetch technology logos dynamically from GitHub repos
  - ui(projects): fallback to github avatar for projects and update OG assets
- acf2bcb: - chore: remove tests certifications mdx files
  - feat(navigation): hide certifications links and home widget when empty
  - ui(navigation): revamp not found page with dynamic context and actions
  - ui(certifications): add coming soon empty state layout
  - fix(blog): filter blog homepage feed, RSS, and sitemap by category
  - feat(certifications): add certifications section with mdx support and homepage integration
  - refactor(content): separate blog and project documents into dedicated folders
- 7165f19: - release: switch 1.0.5-beta.2 from beta to rc
  - chore(root): remove obsolete files ansi.flf and portless.json
- 7d1b787: - style(components): format theme-switcher.tsx
  - style(components): format TargetCursor.tsx
  - style(app): format gallery.tsx
  - refactor(gallery): restore original animated masonry grid layout
  - fix(image): resolve image aspect ratio mismatch and LCP preload warnings in console
  - feat(gallery): integrate StickyCard002 slider for page-scroll card-swipe captures
  - fix(cursor): resolve any casting and react-hooks lint errors in TargetCursor
  - feat(gallery): add touch-drag gallery carousel utilizing GSAP and react-medium-image-zoom
  - chore(deps): install @gsap/react and lenis dependencies
  - refactor(not-found): relocate not-found components and pages
  - feat(theme): integrate ThemeSwitcher component in SiteHeader
  - refactor(footer): relocate site footer to app-specific components directory

## 1.0.5-rc.3

### Patch Changes

- 7165f19: - release: switch 1.0.5-beta.2 from beta to rc
  - chore(root): remove obsolete files ansi.flf and portless.json
- 7d1b787: - style(components): format theme-switcher.tsx
  - style(components): format TargetCursor.tsx
  - style(app): format gallery.tsx
  - refactor(gallery): restore original animated masonry grid layout
  - fix(image): resolve image aspect ratio mismatch and LCP preload warnings in console
  - feat(gallery): integrate StickyCard002 slider for page-scroll card-swipe captures
  - fix(cursor): resolve any casting and react-hooks lint errors in TargetCursor
  - feat(gallery): add touch-drag gallery carousel utilizing GSAP and react-medium-image-zoom
  - chore(deps): install @gsap/react and lenis dependencies
  - refactor(not-found): relocate not-found components and pages
  - feat(theme): integrate ThemeSwitcher component in SiteHeader
  - refactor(footer): relocate site footer to app-specific components directory

## 1.0.5-beta.2

### Patch Changes

- acf2bcb: - chore: remove tests certifications mdx files
  - feat(navigation): hide certifications links and home widget when empty
  - ui(navigation): revamp not found page with dynamic context and actions
  - ui(certifications): add coming soon empty state layout
  - fix(blog): filter blog homepage feed, RSS, and sitemap by category
  - feat(certifications): add certifications section with mdx support and homepage integration
  - refactor(content): separate blog and project documents into dedicated folders

## 1.0.5-beta.1

### Patch Changes

- ea1880f: - release: switch 1.0.4 from alpha to beta
  - chore: remove old file of changeset
  - chore(config): adjust allowed dev origins and remote patterns in next.config.ts
  - feat(config): support explicit id fields for social link redirects
  - chore(config): remove legacy redirects from next.config.ts
  - chore(config): dynamically generate redirects for social links
  - chore(portfolio): configure experiences, sponsors, social links, and tech stack
  - ui(tech-stack): re-order entries and add linux, bash, and antigravity
  - ui(tech-stack): fetch technology logos dynamically from GitHub repos
  - ui(projects): fallback to github avatar for projects and update OG assets

## 1.0.5-alpha.0

### Patch Changes

- 9a5d65e: - chore(deps): remove unused dependencies and clean up boilerplate form component
  - feat(seo): optimize dynamic sitemap routes and allow explicit robots indexing
  - ui(footer): elevate and polish site footer layout and typography
  - style(projects): format imports according to project conventions
  - ui(projects): replace collapsible with link redirecting to projects page on home
  - feat(projects): add github repository links to list and case study pages
  - refactor(llm): optimize routing and format split for llms endpoints
  - chore: formatting and metadata improvements across blog and gallery pages
  - docs(projects): add mdx case studies for newly integrated projects
  - ui(projects): restore collapsible list with sorted chronological categories and simple framed cover
  - ui(mdx): integrate iphone device mockup component and mdx showcase utility
  - ui(gallery): create dynamic gallery route with animated masonry grid
  - fix(routing): set dynamicParams to true for dynamic documents loading
  - docs(blog): add 10 advanced tailwind and shadcn ui libraries post
  - ui(social): configure whatsapp link with E.164 phone number and predefined message
  - add works and projects images and assets
  - style(style): format github-contributions.ts
  - style(components): format avatar-lights.tsx
  - style(app): format profile-header.tsx
  - style(app): format profile-cover.tsx
  - style(app): format index.tsx
  - fix(profile): nest flip sentences children correctly to resolve eslint error
  - ui(experiences): add local company logo image files
  - ui(experiences): link local image logos for unity link and devia technologies
  - ui(experiences): add work experiences for unity link and devia technologies
  - fix(github): improve contribution graph colors and data fetching robustness
  - ui(social): add reddit and bluesky with local svg icons
  - ui(profile): integrate flip sentences into header metadata box
  - ui(profile): remove bio description and use premium square contact button
  - ui(cover): remove central logo and integrate minimal cyber-premium status badges
  - refactor(profile): simplify Overview component to render occupations exclusively
  - ui(profile): redesign ProfileHeader into premium X-style profile layout
  - ui(avatar): support square shape variants with rounded corners
  - style(style): format vendure-headless-commerce.mdx
  - style(style): format shoperzz-open-source-commerce-engine.mdx
  - style(style): format magicui-inspiration.mdx
  - docs(blog): remove legacy template blog posts
  - docs(blog): add magicui inspiration blog post
  - docs(blog): add vendure headless commerce blog post
  - docs(blog): add shoperzz open source commerce engine blog post
  - ui(blog): render cover image using FramedImage under description
  - feat(release): generate cumulative stable release notes since last stable tag
- f7c01dc: - release: switch 1.0.4 from Stable to alpha
  - style(style): format release-1780375502.md
  - release: 1.0.4

## 1.0.4

### Patch Changes

- 9a5d65e: - chore(deps): remove unused dependencies and clean up boilerplate form component
  - feat(seo): optimize dynamic sitemap routes and allow explicit robots indexing
  - ui(footer): elevate and polish site footer layout and typography
  - style(projects): format imports according to project conventions
  - ui(projects): replace collapsible with link redirecting to projects page on home
  - feat(projects): add github repository links to list and case study pages
  - refactor(llm): optimize routing and format split for llms endpoints
  - chore: formatting and metadata improvements across blog and gallery pages
  - docs(projects): add mdx case studies for newly integrated projects
  - ui(projects): restore collapsible list with sorted chronological categories and simple framed cover
  - ui(mdx): integrate iphone device mockup component and mdx showcase utility
  - ui(gallery): create dynamic gallery route with animated masonry grid
  - fix(routing): set dynamicParams to true for dynamic documents loading
  - docs(blog): add 10 advanced tailwind and shadcn ui libraries post
  - ui(social): configure whatsapp link with E.164 phone number and predefined message
  - add works and projects images and assets
  - style(style): format github-contributions.ts
  - style(components): format avatar-lights.tsx
  - style(app): format profile-header.tsx
  - style(app): format profile-cover.tsx
  - style(app): format index.tsx
  - fix(profile): nest flip sentences children correctly to resolve eslint error
  - ui(experiences): add local company logo image files
  - ui(experiences): link local image logos for unity link and devia technologies
  - ui(experiences): add work experiences for unity link and devia technologies
  - fix(github): improve contribution graph colors and data fetching robustness
  - ui(social): add reddit and bluesky with local svg icons
  - ui(profile): integrate flip sentences into header metadata box
  - ui(profile): remove bio description and use premium square contact button
  - ui(cover): remove central logo and integrate minimal cyber-premium status badges
  - refactor(profile): simplify Overview component to render occupations exclusively
  - ui(profile): redesign ProfileHeader into premium X-style profile layout
  - ui(avatar): support square shape variants with rounded corners
  - style(style): format vendure-headless-commerce.mdx
  - style(style): format shoperzz-open-source-commerce-engine.mdx
  - style(style): format magicui-inspiration.mdx
  - docs(blog): remove legacy template blog posts
  - docs(blog): add magicui inspiration blog post
  - docs(blog): add vendure headless commerce blog post
  - docs(blog): add shoperzz open source commerce engine blog post
  - ui(blog): render cover image using FramedImage under description
  - feat(release): generate cumulative stable release notes since last stable tag

## 1.0.3

### Patch Changes

- 1bc0cc1: - Minor updates and improvements
- bffe019: - release: switch 1.0.3-alpha.0 from alpha to beta
  - fix(release): resolve earliest merge commit lookup for pull request numbers
  - chore(version): ignore channel switches when collecting intent commits
  - feat(ci): link commit hashes to GitHub and remove checklist in PR body
  - chore(version): show exact forecasted version increments dynamically
- 8521c1a: - fix(version): align forecast track switch versions with changesets
  - fix(version): align next version prediction index with changesets
  - feat(ci): automate and customize Changesets Release PR description layout
- 9647303: - ci(cache): correct and optimize nextjs build caching
- 441401d: - ci(style): restrict prettier auto commit to main repository branches
  - ci(triggers): ignore documentation and changesets to prevent redundant runs

## 1.0.3-beta.4

### Patch Changes

- 441401d: - ci(style): restrict prettier auto commit to main repository branches
  - ci(triggers): ignore documentation and changesets to prevent redundant runs

## 1.0.3-beta.3

### Patch Changes

- 9647303: - ci(cache): correct and optimize nextjs build caching

## 1.0.3-beta.2

### Patch Changes

- 8521c1a: - fix(version): align forecast track switch versions with changesets
  - fix(version): align next version prediction index with changesets
  - feat(ci): automate and customize Changesets Release PR description layout

## 1.0.3-beta.1

### Patch Changes

- bffe019: - release: switch 1.0.3-alpha.0 from alpha to beta
  - fix(release): resolve earliest merge commit lookup for pull request numbers
  - chore(version): ignore channel switches when collecting intent commits
  - feat(ci): link commit hashes to GitHub and remove checklist in PR body
  - chore(version): show exact forecasted version increments dynamically

## 1.0.3-alpha.0

### Patch Changes

- 1bc0cc1: - Minor updates and improvements

## 1.0.2

### Patch Changes

- e5738a8: - refactor(release): format commit hashes in release notes for github autolinking
  - refactor(tooling): filter out old commits in intent manager using last release reference

## 1.0.1

### Patch Changes

- 7880566: - refactor(tooling): improve DX and guidance in intent manager script
  - release: switch 1.0.1-alpha.0 from beta to rc
  - style: reformat profile-cover.tsx and 10 other files
  - refactor(core): decouple application files from registry imports
  - refactor(components): extract registry components to standalone visual modules
  - docs(content): remove component documentation pages
  - refactor(registry): remove component registry and block resources
  - chore(deps): remove registry scripts and unused devDependencies
  - refactor(release): enhance intent manager UX with dynamic version previews and prompt flows
  - ci(workflows): enable CI and release workflows on dev branch
  - release: switch 1.0.1-alpha.0 from alpha to beta
  - chore: update package.json metadata
  - chore: remove old file of changeset
  - fix(release): prepend commit hash to bullet items in release notes
  - release: 1.0.1-alpha.0 (alpha)
  - release: 1.0.1-alpha.0
  - fix(release): resolve git author name to github handle in release notes
  - chore(release): integrate release creation in github publish hook and make target branch dynamic
  - release: switch 1.0.0 from Stable to alpha
  - style: reformat page.tsx

## 1.0.1-rc.1

### Patch Changes

- 7880566: - refactor(tooling): improve DX and guidance in intent manager script
  - release: switch 1.0.1-alpha.0 from beta to rc
  - style: reformat profile-cover.tsx and 10 other files
  - refactor(core): decouple application files from registry imports
  - refactor(components): extract registry components to standalone visual modules
  - docs(content): remove component documentation pages
  - refactor(registry): remove component registry and block resources
  - chore(deps): remove registry scripts and unused devDependencies
  - refactor(release): enhance intent manager UX with dynamic version previews and prompt flows
  - ci(workflows): enable CI and release workflows on dev branch
  - release: switch 1.0.1-alpha.0 from alpha to beta
  - chore: update package.json metadata
  - chore: remove old file of changeset
  - fix(release): prepend commit hash to bullet items in release notes
  - release: 1.0.1-alpha.0 (alpha)
  - release: 1.0.1-alpha.0
  - fix(release): resolve git author name to github handle in release notes
  - chore(release): integrate release creation in github publish hook and make target branch dynamic
  - release: switch 1.0.0 from Stable to alpha
  - style: reformat page.tsx

## 1.0.1-alpha.0

### Patch Changes

- b6f2bb3: - chore(release): fix semver calculation and improve push orchestrator governance
  - chore: add .antigravitycli to .gitignore
  - chore(ci): add typecheck script alias in package.json
  - refactor(brand): remove remaining traces of former author in profile and configs
  - chore(blocks): remove blocks routes, showcase components and manifest
  - refactor(ui): reorganize portfolio, blog and sponsor components for better colocation
  - ui(brand): transition brand identity from chanhdai to wistant
  - ci: fix obsolete commands and version mismatches in workflows
  - docs: update bug report template product name ci: remove stylistic comments from github release workflow
  - chore: update contact links and CI workflow configuration
  - feat(blog): update blog title to "My Blog 📚"
  - feat: update about section title and justify text
  - update portfolio identity and project data
  - chore: add semver dependency and update to 7.7.4
  - add works and projects images and assets
  - add certifications icons assets
  - add icons assets
  - ci: upgrade node-version to 22 in github actions workflows
  - ci: upgrade node-version to 22 in github actions workflows
  - chore(ci): bump pnpm version and simplify workflow headers
- 87c065c: - fix(release): resolve git author name to github handle in release notes
  - chore(release): integrate release creation in github publish hook and make target branch dynamic
  - release: switch 1.0.0 from Stable to alpha
  - style: reformat page.tsx
  - fix(ci): resolve ESLint unused-vars and any type warnings in next.d.ts and page.tsx
  - release: 1.0.1
  - style: reformat modified components and pages with prettier
  - chore(release): improve push orchestrator flow and fix nextjs compilation
  - chore(release): fix semver calculation and improve push orchestrator governance
  - chore: add .antigravitycli to .gitignore
  - chore(ci): add typecheck script alias in package.json
  - refactor(brand): remove remaining traces of former author in profile and configs
  - chore(blocks): remove blocks routes, showcase components and manifest
  - refactor(ui): reorganize portfolio, blog and sponsor components for better colocation
  - ui(brand): transition brand identity from chanhdai to wistant
  - ci: fix obsolete commands and version mismatches in workflows
  - docs: update bug report template product name ci: remove stylistic comments from github release workflow
  - chore: update contact links and CI workflow configuration
  - feat(blog): update blog title to "My Blog 📚"
  - feat: update about section title and justify text
