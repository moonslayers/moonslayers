import { es } from './es';
import { en } from './en';
import type { Language } from '../types/translation-keys';

export const translations: Record<Language, Record<string, string>> = { es, en };
