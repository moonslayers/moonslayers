export interface RawExperienceEntry {
  key: string;
  company: string;
  period: string;
  startYear: number;
  endYear?: number;
  technologies: string[];
}

export interface RawExperienceTranslation {
  role: string;
  description: string;
  highlights?: string[];
}

export const RAW_EXPERIENCE_ENTRIES: RawExperienceEntry[] = [
  { key: 'fondosbc', company: 'FondosBC — Gobierno de Baja California', period: 'Nov 2024 — Actualidad', startYear: 2024, technologies: ['Angular 21', 'Laravel 12', 'MySQL', 'TypeScript', 'Bootstrap 5', 'Chart.js', 'AWS EC2', 'Docker', 'GitHub Actions', 'Pest PHP'] },
  { key: 'sagem', company: 'Secretaría de Economía e Innovación — Gobierno de Baja California', period: '2023 — 2025', startYear: 2023, endYear: 2025, technologies: ['Angular 21', 'Laravel 12', 'MySQL', 'Chart.js', 'Pest PHP', 'PHPUnit', 'GitHub Actions', 'Bootstrap 5'] },
  { key: 'cef', company: 'Secretaría de Economía e Innovación — Gobierno de Baja California', period: '2023 — 2025', startYear: 2023, endYear: 2025, technologies: ['Angular 21', 'Laravel 12', 'MySQL', 'Chart.js', 'pdfmake', 'Bootstrap 5'] },
  { key: 'almacenes', company: 'ABBA Logistic', period: '2023 — 2024', startYear: 2023, endYear: 2024, technologies: ['Angular 18 → 21', 'Laravel 11 → 12', 'MySQL', 'GitHub Actions', 'Bootstrap 5', 'Docker'] },
  { key: 'floricultora', company: 'Centro Floricultor de Baja California (Floricents By The Sea)', period: '2023 — 2024', startYear: 2023, endYear: 2024, technologies: ['Angular 16 → 19', 'Node.js', 'Express', 'SQLite', 'C#', '.NET', 'CONTPAQi', 'Docker', 'SQL Server'] },
  { key: 'landing', company: 'Cliente privado', period: '2025', startYear: 2025, endYear: 2025, technologies: ['Astro', 'Tailwind CSS'] },
] as const;

export const RAW_EXPERIENCE_TRANSLATIONS_ES: RawExperienceTranslation[] = [
  {
    role: 'Tech Lead & Full Stack Developer',
    description: 'Liderazgo técnico de equipo de hasta 5 desarrolladores en el sistema de gestión crediticia gubernamental. Gestión de créditos con ciclo completo: solicitud, validación, formalización, liberación, cobranza y jurídico. Migración de sistema legacy a arquitectura moderna Angular 21 + Laravel 12. Implementación de GitHub Projects con Kanban personalizado semaforizado, puntos de historia y sizes para gestión ágil de tareas. Desarrollo de dashboard financiero, simulador de créditos, sistema de autocobranza con notificaciones multi-canal (email + WhatsApp), y generación de reportes para Buró de Crédito.',
    highlights: ['Lideré equipo de hasta 5 desarrolladores', 'Migración de sistema legacy', 'GitHub Projects con Kanban semaforizado', 'CI/CD con lint y pruebas en PRs'],
  },
  {
    role: 'Full Stack Developer',
    description: 'Desarrollo de ventanilla única digital para atención y gestión empresarial. Sistema tipo helpdesk con dashboards de métricas y KPIs. Implementé pruebas unitarias y feature en el backend con Laravel Pest/PHPUnit para el 100% de APIs, servicios y modelos. Automatización de CI/CD con GitHub Actions incluyendo lint en PRs para mantener calidad de código.',
    highlights: ['100% de APIs con pruebas', 'CI/CD con lint automatizado', 'Dashboard con Chart.js'],
  },
  {
    role: 'Developer & Tech Lead',
    description: 'Digitalización completa del trámite de estímulos fiscales, reemplazando un proceso manual con múltiples archivos Excel. Implementación de 17 anexos especializados, formularios multi-paso con auto-guardado (StepSave), integraciones con Banxico (tipo de cambio) y UMA (indicador económico). Sistema pendiente de salir a producción.',
  },
  {
    role: 'Frontend + CI/CD',
    description: 'Sistema de gestión de almacenes (WMS) con arquitectura multi-tenant dando servicio a 2 empresas. 11 módulos funcionales: Dashboard, Clientes, Entradas, Salidas, Almacenajes, Almacenes, Finanzas, Transbordos, Reportes, Servicios y Configuraciones. Gestión física con jerarquía Pasillo → Rack → Sección → Nivel con tracking por lote y caducidad. Integración de GitHub Actions para despliegue automático de frontend (Angular) y backend (Laravel) en servidores Ubuntu.',
    highlights: ['Desarrollé con 1 compañero', 'A cargo del frontend y despliegues automáticos', 'Arquitectura multi-tenant'],
  },
  {
    role: 'Full Stack Developer (Único desarrollador)',
    description: 'Sistema integral que automatizó el ciclo completo de compras: desde la requisición de ingenieros hasta el pago a proveedores. Flujo de aprobación multi-nivel (Jefe de Finca → Director Técnico), integración con CONTPAQi ERP para consulta de productos, precios e inventario en tiempo real. Sincronización bidireccional MSSQL → SQLite mediante servicio .NET. Envío automatizado de órdenes a proveedores por email. Despliegue con Docker con política de restart automático ante fallos del backend. Migración de Angular 16 a 19 con ORM casero en backend.',
    highlights: ['Desarrollé todo el sistema en solitario', 'Integración con CONTPAQi ERP', 'Docker con restart automático', 'Eliminó la necesidad de un comprador dedicado'],
  },
  {
    role: 'Frontend Developer (Freelance)',
    description: 'Landing page corporativa para empresa de aire comprimido industrial desarrollada con Astro y Tailwind CSS. Pendiente de despliegue por temas de dominio.',
  },
];

export const RAW_EXPERIENCE_TRANSLATIONS_EN: RawExperienceTranslation[] = [
  {
    role: 'Tech Lead & Full Stack Developer',
    description: 'Technical leadership of a team of up to 5 developers on a government credit management system. Full credit lifecycle management: application, validation, formalization, disbursement, collection and legal. Legacy system migration to modern Angular 21 + Laravel 12 architecture. Implemented GitHub Projects with custom Kanban traffic-light system, story points and sizes for agile task management. Built financial dashboard, credit simulator, self-collection system with multi-channel notifications (email + WhatsApp), and Credit Bureau report generation.',
    highlights: ['Led team of up to 5 developers', 'Legacy system migration', 'GitHub Projects with Kanban system', 'CI/CD with lint and tests on PRs'],
  },
  {
    role: 'Full Stack Developer',
    description: 'Developed a digital single-window system for business management and assistance. Helpdesk-type system with KPI dashboards. Implemented unit and feature tests on the backend using Laravel Pest/PHPUnit covering 100% of APIs, services and models. CI/CD automation with GitHub Actions including lint on PRs to maintain code quality.',
    highlights: ['100% API test coverage', 'Automated CI/CD with lint', 'Chart.js dashboards'],
  },
  {
    role: 'Developer & Tech Lead',
    description: 'Complete digitization of tax incentive applications, replacing a manual process with multiple Excel files. Implementation of 17 specialized annexes, multi-step forms with auto-save (StepSave), Banxico (exchange rate) and UMA integrations. System pending production deployment.',
  },
  {
    role: 'Frontend + CI/CD',
    description: 'Multi-tenant Warehouse Management System (WMS) serving 2 companies. 11 functional modules: Dashboard, Clients, Inbound, Outbound, Storage, Warehouses, Finance, Transfers, Reports, Services and Configurations. Physical management with Aisle → Rack → Section → Level hierarchy with batch and expiration tracking. GitHub Actions integration for automated frontend (Angular) and backend (Laravel) deployment on Ubuntu servers.',
    highlights: ['Built with 1 teammate', 'Owned frontend and automated deployments', 'Multi-tenant architecture'],
  },
  {
    role: 'Full Stack Developer (Solo)',
    description: 'Complete purchase system that automated the full buying cycle: from engineer requisitions to supplier payments. Multi-level approval flow (Farm Manager → Technical Director), CONTPAQi ERP integration for real-time product, price and inventory queries. Bidirectional MSSQL → SQLite sync via .NET service. Automated order emailing to suppliers. Docker deployment with auto-restart policy on backend failure. Migration from Angular 16 to 19 with custom backend ORM.',
    highlights: ['Built the entire system solo', 'CONTPAQi ERP integration', 'Docker with auto-restart', 'Eliminated need for a dedicated buyer'],
  },
  {
    role: 'Frontend Developer (Freelance)',
    description: 'Corporate landing page for an industrial air compressor company built with Astro and Tailwind CSS. Pending deployment due to domain issues.',
  },
];
