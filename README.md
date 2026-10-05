# Stayly

Stayly es una aplicación web para descubrir alojamientos y gestionar reservas. El proyecto reúne una API REST desarrollada con Spring Boot y Spring Security, una interfaz creada con React y TypeScript, y una base de datos PostgreSQL.

Pagina en la web: https://stayly-psi.vercel.app/

## Capturas

![Stayly Home](https://i.postimg.cc/cCgXCbdv/Home.png)

![Stayly Accommodation Page](https://i.postimg.cc/2yb2yKC8/Accommodation-Page.png)

![Stayly Reservation](https://i.postimg.cc/qqhjq5pt/My-Reservations.png)

![Stayly Favorites](https://i.postimg.cc/rs0QsPqy/Favorites.png)

![Stayly Admin Panel](https://i.postimg.cc/j2wZ2FRR/Admin-Panel.png)

## Características

- **Exploración de alojamientos:** consulta alojamientos y busca por ciudad, título, precio y capacidad.
- **Detalle de alojamiento:** revisa información, disponibilidad, imágenes y calificaciones.
- **Reservas:** crea y cancela reservas, y consulta las reservas de tu cuenta.
- **Favoritos:** guarda alojamientos y administra tu lista personal.
- **Autenticación y autorización:** registro e inicio de sesión con JWT y permisos por rol.
- **Administración:** gestiona alojamientos y reservas desde un panel restringido a administradores.
- **Interfaz Responsiva:** Diseño moderno y adaptable a cualquier dispositivo.

## Flujo principal

1. El usuario se registra o inicia sesión.
2. Explora y filtra alojamientos.
3. Consulta el detalle de un alojamiento.
4. Puede guardarlo en favoritos.
5. Selecciona las fechas y cantidad de huéspedes.
6. Crea una reserva.
7. Puede consultar y gestionar sus reservas desde su cuenta.
8. Los administradores pueden gestionar los alojamientos desde el panel administrativo.

## Tecnologías

### Backend
- [Java 21](https://www.oracle.com/java/technologies/downloads/)
- [Spring Boot 3](https://spring.io/projects/spring-boot) - API REST y configuración de la aplicación
- [Spring Security](https://spring.io/projects/spring-security) - autenticación, autorización y protección de rutas
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa) e Hibernate - persistencia relacional
- [PostgreSQL 16](https://www.postgresql.org/) - base de datos
- [JWT](https://jwt.io/) - autenticación basada en tokens
- [Cloudinary](https://cloudinary.com/) - almacenamiento y gestión de imágenes de alojamientos
- [Gradle](https://gradle.org/) - dependencias y tareas de compilación

### Frontend
- [React](https://react.dev/) y TypeScript - interfaz de usuario
- [Vite](https://vite.dev/) - servidor de desarrollo y build
- [React Router](https://reactrouter.com/) - navegación
- [TanStack Query](https://tanstack.com/query) - gestión de datos remotos
- [Zustand](https://zustand.docs.pmnd.rs/) - estado de autenticación e interfaz
- [Axios](https://axios-http.com/) - comunicación con la API
- [React Icons](https://react-icons.github.io/react-icons/) - biblioteca de iconos

### Entorno local
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) y Docker Compose - ejecución de PostgreSQL
- npm - instalación y ejecución del frontend

## Estructura del Proyecto

```text
Stayly/
├── Stayly-backend/                 # API Spring Boot
│   ├── src/main/java/.../
│   │   ├── auth/                    # Filtro JWT y detalles de usuario
│   │   ├── config/                  # Seguridad, CORS, carga inicial y configuración
│   │   ├── controller/              # Endpoints REST
│   │   ├── dto/                     # Objetos de entrada y respuesta
│   │   ├── entity/                  # Entidades y enums JPA
│   │   ├── exception/               # Manejo de errores
│   │   ├── mapper/                  # Conversión entre entidades y DTOs
│   │   ├── repository/              # Acceso a datos
│   │   └── service/                 # Lógica de negocio
│   ├── src/main/resources/          # application.properties y datos iniciales
│   ├── src/test/                    # Pruebas
│   ├── docker-compose.yml           # Servicio PostgreSQL
│   └── build.gradle
│
└── Stayly-frontend/                # Aplicación React + TypeScript
	├── src/
	│   ├── api/                     # Cliente HTTP y funciones de API
	│   ├── auth/                    # Contexto y lógica de autenticación
	│   ├── components/              # Layout y componentes reutilizables
	│   ├── hooks/                   # Hooks de datos y funcionalidades
	│   ├── pages/                   # Inicio, alojamiento, favoritos y reservas
	│   ├── providers/               # Proveedores de TanStack Query
	│   ├── routes/                  # Enrutamiento y rutas protegidas
	│   ├── store/                   # Estado global con Zustand
	│   ├── types/                   # Tipos TypeScript
	│   └── utils/                   # Utilidades
	├── .env                         # URL base de la API
	└── package.json
```

## Arquitectura y Modelo

El proyecto utiliza una arquitectura basada en capas en el backend, separando controladores, servicios, repositorios, entidades, DTOs y componentes de seguridad.

### Diagrama

![Diagrama UML de Stayly](https://i.postimg.cc/TwHtR6vp/Diagrama-Stayly.png)

## Requisitos Previos

- Java JDK 21
- Node.js y npm
- Docker Desktop con Docker Compose

> **Base de datos:** la configuración actual del repositorio utiliza PostgreSQL, no MySQL/phpMyAdmin. El archivo `docker-compose.yml` inicia únicamente PostgreSQL; el backend y el frontend se ejecutan por separado durante el desarrollo.

## Instalación y Ejecución

Ejecuta los siguientes pasos desde la carpeta raíz del proyecto.

### 1. Clonar el repositorio

```bash
git clone https://github.com/Pablo1605/Stayly.git
cd Stayly
```

### 2. Iniciar PostgreSQL

```bash
cd Stayly-backend
docker compose up -d
```

La base de datos queda disponible en localhost:5433 y persiste sus datos en el volumen stayly_postgres_data.

Las credenciales de la base de datos se definen en docker-compose.yml y deben coincidir con las variables de entorno utilizadas por el backend.

### 3. Iniciar el backend

En Windows:

```powershell
cd Stayly-backend
Y ejecutar:
$env:DB_URL="jdbc:postgresql://127.0.0.1:5433/stayly_db"
$env:DB_USERNAME="stayly_admin"
$env:DB_PASSWORD="stayly_secret_pass"
$env:JWT_SECRET="tu_clave_secreta"
$env:CLOUDINARY_CLOUD_NAME="tu_cloud_name"
$env:CLOUDINARY_API_KEY="tu_api_key"
$env:CLOUDINARY_API_SECRET="tu_api_secret"
.\gradlew.bat bootRun
```

En macOS o Linux:

```bash
cd Stayly-backend
Y ejecutar:
export DB_URL="jdbc:postgresql://127.0.0.1:5433/stayly_db"
export DB_USERNAME="stayly_admin"
export DB_PASSWORD="stayly_secret_pass"
export JWT_SECRET="tu_clave_secreta"
export CLOUDINARY_CLOUD_NAME="tu_cloud_name"
export CLOUDINARY_API_KEY="tu_api_key"
export CLOUDINARY_API_SECRET="tu_api_secret"
./gradlew bootRun
```

La API estará disponible en `http://localhost:8080`. En el primer arranque se cargan alojamientos de ejemplo y una cuenta de administrador para desarrollo.

### 4. Iniciar el frontend

En otra terminal:

```bash
cd Stayly-frontend
npm install
npm run dev
```

Vite mostrará la dirección local del frontend, normalmente `http://localhost:5173`. La URL base de la API se configura mediante `VITE_API_URL` en `Stayly-frontend/.env`:

```env
VITE_API_URL=http://localhost:8080
```

Los endpoints ya incluyen el prefijo `/api`, por lo que la URL base no debe incluirlo.

## Configuración

### Backend

El backend utiliza variables de entorno para configurar la conexión a PostgreSQL, la autenticación mediante JWT y la integración con Cloudinary.

Dentro de Stayly-backend/, crea un archivo .env a partir de .env.example:

cp .env.example .env

Completa las variables del archivo .env:
DB_URL=jdbc:postgresql://127.0.0.1:5433/stayly_db
DB_USERNAME=stayly_admin
DB_PASSWORD=stayly_secret_pass

JWT_SECRET=tu_clave_secreta

CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret



Las variables utilizadas son:

-DB_URL: URL de conexión a PostgreSQL.
-DB_USERNAME: usuario de PostgreSQL.
-DB_PASSWORD: contraseña de PostgreSQL.
-JWT_SECRET: clave secreta utilizada para firmar los tokens JWT.
-CLOUDINARY_CLOUD_NAME: nombre de la cuenta de Cloudinary.
-CLOUDINARY_API_KEY: API Key de Cloudinary.
-CLOUDINARY_API_SECRET: API Secret de Cloudinary.

Las variables de Cloudinary son opcionales para iniciar la aplicación, pero son necesarias para las funciones que requieren cargar imágenes.


El archivo application.properties utiliza estas variables mediante:

spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

jwt.secret=${JWT_SECRET}

cloudinary.cloud-name=${CLOUDINARY_CLOUD_NAME:}
cloudinary.api-key=${CLOUDINARY_API_KEY:}
cloudinary.api-secret=${CLOUDINARY_API_SECRET:}

### Frontend

Define `VITE_API_URL` en `Stayly-frontend/.env`. En local, usa `http://localhost:8080`.

## API REST

La API utiliza el prefijo `/api`. Los endpoints principales son:

| Área | Método y ruta | Acceso |
|---|---|---|
| Autenticación | `POST /api/auth/register` | Público |
| Autenticación | `POST /api/auth/login` | Público |
| Alojamientos | `GET /api/accommodations` | Público |
| Alojamientos | `GET /api/accommodations/{accommodationId}` | Público |
| Búsqueda | `GET /api/accommodations/search` | Público |
| Alojamientos | `POST /api/accommodations` | Administrador; multipart con datos e imágenes |
| Alojamientos | `PUT /api/accommodations/{accommodationId}` | Administrador |
| Alojamientos | `DELETE /api/accommodations/{accommodationId}` | Administrador |
| Alojamientos | `PATCH /api/accommodations/{accommodationId}/status` | Administrador |
| Reservas | `POST /api/reservations` | Usuario autenticado |
| Reservas | `GET /api/reservations/me` | Usuario autenticado |
| Reservas | `DELETE /api/reservations/{reservationId}` | Usuario autenticado |
| Reservas | `GET /api/reservations` | Administrador |
| Favoritos | `GET /api/favorites`, `POST /api/favorites/{accommodationId}`, `DELETE /api/favorites/{accommodationId}` | Usuario autenticado |
| Pagos | `POST /api/payments`, `POST /api/payments/{paymentId}/confirm` | Usuario |
| Calificaciones | `GET /api/ratings/accommodation/{accommodationId}` | Público |
| Calificaciones | `POST /api/ratings/{accommodationId}` | Usuario |
| Perfil | `GET /api/users/me` | Usuario autenticado |

## Seguridad

- Autenticación stateless mediante JWT y filtro de Spring Security.
- Contraseñas almacenadas con BCrypt.
- Roles de usuario y administrador aplicados en los endpoints.
- El frontend envía el JWT mediante el header `Authorization: Bearer <token>`.
- El token se almacena en `localStorage` para mantener la sesión del usuario.
- CORS está configurado para orígenes locales (`localhost` y `127.0.0.1`).

**Importante:** los valores de base de datos, la clave JWT y la cuenta de administrador que se cargan por defecto son para desarrollo local. Cambia estos valores y evita usar las credenciales de demo antes de desplegar la aplicación. La cuenta inicial actual es `admin` / `1234`.

## Pruebas y Build

### Backend

Windows:

```powershell
cd Stayly-backend
gradlew.bat test
gradlew.bat build
```

macOS o Linux:

```bash
cd Stayly-backend
./gradlew test
./gradlew build
```

### Frontend

```bash
cd Stayly-frontend
npm run lint
npm run build
```

## Autor

Pablo Ramírez

- LinkedIn: [pablo-ramirez-22203a377](https://www.linkedin.com/in/pablo-ramirez-22203a377/)
- GitHub: [Pablo1605](https://github.com/Pablo1605)
- Email: [pabloram1605@gmail.com](mailto:pabloram1605@gmail.com)

## Objetivo del Proyecto

Stayly fue desarrollado como proyecto full-stack para aplicar tecnologías y prácticas de desarrollo web en una plataforma de reservas: diseño de una API REST, persistencia relacional, autenticación y autorización, gestión de estado en el frontend y ejecución de servicios locales con Docker Compose.
