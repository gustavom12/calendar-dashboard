const dictionary = {
  LANG: "es",
  GLOBAL: {
    PLACEHOLDER: "Texto aquí",
    ACTIONS: {
      DELETE: "Eliminar",
      CANCEL: "Cancelar",
      SURE: "",
    },
    COLUMNS: {
      HIRING: "Contratación",
      PRE_SELECT: "Pre selección",
    },
  },
  NOTIFICATIONS: {
    FOLDERS: {
      CREATE: {
        SUCCESS: "Carpeta creada éxito",
        ERROR: "Error al crear carpeta",
      },
      UPDATE: {
        SUCCESS: "Carpeta actualiza con éxito",
        ERROR: "Error al actualizar carpeta",
      },
      DELETE: {
        SUCCESS: "Carpeta eliminada con éxito",
        ERROR: "Error al eliminar carpeta",
      },
    },
    VACANCIES: {
      CREATE: {
        SUCCESS: "Vacante creada éxito",
        ERROR: "Error al crear vacante",
      },
      CLOSE: {
        SUCCESS: "Vacante finalizada éxito",
        ERROR: "Error al finalizada vacante",
      },
      REOPEN: {
        SUCCESS: "Vacante reabierta éxito",
        ERROR: "Error al reabrir vacante",
      },
      PUBLISH: {
        SUCCESS: "Publicación actualizada éxito",
        ERROR: "Error al actualizar publicación",
      },
      UPDATE: {
        SUCCESS: "Vacante actualiza con éxito",
        ERROR: "Error al actualizar vacante",
      },
      DELETE: {
        SUCCESS: "Vacante eliminada con éxito",
        ERROR: "Error al eliminar vacante",
      },
    },
    INSTANCES: {
      CREATE: {
        SUCCESS: "Instancia creada con éxito",
        ERROR: "Error al crear instancia",
      },
      DELETE: {
        SUCCESS: "Instancia eliminada con éxito",
        ERROR: "Error al eliminar instancia",
      },
    },
    CANDIDATES: {
      DELETE: {
        SUCCESS: "Candidato eliminado con éxito",
        ERROR: "Error al eliminar candidato",
      },
    },
    COMPANY: {
      PUBLISH: {
        SUCCESS: "Marca empleadora actualizada con éxito",
        ERROR: "Error al actualizar marca empleadora",
      },
    },
  },
  AUTH: {
    LOGIN: {
      ACCOUNT: {
        NOT: "¿No tienes una cuenta?",
        START_TODAY: "Comienza hoy",
        LINK: "https://fichap.com/es/contacto",
      },
      WELCOME: "Bienvenido a Fichap",
      FORM: {
        TITLE: "Ingresa con tus datos",
        EMAIL: "E-mail",
        PASSWORD: "Contraseña",
        LOG_IN: "Ingresar",
        REMEMBER: "Recordarme",
        FORGET: {
          PASSWORD: "¿Olvidaste tu contraseña?",
          USER: "¿Olvidaste tu usuario?",
        },
      },
      RESPONSE: {
        SUCCESS: "Haz iniciado sesión correctamente",
        COMMON_ERROR: "Usuario o contraseña incorrectos",
      },
    },
  },
  TABLES: {
    CANDIDATES: {
      NAME: "Nombre",
      LAST_NAME: "Apellido",
      POSITION: "Puesto",
      LOCATION: "Ubicación",
      ACTIONS: "Acciones",
    },
  },
  LEFT_MENU: {
    DASHBOARD: "Dashboard",
    VACANCIES: "Vacantes",
    CANDIDATES: "Candidatos",
    EMPLOYER_BRANDING: "Marca empleadora",
    CALENDAR: "Calendario",
    ADMINISTRATION: "Adminsitración",
  },
  DASHBOARD: {
    HEADER: "Dashboard",
    PRINCIPAL_AREAS: "Principales áreas",
    ACTIVE_VACANCIES_STATE: "Estado de vacantes activas",
    INTERVIEWS_ACTIVITIES: "Actividad de entrevistas",
    CARDS:{
      OPEN_VACANCIES: "Vacantes abiertas",
      ACTIVE_APLICANTS: "Aplicantes activos",
      APLICANTS_PER_VACANCIE: "Aplicantes por vacante",
      RECUIMENT_AVERAGE: "Promedio reclutamiento (dias)"
    },
    GRAPH: {
      TITLE: "Aplicantes recibidos",
      DESCRIPTION: "Promedio interanual",
      AVERAGE: "Promedio", 
    },
    TABLE: "Listado de vacantes activas",
    COLUMNS: {
      VACANCIE: "Vacante",
      CANDIDATES: "Candidatos",
      PUBLICATION: "Publicación",
      EXPIRES: "Vencimiento",
      DAYS_ACTIVE: "Días activa",
      DAYS_EXPIRED: "Días vencida",
      STATE: "Estado"
    }
  },
  VACANCIES: {
    HEADER: "Vacantes",
    HEADER_BUTTON: "Nueva vacante",
    ADD_VACANCIES: "Añadir nueva carpeta",
    VACANCIES: "vacantes",
    CANDIDATES: "Candidatos",
    KANBAN: {
      ADD_INSTANCE: "Añadir nueva instancia",
      COLUMN: "Columna libre",
      INTERVIEW: "Entrevista",
      TEST: "Prueba técnica",
      HIRE: "Contratación",
    },
    DROPDOWN: {
      SHARE: "Compartir",
      SHOW: "Mostrar en Hiring",
      REOPEN: "Reabrir",
      EDIT: "Editar",
      DELETE: "Eliminar",
      CLOSE: "Finalizar",
      EDIT_FOLDER: "Editar carpeta",
      SEND_TO_OTHER: "Enviar a otra vacante",
      DISCARD: "Descartar",
      EDIT_ADMINS: "Editar administradores",
      SEND_NOTIFICATION: "Envío de notificaciones",
      VIEW: "Ver perfil",
      LOAD_TEMPLATE: "Cargar template",
      PUBLISH: "Publicar en Hiring",
      INVITE: "Invitar candiatos",
    },
    FOLDER: {
      TABS: {
        ACTIVE: "Abiertas",
        ENDED: "Finalizadas",
      },
      HEADER_BUTTON: "Nueva vacante",
    },
    DELETE_FOLDER: {
      TITLE: "Eliminar  carpeta",
      DESCRIPTION:
        "Se eliminará esta carpeta de forma permanente.\n¿Deseas eliminarla de todas maneras?",
      CANCEL: "Cancelar",
      DELETE: "Eliminar",
    },
    DELETE_VACANCY: {
      TITLE: "Eliminar  vacante",
      DESCRIPTION:
        "Se eliminará esta vacante de forma permanente.\n¿Deseas eliminarla de todas maneras?",
      CANCEL: "Cancelar",
      DELETE: "Eliminar",
    },
    CLOSE_VACANCY: {
      TITLE: "Finalizar  vacante",
      DESCRIPTION: "Se finalizará esta vacante.\n¿Deseas continuar?",
      CANCEL: "Cancelar",
      DELETE: "Finalizar",
    },
    RE_OPEN_VACANCY: {
      TITLE: "Reabrir  vacante",
      DESCRIPTION: "Se reabrirá esta vacante.\n¿Deseas continuar?",
      CANCEL: "Cancelar",
      REOPEN: "Reabrir",
    },
    NOTIFY_INSTANCE: {
      TITLE: "Envío de notificaciones",
      AUTO: "Notificaciones automáticas",
      DESCRIPTION:
        "Si seleccionas envío de notificaciones automáticas, los candidatos recibirán una notificación cuando sean agregados a esta instancia.",
      CANCEL: "Cancelar",
      APPLY: "Aplicar",
    },
    EDIT_ADMINISTRATOR: {
      TITLE: "Editar administradores",
      LABEL: "Administradores",
      CANCEL: "Cancelar",
      APPLY: "Aplicar",
    },
    DISCARD_CANDIDATE: {
      TITLE: "Descartar candidato",
      DESCRIPTION:
        "El candidato será enviado a la sección de no calificados, no recibirá ninguna notificación al respecto.",
      CANCEL: "Cancelar",
      DISCARD: "Descartar",
    },
    TRANSFER_CANDIDATE: {
      TITLE: "Enviar a otra vacante",
      VACANCY: "Vacante",
      INSTANCE: "Instancia",
      SEND: "Enviar",
      CANCEL: "Cancelar",
    },
    DELETE_INSTANCE: {
      TITLE: "Eliminar instancia",
      DESCRIPTION:
        "Se eliminará esta instancia de forma permanente, los candidatos asociados se moverán a la instancia previa.",
      CANCEL: "Cancelar",
      DELETE: "Eliminar",
    },
    SHARE_VACANCY: {
      TITLE: "Compartir vacante",
      MEDIA: "Redes sociales",
    },
    SHOW_VACANCY: {
      TITLE: "Publicar en Hiring",
      DESCRIPTION: "Publicar vacante en Fichap Hiring",
      CANCEL: "Cancelar",
      APPLY: "Aplicar",
    },
    NEW_INSTANCE: {
      TITLE: "Nueva instancia",
      LABEL: "Nombre de la instancia",
      TYPE: "Tipo de instancia",
      CREATE: "Crear",
      CANCEL: "Cancelar",
    },
    ADD_FOLDER: {
      TITLE: "Nueva carpeta",
      NAME: "Nombre de la carpeta",
      COLOR: "Seleccionar color",
      CANCEL: "Cancelar",
      CREATE: "Crear",
      UPDATE: "Actualizar",
    },
    EDIT_FOLDER: {
      TITLE: "Editar carpeta",
      NAME: "Nombre de la carpeta",
      COLOR: "Seleccionar color",
      CANCEL: "Cancelar",
      UPDATE: "Actualizar",
    },
    FUNNEL: {
      ASSIGNED: "Admins asignados",
      EXPERIENCE: "Experiencia laboral",
      EDUCATION: "Educación",
      AREA: "Área",
      SKILLS: "Skills y aptitudes",
      COMMENTS: "Comentarios",
      EDIT: "Editar",
      TESTS: "Pruebas técnicas",
      MATCH: "Match con esta vacante:",
    },
    EDIT: {
      TITLE: "Editar vacante",
    },
    NEW: {
      TITLE: "Nueva vacante",
      IMAGES: "Imágenes",
      VACANCY: {
        TITLE: "Plazo de vacante",
        DATE: "Fecha de finalización",
      },
      FOLDER: {
        TITLE: "Carpeta",
        SELECT: "Seleccionar",
      },
      INSTANCE: {
        INTERVIEW: {
          TITLE: "Nueva instancia de entrevista",
          INTERVIEWER: "Entrevistador",
          NOTIFICATIONS: "Notificaciones automáticas",
        },
      },
      FORM: {
        TITLE: "Título",
        SHORT_DESCRIPTION: "Descripción corta",
        DESCRIPTION: "Descripción del puesto",
        SUITABLE: "Este trabajo es apto para personas con discapacidad.",
        SKILLS: "Habilidades",
        TAGS: "Etiquetas",
        ADD: "Agregar",
        AREA: "Área",
        POSITION: "Puesto",
        LOCATION: "Ubicación",
        MODALITY: "Modalidad",
        SHOW_PAYMENT: "Mostrar remuneración",
        CURRENCY: "Moneda",
        PAYMENT: "Remuneración",
        PERIOD: "Periodo de pago",
        BENEFITS: "Beneficios",
        NAME: "Nombre",
        SELECT_TEMPLATE: "Seleccionar template de búsqueda",
        SAVE: "Guardar borrador",
        CREATE: "Crear",
        UPDATE: "Actualizar",
      },
    },
  },
  CANDIDATES: {
    HEADER: "Candidatos",
    EMPTY: "Aún no hay candidatos cargados",
    TABS: {
      SUMMARY: "Resumen",
      SKILLS: "Habilidades",
      TESTS: "Pruebas técnicas",
      FILE: "Legajo",
      COMMENTS: "Comentarios",
    },
    VACANCIES: {
      TITLE: "Vacantes en las que aparece",
      ALL: "Ver todas",
      RESUME: "Ver Currículum Vitae",
    },
    SUMMARY: {
      OUTSTANDING: "Nota destacada",
      LANGUAJES: "Idiomas",
      TURNOVER: "Turnover",
      SKILLS: "Skills",
      TESTS: "Pruebas técnicas",
      EDIT: "Editar",
      MIDDLE: "Medio",
      LOW: "Bajo",
      HIGH: "Alto",
    },
    SKILLS: {
      LANGUAJES: "Idiomas",
      SKILLS: "Habilidades",
    },
    TESTS: {
      TEST: "Prueba",
      VACANCY: "Vacante",
      DATE: "Fecha",
      RESULT: "Resultado",
      ACTIONS: "Acciones",
    },
    FILE: {
      TABS: {
        PERSONAL: "Personal",
        EXPERIENCE: "Experiencia laboral",
        CONTACT: "Contacto",
        EDUCATION: "Estudios",
      },
      PERSONAL: {
        FIRST_NAME: "Primer nombre*",
        SECOND_NAME: "Segundo nombre",
        FIRST_LAST_NAME: "Primer apellido*",
        SECONDA_LAST_NAME: "Segundo apellido",
        BIRTHDAY: "Fecha de nacimiento",
        GENRE: "Género",
        NACIONALITY: "Nacionalidad",
        COUNTRY_BIRTH: "País de nacimiento",
        DOCUMENT_TYPE: "Tipo de documento",
        DOCUMENT_NUMBER: "Número de documento",
        DOCUMENT_VTO: "Vencimiento de documento",
        STATUS: "Estado civil",
        STUDY: "Nivel de estudio",
        LANGUAJES: "Idiomas ",
      },
      EXPERIENCE: {
        ADD: "Agregar experiencia",
      },
      CONTACT: {
        ADD: "Agregar contacto",
      },
      EDUCATION: {
        ADD: "Agregar Estudios",
      },
    },
    MODAL: {
      TITLE: "La vacante ha sido creada",
      DESCRIPTION: "Ya puedes editar las instancias",
      SHOW: "Publicar en Fichap Hiring",
      INVITE: "Invitar candidatos",
      LINK: "COPIAR LINK",
      PUBLISH: "Publicar",
    },
  },
  BRANDING: {
    HEADER: "Marca empleadora",
    HEADER_BUTTON: "Ver página",
    COLOR: "Color de marca",
    LOGO: "Logotipo",
    PORTRAIT: "Portada",
    BANNER: "Banner",
    DRAGGER:
      "Arrastra aquí tus documentos o haz clic para buscarlos en tu ordenador.",
    SECTIONS: {
      _1: "Sección 1",
      _2: "Sección 2",
      _3: "Sección 3",
    },
    FORM: {
      PUBLISH: "Actualizar",
      PREVIEW: "Previsualizar",
      COMPANY: "Nombre de la empresa",
      ABOUT_US: "¿Quiénes somos?",
      WHAT_WE_DO: "¿Qué hacemos?",
      SOCIAL_MEDIA: {
        TITLE: "Redes sociales",
        INSTAGRAM: "Instagram",
        FACEBOOK: "Facebook",
        TWITTER: "Twitter",
        YOUTUBE: "Youtube",
        LINKEDIN: "LinkedIn",
        BEHANCE: "Behance",
        MEDIUM: "Medium",
        TELEGRAM: "Telegram",
      },
      TESTIMONIES: {
        TITLE: "Testimonios",
        NAME: "Nombre",
        POSITION: "Cargo / Puesto",
        QUOTE: "Cita",
        PICTURE: "Foto",
        ADD: "+ Agregar testimonio",
      },
      LOCATIONS: {
        TITLE: "Ubicaciones",
        NAME: "Nombre",
        LOCATION: "Ubicación",
        ADD: "+ Agregar ubicación",
      },
      BENEFITS: {
        TITLE: "Beneficios",
        NAME: "Nombre",
        ADD: "Agregar",
      },
    },
  },
  CALENDAR: {
    HEADER: "Calendario",
    TABS: {
      EVENTS: "Eventos",
      TYPES: "Tipos de eventos",
      AVAILABILITY: "Disponibilidad",
      CONECTION: "Conexión del calendario",
    },
    EVENTS: {
      TABS: {
        FOLLOWING: "Próximos",
        PENDING: "Pendientes",
        PAST: "Pasados",
      },
    },
    EVENTS_TYPES: {
      TITLE: "Eventos",
      BUTTON: "Crear",
    },
  },
  ADMINISTRATION: {
    HEADER: "Adminsitración",
  },
  NAV: {
    DROPDOWN: {
      HELLO: "Hola,",
      PLAN: "Plan:",
      POSITION: "Puesto:",
      EMAIL: "Email",
      PHONE: "Teléfono:",
      LOG_OUT: "Cerrar sesión",
      VIEW_PROFILE: "Ver perfíl",
    },
  },
};

export default dictionary;
