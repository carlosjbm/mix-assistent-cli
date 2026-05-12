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

OpenMix CLI es una herramienta de asistencia CLI diseñada para automatizar tareas comunes de soporte técnico de la Suite ZUN de software empresarial. Permite validar estructuras de carpetas, actualizar módulos, clonar archivos, crear backups de bases de datos y obtener información del sistema.

### 2.1 Módulos de la Suite ZUN Soportados

- **ZunAcc** (acc) - Módulo de Contabilidad
- **ZunPms** (pms) - Módulo de Punto de Venta
- **ZunStock** (st) - Gestión de Inventarios

### 2.2 Rutas Predeterminadas

Las rutas se encuentran centralizadas en `src/config/paths.js` para garantizar que funcionen desde cualquier ubicación.

```javascript
// Ruta de instalación
installBase: 'C:/Program Files (x86)/GET/Zun Software'

// Rutas de módulos
ZunAcc: 'C:/Program Files (x86)/GET/Zun Software/ZunAcc'
ZunPms: 'C:/Program Files (x86)/GET/Zun Software/ZunPms'
ZunStock: 'C:/Program Files (x86)/GET/Zun Software/ZunStock'

// Recursos para actualización
resourcesBase: 'D:/.resources'

// Archivos de estructura
folders_strs/acc_folder_structure.md
folders_strs/pms_folder_structure.md
folders_strs/st_folder_structure.md
```

## 3. Arquitectura

### 3.1 Estructura de Archivos

```
opentest/
├── package.json              # Configuración npm y bin scripts
├── SPEC.md                   # Especificación del proyecto
├── README.md                 # Documentación de uso
├── folders_strs/             # Archivos de estructura para validación
│   ├── acc_folder_structure.md
│   ├── pms_folder_structure.md
│   └── st_folder_structure.md
└── src/
    ├── index.js            # Punto de entrada CLI
    ├── config/
    │   └── paths.js        # Configuración centralizada de rutas
    ├── services/
    │   ├── interactiveCLI.js    # Manejo de entrada interactiva
    │   ├── cloneFiles.js        # Clonación de archivos
    │   ├── fixFolderEspecific.js # Corrección de estructuras
    │   ├── backupModule.js      # Backup de módulos ZUN
    │   └── autoComplete.js     # Sistema de autocompletado
    └── utils/
        ├── validateStructure.js # Validación de estructuras
        ├── actZun.js            # Actualización de módulos ZUN
        ├── installedModules.js  # Listado de módulos instalados
        ├── versionInfo.js        # Información de versiones de ejecutables
        ├── version.js            # Versión de OpenMix
        ├── adjustStructure.js   # Ajuste de carpetas
        ├── backupSql.js         # Backup de bases de datos SQL
        └── help.js              # Sistema de ayuda
```

### 3.2 Comandos Disponibles

#### Binarios Globales (npm install -g / npm link)

| Comando | Descripción |
|---------|-------------|
| `openmix` | Iniciar CLI interactivo |
| `openmix-version` | Ver versión de OpenMix instalada |
| `openmix-validate` | Validar estructura de carpetas |
| `openmix-fix` | Ajustar estructura de carpetas |
| `openmix-clone` | Clonar archivos entre directorios |
| `openmix-act` | Actualizar módulo ZUN |
| `openmix-back` | Crear backup de módulo en carpeta recicle |
| `openmix-installed` | Listar módulos instalados |
| `openmix-versioninfo` | Ver versión de ejecutable Windows |
| `openmix-help` | Mostrar ayuda de comandos |

#### Scripts npm

| Comando | Descripción |
|---------|-------------|
| `npm run start` | Iniciar CLI interactivo |
| `npm run validate` | Validar estructura |
| `npm run clone` | Clonar archivos |
| `npm run act` | Actualizar ZUN |
| `npm run fix` | Ajustar estructura |
| `npm run installed` | Ver módulos instalados |
| `npm run back` | Crear backup de módulo |
| `npm run help` | Mostrar ayuda |
| `npm run version` | Ver versión de OpenMix |
| `npm run test` | Ejecutar pruebas |

### 3.3 Uso de Comandos

#### Modo Interactivo

```bash
openmix
# o
npm run start
```

Inicia el CLI en modo interactivo con autocompletado. Muestra un menú de ayuda con todos los comandos disponibles.

#### Ver Versión de OpenMix

```bash
openmix-version
# o
npm run version
```

Muestra la versión actual instalada de OpenMix.

#### Validar Estructura

```bash
# Validar ruta específica
openmix-validate "C:/ruta/a/carpeta"

# Validar con estructura por defecto
openmix-validate -- i

# Modo interactivo
openmix-validate
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

#### Actualizar ZUN

```bash
# Actualizar un módulo específico
openmix-act -- acc
openmix-act -- pms
openmix-act -- st
```

Pasos para actualizar:
1. **Preparar recursos:** Crear carpeta compartida (ej: `D:/RecursosZun/`) con subcarpetas por módulo
2. **Realizar backup:** Ejecutar `openmix-backup -- <módulo>` para crear copia de seguridad
3. **Ejecutar actualización:** Usar `openmix-act -- <módulo>` para validar estructura y clonar archivos
4. **Verificar versión:** Opcionalmente usar `openmix-versioninfo -- <módulo>`

#### Crear Backup de Módulo

```bash
# Backup de un módulo específico
openmix-back acc
openmix-back pms
openmix-back st
```

Crea una copia de seguridad del módulo en una carpeta `recicle` dentro del mismo directorio del módulo. Muestra una barra de progreso con el porcentaje de archivos copiados.

#### Clonar Archivos

```bash
# Clonar archivo individual
openmix-clone "origen" "destino"

# Clonar todo el directorio
openmix-clone "origen" "destino" --directory
```

#### Ver Módulos Instalados

```bash
openmix-installed
# o
npm run installed
```

Lista todos los módulos ZUN instalados en la ruta de instalación.

#### Ver Información de Versión de Ejecutable

```bash
# Por ruta de ejecutable
openmix-versioninfo "C:/ruta/ZunAcc.exe"

# Por módulo predefinido
openmix-versioninfo --acc
openmix-versioninfo --pms
openmix-versioninfo --st
```

Muestra información detallada de versión de archivos ejecutables Windows.

## 4. Dependencias

### 4.1 Dependencias de Producción

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| `keypress` | ^0.2.1 | Manejo de teclado para CLI interactivo |
| `win-version-info` | ^6.0.1 | Obtener versión de archivos Windows |

## 5. Sistema de Rutas Centralizado

### 5.1 Configuración (`src/config/paths.js`)

Todas las rutas del proyecto se definen en un único archivo de configuración que utiliza `__dirname` para calcular rutas absolutas. Esto garantiza que las rutas funcionen correctamente sin importar desde dónde se ejecute el comando.

```javascript
const projectRoot = path.resolve(__dirname, '..', '..');

module.exports = {
  projectRoot,      // Raíz del proyecto
  zun: {            // Rutas de instalación ZUN
    installBase,    // C:/Program Files (x86)/GET/Zun Software
    resourcesBase,  // D:/.resources
    acc, pms, st    // Rutas específicas por módulo
  },
  structure: {      // Archivos de estructura
    acc, pms, st,
    default
  }
};
```

### 5.2 Beneficios

- **Rutas absolutas:** No dependen de `process.cwd()`
- **Mantenimiento centralizado:** Un solo archivo para actualizar rutas
- **Consistencia:** Todas las utilidades usan la misma configuración

## 6. Autocompletado

El CLI interactivo soporta autocompletado con tabulador:

- **ESPACIO ESPACIO** - Muestra sugerencias de comandos
- **ESC** - Limpia sugerencias
- **↑ / ↓** - Navegar entre sugerencias
- **ENTER** - Ejecutar comando seleccionado
- **CTRL+C** - Salir del programa