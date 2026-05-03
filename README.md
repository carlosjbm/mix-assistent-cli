# OPENMIX-ZUN

Asistente CLI para la automatización de procesos repetitivos en entornos ZUN.

## Descripción

Openmix-zun es una herramienta de línea de comandos que permite validar y ajustar la estructura de carpetas de un proyecto contra un patrón definido en un archivo `structure.md`. También incluye funcionalidad para actualizar recursos de ZUN y obtener información de versión de ejecutables Windows.

## Requisitos

- Node.js v12 o superior
- NPM
- Windows (para funcionalidades de versioninfo)

## Instalación

```bash
npm install -g openmix-zun
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

```bash
# Validar estructura y clonar recursos
openmix-act -- acc
openmix-act -- pms
openmix-act -- st
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

## Comandos Disponibles

| Comando                          | Descripción                          |
| -------------------------------- | ------------------------------------ |
| `openmix`                        | Modo interactivo con autocompletado   |
| `openmix-versioninfo <ruta>`      | Ver información de versión de exe  |
| `openmix-versioninfo --acc`     | Ver versión de ZunAcc               |
| `openmix-versioninfo --pms`     | Ver versión de ZunPms               |
| `openmix-versioninfo --st`       | Ver versión de ZunStock            |
| `openmix-validate`              | Modo interactivo de validación      |
| `openmix-validate <ruta>`      | Validar carpeta específica           |
| `openmix-validate -- i`         | Validar ruta por defecto            |
| `openmix-fix -- <modulo>`        | Ajustar estructura (acc, pms, st)  |
| `openmix-act -- <modulo>`        | Actualizar ZUN (acc, pms, st)      |
| `openmix-clone <origen> <dest>`  | Clonar archivo                      |
| `openmix-clone <origen> <dest> --directory` | Clonar directorio            |
| `openmix-installed`             | Ver módulos ZUN instalados         |

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