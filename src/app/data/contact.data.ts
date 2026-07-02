import type { ContactData } from '../types/contact.types';

export const CONTACT_DATA: ContactData = {
  githubUsername: 'moonslayers',
  githubUrl: 'https://github.com/moonslayers',
  repoUrl: 'https://github.com/moonslayers/moonslayers/issues',

  translations: {
    es: {
      title: 'Conectemos',
      subtitle: '¿Tienes una idea, pregunta o propuesta de colaboración?',
      description: 'La mejor manera de contactarme es a través de GitHub Issues en este repositorio. Puedes abrir un issue para preguntas, sugerencias, reportar bugs, o simplemente para saludar. Reviso los issues regularmente y respondo a la brevedad.',
      githubLabel: 'Encuéntrame en GitHub',
      ctaText: 'Abrir un Issue →',
      instructions: 'Haz clic en el botón para ir a la página de issues del repositorio. Allí puedes crear un nuevo issue con tu mensaje.',
    },
    en: {
      title: "Let's Connect",
      subtitle: 'Have an idea, question, or collaboration proposal?',
      description: "The best way to reach me is through GitHub Issues on this repository. You can open an issue for questions, suggestions, bug reports, or just to say hi. I check issues regularly and respond promptly.",
      githubLabel: 'Find me on GitHub',
      ctaText: 'Open an Issue →',
      instructions: "Click the button to go to the repository's issues page. There you can create a new issue with your message.",
    },
  },
};
