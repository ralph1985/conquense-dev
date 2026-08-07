export interface DetailCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface DetailLink {
  label: string;
  href: string;
}

export interface DetailItem {
  name?: string;
  company?: string;
  period?: string;
  role: string;
  context?: string;
  summary: string;
  highlights?: string[];
  stack: string[];
  links?: DetailLink[];
}
