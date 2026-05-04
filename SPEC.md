# SPEC.md - OpenMix CLI

## 1. Información General

| Campo | Descripción |
|-------|-------------|
| **Nombre** | OpenMix CLI |
| **Tipo** | Aplicación de línea de comandos (CLI) para Windows |
| **Versión** | 1.0.0 |
| **Propósito** | Asistente de automatización para procesos repetitivos de soporte de la Suite ZUN |
| **Autor** | carlinhos |
| **Licencia** | MIT |
| **Plataforma** | Win32 |
| **Node.js** | Requerido para ejecución |

## 2. Descripción del Sistema

OpenMix CLI es una herramienta de asistenciaCLI diseñada para automatizar tareas comunes de soporte técnico de la Suite ZUN de software empresarial. Permite validar estructuras de carpetas, actualizar módulos, clonar archivos y obtener información del sistema.

### 2.1 Módulos de la Suite ZUN Soportados

- **ZunAcc** (acc) - Módulo de Contabilidad
- **ZunPms** (pms) - Módulo de Punto de Venta
- **ZunStock** (st) - Gestión de Inventarios
- **ZunAft** (aft) - Archivoft

### 2.2 Rutas Predeterminadas

```javascript
// Ruta de instalación
const installPath = "C:/Program Files (x86)/GET/Zun Software";

// Ruta de pruebas
const sourcePath = "C:/Users/Carlinhos/Desktop/carpeta_prueba";
```

## 3. Arquitectura

### 3.1 Estructura de Archivos

```
opentest/
├── package.json              # Configuración npm y bin scripts
├── src/
│   ├── index.js            # Punto de entrada CLI
│   ├── services/
│   │   ├── interactiveCLI.js    # Manejo de entrada interactiva
│   │   ├── cloneFiles.js        # Clonación de archivos
│   │   ├── fixFolderEspecific.js # Corrección de estructuras
│   │   └── autoComplete.js     # Sistema de autocompletado
│   └── utils/
│       ├── validateStructure.js # Validación de estructuras
│       ├── actZun.js            # Actualización de módulos ZUN
│       ├── installedModules.js  # Listado de módulos instalados
│       ├── versionInfo.js        # Información de versiones
│       └── adjustStructure.js   # Ajuste de carpetas
```

### 3.2 Comandos Disponibles

#### Binarios Globales (npm install -g)

| Comando | Descripción | Alias |
|---------|-------------|-------|
| `openmix` | Iniciar CLI interactivo | - |
| `openmix-validate` | Validar estructura de carpetas | `validate` |
| `openmix-fix` | Ajustar estructura de carpetas | `fix` |
| `openmix-clone` | Clonar archivos entre directorios | `clone` |
| `openmix-act` | Actualizar módulo ZUN | `act` |
| `openmix-installed` | Listar módulos instalados | `installed` |
| `openmix-versioninfo` | Ver versión de ejecutable | `openmix-versioninfo` |

#### Scripts npm

| Comando | Descripción |
|---------|-------------|
| `npm run start` | Iniciar CLI interactivo |
| `npm run validate` | Validar estructura |
| `npm run clone` | Clonar archivos |
| `npm run act` | Actualizar ZUN |
| `npm run fix` | Ajustar estructura |
| `npm run installed` | Ver módulos instalados |
| `npm run test` | Ejecutar pruebas |

### 3.3 Uso de Comandos

#### Modo Interactivo

```bash
openmix
# o
npm run start
```

Inicia el CLI en modo interactivo con autocompletado. Muestra un menú de ayuda con todos los comandos disponibles.

#### Validar Estructura

```bash
# Validar ruta específica
openmix-validate "C:/ruta/a/carpeta"

# Validar con estructura por defecto
openmix-validate -- i
```

Valida que la estructura de carpetas coincida con el archivo `structure.md` esperado.

#### Ajustar Estructura

```bash
# Ajustar estructura de un módulo
openmix-fix -- acc
openmix-fix -- pms
openmix-fix -- st
```

Crea las carpetas faltantes según la estructura esperada.

#### Clonar Archivos

```bash
# Clonar archivos individually
openmix-clone "origen" "destino"

# Clonar todo el directorio
openmix-clone "origen" "destino" --directory
```

#### Actualizar ZUN

```bash
# Actualizar un módulo específico
openmix-act -- acc
openmix-act -- pms
openmix-act -- st
```

Valida la estructura y luego clona los archivos del origen al destino.

#### Ver Módulos Instalados

```bash
openmix-installed
# o
npm run installed
```

Lista todos los módulos ZUN instalados en la ruta de instalación.

#### Ver Información de Versión

```bash
# Por ruta de ejecutable
openmix-versioninfo "C:/ruta/ZunAcc.exe"

# Por módulo predefinido
openmix-versioninfo --acc
openmix-versioninfo --pms
openmix-versioninfo --st
```

## 4. Dependencias

### 4.1 Dependencias de Producción

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| `keypress` | ^0.2.1 | Manejo de teclado |
| `win-version-info` | ^6.0.1 | Obtener versión de archivos Windows |

## 5. Autocompletado

El CLI interactivo soporta autocompletado con tabulador. Presiona **ESPACIO dos veces** para mostrar sugerencias.

- **ESC** - Limpia sugerencias
- **CTRL+C** - Salir del programa