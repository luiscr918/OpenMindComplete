# 🧠 OpenMind

Sistema de gestión de biblioteca digital con panel de administración, catálogo de libros, préstamos y dashboard de estadísticas en tiempo real.

---

## Arquitectura

El proyecto está compuesto por 4 servicios orquestados con Docker Compose:

| Servicio | Tecnología | Puerto |
|---|---|---|
| Base de datos | PostgreSQL 15 | 5432 |
| Backend | Spring Boot + JPA | 8080 |
| Frontend | Angular 21 + Tailwind | 4200 |
| Dashboard | React + Vite + Highcharts | 5173 |

El dashboard de estadísticas es un **microservicio independiente** construido como Web Component e incrustado en el panel de administración de Angular.

---

## Estructura del proyecto

```
OPENMIND/
├── docker-compose.yml
├── OpenMindBack/         # API REST Spring Boot
├── openMindFront/        # SPA Angular (panel admin + app pública)
└── open-mind-stats/      # Dashboard React (Web Component)
```

---

## Requisitos

- [Docker](https://www.docker.com/) y Docker Compose
- No se necesita nada más — todo corre en contenedores

---

## Levantar el proyecto

```bash
docker compose up --build
```

Para correr en segundo plano:

```bash
docker compose up --build -d
```

Para detener:

```bash
docker compose down
```

---

## Servicios

### Backend — Spring Boot
API REST que expone los recursos principales:

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/usuarios` | Lista todos los usuarios |
| GET | `/usuarios/{id}` | Obtiene un usuario por ID |
| GET | `/usuarios/email/{email}` | Busca usuario por email |
| POST | `/usuarios` | Crea un usuario |
| PUT | `/usuarios/{id}` | Actualiza un usuario |
| DELETE | `/usuarios/{id}` | Elimina un usuario |
| GET | `/libros` | Lista todos los libros |
| GET | `/libros/{id}` | Obtiene un libro por ID |
| POST | `/libros` | Crea un libro |
| PUT | `/libros/{id}` | Actualiza un libro |
| DELETE | `/libros/{id}` | Elimina un libro |
| GET | `/prestamos` | Lista todos los préstamos |
| GET | `/prestamos/usuario/{id}` | Préstamos de un usuario |
| POST | `/prestamos` | Crea un préstamo |
| PUT | `/prestamos/{id}/devolver` | Marca préstamo como devuelto |
| DELETE | `/prestamos/{id}` | Elimina un préstamo |

### Frontend — Angular
Aplicación principal con dos áreas:

- **App pública** — Catálogo, home, nosotros, contactos, perfil, préstamos del usuario
- **Panel de administración** — Gestión de usuarios, libros y préstamos. Autenticación con Firebase

### Dashboard — React + Highcharts
Microservicio de estadísticas que funciona de forma independiente y se incrusta en el panel de administración de Angular como Web Component (`<openmind-dashboard>`).

Incluye las siguientes gráficas:
- Distribución de préstamos por estado (ACTIVO / DEVUELTO / ATRASADO)
- Préstamos por mes
- Top 5 libros más vistos
- Top 5 libros más descargados
- Libros por rango de páginas
- Usuarios por rol
- Usuarios por ocupación

---

## Variables de entorno

El backend se configura mediante variables en el `docker-compose.yml`:

```
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/open_mind
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=root
```

---

## Tecnologías

- **Backend** — Java 17, Spring Boot, Spring Data JPA, MapStruct, Lombok, PostgreSQL
- **Frontend** — Angular 21, Tailwind CSS, Firebase Auth, RxJS
- **Dashboard** — React 19, TypeScript, Vite, Highcharts, Axios, Tailwind CSS
- **Infraestructura** — Docker, Docker Compose, Nginx