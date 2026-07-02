---
name: career-architecture
description: >
  Career page architecture for this portfolio. Covers the alternating timeline layout, bilingual i18n system with translations Record, computed signal pattern, and shared experience data. Trigger: Working on or modifying the career page (/career), adding/editing career timeline entries, modifying timeline visual layout, or touching shared experience data (experience.data.ts).
license: Apache-2.0
metadata:
  author: moonslayers
  version: "1.0"
  scope: [root]
  auto_invoke:
    - "Career page modifications"
    - "Career timeline data changes"
    - "Career layout/design changes"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# Career Architecture

## When to Load
- Working on or modifying the career page (`/career`)
- Adding/editing career timeline entries
- Modifying the timeline visual layout (alternating, dots, line, responsiveness)
- Touching shared experience data in `experience.data.ts`
- Changing career translations or adding new i18n keys
- Understanding how the timeline search/filter works

## Key Files

```
src/app/types/
├── career.types.ts                  # Core types: CareerData, CareerEntry, CareerStats
├── career-translation.types.ts      # Translatable content types: CareerTranslatedContent, TranslatableCareerEntry

src/app/data/
├── experience.data.ts               # SINGLE SOURCE OF TRUTH: RAW_EXPERIENCE_ENTRIES + translation arrays
├── career.data.ts                   # CAREER_DATA importing from experience.data.ts, adding stats

src/app/pages/career/
├── career-page.ts                   # Standalone component with OnPush, computed signals for search
├── career-page.html                 # Alternating timeline + stats ribbon template
└── career-page.scss                 # Timeline center line and dot styles (no custom Bootstrap overrides)
```

## Architecture Pattern

### Shared Experience Data
`experience.data.ts` is the **single source of truth** for all experience entries. Both `profile.data.ts` and `career.data.ts` import from it:

```typescript
// career.data.ts
import { RAW_EXPERIENCE_ENTRIES, RAW_EXPERIENCE_TRANSLATIONS_ES, RAW_EXPERIENCE_TRANSLATIONS_EN } from './experience.data';
```

`CareerEntry` adds `startYear`/`endYear` fields that profile's `Experience` type does not have, but TypeScript structural typing allows profile to use entries with extra fields without error.

### Data Separation
- **Static data** at the top level of `CareerData`: `stats`, `entries[]` (has `company`, `period`, `technologies`)
- **All translatable text** inside `translations: Record<Language, CareerTranslatedContent>`: `entries[].role`, `description`, `highlights?`

### Alternating Timeline Layout
Desktop (≥768px):
```
┌──────────────────┐                  ┌──────────────────┐
│   Entry 0 (L)    │       ●          │                  │
├──────────────────┤    ───┼───       ├──────────────────┤
│                  │       ●          │   Entry 1 (R)    │
├──────────────────┤    ───┼───       ├──────────────────┤
│   Entry 2 (L)    │       ●          │                  │
└──────────────────┘                  └──────────────────┘
```

Key class pattern for alternating:
```html
<div class="col-12 col-md-6" [class.offset-md-6]="$index % 2 !== 0">
```

Mobile (<768px): Center line and dots hidden, all entries stack to `col-12`.

### Timeline CSS
- **Center line**: `.timeline::before` pseudo-element — `left: 50%`, 2px width, `var(--bs-primary)` with 0.2 opacity
- **Dots**: `.timeline-dot` divs (not pseudo-elements — avoids nth-child complexity) — 14px circle, centered, on top of the line
- **Mobile**: `@media (max-width: 767.98px)` hides both `::before` and `.timeline-dot`

### Stats Ribbon
3 cards in `row g-4` with `col-12 col-md-4`, each with an icon (`bi-briefcase`, `bi-building`, `bi-code-slash`), display-4 number from `career.stats`, and a translated label.

## Reactivity Pattern

```typescript
// In career-page.ts
private readonly translationService = inject(TranslationService);
private readonly searchService = inject(SearchService);

protected readonly t = this.translationService.t;
protected readonly career = CAREER_DATA;
protected readonly careerTranslation = computed(
  () => this.career.translations[this.translationService.currentLang()]
);

protected readonly filteredEntries = computed(() => {
  const search = this.searchService.searchTerm().toLowerCase().trim();
  if (!search) return this.career.entries;

  const tr = this.careerTranslation();
  return this.career.entries.filter((entry, i) => {
    const searchableText = [
      entry.company,
      tr.entries[i]?.role ?? '',
      tr.entries[i]?.description ?? '',
      ...(tr.entries[i]?.highlights ?? []),
      ...entry.technologies,
    ].filter(Boolean).join(' ').toLowerCase();
    return searchableText.includes(search);
  });
});

protected readonly hasNoResults = computed(
  () => this.searchService.searchTerm().trim().length > 0 && this.filteredEntries().length === 0
);
```

## Template Access

```html
<!-- Static data -->
{{ entry.company }}
{{ entry.period }}
{{ entry.technologies }}

<!-- Translatable data (matched by index) -->
{{ careerTranslation().entries[$index]?.role }}
{{ careerTranslation().entries[$index]?.description }}

<!-- i18n labels -->
{{ t()['career.pageTitle'] }}
{{ t()['career.stats.yearsExperience'] }}
```

### Matching by Index
Translatable content is matched to static entries by **array index** (not by key):
- `career.entries[i]` ↔ `careerTranslation().entries[i]`
- Order must remain consistent between `RAW_EXPERIENCE_ENTRIES` and both translation arrays.

## Search/Filter Pattern
- Searches across: company name, translated role, translated description, translated highlights list, and technologies array
- No results state (`hasNoResults()` is true): timeline section and header hidden via `@if (!hasNoResults())`; separate `@if (hasNoResults())` block shows a centered search icon (`bi-search`) and message

## Tech Badge Colors
Same cycling pattern as profile page:
```typescript
protected readonly techColors = ['primary', 'success', 'info', 'warning', 'danger', 'secondary'] as const;
```

Usage: `bg-{{ techColors[$index % techColors.length] }} bg-opacity-10 text-{{ ... }} border border-{{ ... }} border-opacity-25`

## Highlight Icons
Uses `bi-star-fill text-warning` (not `bi-check-circle-fill` like the profile page uses).

## Common Pitfalls

### 1. Track en @for
❌ `track entry.key` — puede causar errores si hay valores repetidos
✅ Siempre usar `track $index` en bucles de timeline entries, highlights y tecnologías

### 2. Timeline dots como pseudo-elementos
❌ Usar `::after` en `.timeline-entry` con nth-child — complejo y frágil
✅ Usar `<div class="timeline-dot" aria-hidden="true"></div>` — simple, mantenible, no requiere nth-child

### 3. aria-hidden en dots
Los dots son puramente decorativos. Siempre incluir `aria-hidden="true"` en el div `.timeline-dot`.

### 4. No results state fuera del timeline
El header "Timeline" y el timeline container deben estar envueltos juntos dentro de `@if (!hasNoResults())`. No separarlos o se verá el título sin entries.

### 5. Bootstrap JS no funciona
No usar `data-bs-*` attributes. Toda interactividad (search) es mediante Angular signals + `@if`.

## Special Notes
- `experience.data.ts` es el **single source of truth** — cualquier cambio a entries debe hacerse ahí
- `CareerEntry` tiene campos `startYear`/`endYear` que `Experience` (profile) no tiene — esto funciona gracias a structural typing de TypeScript
- Component uses `ChangeDetectionStrategy.OnPush`
- No Bootstrap JS (`data-bs-*`) — all interactivity via Angular signals + `@if`
- All section labels use `t()['career.*']` keys defined in translation system
- The timeline entry period badge uses `bg-primary bg-opacity-10 text-primary rounded-pill` with `bi-clock`
