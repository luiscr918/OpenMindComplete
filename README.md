
```
OPENMIND
├─ docker-compose.yml
├─ open-mind-stats
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ vite.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.tsx
│  │  ├─ assets
│  │  │  └─ react.svg
│  │  ├─ index.css
│  │  └─ main.tsx
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ vite.config.ts
├─ OpenMindBack
│  ├─ .idea
│  │  ├─ compiler.xml
│  │  ├─ copilot.data.migration.agent.xml
│  │  ├─ copilot.data.migration.ask.xml
│  │  ├─ copilot.data.migration.ask2agent.xml
│  │  ├─ copilot.data.migration.edit.xml
│  │  ├─ encodings.xml
│  │  ├─ jarRepositories.xml
│  │  ├─ misc.xml
│  │  ├─ vcs.xml
│  │  └─ workspace.xml
│  ├─ .mvn
│  │  └─ wrapper
│  │     └─ maven-wrapper.properties
│  ├─ Dockerfile
│  ├─ HELP.md
│  ├─ mvnw
│  ├─ mvnw.cmd
│  ├─ pom.xml
│  ├─ src
│  │  ├─ main
│  │  │  ├─ java
│  │  │  │  └─ com
│  │  │  │     └─ example
│  │  │  │        └─ OpenMind
│  │  │  │           ├─ Controller
│  │  │  │           │  ├─ EjemplarController.java
│  │  │  │           │  ├─ LibroController.java
│  │  │  │           │  ├─ PrestamoController.java
│  │  │  │           │  └─ UsuarioController.java
│  │  │  │           ├─ dto
│  │  │  │           │  ├─ EjemplarDTO.java
│  │  │  │           │  ├─ LibroDTO.java
│  │  │  │           │  ├─ PrestamoDTO.java
│  │  │  │           │  └─ UsuarioDTO.java
│  │  │  │           ├─ Entity
│  │  │  │           │  ├─ Ejemplar.java
│  │  │  │           │  ├─ Libro.java
│  │  │  │           │  ├─ Prestamo.java
│  │  │  │           │  └─ Usuario.java
│  │  │  │           ├─ Enums
│  │  │  │           │  ├─ EstadoPrestamo.java
│  │  │  │           │  └─ Rol.java
│  │  │  │           ├─ mapper
│  │  │  │           │  ├─ EjemplarMapper.java
│  │  │  │           │  ├─ LibroMapper.java
│  │  │  │           │  ├─ PrestamoMapper.java
│  │  │  │           │  └─ UsuarioMapper.java
│  │  │  │           ├─ OpenMindApplication.java
│  │  │  │           ├─ Repository
│  │  │  │           │  ├─ EjemplarRepository.java
│  │  │  │           │  ├─ LibroRepository.java
│  │  │  │           │  ├─ PrestamoRepository.java
│  │  │  │           │  └─ UsuarioRepository.java
│  │  │  │           └─ Service
│  │  │  │              ├─ EjemplarService.java
│  │  │  │              ├─ LibroService.java
│  │  │  │              ├─ PrestamoService.java
│  │  │  │              └─ UsuarioService.java
│  │  │  └─ resources
│  │  │     ├─ application.properties
│  │  │     ├─ static
│  │  │     └─ templates
│  │  └─ test
│  │     └─ java
│  │        └─ com
│  │           └─ example
│  │              └─ OpenMind
│  │                 └─ OpenMindApplicationTests.java
│  └─ target
│     ├─ classes
│     │  ├─ application.properties
│     │  └─ com
│     │     └─ example
│     │        └─ OpenMind
│     │           ├─ Controller
│     │           │  ├─ EjemplarController.class
│     │           │  ├─ LibroController.class
│     │           │  ├─ PrestamoController.class
│     │           │  └─ UsuarioController.class
│     │           ├─ dto
│     │           │  ├─ EjemplarDTO.class
│     │           │  ├─ LibroDTO.class
│     │           │  ├─ PrestamoDTO.class
│     │           │  └─ UsuarioDTO.class
│     │           ├─ Entity
│     │           │  ├─ Ejemplar.class
│     │           │  ├─ Libro.class
│     │           │  ├─ Prestamo.class
│     │           │  └─ Usuario.class
│     │           ├─ Enums
│     │           │  ├─ EstadoPrestamo.class
│     │           │  └─ Rol.class
│     │           ├─ mapper
│     │           │  ├─ EjemplarMapper.class
│     │           │  ├─ EjemplarMapperImpl.class
│     │           │  ├─ LibroMapper.class
│     │           │  ├─ LibroMapperImpl.class
│     │           │  ├─ PrestamoMapper.class
│     │           │  ├─ PrestamoMapperImpl.class
│     │           │  ├─ UsuarioMapper.class
│     │           │  └─ UsuarioMapperImpl.class
│     │           ├─ OpenMindApplication.class
│     │           ├─ Repository
│     │           │  ├─ EjemplarRepository.class
│     │           │  ├─ LibroRepository.class
│     │           │  ├─ PrestamoRepository.class
│     │           │  └─ UsuarioRepository.class
│     │           └─ Service
│     │              ├─ EjemplarService.class
│     │              ├─ LibroService.class
│     │              ├─ PrestamoService.class
│     │              └─ UsuarioService.class
│     ├─ generated-sources
│     │  └─ annotations
│     │     └─ com
│     │        └─ example
│     │           └─ OpenMind
│     │              └─ mapper
│     │                 ├─ EjemplarMapperImpl.java
│     │                 ├─ LibroMapperImpl.java
│     │                 ├─ PrestamoMapperImpl.java
│     │                 └─ UsuarioMapperImpl.java
│     ├─ generated-test-sources
│     │  └─ test-annotations
│     ├─ maven-archiver
│     │  └─ pom.properties
│     ├─ maven-status
│     │  └─ maven-compiler-plugin
│     │     ├─ compile
│     │     │  └─ default-compile
│     │     │     ├─ createdFiles.lst
│     │     │     └─ inputFiles.lst
│     │     └─ testCompile
│     │        └─ default-testCompile
│     │           ├─ createdFiles.lst
│     │           └─ inputFiles.lst
│     ├─ OpenMind-0.0.1-SNAPSHOT.jar
│     ├─ OpenMind-0.0.1-SNAPSHOT.jar.original
│     └─ test-classes
│        └─ com
│           └─ example
│              └─ OpenMind
│                 └─ OpenMindApplicationTests.class
├─ openMindFront
│  ├─ .angular
│  │  └─ cache
│  │     └─ 21.1.4
│  │        └─ openMindFront
│  │           ├─ .tsbuildinfo
│  │           └─ vite
│  │              ├─ com.chrome.devtools.json
│  │              └─ deps
│  │                 ├─ @angular_common.js
│  │                 ├─ @angular_common.js.map
│  │                 ├─ @angular_core.js
│  │                 ├─ @angular_core.js.map
│  │                 ├─ @angular_forms.js
│  │                 ├─ @angular_forms.js.map
│  │                 ├─ @angular_platform-browser.js
│  │                 ├─ @angular_platform-browser.js.map
│  │                 ├─ @angular_router.js
│  │                 ├─ @angular_router.js.map
│  │                 ├─ chunk-4YCCEXQQ.js
│  │                 ├─ chunk-4YCCEXQQ.js.map
│  │                 ├─ chunk-6MAQMZFE.js
│  │                 ├─ chunk-6MAQMZFE.js.map
│  │                 ├─ chunk-J46EEYGT.js
│  │                 ├─ chunk-J46EEYGT.js.map
│  │                 ├─ chunk-O425MODH.js
│  │                 ├─ chunk-O425MODH.js.map
│  │                 ├─ chunk-QPKUJ6EL.js
│  │                 ├─ chunk-QPKUJ6EL.js.map
│  │                 ├─ chunk-U7EDC2PH.js
│  │                 ├─ chunk-U7EDC2PH.js.map
│  │                 ├─ package.json
│  │                 ├─ rxjs.js
│  │                 ├─ rxjs.js.map
│  │                 ├─ rxjs_operators.js
│  │                 ├─ rxjs_operators.js.map
│  │                 └─ _metadata.json
│  ├─ .editorconfig
│  ├─ angular.json
│  ├─ Dockerfile
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ favicon.ico
│  ├─ README.md
│  ├─ src
│  │  ├─ app
│  │  │  ├─ app.config.ts
│  │  │  ├─ app.css
│  │  │  ├─ app.html
│  │  │  ├─ app.routes.ts
│  │  │  ├─ app.spec.ts
│  │  │  ├─ app.ts
│  │  │  ├─ pages
│  │  │  │  ├─ catalogo
│  │  │  │  │  ├─ catalogo.css
│  │  │  │  │  ├─ catalogo.html
│  │  │  │  │  ├─ catalogo.spec.ts
│  │  │  │  │  └─ catalogo.ts
│  │  │  │  ├─ contactos
│  │  │  │  │  ├─ contactos.css
│  │  │  │  │  ├─ contactos.html
│  │  │  │  │  ├─ contactos.spec.ts
│  │  │  │  │  └─ contactos.ts
│  │  │  │  ├─ home
│  │  │  │  │  ├─ home.css
│  │  │  │  │  ├─ home.html
│  │  │  │  │  ├─ home.spec.ts
│  │  │  │  │  └─ home.ts
│  │  │  │  ├─ nosotros
│  │  │  │  │  ├─ nosotros.css
│  │  │  │  │  ├─ nosotros.html
│  │  │  │  │  ├─ nosotros.spec.ts
│  │  │  │  │  └─ nosotros.ts
│  │  │  │  ├─ perfil
│  │  │  │  │  ├─ perfil.css
│  │  │  │  │  ├─ perfil.html
│  │  │  │  │  ├─ perfil.spec.ts
│  │  │  │  │  └─ perfil.ts
│  │  │  │  └─ prestamos
│  │  │  │     ├─ prestamos.css
│  │  │  │     ├─ prestamos.html
│  │  │  │     ├─ prestamos.spec.ts
│  │  │  │     └─ prestamos.ts
│  │  │  └─ services
│  │  │     ├─ ejemplar-service.spec.ts
│  │  │     ├─ ejemplar-service.ts
│  │  │     ├─ libro-service.spec.ts
│  │  │     ├─ libro-service.ts
│  │  │     ├─ prestamo-service.spec.ts
│  │  │     ├─ prestamo-service.ts
│  │  │     ├─ usuario-service.spec.ts
│  │  │     └─ usuario-service.ts
│  │  ├─ environments
│  │  │  └─ environment.ts
│  │  ├─ index.html
│  │  ├─ main.ts
│  │  ├─ models
│  │  │  ├─ ejemplar.model.ts
│  │  │  ├─ libro.model.ts
│  │  │  ├─ prestamo.model.ts
│  │  │  └─ usuario.model.ts
│  │  └─ styles.css
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  └─ tsconfig.spec.json
└─ README.md

```