// Datos iniciales de la aplicación
const initialData = {
  ensayos: [
    {
      id: 1,
      area: "Fitopatología",
      reportado_por: "Dr. María García",
      fecha: "2024-08-15",
      prioridad: "Alta",
      responsable_id: "MGarcia",
      metrica_objetivo: "Reducir incidencia de sigatoka en 30%",
      fecha_inicio: "2024-08-20",
      fecha_estimada_fin: "2024-11-20",
      roi_estimado: 150000,
      validador_campo: "Juan Pérez",
      estado: "En Progreso",
      avance: 65
    },
    {
      id: 2,
      area: "Nutrición Vegetal",
      reportado_por: "Ing. Carlos Ruiz",
      fecha: "2024-07-10",
      prioridad: "Media",
      responsable_id: "CRuiz",
      metrica_objetivo: "Incrementar calibre de fruto 15%",
      fecha_inicio: "2024-07-15",
      fecha_estimada_fin: "2024-10-15",
      roi_estimado: 200000,
      validador_campo: "Ana López",
      estado: "Completado",
      avance: 100
    },
    {
      id: 3,
      area: "Genética",
      reportado_por: "Dr. Luis Mendez",
      fecha: "2024-08-01",
      prioridad: "Alta",
      responsable_id: "LMendez",
      metrica_objetivo: "Desarrollar variedad resistente a sequía",
      fecha_inicio: "2024-08-05",
      fecha_estimada_fin: "2024-12-30",
      roi_estimado: 500000,
      validador_campo: "Pedro Silva",
      estado: "En Progreso",
      avance: 35
    }
  ],
  colaboradores: [
    {
      id: "MGarcia",
      nombre: "Dra. María García",
      cargo: "Investigadora Senior - Fitopatología",
      anos_experiencia: 12,
      areas_fuertes: ["Enfermedades fungales", "Control biológico", "Resistencia genética"],
      aportes: 45,
      ensayos_exitosos: 23,
      especialidad: "Fitopatología",
      foto: "https://via.placeholder.com/150/4caf50/ffffff?text=MG"
    },
    {
      id: "CRuiz",
      nombre: "Ing. Carlos Ruiz",
      cargo: "Especialista en Nutrición",
      anos_experiencia: 8,
      areas_fuertes: ["Fertilización", "Análisis foliar", "Nutrición orgánica"],
      aportes: 32,
      ensayos_exitosos: 18,
      especialidad: "Nutrición",
      foto: "https://via.placeholder.com/150/f9a825/ffffff?text=CR"
    },
    {
      id: "LMendez",
      nombre: "Dr. Luis Méndez",
      cargo: "Genetista Principal",
      anos_experiencia: 15,
      areas_fuertes: ["Mejoramiento genético", "Biotecnología", "Marcadores moleculares"],
      aportes: 52,
      ensayos_exitosos: 28,
      especialidad: "Genética",
      foto: "https://via.placeholder.com/150/2196f3/ffffff?text=LM"
    },
    {
      id: "ASanchez",
      nombre: "Ing. Ana Sánchez",
      cargo: "Especialista en Suelos",
      anos_experiencia: 6,
      areas_fuertes: ["Análisis de suelos", "Microbiología", "Fertilidad"],
      aportes: 28,
      ensayos_exitosos: 14,
      especialidad: "Suelos",
      foto: "https://via.placeholder.com/150/9c27b0/ffffff?text=AS"
    }
  ],
  problemas: [
    {
      id: 1,
      area: "Campo 5-A",
      reportado_por: "Pedro Martínez",
      fecha: "2024-08-25",
      descripcion: "Amarillamiento anormal en hojas",
      urgencia: "Alta",
      estado: "Abierto"
    },
    {
      id: 2,
      area: "Campo 2-B", 
      reportado_por: "Luis Torres",
      fecha: "2024-08-22",
      descripcion: "Reducción en calibre de frutos",
      urgencia: "Media",
      estado: "En Investigación"
    },
    {
      id: 3,
      area: "Invernadero 1",
      reportado_por: "Carmen López",
      fecha: "2024-08-20",
      descripcion: "Problemas de germinación en nuevas variedades",
      urgencia: "Baja",
      estado: "Resuelto"
    }
  ],
  historias_exito: [
    {
      id: 1,
      problema_original: "Alta incidencia de nematodos en plantación sector norte",
      solucion: "Implementación de programa integrado de manejo con biocontroladores y rotación de cultivos",
      testimonio: "Logramos reducir la población de nematodos en 85% y aumentar la productividad en 40%",
      fecha_resolucion: "2024-06-30",
      equipo_colaborador: ["Dra. María García", "Ing. Carlos Ruiz", "Pedro Martínez"],
      impacto_roi: 300000
    },
    {
      id: 2,
      problema_original: "Bajo rendimiento por deficiencias nutricionales",
      solucion: "Desarrollo de programa de fertilización orgánica específico por zona",
      testimonio: "Incrementamos el rendimiento promedio en 28% con menor impacto ambiental",
      fecha_resolucion: "2024-05-15",
      equipo_colaborador: ["Ing. Carlos Ruiz", "Ing. Ana Sánchez"],
      impacto_roi: 180000
    },
    {
      id: 3,
      problema_original: "Susceptibilidad a sequías estacionales",
      solucion: "Introducción de variedades tolerantes y sistema de riego optimizado",
      testimonio: "Mantuvimos la producción estable durante 3 meses de sequía extrema",
      fecha_resolucion: "2024-07-20",
      equipo_colaborador: ["Dr. Luis Méndez", "Dra. María García"],
      impacto_roi: 425000
    }
  ]
};

// Variables globales
let appData = {};
let charts = {};
let calendar;
let dataTable;

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Cargar datos desde localStorage o usar datos iniciales
    const storedData = localStorage.getItem('investigacionData');
    if (storedData) {
        appData = JSON.parse(storedData);
    } else {
        appData = { ...initialData };
        saveData();
    }
    
    // Mostrar página de bienvenida inicialmente
    document.getElementById('welcomePage').style.display = 'block';
    document.getElementById('mainApp').classList.add('d-none');
}

function setupEventListeners() {
    // Botón para entrar al sistema
    document.getElementById('enterSystemBtn').addEventListener('click', enterSystem);
    
    // Toggle sidebar
    document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
    
    // Navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active nav
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Filtros
    setupFilters();
}

function enterSystem() {
    document.getElementById('welcomePage').style.display = 'none';
    document.getElementById('mainApp').classList.remove('d-none');
    
    // Inicializar dashboard
    showSection('dashboard');
    updateKPIs();
    initializeCharts();
    
    // Cargar contenido de otras secciones
    loadEnsayos();
    loadColaboradores();
    loadProblemas();
    loadHistoriasExito();
}

function showSection(sectionName) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    document.getElementById(sectionName).classList.add('active');
    
    // Actualizar título
    const titles = {
        dashboard: 'Dashboard Principal',
        ensayos: 'Gestión de Ensayos',
        problemas: 'Reporte de Problemas',
        colaboradores: 'Directorio de Colaboradores',
        colaboracion: 'Red de Colaboración',
        resultados: 'Historias de Éxito',
        analytics: 'Centro de Analítica Avanzada'
    };
    
    document.getElementById('pageTitle').textContent = titles[sectionName] || 'Plataforma I+D';
    
    // Inicializar contenido específico de la sección
    if (sectionName === 'analytics') {
        initializeAdvancedAnalytics();
    } else if (sectionName === 'colaboracion') {
        initializeCalendar();
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Funciones de KPIs y Dashboard
function updateKPIs() {
    const totalEnsayos = appData.ensayos.length;
    const ensayosCompletados = appData.ensayos.filter(e => e.estado === 'Completado').length;
    const roiPromedio = appData.ensayos.reduce((sum, e) => sum + e.roi_estimado, 0) / totalEnsayos;
    const tasaExito = totalEnsayos > 0 ? Math.round((ensayosCompletados / totalEnsayos) * 100) : 0;
    const totalPublicaciones = appData.colaboradores.reduce((sum, c) => sum + c.aportes, 0);
    
    document.getElementById('totalEnsayos').textContent = totalEnsayos;
    document.getElementById('roiPromedio').textContent = `$${Math.round(roiPromedio).toLocaleString()}`;
    document.getElementById('tasaExito').textContent = `${tasaExito}%`;
    document.getElementById('totalPublicaciones').textContent = totalPublicaciones;
    
    // Actualizar actividades recientes
    updateRecentActivities();
}

function updateRecentActivities() {
    const timeline = document.getElementById('activityTimeline');
    const activities = [];
    
    // Agregar ensayos recientes
    appData.ensayos.slice(-5).forEach(ensayo => {
        activities.push({
            time: new Date(ensayo.fecha).toLocaleDateString(),
            title: `Ensayo creado: ${ensayo.area}`,
            description: ensayo.metrica_objetivo,
            type: 'ensayo'
        });
    });
    
    // Agregar problemas recientes
    appData.problemas.slice(-3).forEach(problema => {
        activities.push({
            time: new Date(problema.fecha).toLocaleDateString(),
            title: `Problema reportado: ${problema.area}`,
            description: problema.descripcion,
            type: 'problema'
        });
    });
    
    // Ordenar por fecha más reciente
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    timeline.innerHTML = activities.slice(0, 8).map(activity => `
        <div class="activity-item">
            <div class="activity-time">${activity.time}</div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-description">${activity.description}</div>
            </div>
        </div>
    `).join('');
}

function initializeCharts() {
    // Gráfico de progreso de ensayos
    const ensayosCtx = document.getElementById('ensayosChart');
    if (ensayosCtx) {
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const completados = [2, 1, 3, 2, 4, 3, 5, 4, 3, 0, 0, 0];
        const enProgreso = [1, 2, 1, 3, 2, 4, 3, 5, 4, 3, 2, 0];
        
        charts.ensayos = new Chart(ensayosCtx, {
            type: 'line',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Completados',
                    data: completados,
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'En Progreso',
                    data: enProgreso,
                    borderColor: '#f9a825',
                    backgroundColor: 'rgba(249, 168, 37, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Gráfico de problemas por prioridad
    const problemasCtx = document.getElementById('problemasChart');
    if (problemasCtx) {
        const prioridades = appData.problemas.reduce((acc, problema) => {
            acc[problema.urgencia] = (acc[problema.urgencia] || 0) + 1;
            return acc;
        }, {});
        
        charts.problemas = new Chart(problemasCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(prioridades),
                datasets: [{
                    data: Object.values(prioridades),
                    backgroundColor: [
                        '#f44336', // Alta - Rojo
                        '#ff9800', // Media - Naranja  
                        '#4caf50'  // Baja - Verde
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

function initializeAdvancedAnalytics() {
    // Gráfico de tendencias
    const trendsCtx = document.getElementById('trendsChart');
    if (trendsCtx && !charts.trends) {
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'];
        
        charts.trends = new Chart(trendsCtx, {
            type: 'line',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Éxitos',
                    data: [65, 72, 68, 75, 82, 78, 85, 90],
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4
                }, {
                    label: 'En Progreso',
                    data: [20, 25, 30, 20, 15, 20, 12, 8],
                    borderColor: '#ff9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Problemas',
                    data: [15, 3, 2, 5, 3, 2, 3, 2],
                    borderColor: '#f44336',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Gráfico de productividad por investigador
    const productivityCtx = document.getElementById('productivityChart');
    if (productivityCtx && !charts.productivity) {
        const investigadores = appData.colaboradores.map(c => c.nombre.split(' ')[1]);
        const productividad = appData.colaboradores.map(c => c.ensayos_exitosos);
        
        charts.productivity = new Chart(productivityCtx, {
            type: 'bar',
            data: {
                labels: investigadores,
                datasets: [{
                    label: 'Ensayos Exitosos',
                    data: productividad,
                    backgroundColor: [
                        '#4caf50',
                        '#f9a825',
                        '#2196f3',
                        '#9c27b0'
                    ],
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Gráfico de correlaciones (simulado con scatter plot)
    const correlationCtx = document.getElementById('correlationChart');
    if (correlationCtx && !charts.correlation) {
        // Datos simulados de correlación
        const correlationData = [
            {x: 65, y: 85, r: 15},
            {x: 78, y: 92, r: 20},
            {x: 45, y: 65, r: 12},
            {x: 88, y: 95, r: 25},
            {x: 55, y: 70, r: 18},
            {x: 92, y: 98, r: 30},
            {x: 38, y: 55, r: 10},
            {x: 75, y: 88, r: 22}
        ];
        
        charts.correlation = new Chart(correlationCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Correlación Éxito-Recursos',
                    data: correlationData,
                    backgroundColor: function(context) {
                        const value = context.parsed.x;
                        const opacity = value / 100;
                        return `rgba(76, 175, 80, ${opacity})`;
                    },
                    borderColor: '#4caf50',
                    pointRadius: function(context) {
                        return context.parsed.r;
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Recursos Asignados (%)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Tasa de Éxito (%)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Funciones de gestión de ensayos
function loadEnsayos() {
    const tbody = document.querySelector('#ensayosTable tbody');
    if (!tbody) return;
    
    tbody.innerHTML = appData.ensayos.map(ensayo => {
        const responsable = appData.colaboradores.find(c => c.id === ensayo.responsable_id);
        const estadoBadge = getEstadoBadge(ensayo.estado);
        const prioridadBadge = getPrioridadBadge(ensayo.prioridad);
        
        return `
            <tr>
                <td>${ensayo.area}</td>
                <td>${responsable ? responsable.nombre : ensayo.responsable_id}</td>
                <td>${ensayo.metrica_objetivo}</td>
                <td>${new Date(ensayo.fecha_inicio).toLocaleDateString()}</td>
                <td>${new Date(ensayo.fecha_estimada_fin).toLocaleDateString()}</td>
                <td>$${ensayo.roi_estimado.toLocaleString()}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <div class="progress" style="width: 60px; height: 8px;">
                            <div class="progress-bar" style="width: ${ensayo.avance}%"></div>
                        </div>
                        <small>${ensayo.avance}%</small>
                    </div>
                </td>
                <td>${estadoBadge}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editarEnsayo(${ensayo.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarEnsayo(${ensayo.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    // Inicializar DataTable si no existe
    if ($.fn.DataTable && !$.fn.DataTable.isDataTable('#ensayosTable')) {
        dataTable = $('#ensayosTable').DataTable({
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
            },
            responsive: true,
            pageLength: 10,
            order: [[3, 'desc']]
        });
    }
}

function loadColaboradores() {
    const container = document.getElementById('colaboradoresList');
    if (!container) return;
    
    container.innerHTML = appData.colaboradores.map(colaborador => `
        <div class="col-lg-3 col-md-6">
            <div class="colaborador-card">
                <img src="${colaborador.foto}" alt="${colaborador.nombre}" class="colaborador-avatar">
                <h5 class="colaborador-name">${colaborador.nombre}</h5>
                <p class="colaborador-role">${colaborador.cargo}</p>
                
                <div class="colaborador-stats">
                    <div class="stat-item">
                        <p class="stat-number">${colaborador.anos_experiencia}</p>
                        <p class="stat-label">Años Exp.</p>
                    </div>
                    <div class="stat-item">
                        <p class="stat-number">${colaborador.aportes}</p>
                        <p class="stat-label">Aportes</p>
                    </div>
                    <div class="stat-item">
                        <p class="stat-number">${colaborador.ensayos_exitosos}</p>
                        <p class="stat-label">Éxitos</p>
                    </div>
                    <div class="stat-item">
                        <p class="stat-number">${colaborador.areas_fuertes.length}</p>
                        <p class="stat-label">Especialidades</p>
                    </div>
                </div>
                
                <div class="mt-3">
                    <button class="btn btn-outline-primary btn-sm" onclick="editarColaborador('${colaborador.id}')">
                        <i class="fas fa-edit me-1"></i>Editar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadProblemas() {
    const container = document.getElementById('problemsList');
    if (!container) return;
    
    container.innerHTML = appData.problemas.map(problema => {
        const urgenciaBadge = getUrgenciaBadge(problema.urgencia);
        const estadoBadge = getEstadoProblema(problema.estado);
        
        return `
            <div class="col-12 mb-3">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h6 class="card-title">${problema.area}</h6>
                                <p class="card-text">${problema.descripcion}</p>
                                <small class="text-muted">
                                    Reportado por: ${problema.reportado_por} - ${new Date(problema.fecha).toLocaleDateString()}
                                </small>
                            </div>
                            <div class="text-end">
                                ${urgenciaBadge}
                                ${estadoBadge}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function loadHistoriasExito() {
    const container = document.getElementById('historiasList');
    if (!container) return;
    
    container.innerHTML = appData.historias_exito.map(historia => `
        <div class="col-lg-6">
            <div class="card h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <div class="me-3">
                            <i class="fas fa-trophy text-warning" style="font-size: 2rem;"></i>
                        </div>
                        <div>
                            <h5 class="card-title mb-1">Historia de Éxito</h5>
                            <small class="text-muted">${new Date(historia.fecha_resolucion).toLocaleDateString()}</small>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <h6 class="text-primary">Problema Original:</h6>
                        <p class="small">${historia.problema_original}</p>
                    </div>
                    
                    <div class="mb-3">
                        <h6 class="text-success">Solución:</h6>
                        <p class="small">${historia.solucion}</p>
                    </div>
                    
                    <blockquote class="blockquote mb-3">
                        <p class="mb-0 small"><em>"${historia.testimonio}"</em></p>
                    </blockquote>
                    
                    <div class="mb-3">
                        <h6>Equipo Colaborador:</h6>
                        <div class="d-flex flex-wrap gap-1">
                            ${historia.equipo_colaborador.map(nombre => 
                                `<span class="badge bg-light text-dark">${nombre}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="border-top pt-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-muted small">Impacto ROI:</span>
                            <span class="fw-bold text-success">$${historia.impacto_roi.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Funciones de calendario
function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl && !calendar) {
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'es',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: generateCalendarEvents(),
            eventClick: function(info) {
                alert('Evento: ' + info.event.title);
            }
        });
        calendar.render();
    }
}

function generateCalendarEvents() {
    const events = [];
    
    // Agregar eventos basados en ensayos
    appData.ensayos.forEach(ensayo => {
        events.push({
            title: `Inicio: ${ensayo.area}`,
            start: ensayo.fecha_inicio,
            color: '#4caf50'
        });
        
        events.push({
            title: `Fin Est.: ${ensayo.area}`,
            start: ensayo.fecha_estimada_fin,
            color: '#f9a825'
        });
    });
    
    return events;
}

// Funciones de filtros
function setupFilters() {
    // Filtro de estado de ensayos
    const filtroEstado = document.getElementById('filtroEstado');
    if (filtroEstado) {
        filtroEstado.addEventListener('change', function() {
            if (dataTable) {
                dataTable.column(7).search(this.value).draw();
            }
        });
    }
    
    // Filtro de área de ensayos
    const filtroArea = document.getElementById('filtroArea');
    if (filtroArea) {
        filtroArea.addEventListener('change', function() {
            if (dataTable) {
                dataTable.column(0).search(this.value).draw();
            }
        });
    }
    
    // Filtro de especialidad de colaboradores
    const filtroEspecialidad = document.getElementById('filtroEspecialidad');
    if (filtroEspecialidad) {
        filtroEspecialidad.addEventListener('change', function() {
            const especialidad = this.value;
            const colaboradoresFiltrados = especialidad 
                ? appData.colaboradores.filter(c => c.especialidad === especialidad)
                : appData.colaboradores;
            
            renderColaboradoresFiltrados(colaboradoresFiltrados);
        });
    }
}

function renderColaboradoresFiltrados(colaboradores) {
    const container = document.getElementById('colaboradoresList');
    if (!container) return;
    
    container.innerHTML = colaboradores.map(colaborador => `
        <div class="col-lg-3 col-md-6">
            <div class="colaborador-card">
                <img src="${colaborador.foto}" alt="${colaborador.nombre}" class="colaborador-avatar">
                <h5 class="colaborador-name">${colaborador.nombre}</h5>
                <p class="colaborador-role">${colaborador.cargo}</p>
                
                <div class="colaborador-stats">
                    <div class="stat-item">
                        <p class="stat-number">${colaborador.anos_experiencia}</p>
                        <p class="stat-label">Años Exp.</p>
                    </div>
                    <div class="stat-item">
                        <p class="stat-number">${colaborador.aportes}</p>
                        <p class="stat-label">Aportes</p>
                    </div>
                    <div class="stat-item">
                        <p class="stat-number">${colaborador.ensayos_exitosos}</p>
                        <p class="stat-label">Éxitos</p>
                    </div>
                    <div class="stat-item">
                        <p class="stat-number">${colaborador.areas_fuertes.length}</p>
                        <p class="stat-label">Especialidades</p>
                    </div>
                </div>
                
                <div class="mt-3">
                    <button class="btn btn-outline-primary btn-sm" onclick="editarColaborador('${colaborador.id}')">
                        <i class="fas fa-edit me-1"></i>Editar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Funciones de CRUD

// Ensayos
function guardarEnsayo() {
    const form = document.getElementById('ensayoForm');
    const formData = new FormData(form);
    
    const ensayo = {
        id: Date.now(),
        area: formData.get('area'),
        reportado_por: formData.get('reportado_por'),
        fecha: formData.get('fecha'),
        prioridad: formData.get('prioridad'),
        responsable_id: formData.get('responsable_id'),
        metrica_objetivo: formData.get('metrica_objetivo'),
        fecha_inicio: formData.get('fecha_inicio'),
        fecha_estimada_fin: formData.get('fecha_estimada_fin'),
        roi_estimado: parseInt(formData.get('roi_estimado')),
        validador_campo: formData.get('validador_campo'),
        estado: formData.get('estado'),
        avance: formData.get('estado') === 'Completado' ? 100 : 
               formData.get('estado') === 'En Progreso' ? 50 : 0
    };
    
    appData.ensayos.push(ensayo);
    saveData();
    updateKPIs();
    loadEnsayos();
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('ensayoModal'));
    modal.hide();
    form.reset();
}

function editarEnsayo(id) {
    // Implementar edición de ensayo
    console.log('Editar ensayo:', id);
}

function eliminarEnsayo(id) {
    if (confirm('¿Está seguro de que desea eliminar este ensayo?')) {
        appData.ensayos = appData.ensayos.filter(e => e.id !== id);
        saveData();
        updateKPIs();
        loadEnsayos();
    }
}

// Problemas
function guardarProblema() {
    const form = document.getElementById('problemaForm');
    const formData = new FormData(form);
    
    const problema = {
        id: Date.now(),
        area: formData.get('area'),
        reportado_por: formData.get('reportado_por'),
        fecha: formData.get('fecha'),
        descripcion: formData.get('descripcion'),
        urgencia: formData.get('urgencia'),
        estado: 'Abierto'
    };
    
    appData.problemas.push(problema);
    saveData();
    updateKPIs();
    loadProblemas();
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('problemaModal'));
    modal.hide();
    form.reset();
}

// Colaboradores
function guardarColaborador() {
    const form = document.getElementById('colaboradorForm');
    const formData = new FormData(form);
    
    const colaborador = {
        id: Date.now().toString(),
        nombre: formData.get('nombre'),
        cargo: formData.get('cargo'),
        anos_experiencia: parseInt(formData.get('anos_experiencia')),
        especialidad: formData.get('especialidad'),
        areas_fuertes: formData.get('areas_fuertes').split(',').map(s => s.trim()),
        aportes: parseInt(formData.get('aportes')),
        ensayos_exitosos: parseInt(formData.get('ensayos_exitosos')),
        foto: formData.get('foto') || `https://via.placeholder.com/150/4caf50/ffffff?text=${formData.get('nombre').charAt(0)}`
    };
    
    appData.colaboradores.push(colaborador);
    saveData();
    updateKPIs();
    loadColaboradores();
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('colaboradorModal'));
    modal.hide();
    form.reset();
}

function editarColaborador(id) {
    // Implementar edición de colaborador
    console.log('Editar colaborador:', id);
}

// Historias de éxito
function guardarHistoria() {
    const form = document.getElementById('resultadoForm');
    const formData = new FormData(form);
    
    const historia = {
        id: Date.now(),
        problema_original: formData.get('problema_original'),
        solucion: formData.get('solucion'),
        testimonio: formData.get('testimonio'),
        fecha_resolucion: formData.get('fecha_resolucion'),
        impacto_roi: parseInt(formData.get('impacto_roi')),
        equipo_colaborador: formData.get('equipo_colaborador').split(',').map(s => s.trim())
    };
    
    appData.historias_exito.push(historia);
    saveData();
    loadHistoriasExito();
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('resultadoModal'));
    modal.hide();
    form.reset();
}

// Funciones auxiliares
function getEstadoBadge(estado) {
    const badges = {
        'Planificado': 'bg-info',
        'En Progreso': 'bg-warning',
        'Completado': 'bg-success',
        'Cancelado': 'bg-danger'
    };
    return `<span class="badge ${badges[estado]}">${estado}</span>`;
}

function getPrioridadBadge(prioridad) {
    const badges = {
        'Alta': 'bg-danger',
        'Media': 'bg-warning',
        'Baja': 'bg-success'
    };
    return `<span class="badge ${badges[prioridad]}">${prioridad}</span>`;
}

function getUrgenciaBadge(urgencia) {
    const badges = {
        'Alta': 'bg-danger',
        'Media': 'bg-warning',
        'Baja': 'bg-success'
    };
    return `<span class="badge ${badges[urgencia]}">${urgencia}</span>`;
}

function getEstadoProblema(estado) {
    const badges = {
        'Abierto': 'bg-danger',
        'En Investigación': 'bg-warning',
        'Resuelto': 'bg-success',
        'Cerrado': 'bg-secondary'
    };
    return `<span class="badge ${badges[estado]}">${estado}</span>`;
}

function saveData() {
    localStorage.setItem('investigacionData', JSON.stringify(appData));
}

// Poblado inicial de selects en modales
document.addEventListener('DOMContentLoaded', function() {
    // Poblar responsables en modal de ensayo
    const responsableSelect = document.querySelector('select[name="responsable_id"]');
    if (responsableSelect) {
        setTimeout(() => {
            responsableSelect.innerHTML = '<option value="">Seleccionar responsable</option>' +
                appData.colaboradores.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
        }, 1000);
    }
});