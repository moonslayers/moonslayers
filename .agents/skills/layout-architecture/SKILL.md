# Skill: layout-architecture

## When to Use

- Modifying the shell/layout structure (LayoutComponent, sidebar, topbar)
- Adding or changing navigation items in the sidebar
- Working on the topbar (branding, search, actions, profile)
- Debugging mobile sidebar overlay or z-index issues
- Understanding how SidebarService connects sidebar ↔ topbar ↔ backdrop
- Any change to `layout.component.*`, `sidebar.component.*`, or `topbar.component.*`

## Critical Architecture

### Layout Structure (Vertical Column)

```
<div class="d-flex flex-column vh-100">
  <app-topbar />                           <!-- Full width, natural height -->
  <div class="d-flex flex-grow-1 overflow-hidden">
    <app-sidebar />                        <!-- 260px fixed, collapses to 0 -->
    <main class="flex-grow-1 overflow-auto p-4">
      <router-outlet />                    <!-- All child routes render here -->
    </main>
  </div>
</div>
```

The layout is a **vertical column**: topbar spans full width at the top, sidebar + main content form a horizontal row below. The topbar is NOT nested inside the sidebar — they are structural siblings.

### Key Files

| File | Purpose |
|------|---------|
| `src/app/layout/layout.component.ts` | Shell wrapper, minimal logic |
| `src/app/layout/layout.component.html` | Flex column layout (topbar → row with sidebar + main) |
| `src/app/layout/topbar/topbar.component.ts` | Topbar logic: search toggle, notifications, language, theme |
| `src/app/layout/topbar/topbar.component.html` | Branding → burger → search → action buttons → profile |
| `src/app/layout/sidebar/sidebar.component.ts` | Recursive menu rendering, submenu toggle, sections signal |
| `src/app/layout/sidebar/sidebar.component.html` | Nav items (recursive `ngTemplateOutlet`), profile footer, backdrop |
| `src/app/layout/sidebar/sidebar.component.scss` | Width, transitions, z-index, mobile overlay, submenu animation |
| `src/app/core/services/sidebar.service.ts` | Singleton: `isOpen()` signal, `toggle()`, `close()` |

### SidebarService (Shared State)

```typescript
// The single source of truth for sidebar open/close state.
// Injected by sidebar, topbar, and backdrop.
// Provided in root.

isOpen(): boolean    // Reactive signal
toggle(): void       // Flip isOpen
close(): void        // Set isOpen to false
```

### Topbar Left-Side Order

The left side of the topbar MUST follow this order:
1. **Branding** (moon icon `bi-moon-stars`, app name via `t()['topbar.branding.name']`, version badge via `t()['topbar.branding.version']`)
2. **Burger button** (`bi-list`, calls `sidebarService.toggle()`)
3. **Desktop search** (`d-none d-md-flex`, input group)

### Z-Index Stacking (Critical for Mobile)

```
Sidebar:     1060   (was 1040, fixed to be above backdrop)
Backdrop:    1050   (fixed, covers content but under sidebar)
Topbar:      auto   (in flow, no z-index needed)
```

**Why 1060 > 1050:** On mobile, the sidebar is `position: fixed` and the backdrop is also `position: fixed`. The sidebar MUST have a higher z-index than the backdrop so menu items are clickable. If the backdrop is above the sidebar, it intercepts all clicks and the sidebar becomes unusable.

### Mobile Overlay Mechanics

```scss
@media (max-width: 991.98px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    transform: translateX(-100%);      // Hidden by default
    width: 260px !important;
  }
  .sidebar.is-open {
    transform: translateX(0);           // Slides in from left
  }
}
```

- Breaks at **992px** (Bootstrap's `lg` breakpoint)
- Covers full viewport including topbar area
- Backdrop covers full screen (`position: fixed; inset: 0`)
- Backdrop click/tap calls `sidebarService.close()`

### Desktop Collapse (No Overlay)

```scss
.sidebar { width: 260px; transition: width 0.3s ease; }
.sidebar:not(.is-open) { width: 0; }
.sidebar-backdrop { display: none; }   // Never shown on desktop
```

## Patterns & Conventions

### Bootstrap-Only Approach (NO Custom CSS)

Per `AGENTS.md`: "Nunca uses estilos personalizado, siempre usa clases de bootstrap." The SCSS files only contain what Bootstrap CANNOT do:
- Fixed widths and transitions
- Z-indexes
- Animations (slideDown for submenus)
- Mobile-specific overrides

### i18n Usage

- Topbar branding: `t()['topbar.branding.name']`, `t()['topbar.branding.version']`
- Sidebar profile/logout: `t()['sidebar.logout']`
- Aria labels: `t()['aria.toggleSidebar']`, `t()['aria.closeMenu']`
- Topbar buttons: `t()['aria.search']`, `t()['aria.theme']`, `t()['aria.notifications']`, `t()['aria.language']`

### Recursive Menu Template

The sidebar uses an `ng-template #menuRecursion` with `ngTemplateOutlet` for recursive rendering of nested menu items at any depth. Each item is either:
- **Expandable** (has `children`): button with chevron arrow, submenu with `slideDown` animation
- **Leaf**: `<a>` with `routerLink` and `routerLinkActive`

Section headers (e.g., "Management", "Settings") are rendered via `getSectionTitle()` using i18n keys.

## Important Constraints

- **Bootstrap JS is INCOMPATIBLE with Angular.** Do NOT use `data-bs-toggle`, `data-bs-dismiss`, or any Bootstrap JS API. Use Angular signals + `@if` + `(click)` for all interactivity.
- **Bootstrap JS must NOT be in `angular.json` scripts array.** It was removed to stay under the 1 MB build budget. Re-adding it will break the build.
- **Sidebar uses `h-100` (not `vh-100`)** because it's inside a `flex-grow-1` parent in the new column layout.
- **All visible strings must use i18n** via `TranslationService.t()` computed signal.
- **Never use custom CSS if Bootstrap has a utility class for it.**

## Common Pitfalls

| Pitfall | Fix |
|---------|-----|
| Sidebar items unclickable on mobile | Ensure sidebar z-index (1060) > backdrop z-index (1050) |
| Sidebar doesn't fill height | Use `h-100` instead of `vh-100` |
| Burger button not toggling sidebar | Verify `SidebarService` is injected and `toggle()` is called |
| Build budget exceeded | Check if Bootstrap JS was re-added to `angular.json` scripts |
| Branding missing from topbar | Ensure branding div is before burger button in template |
| Submenu arrow not rotating | Check `.sidebar-arrow.expanded` class is applied (CSS rotates 180deg) |
