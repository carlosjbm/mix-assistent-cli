# OPENMIX-CLI

Asistente CLI para la automatización de procesos repetitivos en entornos ZUN.

## Descripción

Openmix-cli es una herramienta de línea de comandos que permite validar y ajustar la estructura de carpetas de un proyecto contra un patrón definido en un archivo `structure.md`. También incluye funcionalidad para actualizar recursos de ZUN y obtener información de versión de ejecutables Windows.

## Requisitos

- Node.js v12 o superior
- NPM
- Windows (para funcionalidades de versioninfo)

## Instalación

```bash
npm install -g openmix-cli
# O desde el repositorio local
npm link
```

## Uso

### Modo Interactivo

```bash
openmix
```

Inicia el modo interactivo donde puedes escribir comandos con autocompletado.

### Información de Versión de Ejecutables

Muestra la información de versión de un ejecutable Windows usando la librería `win-version-info`.

```bash
# Ver información de un ejecutable específico
openmix-versioninfo "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"

# Usar flags predefinidas para módulos ZUN
openmix-versioninfo --acc    # ZunAcc
openmix-versioninfo --pms    # ZunPms
openmix-versioninfo --st     # ZunStock
```

### Validación de Estructura

Valida que la estructura de carpetas de un proyecto coincida con el patrón definido en `structure.md`.

```bash
# Modo interactivo - el sistema tepedirá la ruta
openmix-validate

# Validar una ruta específica
openmix-validate /ruta/del/proyecto

# Validar ruta por defecto (definida en el código)
openmix-validate -- i
```

### Ajuste de Estructura

Ajusta la estructura de carpetas automáticamente creando las carpetas faltantes.

```bash
# Ajustar estructura de un módulo específico
openmix-fix -- acc
openmix-fix -- pms
openmix-fix -- st
```

### Actualización de ZUN

Actualiza los recursos de ZUN validando primero la estructura y luego clonando los archivos.

**Pasos para actualizar un módulo:**

1. **Preparar los recursos:** Crea una carpeta compartida donde estén los archivos de actualización (por ejemplo: `D:/RecursosZun/`) con una subcarpeta para cada módulo.
2. **Realizar backup:** Ejecuta `openmix-back <módulo>` para crear una copia de seguridad antes de actualizar.
3. **Ejecutar la actualización:** Usa el comando `openmix-act -- <módulo>` para validar la estructura y clonar los archivos.
4. **Verificar la versión:** Opcionalmente, ejecuta `openmix-versioninfo -- <módulo>` para confirmar que el ejecutable se actualizó correctamente.

```bash
# Actualizar módulos ZUN
openmix-act -- acc   # Accounting
openmix-act -- pms   # Point of Sale
openmix-act -- st    # Inventory
```

### Verificar Módulos Instalados

Muestra los módulos ZUN instalados en el sistema.

```bash
openmix-installed
```

### Clonación de Archivos y Directorios

Permite copiar archivos o directorios completos a otra ubicación.

```bash
# Clonar un archivo
openmix-clone origen.txt destino.txt

# Clonar un directorio
openmix-clone /ruta/origen /ruta/destino --directory
```

### Backup de Módulos ZUN

Crea una copia de seguridad del módulo en una carpeta `recicle` dentro del mismo directorio.

```bash
# Crear backup de un módulo
openmix-back acc    # ZunAcc
openmix-back pms    # ZunPms
openmix-back st     # ZunStock
```

El backup muestra una barra de progreso con el porcentaje de archivos copiados.

## Comandos Disponibles

| Comando                                     | Descripción                         |
| ------------------------------------------- | ----------------------------------- |
| `openmix`                                   | Modo interactivo con autocompletado |
| `openmix-version`                           | Ver versión de OpenMix              |
| `openmix-versioninfo <ruta>`                | Ver información de versión de exe   |
| `openmix-versioninfo --acc`                 | Ver versión de ZunAcc               |
| `openmix-versioninfo --pms`                 | Ver versión de ZunPms               |
| `openmix-versioninfo --st`                  | Ver versión de ZunStock             |
| `openmix-validate`                          | Modo interactivo de validación      |
| `openmix-validate <ruta>`                   | Validar carpeta específica          |
| `openmix-validate -- i`                     | Validar ruta por defecto            |
| `openmix-fix -- <modulo>`                   | Ajustar estructura (acc, pms, st)   |
| `openmix-act -- <modulo>`                   | Actualizar ZUN (acc, pms, st)       |
| `openmix-clone <origen> <dest>`             | Clonar archivo                      |
| `openmix-clone <origen> <dest> --directory` | Clonar directorio                   |
| `openmix-back <modulo>`                     | Crear backup (acc, pms, st)          |
| `openmix-installed`                         | Ver módulos ZUN instalados          |

## Archivo structure.md

El archivo `structure.md` define la estructura de carpetas esperada. Cada línea representa una carpeta (debe terminar con `/`) o un archivo.

Ejemplo:

```
src/
src/utils/
src/services/
src/components/
tests/
public/
config/
dist/
skills/
```

## Licencia

MIT
