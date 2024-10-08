# Trotapp Backend

Este repositorio contiene el código fuente del backend de Trotapp, construido con Node.js y Express. Aquí se maneja la lógica de negocio, la autenticación, el acceso a la base de datos, y las API REST que se comunican con el frontend y la aplicación móvil. También se gestionan los servicios externos y la integración con otros sistemas.

## Requerimientos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

1. Node.js (versión 14 o superior)
2. npm (normalmente viene con Node.js)
3. MongoDB (asegúrate de tener una instancia en ejecución o acceso a una base de datos MongoDB)
4. Git (para clonar el repositorio)


## Configuración de la base de datos con Docker

Este proyecto utiliza MongoDB como base de datos. Para facilitar la configuración y asegurar un entorno consistente, proporcionamos un archivo `docker-compose.yml` para crear un contenedor de MongoDB.

### Requisitos previos

- Docker
- Docker Compose

### Inicializar el contenedor de MongoDB

1. Asegúrate de estar en el directorio raíz del proyecto donde se encuentra el archivo `docker-compose.yml`.

2. Ejecuta el siguiente comando para iniciar el contenedor:

   ```
   docker-compose up -d
   ```

   Este comando creará y ejecutará el contenedor de MongoDB en segundo plano.

3. Para verificar que el contenedor está funcionando, puedes usar:

   ```
   docker-compose ps
   ```

   Deberías ver el contenedor `mongo-db` en estado "Up".

### Detalles del contenedor

El archivo `docker-compose.yml` configura el siguiente servicio:

```yaml
version: '3.8'

services:
  mongo-db:
    image: mongo:6.0.13
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: mongo-user
      MONGO_INITDB_ROOT_PASSWORD: 123456
    volumes:
      - ./mongo:/data/db
    ports:
      - 27017:27017
```

- **Imagen**: MongoDB 6.0.13
- **Credenciales**:
  - Usuario: mongo-user
  - Contraseña: 123456
- **Puerto**: 27017 (mapeado al mismo puerto en el host)
- **Volumen**: Los datos se persisten en el directorio `./mongo` del proyecto

### Conexión a la base de datos

Para conectarte a esta instancia de MongoDB desde tu aplicación, usa la siguiente URL de conexión:

```
mongodb://mongo-user:123456@localhost:27017
```

Asegúrate de que esta URL coincida con la configuración en tu archivo `.env`.

### Detener el contenedor

Para detener y eliminar el contenedor, ejecuta:

```
docker-compose down
```

Si quieres eliminar también el volumen de datos, agrega la opción `-v`:

```
docker-compose down -v
```

**Nota**: Eliminar el volumen borrará todos los datos almacenados en la base de datos.

### Recomendaciones de seguridad

- Cambia las credenciales predeterminadas antes de usar en un entorno de producción.
- Considera usar variables de entorno para las credenciales en lugar de hardcodearlas en el `docker-compose.yml`.
- En producción, asegúrate de implementar medidas de seguridad adicionales, como usar una red Docker separada y configurar autenticación más robusta.


## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona el repositorio:

   ```
   git clone https://github.com/tu-usuario/trotapp-api.git
   cd trotapp-api
   ```

2. Instala las dependencias:

   ```
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias. Puedes usar `.env.example` como plantilla si existe.

4. Compila el proyecto:

   ```
   npm run build
   ```

5. (Opcional) Si necesitas inicializar la base de datos con datos de prueba, ejecuta:
   ```
   npm run seed
   ```

## Ejecución

Para iniciar el servidor en modo de desarrollo:

```
npm run dev
```

Para iniciar el servidor en modo de producción:

```
npm start
```

El servidor estará disponible en `http://localhost:<PUERTO>`, donde `<PUERTO>` es el puerto configurado en tus variables de entorno.

## Scripts disponibles

- `npm run dev`: Inicia el servidor en modo de desarrollo con recarga automática.
- `npm run build`: Compila el proyecto TypeScript a JavaScript.
- `npm start`: Compila el proyecto y luego inicia el servidor.
- `npm run seed`: Ejecuta el script de semilla para poblar la base de datos con datos iniciales.

## Dependencias principales

- Express: Framework web para Node.js
- Mongoose: ODM para MongoDB
- bcryptjs: Librería para el hashing de contraseñas
- jsonwebtoken: Implementación de JSON Web Tokens
- nodemailer: Módulo para enviar emails
- sharp: Librería para procesamiento de imágenes
- cors: Middleware para habilitar CORS

## Estructura del proyecto

El proyecto Trotapp API está organizado de la siguiente manera:

```
📁trotapp-api
├── 📁.git                 # Directorio de Git
├── 📁mongo                # Configuraciones relacionadas con MongoDB
├── 📁public               # Archivos públicos
│   └── index.html         # Página HTML pública
├── 📁resources            # Recursos estáticos
│   └── .gitkeep
├── 📁src                  # Código fuente principal
│   ├── 📁config           # Configuraciones de la aplicación
│   │   ├── envs.ts        # Configuración de variables de entorno
│   │   └── index.ts       # Punto de entrada para configuraciones
│   ├── 📁core             # Lógica central de la aplicación
│   │   └── index.ts
│   ├── 📁data             # Capa de acceso a datos
│   │   ├── 📁mongo        # Configuraciones específicas de MongoDB
│   │   │   ├── 📁models   # Modelos de Mongoose
│   │   │   └── mongo-database.ts
│   │   └── index.ts
│   ├── 📁presentation     # Capa de presentación (controladores y rutas)
│   │   ├── 📁auth         # Autenticación
│   │   │   ├── controller.ts
│   │   │   └── routes.ts
│   │   ├── routes.ts      # Rutas principales
│   │   └── server.ts      # Configuración del servidor
│   ├── 📁seed             # Scripts para poblar la base de datos
│   ├── 📁utils            # Utilidades y helpers
│   ├── app.ts             # Punto de entrada de la aplicación
│   └── types.d.ts         # Definiciones de tipos TypeScript
├── 📁uploads              # Directorio para subida de archivos
│   └── .gitkeep
├── .env                   # Variables de entorno (no versionado)
├── .env.template          # Plantilla para variables de entorno
├── .gitignore             # Archivos y directorios ignorados por Git
├── docker-compose.yml     # Configuración de Docker Compose
├── LICENSE                # Archivo de licencia
├── package-lock.json      # Versiones exactas de dependencias
├── package.json           # Configuración del proyecto y dependencias
├── README.md              # Documentación principal del proyecto
└── tsconfig.json          # Configuración de TypeScript
```

### Descripción de los directorios principales:

- **📁src**: Contiene el código fuente principal de la aplicación.
  - **📁config**: Configuraciones de la aplicación, incluyendo variables de entorno.
  - **📁core**: Lógica central y reglas de negocio de la aplicación.
  - **📁data**: Capa de acceso a datos, incluyendo modelos y configuración de la base de datos.
  - **📁presentation**: Controladores y rutas de la API.
  - **📁seed**: Scripts para inicializar la base de datos con datos de prueba.
  - **📁utils**: Funciones de utilidad y helpers.

- **📁public**: Archivos estáticos accesibles públicamente.

- **📁resources**: Recursos adicionales utilizados por la aplicación.

- **📁uploads**: Directorio para almacenar archivos subidos por los usuarios.

- **📁mongo**: Configuraciones específicas de MongoDB (posiblemente para desarrollo local o pruebas).

Esta estructura sigue el principio de separación de responsabilidades, facilitando el mantenimiento y la escalabilidad del proyecto. La organización modular permite una fácil navegación y comprensión del código para los desarrolladores que trabajen en el proyecto.

## Contribución

Agradecemos tu interés en contribuir al proyecto Trotapp Backend. Para mantener un flujo de trabajo consistente y de alta calidad, te pedimos que sigas estas pautas al realizar contribuciones:

1. **Fork del repositorio**: Crea un fork del repositorio principal en tu cuenta de GitHub.

2. **Crea una rama**: Para cada nueva característica o corrección, crea una nueva rama en tu fork.

   ```
   git checkout -b feature/nombre-de-la-caracteristica
   ```

   o

   ```
   git checkout -b fix/nombre-del-bug
   ```

3. **Commits significativos**: Realiza commits con mensajes claros y descriptivos. Sigue el formato:

   ```
   tipo(alcance): descripción corta

   Descripción más larga si es necesario
   ```

   Donde `tipo` puede ser feat, fix, docs, style, refactor, test, chore, etc.

4. **Pruebas**: Asegúrate de que tu código pase todas las pruebas existentes y, si es posible, agrega nuevas pruebas para la funcionalidad que estás implementando.

5. **Estilo de código**: Sigue las convenciones de estilo del proyecto. Utilizamos ESLint y Prettier para mantener un estilo consistente.

6. **Actualiza la documentación**: Si tu cambio afecta la funcionalidad o el uso del API, actualiza la documentación correspondiente.

7. **Pull Request**: Cuando tu contribución esté lista, crea un Pull Request (PR) desde tu rama hacia la rama principal del repositorio original.

   - Proporciona un título claro y una descripción detallada de tus cambios.
   - Referencia cualquier issue relacionado.
   - Asegúrate de que el PR pase todas las verificaciones de CI/CD.

8. **Revisión de código**: Espera la revisión de los mantenedores del proyecto. Estáte dispuesto a hacer cambios si se te solicita.

9. **Mantén actualizada tu rama**: Si se solicitan cambios o si la rama principal ha avanzado, actualiza tu rama:

   ```
   git fetch upstream
   git rebase upstream/main
   ```

10. **Merge**: Una vez que tu PR haya sido aprobado, un mantenedor del proyecto lo fusionará en la rama principal.

Recuerda que todas las contribuciones están sujetas al Código de Conducta del proyecto. Asegúrate de mantener un ambiente respetuoso y colaborativo en todas tus interacciones.

¡Gracias por contribuir a Trotapp Backend!

## Licencia

Este proyecto está licenciado bajo la licencia ISC.
