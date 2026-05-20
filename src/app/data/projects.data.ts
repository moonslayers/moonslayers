import { PROJECT_STATUS } from '../types/project.types';
import type { Project } from '../types/project.types';

export const PROJECTS_DATA: Project[] = [
  {
    id: '911',
    slug: 'sistema-911',
    thumbnail: '/assets/911/main-login.png',
    media: {
      images: [
        { src: '/assets/911/main-login.png', alt: 'Pantalla de inicio de sesión del sistema 9/11', caption: 'Login del sistema' },
        { src: '/assets/911/register.png', alt: 'Pantalla de registro de nuevo usuario', caption: 'Registro de usuarios (requiere aprobación del coordinador)' },
        { src: '/assets/911/recovery-password.png', alt: 'Pantalla de recuperación de contraseña', caption: 'Recuperación de contraseña' },
        { src: '/assets/911/movilidad form.png', alt: 'Formulario de captura de datos de movilidad académica', caption: 'Captura de reportes de movilidad' },
        { src: '/assets/911/review-movilidad.png', alt: 'Pantalla de revisión y validación de reportes', caption: 'Validación de reportes por coordinador' },
      ],
      pdfs: [
        { name: 'Manual de Usuario', path: '/assets/911/user_man.pdf', size: '269 KB' },
        { name: 'Manual Técnico', path: '/assets/911/manual-tecnico.pdf', size: '146 KB' },
      ],
    },
    links: [
      { label: 'Repositorio en GitHub', url: 'https://github.com/moonslayers/proyecto911', icon: 'bi-github' },
    ],
    featureIcons: ['bi-person-badge', 'bi-file-earmark-text', 'bi-arrow-repeat', 'bi-file-spreadsheet', 'bi-check-circle'],
    role: 'Fullstack Developer',
    period: '6 meses',
    client: 'UABC — Universidad Autónoma de Baja California',
    status: PROJECT_STATUS.COMPLETED,
    translations: {
      es: {
        title: 'Sistema 9/11',
        subtitle: 'Sistema de reportes de movilidad académica e intercambio estudiantil — UABC',
        description: 'Sistema de gestión de reportes anuales solicitados por la SEP a la UABC, que integra información de convenios, intercambio estudiantil y movilidad académica con validación por coordinador.',
        longDescription: 'Este sistema fue desarrollado para la Universidad Autónoma de Baja California (UABC) con el fin de digitalizar el proceso de generación de los reportes anuales 9/11 requeridos por la SEP. El sistema permite la gestión de 5 tipos de reportes: Convenios, Intercambio Estudiantil de Entrada y Salida, y Movilidad Académica de Entrada y Salida. Cuenta con dos roles de usuario: coordinador (administrador) que valida reportes y gestiona usuarios, y unidad académica que elabora los reportes. Los datos se sincronizan desde la base de datos institucional de la UABC y también se almacenan localmente para respaldo.',
        features: [
          { title: 'Dos roles de usuario', description: 'Coordinador (administrador) y Unidad Académica, con permisos diferenciados para validación y creación de reportes.' },
          { title: '5 tipos de reportes SEP', description: 'Convenios, Intercambio Estudiantil (entrada/salida) y Movilidad Académica (entrada/salida) con estructura de datos completa.' },
          { title: 'Sincronización de datos', description: 'Conexión a la base de datos institucional de la UABC con respaldo local para operación sin conexión.' },
          { title: 'Generación de reportes XLSX', description: 'Descarga de reportes en formato Excel para su envío a la SEP.' },
          { title: 'Flujo de validación', description: 'Los reportes creados por unidad académica pasan por validación del coordinador antes de ser definitivos.' },
        ],
        techStack: [
          { category: 'Frontend', items: ['Bootstrap 5'] },
          { category: 'Backend', items: ['Node.js', 'Express'] },
          { category: 'Base de Datos', items: ['MySQL'] },
          { category: 'DevOps', items: ['PM2', 'Nginx', 'Ubuntu Server'] },
        ],
      },
      en: {
        title: '9/11 System',
        subtitle: 'Academic mobility and student exchange reporting system — UABC',
        description: 'Management system for annual reports requested by SEP to UABC, integrating information on agreements, student exchange and academic mobility with coordinator validation.',
        longDescription: 'This system was developed for the Autonomous University of Baja California (UABC) to digitize the process of generating the annual 9/11 reports required by SEP. The system manages 5 types of reports: Agreements, Inbound/Outbound Student Exchange, and Inbound/Outbound Academic Mobility. It features two user roles: coordinator (admin) who validates reports and manages users, and academic unit users who create reports. Data is synchronized from UABC\'s institutional database and also stored locally for backup.',
        features: [
          { title: 'Two user roles', description: 'Coordinator (admin) and Academic Unit, with differentiated permissions for validation and report creation.' },
          { title: '5 SEP report types', description: 'Agreements, Student Exchange (inbound/outbound) and Academic Mobility (inbound/outbound) with complete data structure.' },
          { title: 'Data synchronization', description: 'Connection to UABC\'s institutional database with local backup for offline operation.' },
          { title: 'XLSX report generation', description: 'Download reports in Excel format for submission to SEP.' },
          { title: 'Validation workflow', description: 'Reports created by academic unit users go through coordinator validation before becoming final.' },
        ],
        techStack: [
          { category: 'Frontend', items: ['Bootstrap 5'] },
          { category: 'Backend', items: ['Node.js', 'Express'] },
          { category: 'Database', items: ['MySQL'] },
          { category: 'DevOps', items: ['PM2', 'Nginx', 'Ubuntu Server'] },
        ],
      },
    },
  },
  {
    id: 'cimapp',
    slug: 'cimapp',
    thumbnail: '/assets/cimapp/banner.png',
    media: {
      images: [
        { src: '/assets/cimapp/main-screen.png', alt: 'Pantalla principal de la aplicación CIM App', caption: 'Pantalla principal con acceso a todos los módulos' },
        { src: '/assets/cimapp/boton-panico-4-screens-steps-demo.png', alt: 'Flujo del botón de pánico en 4 pasos', caption: 'Botón de pánico — acceso rápido a servicios de emergencia' },
        { src: '/assets/cimapp/contactos-emergencia.png', alt: 'Pantalla de contactos de emergencia', caption: 'Configuración de contactos de emergencia' },
        { src: '/assets/cimapp/foro.png', alt: 'Foro de discusión anónimo', caption: 'Foro anónimo para compartir ideas y experiencias' },
        { src: '/assets/cimapp/pomodoro-3-screens.png', alt: 'Temporizador pomodoro en 3 pantallas', caption: 'Técnica Pomodoro para gestión del tiempo' },
        { src: '/assets/cimapp/recursos-informativos-2-screens-demo.png', alt: 'Recursos informativos y lecturas de ayuda', caption: 'Sección de lecturas y recursos de apoyo' },
        { src: '/assets/cimapp/tests-quizes-2-screens-demo.png', alt: 'Tests y cuestionarios de salud mental', caption: 'Cuestionarios de salud mental y procrastinación' },
      ],
      pdfs: [
        { name: 'Documentación del Proyecto', path: '/assets/cimapp/cimapp (2).pdf', size: '19 MB' },
      ],
    },
    links: [],
    featureIcons: ['bi-heart-pulse', 'bi-clock', 'bi-chat-dots', 'bi-clipboard-check', 'bi-shield-exclamation', 'bi-bookmark-heart'],
    role: 'Mobile Developer',
    period: '6 meses',
    client: 'UABC — Facultad de Ciencias',
    status: PROJECT_STATUS.COMPLETED,
    translations: {
      es: {
        title: 'CIM App',
        subtitle: 'Aplicación de apoyo psicológico de Cimarrón a Cimarrón',
        description: 'App móvil universitaria de apoyo psicológico con prevención del suicidio, técnica Pomodoro, foro anónimo, cuestionarios de salud mental, botón de emergencia y recursos de ayuda.',
        longDescription: 'Aplicación móvil desarrollada para la UABC Facultad de Ciencias como proyecto de vinculación con valor en créditos. Su objetivo es brindar ayuda rápida y accesible a estudiantes universitarios cimarrones, enfocándose en la prevención del suicidio y la lucha contra la procrastinación. Cuenta con 8 módulos principales: prevención del suicidio (acceso a recursos de crisis, contacto de emergencia, registro emocional), ayuda contra la procrastinación (Pomodoro, planificador, recordatorios), foro anónimo, cuestionarios de salud mental y procrastinación, botón de emergencia, favoritos y lecturas de ayuda. Desarrollada con Flutter y Firebase, con participación anónima sin necesidad de cuenta.',
        features: [
          { title: 'Prevención del suicidio', description: 'Recursos de apoyo en crisis, notificación a contactos de emergencia y registro de estados emocionales con detección temprana de patrones de riesgo.' },
          { title: 'Técnica Pomodoro', description: 'Temporizador Pomodoro integrado con planificador de actividades y recordatorios motivacionales para combatir la procrastinación.' },
          { title: 'Foro anónimo', description: 'Participación sin necesidad de cuenta. Moderación, filtrado de contenido inapropiado y opción de personalización opcional de perfil.' },
          { title: 'Cuestionarios interactivos', description: 'Evaluaciones de salud mental y procrastinación con identificación del tipo de procrastinador y recomendaciones personalizadas.' },
          { title: 'Botón de emergencia', description: 'Acceso inmediato a servicios de emergencia con notificación de ubicación a contactos previamente designados.' },
          { title: 'Recursos y favoritos', description: 'Sección de lecturas de ayuda, libros recomendados y sistema de favoritos para guardar contenido relevante.' },
        ],
        techStack: [
          { category: 'Frontend', items: ['Flutter', 'Dart'] },
          { category: 'Backend', items: ['Firebase'] },
          { category: 'Base de Datos', items: ['Firebase Firestore'] },
          { category: 'Auth', items: ['Firebase Authentication'] },
          { category: 'Plataforma', items: ['Android', 'iOS'] },
        ],
      },
      en: {
        title: 'CIM App',
        subtitle: 'Psychological support app from Cimarron to Cimarron',
        description: 'University mobile app for psychological support with suicide prevention, Pomodoro technique, anonymous forum, mental health questionnaires, emergency button and help resources.',
        longDescription: 'Mobile application developed for UABC Faculty of Sciences as a credit-bearing outreach project. It aims to provide quick and accessible help to university students, focusing on suicide prevention and combating procrastination. It features 8 main modules: suicide prevention (crisis resources, emergency contacts, emotional logging), anti-procrastination (Pomodoro timer, planner, reminders), anonymous forum, mental health and procrastination questionnaires, emergency button, favorites, and reading materials. Built with Flutter and Firebase, with anonymous participation without requiring an account.',
        features: [
          { title: 'Suicide prevention', description: 'Crisis support resources, emergency contact notification, and emotional state logging with early detection of risk patterns.' },
          { title: 'Pomodoro technique', description: 'Integrated Pomodoro timer with activity planner and motivational reminders to combat procrastination.' },
          { title: 'Anonymous forum', description: 'Participation without requiring an account. Moderation, inappropriate content filtering, and optional profile customization.' },
          { title: 'Interactive questionnaires', description: 'Mental health and procrastination assessments with procrastinator type identification and personalized recommendations.' },
          { title: 'Emergency button', description: 'Immediate access to emergency services with location notification to pre-designated contacts.' },
          { title: 'Resources and favorites', description: 'Help reading section, recommended books, and favorites system to save relevant content.' },
        ],
        techStack: [
          { category: 'Frontend', items: ['Flutter', 'Dart'] },
          { category: 'Backend', items: ['Firebase'] },
          { category: 'Database', items: ['Firebase Firestore'] },
          { category: 'Auth', items: ['Firebase Authentication'] },
          { category: 'Platform', items: ['Android', 'iOS'] },
        ],
      },
    },
  },
];
