---
name: profile-architecture
description: >
  Profile page architecture for this portfolio. Covers the bento grid layout, bilingual i18n system with translations Record, computed signal pattern, and utility classes. Trigger: Working on or modifying the profile page (/profile), adding/editing bilingual profile data, or changing the profile layout.
license: Apache-2.0
metadata:
  author: moonslayers
  version: "1.1"
  scope: [root]
  auto_invoke:
    - "Profile page modifications"
    - "Profile data changes"
    - "Profile layout/design changes"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# Profile Architecture

## When to Load
- Working on or modifying the profile page (`/profile`)
- Creating new portfolio pages that follow the same architecture (contact, career, etc.)
- Adding/editing bilingual content with the `translations: Record<Language, T>` pattern
- Changing the profile page layout
- Understanding how i18n works for bilingual data

## Key Files

```
src/app/types/
├── profile.types.ts                  # Core types: Profile, Experience, Education, etc.
├── profile-translation.types.ts      # Translatable content types: ProfileTranslatedContent

src/app/data/
├── profile.data.ts                   # PROFILE_DATA with bilingual translations Record
├── experience.data.ts                # Shared experience data (single source of truth)

src/app/pages/profile/
├── profile-page.ts                   # Standalone component with OnPush
├── profile-page.html                 # Bento grid template
└── profile-page.scss                 # Empty (all Bootstrap)

src/styles.scss                       # Utility classes: .min-width-0, .icon-40, .icon-44, .text-pre-line
```

> Experience data is now defined in `experience.data.ts` and imported by both profile and career. Profile's projects section uses this data.

## Architecture Pattern

### Data Separation
Profile data follows the same pattern as Projects (`projects.data.ts` / `project.types.ts`):

- **Non-translatable data** at the top level of `Profile`:
  - `name`, `email`, `phone`, `github`, `linkedin`
  - `skills[]` (uses `categoryKey` referencing i18n keys)
  - `languages[]` (uses `levelKey` referencing i18n keys)
  - `experience[]` (only `key`, `company`, `period`, `technologies`)
  - `education[]` (only `institution`, `period`)
  - `certifications[]` (only `issuer?`, `date?`)

- **All translatable text** inside `translations: Record<Language, ProfileTranslatedContent>`:
  - `role`, `location`, `bio`
  - `experience[].role`, `description`, `highlights?`
  - `education[].degree`, `description?`
  - `certifications[].name`

### Reactivity Pattern
```typescript
// In profile-page.ts
protected readonly profileTranslation = computed(
  () => this.profile.translations[this.translationService.currentLang()]
);
```

### Search Filtering (added July 2026)

Profile page now supports global search via `SearchService`. The component injects `SearchService` and defines computed signals that filter each section:

- `isSearchActive` — true when search term is non-empty
- `filteredSkills` — filters skill names AND category keys
- `filteredLanguages` — filters by name and translated level
- `filteredEducation` — filters by institution, translated degree/description
- `filteredCertifications` — filters by translated name, issuer, date
- `filteredProjects` — filters by company, technologies, translated role

Template pattern: each filterable section is wrapped with:
```html
@if (!isSearchActive() || filteredSkills().length > 0) {
  <!-- section card -->
}
```
Hero and About sections remain always visible (never hidden by search).

### Template Access
```html
<!-- Static data -->
{{ profile.name }}
{{ exp.company }}

<!-- Translatable data -->
{{ profileTranslation().role }}
{{ profileTranslation().experience[$index].description }}

<!-- i18n labels -->
{{ t()['profile.experience.title'] }}
```

### Matching by Index
Translatable content is matched to non-translatable data by **array index** (not by key):
- `profile.experience[i]` ↔ `profileTranslation().experience[i]`
- This means order must remain consistent between both arrays.

## Bento Grid Layout

Desktop layout (≥lg breakpoint):
```
┌───────────────────────┬────────────────┐
│                       │  Languages     │
│       HERO            ├────────────────┤
│     (col-lg-8)        │  Education     │
│                       │  (col-lg-4)    │
├───────────────────────┴────────────────┤
│              ABOUT (col-12)            │
├────────────────────┬───────────────────┤
│   SKILLS (col-7)   │  CERTS (col-5)   │
├────────────────────┴───────────────────┤
│           PROJECTS (col-12)            │
└────────────────────────────────────────┘
```

Mobile (<lg): Everything stacks to col-12.

Key classes: `card border-0 shadow h-100`, `row g-4`, `d-flex flex-wrap gap-1`, badges with `bg-primary bg-opacity-10`.

## Common Pitfalls

### 1. Track en @for
❌ `track exp.company` con nombres de empresa duplicados → Error `NG0950` en runtime
✅ Siempre usar `track $index` en bucles de experience/education/certifications

### 2. Clase min-width-0 no es de Bootstrap
No existe en Bootstrap. Definir en `styles.scss`:
```scss
.min-width-0 { min-width: 0; }
```

### 3. Inline styles vs Clases
Preferir clases utilitarias en `styles.scss`:
```scss
.icon-40 { width: 40px; height: 40px; }
.icon-44 { width: 44px; height: 44px; }
.text-pre-line { white-space: pre-line; }
```

### 4. Section visibility under search
When adding a new filterable section, wrap it with:
```html
@if (!isSearchActive() || filteredData().length > 0) {
```
This ensures sections hidden by search don't show empty cards.

## Special Notes
- The profile uses "moonslayers" as the display name (not the real name)
- No email, phone, or LinkedIn are shown — only GitHub (privacy preference)
- All section labels use `t()['profile.*']` keys defined in translation system
- Component uses `ChangeDetectionStrategy.OnPush`
- No Bootstrap JS (`data-bs-*`) — all interactivity via Angular signals + @if
- **Contact card was moved to its own page** at `/contact` (see `src/app/pages/contact/`). The data separation pattern (`types → data → page`) is identical to the profile architecture.
- **Experience card section was moved to the Career page** (`/career`). The Profile page no longer has an experience card section, though the projects section at the bottom still uses experience data from `experience.data.ts`.
