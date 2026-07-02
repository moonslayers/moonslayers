import type { Profile } from '../types/profile.types';
import { RAW_EXPERIENCE_ENTRIES, RAW_EXPERIENCE_TRANSLATIONS_ES, RAW_EXPERIENCE_TRANSLATIONS_EN } from './experience.data';

export const PROFILE_DATA: Profile = {
  name: 'moonslayers',
  email: 'jorge.marquez.luna@uabc.edu.mx',
  phone: '+52 646 124 49 57',
  github: 'https://github.com/moonslayers/',
  linkedin: 'https://www.linkedin.com/in/jorge-marquez-luna/',
  website: '',

  skills: [
    { categoryKey: 'profile.skill.frontend', skills: ['Angular', 'TypeScript', 'RxJS', 'Bootstrap 5', 'Tailwind CSS', 'Astro', 'Chart.js', 'Animate.css', 'Angular Material'] },
    { categoryKey: 'profile.skill.backend', skills: ['Laravel', 'PHP', 'Node.js', 'Express', 'C#', '.NET', 'REST APIs', 'Eloquent', 'Pest/PHPUnit'] },
    { categoryKey: 'profile.skill.devops', skills: ['Docker', 'GitHub Actions', 'CI/CD', 'Nginx', 'AWS EC2', 'Ubuntu Server', 'PM2'] },
    { categoryKey: 'profile.skill.databases', skills: ['MySQL', 'SQLite', 'MSSQL', 'Redis'] },
    { categoryKey: 'profile.skill.architecture', skills: ['MVC', 'DDD', 'Clean Architecture', 'Hexagonal Architecture', 'Clean Code', 'SOLID'] },
    { categoryKey: 'profile.skill.ai_tools', skills: ['Opencode', 'Agents & Sub-agents', 'Orchestration', 'Prompt Engineering'] },
  ],

  languages: [
    { name: 'Español', levelKey: 'profile.language.native' },
    { name: 'English', levelKey: 'profile.language.advanced' },
  ],

  experience: RAW_EXPERIENCE_ENTRIES,

  education: [
    { institution: 'Universidad Autónoma de Baja California (UABC)', period: '— Marzo 2023' },
  ],

  certifications: [
    { date: undefined },
    { date: undefined },
    { date: undefined },
    { date: undefined },
    { date: undefined },
    { date: 'Junio 2026' },
    { date: 'Junio 2026' },
    { date: 'Junio 2026' },
    { date: undefined },
  ],

  translations: {
    es: {
      role: 'Tech Lead Full Stack Developer',
      location: 'Ensenada, México',
      bio: 'Tech Lead Full Stack Developer con más de 4 años de experiencia desarrollando sistemas web gubernamentales y empresariales. Especializado en Angular y Laravel, con experiencia liderando equipos de hasta 5 desarrolladores, implementando CI/CD, pruebas automatizadas y metodologías ágiles. He trabajado en proyectos críticos para el gobierno del estado de Baja California, incluyendo sistemas de créditos, gestión empresarial y estímulos fiscales, así como sistemas privados de compras y logística.',
      experience: RAW_EXPERIENCE_TRANSLATIONS_ES,
      education: [
        { degree: 'Licenciatura en Ciencias de la Computación' },
      ],
      certifications: [
        { name: 'Clasificación de Imágenes con Redes Neuronales (Taller)' },
        { name: 'Machine Learning con Python' },
        { name: 'Gerencia Directiva para Prevención de Riesgos Psicosociales' },
        { name: 'FUND NOM-035 — Factores de Riesgo Psicosocial en el Trabajo' },
        { name: 'Liderazgo y Gerencia en Tecnología e Ingeniería (Udemy - 3 horas)' },
        { name: 'Trabajo Colaborativo y Resolución de Conflictos' },
        { name: 'Promoción de Relaciones Laborales Saludables' },
        { name: 'Comunicación Efectiva y Escucha Activa' },
        { name: 'Gerencia en Proyectos de Tecnología' },
      ],
    },
    en: {
      role: 'Tech Lead Full Stack Developer',
      location: 'Ensenada, Mexico',
      bio: 'Tech Lead Full Stack Developer with 4+ years of experience building government and enterprise web systems. Specialized in Angular and Laravel, with experience leading teams of up to 5 developers, implementing CI/CD pipelines, automated testing, and agile methodologies. I have worked on critical projects for the state government of Baja California, including credit management systems, enterprise management, tax incentive systems, as well as private purchasing and logistics systems.',
      experience: RAW_EXPERIENCE_TRANSLATIONS_EN,
      education: [
        { degree: "Bachelor's in Computer Science" },
      ],
      certifications: [
        { name: 'Image Classification with Neural Networks (Workshop)' },
        { name: 'Machine Learning with Python' },
        { name: 'Directive Management for Psychosocial Risk Prevention' },
        { name: 'FUND NOM-035 — Psychosocial Risk Factors at Work' },
        { name: 'Technology Engineering Leadership & Management (Udemy - 3 hours)' },
        { name: 'Collaborative Work and Conflict Resolution' },
        { name: 'Promotion of Healthy Work Relationships' },
        { name: 'Effective Communication and Active Listening' },
        { name: 'Technology Project Management' },
      ],
    },
  },
};
