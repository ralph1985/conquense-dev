import type { Language } from './i18n';

export type LegalPageKey = 'legalNotice' | 'privacy' | 'cookies';

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalPage {
  title: string;
  description: string;
  sections: LegalSection[];
}

const legalData = {
  es: {
    owner: 'Rafael García Prieto',
    address: 'Calle de los Jazmines 1, 1B, 28880 Meco, Madrid',
    email: 'hola@conquense.dev',
    domain: 'conquense.dev',
    reviewed: 'Última revisión: 6 de agosto de 2026',
    footer: 'Portfolio personal y profesional de Rafael García Prieto.',
    legalLabel: 'Información legal',
    pages: {
      legalNotice: {
        title: 'Aviso Legal',
        description: 'Información sobre la titularidad y las condiciones de uso de conquense.dev.',
        sections: [
          {
            title: 'Datos identificativos',
            list: [
              'Titular: Rafael García Prieto',
              'Domicilio: Calle de los Jazmines 1, 1B, 28880 Meco, Madrid',
              'Dominio: conquense.dev',
              'Correo electrónico: hola@conquense.dev',
            ],
          },
          {
            title: 'Objeto del sitio web',
            paragraphs: [
              'Conquense.dev es un portfolio personal y profesional que presenta la trayectoria, experiencia, proyectos y áreas de interés de Rafael García Prieto.',
              'El sitio tiene finalidad exclusivamente informativa y no ofrece servicios profesionales independientes, contratación, presupuestos, comercio electrónico ni suscripciones.',
            ],
          },
          {
            title: 'Condiciones de uso',
            paragraphs: [
              'La navegación por este sitio implica el uso lícito y responsable de sus contenidos y funcionalidades. No se permite utilizar la web para dañar su funcionamiento, introducir código malicioso o vulnerar derechos de terceros.',
              'Los contenidos pueden actualizarse, modificarse o retirarse sin necesidad de aviso previo cuando resulte necesario para mantener la información al día.',
            ],
          },
          {
            title: 'Propiedad intelectual',
            paragraphs: [
              'Salvo que se indique lo contrario, los textos, diseño, estructura, código y elementos gráficos del sitio pertenecen a Rafael García Prieto o se utilizan con autorización suficiente.',
              'La reproducción, distribución, transformación o comunicación pública de los contenidos requiere autorización previa cuando no exista una habilitación legal para ello.',
            ],
          },
          {
            title: 'Enlaces externos',
            paragraphs: [
              'El sitio contiene enlaces a servicios y recursos externos, como YouTube, LinkedIn, GitHub y páginas de proyectos. Estos enlaces se abren en servicios gestionados por terceros y quedan sujetos a sus propias condiciones y políticas.',
              'Rafael García Prieto no controla los contenidos, disponibilidad ni tratamientos de datos que realicen esos terceros fuera de conquense.dev.',
            ],
          },
          {
            title: 'Responsabilidad',
            paragraphs: [
              'Se adoptan medidas razonables para procurar la disponibilidad y seguridad del sitio, pero no se garantiza la ausencia absoluta de errores, interrupciones o incidencias derivadas de la red, el alojamiento o causas ajenas al titular.',
            ],
          },
          {
            title: 'Legislación aplicable',
            paragraphs: ['Este aviso se rige por la legislación española, sin perjuicio de las normas imperativas que puedan resultar aplicables.'],
          },
        ],
      },
      privacy: {
        title: 'Política de Privacidad',
        description: 'Información sobre los tratamientos de datos personales relacionados con conquense.dev.',
        sections: [
          {
            title: 'Responsable del tratamiento',
            list: [
              'Responsable: Rafael García Prieto',
              'Domicilio: Calle de los Jazmines 1, 1B, 28880 Meco, Madrid',
              'Correo electrónico: hola@conquense.dev',
            ],
          },
          {
            title: 'Datos y origen',
            paragraphs: [
              'La web no dispone de formularios propios, registro, newsletter, comentarios ni área privada. Los datos personales que se reciban procederán de las comunicaciones que una persona decida enviar voluntariamente a hola@conquense.dev.',
              'El proveedor de alojamiento puede tratar datos técnicos de conexión necesarios para entregar las páginas, proteger el servicio y diagnosticar incidencias.',
            ],
          },
          {
            title: 'Finalidades y bases jurídicas',
            list: [
              'Atender y responder los mensajes recibidos por email, sobre la base de la solicitud de la persona interesada y, cuando corresponda, la adopción de medidas precontractuales.',
              'Mantener la seguridad, disponibilidad y funcionamiento técnico del sitio, sobre la base del interés legítimo del responsable.',
              'Obtener estadísticas agregadas de audiencia mediante Vercel Web Analytics, sobre la base del interés legítimo en conocer y mejorar el uso de esta web, sin utilizar cookies de seguimiento.',
              'Cumplir las obligaciones legales que resulten aplicables.',
            ],
          },
          {
            title: 'Vercel Web Analytics',
            paragraphs: [
              'El sitio utiliza Vercel Web Analytics para conocer de forma agregada qué páginas se visitan y cómo se utiliza la web. Vercel indica que esta herramienta no utiliza cookies ni identificadores personales para seguir a una persona entre sitios, aunque puede tratar datos como URL, referencia, dispositivo, navegador, ubicación aproximada y momento de acceso.',
              'No se envían deliberadamente a esta herramienta nombres, direcciones de email ni otros datos introducidos por una persona.',
            ],
          },
          {
            title: 'Proveedores y terceros',
            paragraphs: [
              'El buzón hola@conquense.dev está gestionado mediante DonDominio. El sitio está alojado y desplegado en Vercel, que también presta el servicio de analítica indicado.',
              'Los enlaces a YouTube, LinkedIn, GitHub y otros sitios no transfieren datos a esos servicios por el mero hecho de estar enlazados. Si se abren, el tratamiento posterior dependerá de cada tercero y de su política de privacidad.',
            ],
          },
          {
            title: 'Conservación',
            paragraphs: [
              'Los mensajes se conservarán durante el tiempo necesario para atender la comunicación y, posteriormente, durante los plazos que puedan exigir responsabilidades legales. Los datos técnicos y estadísticos se conservarán conforme a las políticas y configuración de los proveedores correspondientes.',
            ],
          },
          {
            title: 'Transferencias internacionales',
            paragraphs: [
              'Algunos proveedores tecnológicos pueden procesar datos fuera del Espacio Económico Europeo. Vercel informa de que puede procesar datos en Estados Unidos y otros países mediante los mecanismos de transferencia previstos en su documentación contractual. DonDominio informa en su política de privacidad sobre los tratamientos y garantías aplicables a sus servicios.',
              'No se realizan transferencias internacionales adicionales desde el código de esta web. Para conocer el detalle actualizado de proveedores, ubicaciones y garantías, deben consultarse las políticas y condiciones de cada proveedor.',
            ],
          },
          {
            title: 'Derechos',
            paragraphs: [
              'Puedes solicitar el acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad cuando proceda, así como retirar un consentimiento previamente prestado, escribiendo a hola@conquense.dev.',
              'También puedes presentar una reclamación ante la Agencia Española de Protección de Datos si consideras que el tratamiento no se ajusta a la normativa.',
            ],
          },
        ],
      },
      cookies: {
        title: 'Política de Cookies',
        description: 'Información sobre cookies y almacenamiento local en conquense.dev.',
        sections: [
          {
            title: 'Cookies',
            paragraphs: [
              'En su configuración actual, conquense.dev no instala cookies propias, cookies publicitarias ni cookies de terceros durante la navegación por sus páginas.',
              'Los vídeos de la sección audiovisual son enlaces externos a YouTube; no se cargan reproductores ni contenido de YouTube dentro de la web.',
            ],
          },
          {
            title: 'Analítica',
            paragraphs: [
              'La web utiliza Vercel Web Analytics para estadísticas agregadas. Vercel indica que esta herramienta no utiliza cookies y que identifica técnicamente las visitas mediante un hash derivado de la solicitud, con una duración limitada, sin seguimiento entre sitios.',
            ],
          },
          {
            title: 'Almacenamiento local',
            paragraphs: [
              'La web utiliza el almacenamiento local del navegador únicamente para recordar la preferencia de tema claro, oscuro o automático elegida por la persona usuaria. No se utiliza para identificar, seguir, perfilar ni medir a la persona visitante.',
            ],
          },
          {
            title: 'Enlaces a terceros',
            paragraphs: [
              'Al abrir enlaces a YouTube, LinkedIn, GitHub u otros servicios, la navegación pasa al entorno del tercero. Esos servicios pueden utilizar sus propias cookies y tecnologías similares conforme a sus políticas.',
            ],
          },
          {
            title: 'Cambios futuros',
            paragraphs: [
              'Si se incorporan cookies, contenido embebido, publicidad, herramientas de seguimiento o servicios que requieran consentimiento, esta política se actualizará y se adoptarán las medidas necesarias antes de activarlos.',
            ],
          },
        ],
      },
    },
  },
  en: {
    owner: 'Rafael García Prieto',
    address: 'Calle de los Jazmines 1, 1B, 28880 Meco, Madrid, Spain',
    email: 'hola@conquense.dev',
    domain: 'conquense.dev',
    reviewed: 'Last reviewed: 6 August 2026',
    footer: 'Personal and professional portfolio by Rafael García Prieto.',
    legalLabel: 'Legal information',
    pages: {
      legalNotice: {
        title: 'Legal Notice',
        description: 'Information about the ownership and terms of use of conquense.dev.',
        sections: [
          { title: 'Identification details', list: ['Owner: Rafael García Prieto', 'Address: Calle de los Jazmines 1, 1B, 28880 Meco, Madrid, Spain', 'Domain: conquense.dev', 'Email: hola@conquense.dev'] },
          { title: 'Purpose of the website', paragraphs: ['Conquense.dev is a personal and professional portfolio presenting Rafael García Prieto’s career, experience, projects and areas of interest.', 'The site is for information only and does not offer independent professional services, contracting, quotations, ecommerce or subscriptions.'] },
          { title: 'Terms of use', paragraphs: ['Visitors must use the site lawfully and responsibly. The site must not be used to damage its operation, introduce malicious code or infringe third-party rights.', 'Content may be updated, changed or removed without prior notice when necessary to keep the information current.'] },
          { title: 'Intellectual property', paragraphs: ['Unless stated otherwise, the text, design, structure, code and graphic elements belong to Rafael García Prieto or are used with sufficient permission.', 'Reproducing, distributing, transforming or publicly communicating the content requires prior authorisation where no legal permission applies.'] },
          { title: 'External links', paragraphs: ['The site links to external services and resources such as YouTube, LinkedIn, GitHub and project pages. These links lead to third-party services governed by their own terms and policies.', 'Rafael García Prieto does not control the content, availability or data processing carried out by third parties outside conquense.dev.'] },
          { title: 'Liability', paragraphs: ['Reasonable measures are taken to support the site’s availability and security, but absolute freedom from errors, interruptions or incidents caused by networks, hosting or circumstances outside the owner’s control cannot be guaranteed.'] },
          { title: 'Applicable law', paragraphs: ['This notice is governed by Spanish law, without prejudice to any mandatory rules that may apply.'] },
        ],
      },
      privacy: {
        title: 'Privacy Policy',
        description: 'Information about personal-data processing related to conquense.dev.',
        sections: [
          { title: 'Data controller', list: ['Controller: Rafael García Prieto', 'Address: Calle de los Jazmines 1, 1B, 28880 Meco, Madrid, Spain', 'Email: hola@conquense.dev'] },
          { title: 'Data and source', paragraphs: ['The site has no forms, registration, newsletter, comments or private area. Personal data received will come from messages that a person voluntarily sends to hola@conquense.dev.', 'The hosting provider may process technical connection data needed to deliver the pages, protect the service and diagnose incidents.'] },
          { title: 'Purposes and legal bases', list: ['To handle and answer email messages, based on the person’s request and, where applicable, pre-contractual steps.', 'To maintain the site’s security, availability and technical operation, based on the controller’s legitimate interest.', 'To obtain aggregated audience statistics through Vercel Web Analytics, based on the legitimate interest in understanding and improving the use of this site, without using tracking cookies.', 'To comply with applicable legal obligations.'] },
          { title: 'Vercel Web Analytics', paragraphs: ['The site uses Vercel Web Analytics to understand, in aggregate, which pages are visited and how the site is used. Vercel states that the tool does not use cookies or personal identifiers to follow a person across sites, although it may process data such as URL, referrer, device, browser, approximate location and access time.', 'Names, email addresses and other information entered by a person are not deliberately sent to this tool.'] },
          { title: 'Providers and third parties', paragraphs: ['The hola@conquense.dev mailbox is managed through DonDominio. The site is hosted and deployed on Vercel, which also provides the analytics service described above.', 'Links to YouTube, LinkedIn, GitHub and other sites do not transfer data to those services merely because they are present. Once opened, processing is governed by each third party’s privacy policy.'] },
          { title: 'Retention', paragraphs: ['Messages will be kept for as long as needed to handle the communication and afterwards for any periods required to establish or defend legal claims. Technical and statistical data will be retained according to the applicable provider policies and configuration.'] },
          { title: 'International transfers', paragraphs: ['Some technology providers may process data outside the European Economic Area. Vercel states that it may process data in the United States and other countries under the transfer mechanisms set out in its contractual documentation. DonDominio describes the processing and safeguards applicable to its services in its privacy policy.', 'No additional international transfers are made by this site’s code. For current details about providers, locations and safeguards, the policies and terms of each provider should be consulted.'] },
          { title: 'Rights', paragraphs: ['You may request access, rectification, erasure, objection, restriction and portability where applicable, and withdraw previously given consent, by writing to hola@conquense.dev.', 'You may also lodge a complaint with the Spanish Data Protection Agency if you believe processing does not comply with the law.'] },
        ],
      },
      cookies: {
        title: 'Cookie Policy',
        description: 'Information about cookies and local storage on conquense.dev.',
        sections: [
          { title: 'Cookies', paragraphs: ['In its current configuration, conquense.dev does not install first-party cookies, advertising cookies or third-party cookies while its pages are browsed.', 'Videos in the audiovisual section are external YouTube links; YouTube players and content are not loaded inside the site.'] },
          { title: 'Analytics', paragraphs: ['The site uses Vercel Web Analytics for aggregated statistics. Vercel states that the tool does not use cookies and technically identifies visits through a hash derived from the request, with a limited lifespan and no cross-site tracking.'] },
          { title: 'Local storage', paragraphs: ['The site uses browser local storage only to remember the visitor’s selected light, dark or automatic theme preference. It is not used to identify, track, profile or measure visitors.'] },
          { title: 'Third-party links', paragraphs: ['When links to YouTube, LinkedIn, GitHub or other services are opened, browsing moves to the third party’s environment. Those services may use their own cookies and similar technologies under their respective policies.'] },
          { title: 'Future changes', paragraphs: ['If cookies, embedded content, advertising, tracking tools or services requiring consent are added, this policy will be updated and the necessary measures will be taken before they are activated.'] },
        ],
      },
    },
  },
} satisfies Record<Language, { owner: string; address: string; email: string; domain: string; reviewed: string; footer: string; legalLabel: string; pages: Record<LegalPageKey, LegalPage> }>;

export function getLegalPage(lang: Language, key: LegalPageKey): LegalPage {
  return legalData[lang].pages[key];
}

export function getLegalMeta(lang: Language) {
  return legalData[lang];
}
