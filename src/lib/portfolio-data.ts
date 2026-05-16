// Dynamic data — edit here to update portfolio content.
// To add a new tech background to the hero rotation: import the image
// and add it to `heroTechs` with { name, bgImage }.

import libraryProject from "@/assets/library-project.jpg";
import iftsProject from "@/assets/ifts-project.png";
import iftsProject2 from "@/assets/ifts-project-2.png";
import iftsProjectVideo from "@/assets/ifts-project-3.mp4";
import agipProject from "@/assets/agip-project.png";
import agipProject2 from "@/assets/agip-project-2.mp4";
import agipProject3 from "@/assets/agip-project-3.png";
import agipProject4 from "@/assets/agip-project-4.png";
import encryptorProject from "@/assets/encryptor-project.png";
import encryptorProject2 from "@/assets/encryptor-project-2.mp4";

export const profile = {
  name: "Nahuel",
  title: "Analista de Sistemas & Desarrollador Backend",
  shortRole: "Backend & Analista de Sistemas",
  location: "Buenos Aires, Argentina (CABA)",
  email: "nahueltisera03@gmail.com",
  github: "https://github.com/nxhuel",
  linkedin: "https://www.linkedin.com/in/tisera-nahuel-ab3864219/",
  cvUrl: "#",
  intro:
    "Analizo, diseño y construyo APIs robustas con Java y Spring Boot. Cuento con experiencia práctica aplicando tecnologías modernas como Spring Security, JWT y Swagger/OpenAPI para el manejo eficiente de autenticación, autorización y documentación de servicios REST. Mi perfil se complementa con el manejo de persistencia de datos usando Hibernate y JPA, base de datos SQL y herramientas esenciales como Docker y Git.",
  available: true,
};

/**
 * Imágenes de fondo del hero — rota una distinta por cada tecnología.
 * Para sumar una nueva: importá la imagen arriba y agregá un objeto acá.
 */
export const heroTechs: { name: string; bgImage: string }[] = [
  {
    name: "Diseño de Sistemas",
    bgImage:
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  { name: "Bases de Datos", bgImage: "https://wallpaperaccess.com/full/1623270.jpg" },
  {
    name: "Backend",
    bgImage:
      "https://assets.toptal.io/images?url=https%3A%2F%2Fuploads.toptal.io%2Fblog%2Fimage%2F125553%2Ftoptal-blog-image-1520247340412-dc6cfd3e7760ea9a8d75a8f9d0b93a77.png&width=1920",
  },
  {
    name: "Frontend",
    bgImage: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*XLsLVPkyoVO-xeTzca7fYQ.png",
  },
  {
    name: "Docker & GitHub",
    bgImage: "https://emmer.dev/static/img/blog/publishing-docker-images-with-github-actions.jpg",
  },
  {
    name: "Inteligencia Artificial",
    bgImage:
      "https://images-www.contentful.com/fo9twyrwpveg/GdR0IfpoUsLS0RhjiKYDw/147b321879a5e6e3ab33f97d3c5762db/MCP-vs-RAG-header1__1_.png?w=1320&q=60&fm=webp",
  },
];

export const expertise = [
  {
    code: "01",
    title: "APIs Escalables",
    body: "Servicios REST preparados para crecer, con tiempos de respuesta cuidados y contratos claros.",
  },
  {
    code: "02",
    title: "Backend Seguro",
    body: "Autenticación, autorización y buenas prácticas de seguridad por diseño en cada capa del sistema.",
  },
  {
    code: "03",
    title: "Integración de Sistemas",
    body: "Conecto servicios y aplicaciones entre sí, ordenando los datos y los flujos entre dominios.",
  },
  {
    code: "04",
    title: "Bases de Datos",
    body: "Modelado, optimización y mantenimiento sobre MySQL para datos confiables y rápidos.",
  },
  {
    code: "05",
    title: "Automatización & CI/CD",
    body: "Pipelines de integración continua, contenedores con Docker y automatizaciones con n8n.",
  },
  {
    code: "06",
    title: "Integración & Orquestación de IA's",
    body: "Agentes locales con LangChain, técnicas RAG y OCR sobre Qdrant para acceso contextual a la información.",
  },
];

export const experience = [
  {
    range: "2025 — Presente",
    role: "Desarrollador de Software & IA",
    org: "Ministerio de Defensa",
    body: "Diseño e integro agentes de IA locales en sistemas internos, participando en su desarrollo, entrenamiento y despliegue. Implemento técnicas RAG y OCR para mejorar la precisión y el acceso a información contextual. Desarrollé el sitio de la Dirección de Informática y brindo soporte técnico integral.",
    stack: ["Python", "LangChain", "MySQL", "Qdrant", "n8n", "Docker", "Git", "Putty", "React"],
    primary: true,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1c/Sello_Ministerio_de_Defensa_-_Argentina.png",
    imageAlt: "Escudo del Ministerio de Defensa de la Nación Argentina",
  },
  {
    range: "2024 — 2025",
    role: "Desarrollador FullStack Trainee",
    org: "AGIP",
    body: "Junto al equipo de desarrollo, realicé la migración de PHP a Python, mejorando la calidad del código con principios SOLID y trabajando en metodologías ágiles como XP.",
    stack: ["Python", "Django", "SQL Server", "Git", "JavaScript", "Bootstrap"],
    primary: true,
    image:
      "https://media.licdn.com/dms/image/v2/D4D0BAQFt0G4qY54yng/company-logo_200_200/company-logo_200_200/0/1723573485282/agip__dgr_logo?e=1780531200&v=beta&t=Te-tRryBG7AB6sl6VD3zfkfvFycExCaarx5unbhb_Uo",
    imageAlt: "Logo de AGIP - Administración Gubernamental de Ingresos Públicos",
  },
];

export const education = [
  {
    range: "2026 — Actualidad",
    title: "Licenciatura en Tecnologías Digitales",
    org: "UdelaCiudad",
  },
  {
    range: "2023 — 2025",
    title: "Tecnicatura en Análisis de Sistemas",
    org: "IFTS N°21",
  },
];

/**
 * Proyectos del laboratorio.
 * Todos los campos de `details` son opcionales: completá solo lo que tengas
 * para cada proyecto. Si no hay details, el modal igual muestra body + rows.
 */
export type ProjectMetric = { label: string; value: string };
export type ProjectChart = { label: string; percent: number }; // 0-100
export type PieDatum = { name: string; value: number };
export type ProjectDashboard = {
  title: string;
  subtitle?: string;
  data: PieDatum[];
};
export type ProjectDetails = {
  problem?: string;
  useCases?: string[];
  videoUrl?: string; // mp4 o youtube embed
  images?: { src: string; alt: string }[];
  metrics?: ProjectMetric[];
  dashboards?: ProjectDashboard[];
  links?: { label: string; href: string }[];
};

export type Project = {
  ref: string;
  title: string;
  body: string;
  cover: string;
  rows: [string, string][];
  details?: ProjectDetails;
};

export const projects: Project[] = [
  {
    ref: "Libreria Web v2",
    title: "Refactor: Sistema de Gestión Bibliotecaria",
    body: "Re-ingeniería de una aplicación legacy hacia una arquitectura moderna con Spring Boot, validación con DTOs, separación por capas y persistencia con JPA.",
    cover: libraryProject,
    rows: [
      [
        "Stack",
        "Java, Spring Boot, Spring Security, JWT, Postman, Swagger, MySQL, Git, React, TailwindCSS, Docker",
      ],
    ],
    details: {
      problem:
        "Una librería web hecha hace dos años con código acoplado, sin validaciones consistentes y difícil de mantener. El objetivo fue refactorizarla aplicando los conocimientos actuales sin reescribir desde cero.",
      useCases: [
        "Registrar y catalogar libros con autor y categoría",
        "Gestionar préstamos y devoluciones",
        "Buscar y filtrar el catálogo desde una API REST",
        "Validar reglas de negocio antes de persistir",
      ],
      metrics: [
        { label: "Endpoints REST", value: "18" },
        { label: "Entidades modeladas", value: "7" },
        { label: "Capas de arquitectura", value: "4" },
      ],
      dashboards: [
        {
          title: "Préstamos por categoría",
          subtitle: "Distribución del catálogo activo",
          data: [
            { name: "Ficción", value: 42 },
            { name: "Técnicos", value: 28 },
            { name: "Historia", value: 18 },
            { name: "Infantil", value: 12 },
          ],
        },
        {
          title: "Estado de los libros",
          subtitle: "Inventario al día de hoy",
          data: [
            { name: "Disponibles", value: 64 },
            { name: "Prestados", value: 26 },
            { name: "En reserva", value: 7 },
            { name: "En reparación", value: 3 },
          ],
        },
      ],
      images: [{ src: libraryProject, alt: "Vista del sistema bibliotecario" }],
      links: [{ label: "Repositorio (próximamente)", href: "#" }],
    },
  },
  {
    ref: "Aula Virtual",
    title: "Refactorización de Aula Virtual",
    body: "Plataforma integral para la institucion IFTS° 21 que permite gestionar usuarios, materias, correlativas e inscripciones de forma ágil y segura. Desarrollada con Java (Spring Boot y Spring Security) y Front-end (HTML, CSS y JavaScript). API RESTful segura con integración JWT y enfoque escalable.",
    cover: iftsProject,
    rows: [
      [
        "Stack",
        "Java, Spring Boot, Spring Security, JWT, Postman, MySQL, Git, HTML, CSS, JavaScript, Bootstrap, Vercel",
      ],
    ],
    details: {
      problem:
        "Este sistema fue parte del final para aprobar la materia Desarrollo Web, la idea era modernizar el sistema actual que tiene la institucion con lo visto, HTML, CSS y JavaScript. Sin embargo, decidi ir mas alla y con permiso del docente, aplicando una ingenieria inversa para poder documentar y empezar con el backend hecho en Java, Spring Boot, etc. y una base de datos con MySQL aplicando tambien lo visto en las otras materias.",
      useCases: [
        "Gestión de usuarios (docentes y alumnos)",
        "Gestión de inscripciones",
        "Consultar mesas de examen",
        "Consultar historial académico",
        "Validar correlativas",
        "Control de permisos",
      ],
      metrics: [
        { label: "Entidades modeladas", value: "9" },
        { label: "Capas de arquitectura", value: "4" },
        { label: "Autenticación", value: "JWT" },
      ],
      dashboards: [
        {
          title: "Usuarios por rol",
          subtitle: "Distribución de accesos dentro del sistema",
          data: [
            { name: "Alumnos", value: 58 },
            { name: "Docentes", value: 24 },
            { name: "Administradores", value: 12 },
            { name: "Inspectores", value: 6 },
          ],
        },
        {
          title: "Operaciones del sistema",
          subtitle: "Acciones registradas en la plataforma",
          data: [
            { name: "Inscripciones", value: 64 },
            { name: "Consultas", value: 48 },
            { name: "Validaciones", value: 30 },
            { name: "Autenticaciones", value: 85 },
          ],
        },
      ],
      images: [
        { src: iftsProject, alt: "Vista del aula virtual" },
        { src: iftsProject2, alt: "Vista del aula virtual 2" },
      ],
      videoUrl: iftsProjectVideo,
      links: [
        { label: "Repositorio", href: "#" },
        { label: "Demo", href: "https://aula-virtual-ifts.vercel.app/" },
      ],
    },
  },
  {
    ref: "Sú AGIP",
    title: "Sistema de Gestión Educativa para Entidad Gubernamental",
    body: "Sistema completo para gestión de útiles provenientes de todas las áreas del organismo, permitiendo tener información actualizada del stock disponible, objeto que se pide, y toda la información correspondiente para ser auditada. Implementada con arquitectura Modelo-Vista-Plantilla (MVT) y Shared-Nothing (Múltiples aplicaciones independientes que forman el proyecto completo).",
    cover: agipProject,
    rows: [["Stack", "Python, Django, SQL Server, Git, JavaScript, Bootstrap"]],
    details: {
      problem:
        "El organismo contaba con un sistema legado desarrollado en una versión antigua de PHP, con limitaciones de mantenimiento, escalabilidad y trazabilidad de la información. El proyecto tuvo como objetivo modernizar la plataforma utilizando tecnologías actuales, centralizar la gestión de stock y solicitudes de útiles, y mejorar la capacidad de auditoría y seguimiento de los recursos.",
      useCases: [
        "Solicitud de útiles",
        "Gestión de préstamos y devoluciones",
        "Buscar y filtrar el catálogo desde una API REST",
        "Validar reglas de negocio antes de persistir",
      ],
      metrics: [
        { label: "Módulos independientes", value: "3" },
        { label: "Procesos digitalizados", value: "Stock y solicitudes" },
        { label: "Arquitectura", value: "MVT + Shared-Nothing" },
      ],
      dashboards: [
        {
          title: "Estado de solicitudes",
          subtitle: "Seguimiento de pedidos realizados",
          data: [
            { name: "Aprobadas", value: 58 },
            { name: "Pendientes", value: 24 },
            { name: "Rechazadas", value: 8 },
            { name: "Entregadas", value: 42 },
          ],
        },
        {
          title: "Inventario de útiles",
          subtitle: "Distribución del stock disponible",
          data: [
            { name: "Papelería", value: 40 },
            { name: "Tecnología", value: 22 },
            { name: "Limpieza", value: 18 },
            { name: "Mobiliario", value: 12 },
          ],
        },
      ],
      images: [
        { src: agipProject, alt: "Vista del aula virtual" },
        { src: agipProject3, alt: "Vista del aula virtual 2" },
        { src: agipProject4, alt: "Vista del aula virtual 3" },
      ],
      videoUrl: agipProject2,
      links: [{ label: "Repositorio (privado)", href: "#projects" }],
    },
  },
  {
    ref: "Alura Latam Challenge",
    title: "Encriptador de Texto",
    body: "Desarrollo de una Pagina Web con el desafío de generar mi propio hash seguro e irrepetible y manejo del DOM. El proyecto consiste en una página web que permite a los usuarios ingresar texto y generar un hash único e irrepetible utilizando un algoritmo de encriptación personalizado. La aplicación también incluye funcionalidades para verificar la autenticidad del texto ingresado comparándolo con el hash generado, proporcionando una capa adicional de seguridad y confianza para los usuarios.",
    cover: encryptorProject,
    rows: [["Stack", "HTML, CSS, JavaScript, Git, Vercel"]],
    details: {
      problem:
        "El proposito de este challenge fue mejorar el manejo del DOM y la logica de encriptacion y desencriptacion. Ademas de entender como funcionan los hashes y como se puede crear uno propio.",
      useCases: [
        "Encriptar texto",
        "Desencriptar texto",
        "Generar hash único e irrepetible",
        "Validar autenticidad del texto ingresado",
      ],
      metrics: [
        { label: "Tiempo de respuesta", value: "< 50ms" },
        { label: "Funciones implementadas", value: "9" },
        { label: "Compatibilidad", value: "Responsive" },
      ],
      dashboards: [
        {
          title: "Operaciones realizadas",
          subtitle: "Uso de funcionalidades principales",
          data: [
            { name: "Encriptaciones", value: 68 },
            { name: "Desencriptaciones", value: 24 },
            { name: "Copias al portapapeles", value: 18 },
            { name: "Validaciones", value: 10 },
          ],
        },
        {
          title: "Tipos de texto procesado",
          subtitle: "Contenido ingresado por usuarios",
          data: [
            { name: "Mensajes", value: 45 },
            { name: "Contraseñas", value: 20 },
            { name: "Notas", value: 25 },
            { name: "Otros", value: 10 },
          ],
        },
      ],
      images: [{ src: encryptorProject, alt: "Vista del aula virtual" }],
      videoUrl: encryptorProject2,
      links: [
        { label: "Repositorio", href: "https://github.com/nxhuel/challenge-oracle" },
        { label: "Demo", href: "https://nxhuel.github.io/challenge-oracle/" },
      ],
    },
  },
];

export const stack = {
  Backend: ["Java", "Spring Boot", "Spring Security", "JWT", "Spring Cloud", "REST APIs"],
  Datos: ["MySQL", "JPA / Hibernate"],
  DevOps: ["Docker", "Git", "CI/CD"],
  "IA & Frontend": ["Python", "n8n", "LangChain", "Qdrant", "RAG", "OCR", "React", "Tailwind"],
};

export const sections = [
  { id: "hero", index: "00", label: "Inicio" },
  { id: "expertise", index: "01", label: "Especialidades" },
  { id: "experience", index: "02", label: "Experiencia" },
  { id: "projects", index: "03", label: "Proyectos" },
  { id: "stack", index: "04", label: "Stack" },
  { id: "contact", index: "05", label: "Contacto" },
] as const;
