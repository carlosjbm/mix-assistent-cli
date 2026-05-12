# Landing Page - OpenMix CLI

## Project Overview
- **Name**: OpenMix CLI
- **Type**: Node.js CLI Tool for Windows
- **Tagline**: "Asistente CLI para automatizar procesos de soporte ZUN"
- **Description**: Herramienta de línea de comandos para validar estructura de carpetas, actualizar recursos ZUN, obtener información de versión de ejecutables Windows y más.

## Target Audience
- Técnicos de soporte ZUN
- Administradores de sistemas Windows
- Desarrolladores que trabajan con Suite ZUN

## Color Palette
- **Primary**: #2E7D32 (Green - ZUN brand alignment)
- **Secondary**: #1565C0 (Blue)
- **Accent**: #FF6F00 (Orange)
- **Background**: #FAFAFA (Light gray)
- **Dark**: #212121

## Sections Required

### 1. Hero Section
- Logo/Icono de OpenMix CLI
- Headline principal
- Subheadline descriptivo
- CTA buttons: "Install Now" / "View on GitHub"
- Quick command preview: `npm install -g openmix-cli`

### 2. Features Section
Grid de características principales:
- **Validación de Estructura**: Valida carpetas contra patrones definidos en structure.md
- **Actualización Automática**: Actualiza módulos ZUN (acc, pms, st) con un solo comando
- **Información de Versión**: Muestra versión de ejecutables Windows
- **Modo Interactivo**: Autocompletado y comandos guiada
- **Clonación de Archivos**: Copia archivos/directorios automáticamente
- **Backup SQL**: Crea respaldos de bases de datos antes de actualizaciones

### 3. Commands Reference
Tabla de comandos disponibles:
| Comando | Descripción |
|---------|-------------|
| `openmix` | Modo interactivo |
| `openmix-validate` | Validar estructura |
| `openmix-fix` | Crear carpetas faltantes |
| `openmix-act` | Actualizar módulo ZUN |
| `openmix-versioninfo` | Ver versión de exe |
| `openmix-installed` | Ver módulos instalados |
| `openmix-clone` | Clonar archivos |
| `openmix-backup` | Crear backup SQL |

### 4. Installation Section
Pasos de instalación:
```bash
npm install -g openmix-cli
```

### 5. Quick Start Guide
Tutorial básico en 3 pasos:
1. Instalar globally
2. Ejecutar `openmix` para modo interactivo
3. Usar comandos como `openmix-act -- acc`

### 6. Documentation Section (Docs)

#### Getting Started
- Requisitos: Node.js 12+, Windows
- Instalación global vs npm link

#### Modo Interactivo
- Cómo iniciar: `openmix`
- Autocompletado con TAB
- Navegación con ESC, CTRL+C para salir

#### Comandos Detallados

**validate**
```bash
openmix-validate /ruta/proyecto
openmix-validate -- i  # ruta por defecto
```

**fix**
```bash
openmix-fix -- acc    # crear carpetas Accounting
openmix-fix -- pms    # Point of Sale
openmix-fix -- st     # Stock/Inventory
```

**act**
```bash
openmix-act -- acc    # validar + clonar Accounting
openmix-act -- pms    # Point of Sale
openmix-act -- st     # Stock/Inventory
```

**versioninfo**
```bash
openmix-versioninfo "C:/ruta/archivo.exe"
openmix-versioninfo --acc
openmix-versioninfo --pms
openmix-versioninfo --st
```

**installed**
```bash
openmix-installed    # lista módulos ZUN instalados
```

**clone**
```bash
openmix-clone origen.txt destino.txt
openmix-clone /origen /destino --directory
```

#### Configuración
- Ruta por defecto de módulos ZUN
- Archivo structure.md y cómo personalizarlo

### 7. Use Cases
- Actualizar módulos ZUN después de una nueva release
- Validar estructura de carpetas en nuevos proyectos
- Obtener versión de ejecutables para soporte técnico
- Respaldar bases de datos antes de actualizaciones

### 8. Footer
- GitHub repository link
- npm package link
- License: MIT
- Author: carlinhos

## Tech Stack for Landing Page
- Modern responsive design
- Dark/Light mode support
- Code syntax highlighting
- Copy to clipboard para comandos
- Animaciones suaves

## Output Format
Generar código HTML/CSS/JS completo o estructura para framework (Next.js, Vite, etc.)