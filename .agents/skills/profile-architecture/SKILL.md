---
name: profile-architecture
description: >
  Profile page architecture for this portfolio. Covers the bento grid layout, bilingual i18n system with translations Record, computed signal pattern, and utility classes. Trigger: Working on or modifying the profile page (/profile), adding/editing bilingual profile data, or changing the profile layout.
license: Apache-2.0
metadata:
  author: moonslayers
  version: "1.0"
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
- Adding/editing profile data (bilingual content)
- Changing the profile page layout
- Understanding how i18n works for profile data

## Key Files

```
src/app/types/
├── profile.types.ts                  # Core types: Profile, Experience, Education, etc.
├── profile-translation.types.ts      # Translatable content types: ProfileTranslatedContent

src/app/data/
├── profile.data.ts                   # PROFILE_DATA with bilingual translations Record

src/app/pages/profile/
├── profile-page.ts                   # Standalone component with OnPush
├── profile-page.html                 # Bento grid template
└── profile-page.scss                 # Empty (all Bootstrap)

src/styles.scss                       # Utility classes: .min-width-0, .icon-40, .icon-44, .text-pre-line
```

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
├────────────────────────────────────────┤
│           EXPERIENCE (col-12)          │
├────────────────────┬───────────────────┤
│   SKILLS (col-7)   │  CERTS (col-5)   │
├────────────────────┴───────────────────┤
│  PROJECTS (col-8)   │ CONTACT (col-4)  │
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

## Special Notes
- The profile uses "moonslayers" as the display name (not the real name)
- No email, phone, or LinkedIn are shown — only GitHub (privacy preference)
- All section labels use `t()['profile.*']` keys defined in translation system
- Component uses `ChangeDetectionStrategy.OnPush`
- No Bootstrap JS (`data-bs-*`) — all interactivity via Angular signals + @if
