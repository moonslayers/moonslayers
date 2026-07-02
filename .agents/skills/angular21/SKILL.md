---
name: angular21
description: >
  Angular v21+ best practices and patterns. Trigger: Angular components, services, directives, pipes, or Angular-specific code.
license: Apache-2.0
metadata:
  author: prowler-cloud
  version: "1.0"
  scope: [root]
  auto_invoke:
    - "Angular components, services, directives, or Angular-specific code"
---

## When to Use

- Creating or modifying Angular components, services, directives, or pipes
- Writing Angular-specific features (routing, forms, state management)
- Setting up Angular projects or configuring features
- Refactoring Angular code to follow modern patterns

## Critical Patterns

### Standalone Components

- **MUST use standalone components** - NgModules are obsolete
- **DO NOT set `standalone: true`** - it's the default in Angular v20+
- Use `input()` and `output()` functions instead of `@Input()`/`@Output()` decorators
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator

### Signals

- Use signals for state management instead of RxJS subjects
- Use `computed()` for derived state
- Use `update()` or `set()` instead of `mutate()`

### Host Bindings

- **DO NOT use `@HostBinding` and `@HostListener` decorators**
- Put host bindings inside the `host` object of `@Component` or `@Directive` decorator

### Templates

- Use native control flow: `@if`, `@for`, `@switch` instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- **DO NOT use `ngClass`** - use `class` bindings instead
- **DO NOT use `ngStyle`** - use `style` bindings instead
- Use `NgOptimizedImage` for all static images (not inline base64)
- Do NOT write arrow functions in templates
- Do NOT assume globals like `new Date()` are available

### Services

- Use `providedIn: 'root'` for singleton services
- Use `inject()` function instead of constructor injection

### Forms

- Prefer Reactive forms over Template-driven forms

## Code Examples

### Component with Signals

```typescript
import { Component, input, output, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.active]': 'isActive()',
    '(click)': 'handleClick()'
  }
})
export class UserCardComponent {
  private userService = inject(UserService);

  user = input.required<User>();
  active = input(false);
  edit = output<User>();

  isActive = computed(() => this.user().status === 'active');

  handleClick() {
    this.edit.emit(this.user());
  }
}
```

### Template with Native Control Flow

```html
@if (isLoading()) {
  <div>Loading...</div>
} @else {
  @for (item of items(); track item.id) {
    <div [class.selected]="item.id === selectedId()">
      {{ item.name }}
    </div>
  } @empty {
    <div>No items found</div>
  }
}
```

### Service with inject()

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  private users = signal<User[]>([]);
  loading = signal(false);
  activeUsers = computed(() => this.users().filter(u => u.active));

  loadUsers() {
    this.loading.set(true);
    this.http.get<User[]>('/api/users').subscribe(users => {
      this.users.set(users);
      this.loading.set(false);
    });
  }
}
```

### Host Bindings (No @HostBinding)

```typescript
@Component({
  selector: 'app-tooltip',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    '[attr.aria-label]': 'tooltip',
    '[class.visible]': 'visible',
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()'
  }
})
export class TooltipComponent {
  tooltip = input.required<string>();
  visible = signal(false);

  show() {
    this.visible.set(true);
  }

  hide() {
    this.visible.set(false);
  }
}
```

### NgOptimizedImage

```typescript
import { NgOptimizedImage } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <img ngSrc="/assets/logo.png" width="200" height="100" priority alt="Logo" />
  `
})
export class HeaderComponent {}
```

## Commands

### Generate Component
```bash
ng generate component user-card --standalone
```

### Generate Service
```bash
ng generate service data
```

### Generate Directive
```bash
ng generate directive highlight --standalone
```

## Resources

- **Angular v21+ Documentation**: [angular.io](https://angular.io)
- **Signals Guide**: [angular.io/guide/signals](https://angular.io/guide/signals)
- **Standalone Components**: [angular.io/guide/standalone-components](https://angular.io/guide/standalone-components)
