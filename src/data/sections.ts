import { routesByLanguage, type Language } from '@/data/i18n';

export type SectionTheme = 'intro' | 'profile' | 'method' | 'architecture' | 'experience' | 'projects' | 'stack' | 'hobbies' | 'contact';

export interface SectionItemLink {
  label: string;
  href: string;
}

export interface PortfolioSection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  eyebrow?: string;
  theme: SectionTheme;
  accentColor: string;
  content: string;
  items?: Array<string | SectionItemLink>;
  media?: Array<{
    src: string;
    alt: string;
    href: string;
    title: string;
    description?: string;
    source?: {
      label: string;
      href: string;
    };
  }>;
  actions?: Array<{
    label: string;
    href: string;
  }>;
}

export const localizedPortfolioSections: Record<Language, PortfolioSection[]> = {
  es: [
    {
      id: 'home',
      slug: 'inicio',
      title: 'Escucho, entiendo y convierto necesidades en interfaces fáciles de usar.',
      subtitle: 'Arquitectura UI, producto digital y calidad frontend para entornos exigentes.',
      eyebrow: 'Rafael García Prieto · Portfolio',
      theme: 'intro',
      accentColor: '#2563eb',
      content:
        'Diseño y desarrollo interfaces web para entornos exigentes, con foco en claridad técnica, rendimiento, mantenibilidad y experiencia de usuario. Trabajo especialmente cómodo en producto bancario, arquitectura UI, calidad frontend y aplicaciones web móviles.',
      items: [
        'Banca móvil e inversión',
        'Arquitectura UI con Ember y Lit',
        'Rendimiento y calidad frontend',
        'Coordinación técnica de producto',
      ],
      actions: [
        { label: 'Ver experiencia', href: routesByLanguage.es.experience },
        { label: 'Ver proyectos', href: routesByLanguage.es.projects },
      ],
    },
    {
      id: 'profile',
      slug: 'perfil',
      title: 'Qué resuelvo',
      subtitle: 'Convierto necesidades complejas en productos digitales claros, mantenibles y preparados para crecer.',
      eyebrow: 'Propuesta de valor',
      theme: 'profile',
      accentColor: '#0f766e',
      content:
        'Aporto experiencia frontend, criterio técnico y capacidad de colaboración para ordenar problemas difíciles y llevarlos hasta una solución útil. Trabajo entre producto, diseño y tecnología para construir interfaces que se entienden, arquitecturas que resisten y equipos que pueden seguir avanzando.',
      items: ['Interfaces que se entienden', 'Arquitecturas que resisten', 'Equipos que avanzan'],
    },
    {
      id: 'workflow',
      slug: 'como-trabajo',
      title: 'Cómo trabajo',
      subtitle: 'Un proceso claro para pasar de una necesidad compleja a una solución que el equipo puede mantener y hacer crecer.',
      eyebrow: 'Proceso',
      theme: 'method',
      accentColor: '#4f46e5',
      content:
        'Primero hago visible el problema, el contexto y las restricciones. Después alineo las decisiones con producto, diseño y tecnología, construyo por ciclos y reviso cada entrega. La inteligencia artificial acelera la exploración y la implementación, pero el criterio y la responsabilidad siguen siendo míos.',
      items: ['Entender antes de construir', 'Decidir con contexto', 'Construir y revisar', 'Evolucionar lo que funciona'],
    },
    {
      id: 'architecture',
      slug: 'arquitectura',
      title: 'Arquitectura',
      subtitle: 'Interfaces mantenibles para productos que evolucionan durante años.',
      eyebrow: 'Sistemas',
      theme: 'architecture',
      accentColor: '#475569',
      content:
        'He participado en el diseño y evolución de arquitecturas frontend para aplicaciones con lógica de negocio compleja, integración con servicios, testing, integración continua y equipos distribuidos. Priorizo fronteras claras, datos explícitos y componentes que se entienden sin ceremonia.',
      items: ['Arquitectura UI', 'Testing', 'Integración continua'],
    },
    {
      id: 'experience',
      slug: 'experiencia',
      title: 'Experiencia',
      subtitle: 'De prácticas en industria a frontend senior en banca móvil e inversión.',
      eyebrow: 'Trabajo',
      theme: 'experience',
      accentColor: '#334155',
      content:
        'Mi recorrido profesional combina producto bancario, mobile web, desarrollos a medida, SaaS de gestión empresarial e integración con clientes reales. La experiencia laboral ya está revisada por etapas y separada de los proyectos representativos.',
      items: ['BBVA Technology', 'BBVA IT España · GFT', 'Mobile One2One', 'Geanet onDemand', 'ComNet', 'Goitek'],
      actions: [{ label: 'Ver experiencia', href: routesByLanguage.es.experience }],
    },
    {
      id: 'projects',
      slug: 'proyectos',
      title: 'Proyectos',
      subtitle: 'Banca digital, booking, e-commerce móvil y aplicaciones internas.',
      eyebrow: 'Casos',
      theme: 'projects',
      accentColor: '#9333ea',
      content:
        'Los proyectos se revisarán aparte, empezando por GitHub y por los casos públicos que puedan enseñarse con rigor. Esta sección queda reservada para seleccionar trabajo representativo sin mezclarlo con la cronología laboral.',
      items: ['GitHub', 'Casos públicos', 'Trabajo representativo'],
      actions: [{ label: 'Ver proyectos', href: routesByLanguage.es.projects }],
    },
    {
      id: 'stack',
      slug: 'stack',
      title: 'Stack',
      subtitle: 'JavaScript como eje, con experiencia complementaria en backend, datos y entrega.',
      eyebrow: 'Tecnología',
      theme: 'stack',
      accentColor: '#0369a1',
      content:
        'Mi base principal está en JavaScript, HTML y CSS, con experiencia en Ember, LitElement, SCSS, tooling frontend, testing, Git, CI y trabajo con APIs REST. También arrastro una base sólida en PHP, SQL y aplicaciones de gestión, útil para entender producto más allá de la capa visual.',
      items: ['JavaScript', 'Ember', 'LitElement', 'SCSS', 'Testing', 'Git'],
    },
    {
      id: 'hobbies',
      slug: 'otra-forma-de-mirar',
      title: 'Otra forma de mirar',
      subtitle: 'También vuelo drones y publico vídeos en YouTube.',
      eyebrow: 'Fuera del trabajo',
      theme: 'hobbies',
      accentColor: '#0369a1',
      content:
        'Preparar un vuelo, encontrar una perspectiva y convertirla en una pieza audiovisual es otra forma de trabajar con atención, precisión y curiosidad.',
      media: [
        {
          src: '/assets/hobbies/drone-flight-d5C1apoWJ9w.jpg',
          title: 'Torrebuceit',
          alt: 'Vista aérea de una ermita y el paisaje que la rodea',
          href: 'https://youtu.be/d5C1apoWJ9w',
          description:
            'El Castillo de Torrebuceit, en Villar del Águila (Torrejoncillo del Rey, Cuenca), es una fortaleza de origen islámico vinculada al paisaje del valle del Záncara. Actualmente es una propiedad privada y se contempla desde el exterior. Para mí tiene además un significado personal: allí me crié hasta los cuatro años.',
          source: {
            label: 'Información turística de Castilla-La Mancha',
            href: 'https://www.turismocastillalamancha.es/es/cultura-y-patrimonio/castillos/cuenca/castillo-de-torrebuceit',
          },
        },
        {
          src: '/assets/hobbies/drone-flight-t-42MBn1ZFE.jpg',
          title: 'Ávila',
          alt: 'Vista aérea captada durante otro vuelo de dron',
          href: 'https://youtu.be/t-42MBn1ZFE',
          description:
            'Ávila conserva una de las murallas medievales mejor conservadas de Europa. La ciudad histórica, sus iglesias extramuros y el recinto amurallado forman parte del Patrimonio Mundial de la UNESCO.',
          source: {
            label: 'Patrimonio de Ávila',
            href: 'https://www.cultura.gob.es/cultura/areas/patrimonio/mc/patrimoniomundial/bienes-declarados/por-ano-de-inscripcion/1985/avila.html',
          },
        },
        {
          src: '/assets/hobbies/drone-flight-Ll9hkctwzvM.jpg',
          title: 'Castillo de Peracense',
          alt: 'Vista aérea de una fortaleza entre formaciones rocosas',
          href: 'https://youtu.be/Ll9hkctwzvM',
          description:
            'El Castillo de Peracense se levanta sobre una mole de rodeno rojo y organiza sus defensas en varios recintos adaptados a la roca. La fortaleza tuvo un papel estratégico en la frontera y su residencia principal estuvo ocupada durante los siglos XIV y XV.',
          source: {
            label: 'Castillo de Peracense',
            href: 'https://www.castillodeperacense.es/conocenos/el-castillo/',
          },
        },
        {
          src: '/assets/hobbies/drone-flight-0n4WIq5jOWw.jpg',
          title: 'Castillo de Consuegra',
          alt: 'Paisaje visto desde el aire durante un vuelo de dron',
          href: 'https://youtu.be/0n4WIq5jOWw',
          description:
            'El Castillo de Consuegra domina el Cerro Calderico. Su origen se remonta a una fortificación musulmana del siglo X y después fue reconstruido y ampliado por la Orden de Malta. En sus alrededores tuvo lugar la batalla de Consuegra de 1097.',
          source: {
            label: 'Turismo oficial de Consuegra',
            href: 'https://consuegra.es/es/descubre/monumentos/castillo-de-consuegra',
          },
        },
        {
          src: '/assets/hobbies/drone-flight-Fk6UYF4GO8M.jpg',
          title: 'Huerta de la Obispalía',
          alt: 'Paisaje captado desde el aire durante otro vuelo de dron',
          href: 'https://youtu.be/Fk6UYF4GO8M',
          description:
            'El castillo de Huerta de la Obispalía ocupa la parte más alta del pueblo y tiene un origen andalusí del siglo X. Su torre del homenaje actual es del siglo XV y conserva una inscripción de 1473 relacionada con el poder eclesiástico de la antigua Obispalía.',
          source: {
            label: 'Turismo de Castilla-La Mancha',
            href: 'https://www.turismocastillalamancha.es/es/cultura-y-patrimonio/castillos/cuenca/castillo-de-huerta-de-la-obispalia',
          },
        },
        {
          src: '/assets/hobbies/drone-flight-IcJ5EI_Ovlw.jpg',
          title: 'Castillo de Zafra (Guadalajara)',
          alt: 'Paisaje aéreo captado durante el último vuelo de dron',
          href: 'https://youtu.be/IcJ5EI_Ovlw',
          description:
            'El Castillo de Zafra se alza sobre un risco en Campillo de Dueñas y fue construido en el siglo XII sobre una fortaleza de origen árabe. En Juego de tronos se convirtió en la Torre de la Alegría de Dorne, el lugar donde Ned Stark encuentra a su hermana Lyanna.',
          source: {
            label: 'El País: escenarios españoles de Juego de tronos',
            href: 'https://elpais.com/elviajero/2016/04/22/actualidad/1461325131_973662.html',
          },
        },
      ],
    },
    {
      id: 'contact',
      slug: 'contacto',
      title: 'Contacto',
      subtitle: 'Disponible para conversaciones profesionales sobre frontend, arquitectura UI y producto web.',
      eyebrow: 'Hablemos',
      theme: 'contact',
      accentColor: '#111827',
      content:
        'La forma más directa de contacto es por email o LinkedIn. Si quieres hablar sobre frontend, arquitectura UI, producto web o colaboración técnica, estaré encantado de leerte.',
      items: [
        { label: 'hola@conquense.dev', href: 'mailto:hola@conquense.dev' },
        { label: 'LinkedIn', href: 'https://es.linkedin.com/in/rgarcia85' },
        { label: 'GitHub', href: 'https://github.com/ralph1985' },
      ],
    },
  ],
  en: [
    {
      id: 'home',
      slug: 'home',
      title: 'I listen, understand and turn needs into easy-to-use interfaces.',
      subtitle: 'UI architecture, digital product and frontend quality for demanding environments.',
      eyebrow: 'Rafael García Prieto · Portfolio',
      theme: 'intro',
      accentColor: '#2563eb',
      content:
        'I design and build web interfaces for demanding environments, with a strong focus on technical clarity, performance, maintainability and user experience. I am particularly comfortable working on banking products, UI architecture, frontend quality and mobile web applications.',
      items: ['Mobile banking and investment', 'UI architecture with Ember and Lit', 'Frontend performance and quality', 'Technical product coordination'],
      actions: [
        { label: 'View experience', href: routesByLanguage.en.experience },
        { label: 'View projects', href: routesByLanguage.en.projects },
      ],
    },
    {
      id: 'profile',
      slug: 'profile',
      title: 'What I solve',
      subtitle: 'I turn complex needs into clear, maintainable digital products that are ready to grow.',
      eyebrow: 'Value proposition',
      theme: 'profile',
      accentColor: '#0f766e',
      content:
        'I bring frontend experience, technical judgement and collaborative delivery to make difficult problems clearer and turn them into useful solutions. I work across product, design and technology to build interfaces people understand, architectures that hold up and teams that can keep moving.',
      items: ['Interfaces people understand', 'Architectures that hold up', 'Teams that keep moving'],
    },
    {
      id: 'workflow',
      slug: 'how-i-work',
      title: 'How I work',
      subtitle: 'A clear process for turning a complex need into a solution the team can maintain and grow.',
      eyebrow: 'Process',
      theme: 'method',
      accentColor: '#4f46e5',
      content:
        'I make the problem, context and constraints visible first. Then I align decisions across product, design and technology, build in cycles and review each delivery. Artificial intelligence speeds up exploration and implementation, but the judgement and responsibility remain mine.',
      items: ['Understand before building', 'Decide with context', 'Build and review', 'Evolve what works'],
    },
    {
      id: 'architecture',
      slug: 'architecture',
      title: 'Architecture',
      subtitle: 'Maintainable interfaces for products that evolve over years.',
      eyebrow: 'Systems',
      theme: 'architecture',
      accentColor: '#475569',
      content:
        'I have contributed to the design and evolution of frontend architectures for applications with complex business logic, service integration, testing, continuous integration and distributed teams. I prioritize clear boundaries, explicit data and components that can be understood without ceremony.',
      items: ['UI architecture', 'Testing', 'Continuous integration'],
    },
    {
      id: 'experience',
      slug: 'experience',
      title: 'Experience',
      subtitle: 'From an industrial internship to senior frontend work in mobile banking and investment.',
      eyebrow: 'Work',
      theme: 'experience',
      accentColor: '#334155',
      content:
        'My professional path combines banking products, mobile web, custom development, business-management SaaS and integration with real clients. The work experience is now reviewed by stage and separated from representative projects.',
      items: ['BBVA Technology', 'BBVA IT España · GFT', 'Mobile One2One', 'Geanet onDemand', 'ComNet', 'Goitek'],
      actions: [{ label: 'View experience', href: routesByLanguage.en.experience }],
    },
    {
      id: 'projects',
      slug: 'projects',
      title: 'Projects',
      subtitle: 'Digital banking, booking, mobile e-commerce and internal applications.',
      eyebrow: 'Cases',
      theme: 'projects',
      accentColor: '#9333ea',
      content:
        'Projects will be reviewed separately, starting with GitHub and public cases that can be shown rigorously. This section is reserved for representative work without mixing it with the employment timeline.',
      items: ['GitHub', 'Public cases', 'Representative work'],
      actions: [{ label: 'View projects', href: routesByLanguage.en.projects }],
    },
    {
      id: 'stack',
      slug: 'stack',
      title: 'Stack',
      subtitle: 'JavaScript as the core, with complementary experience in backend, data and delivery.',
      eyebrow: 'Technology',
      theme: 'stack',
      accentColor: '#0369a1',
      content:
        'My main foundation is JavaScript, HTML and CSS, with experience in Ember, LitElement, SCSS, frontend tooling, testing, Git, CI and REST APIs. I also bring a solid PHP, SQL and management applications background, useful for understanding product beyond the visual layer.',
      items: ['JavaScript', 'Ember', 'LitElement', 'SCSS', 'Testing', 'Git'],
    },
    {
      id: 'hobbies',
      slug: 'another-way-of-looking',
      title: 'Another way of looking',
      subtitle: 'I also fly drones and publish videos on YouTube.',
      eyebrow: 'Beyond work',
      theme: 'hobbies',
      accentColor: '#0369a1',
      content:
        'Planning a flight, finding a perspective and turning it into an audiovisual piece is another way of working with attention, precision and curiosity.',
      media: [
        {
          src: '/assets/hobbies/drone-flight-d5C1apoWJ9w.jpg',
          title: 'Torrebuceit',
          alt: 'Aerial view of a chapel and the surrounding landscape',
          href: 'https://youtu.be/d5C1apoWJ9w',
          description:
            'Castillo de Torrebuceit, in Villar del Águila (Torrejoncillo del Rey, Cuenca), is a fortress of Islamic origin set within the landscape of the Záncara valley. It is now privately owned and can only be viewed from outside. It also has a personal meaning for me: I grew up there until I was four.',
          source: {
            label: 'Castilla-La Mancha tourism information',
            href: 'https://www.turismocastillalamancha.es/es/cultura-y-patrimonio/castillos/cuenca/castillo-de-torrebuceit',
          },
        },
        {
          src: '/assets/hobbies/drone-flight-t-42MBn1ZFE.jpg',
          title: 'Ávila',
          alt: 'Aerial view captured during another drone flight',
          href: 'https://youtu.be/t-42MBn1ZFE',
          description:
            'Ávila preserves one of Europe’s best-preserved medieval walls. Its historic city, extra-mural churches and walled enclosure are part of the UNESCO World Heritage site.',
          source: {
            label: 'Ávila World Heritage, Spanish Ministry of Culture',
            href: 'https://www.cultura.gob.es/cultura/areas/patrimonio/mc/patrimoniomundial/bienes-declarados/por-ano-de-inscripcion/1985/avila.html',
          },
        },
        {
          src: '/assets/hobbies/drone-flight-Ll9hkctwzvM.jpg',
          title: 'Castillo de Peracense',
          alt: 'Aerial view of a fortress among rock formations',
          href: 'https://youtu.be/Ll9hkctwzvM',
          description:
            'Peracense Castle rises from a red sandstone rock and arranges its defences across several enclosures shaped by the terrain. The fortress played a strategic role on the frontier, while its main residence was occupied during the fourteenth and fifteenth centuries.',
          source: {
            label: 'Peracense Castle',
            href: 'https://www.castillodeperacense.es/conocenos/el-castillo/',
          },
        },
        {
          src: '/assets/hobbies/drone-flight-0n4WIq5jOWw.jpg',
          title: 'Castillo de Consuegra',
          alt: 'Aerial view of a landscape during a drone flight',
          href: 'https://youtu.be/0n4WIq5jOWw',
          description:
            'Consuegra Castle dominates Cerro Calderico. Its origins go back to a tenth-century Muslim fortification, later rebuilt and enlarged by the Order of Malta. The surrounding area was also the scene of the Battle of Consuegra in 1097.',
          source: {
            label: 'Official Consuegra tourism',
            href: 'https://consuegra.es/es/descubre/monumentos/castillo-de-consuegra',
          },
        },
        {
          src: '/assets/hobbies/drone-flight-Fk6UYF4GO8M.jpg',
          title: 'Huerta de la Obispalía',
          alt: 'Aerial view of a landscape during another drone flight',
          href: 'https://youtu.be/Fk6UYF4GO8M',
          description:
            'The castle of Huerta de la Obispalía occupies the highest point of the village and has an Andalusi origin dating from the tenth century. Its current keep dates from the fifteenth century and preserves a 1473 inscription linked to the ecclesiastical power of the former Obispalía territory.',
          source: {
            label: 'Castilla-La Mancha tourism',
            href: 'https://www.turismocastillalamancha.es/es/cultura-y-patrimonio/castillos/cuenca/castillo-de-huerta-de-la-obispalia',
          },
        },
        {
          src: '/assets/hobbies/drone-flight-IcJ5EI_Ovlw.jpg',
          title: 'Castillo de Zafra (Guadalajara)',
          alt: 'Aerial view of a landscape during the latest drone flight',
          href: 'https://youtu.be/IcJ5EI_Ovlw',
          description:
            'Zafra Castle rises on a rocky outcrop in Campillo de Dueñas and was built in the twelfth century over a fortress of Arab origin. In Game of Thrones it became the Tower of Joy in Dorne, where Ned Stark finds his sister Lyanna.',
          source: {
            label: 'El País: Spanish Game of Thrones locations',
            href: 'https://elpais.com/elviajero/2016/04/22/actualidad/1461325131_973662.html',
          },
        },
      ],
    },
    {
      id: 'contact',
      slug: 'contact',
      title: 'Contact',
      subtitle: 'Available for professional conversations about frontend, UI architecture and web products.',
      eyebrow: 'Let us talk',
      theme: 'contact',
      accentColor: '#111827',
      content:
        'The most direct way to get in touch is by email or LinkedIn. If you want to talk about frontend, UI architecture, web products or technical collaboration, I will be glad to hear from you.',
      items: [
        { label: 'hola@conquense.dev', href: 'mailto:hola@conquense.dev' },
        { label: 'LinkedIn', href: 'https://es.linkedin.com/in/rgarcia85' },
        { label: 'GitHub', href: 'https://github.com/ralph1985' },
      ],
    },
  ],
};

export const portfolioSections = localizedPortfolioSections.es;
