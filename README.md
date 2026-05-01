# OPENMIX

Asistente CLI para la automatización de procesos repetitivos.

## Descripción

Openmix es una herramienta de línea de comandos que permite validar y ajustar la estructura de carpetas de un proyecto contra un patrón definido en un archivo `structure.md`.

## Requisitos

- Node.js v12 o superior
- NPM

## Instalación

```bash
npm install
```

## Uso

### Validación de Estructura

Valida que la estructura de carpetas de un proyecto coincida con el patrón definido en `structure.md`.

```bash
# Modo interactivo - el sistema te pedirá la ruta
npm run validate

# Validar una ruta específica
npm run validate /ruta/del/proyecto

# Validar con un archivo de estructura específico
npm run validate /ruta/del/proyecto /ruta/structure.md
```

### Verificar estructura desde la raíz del proyecto

```bash
npm start
```

## Estructura del Proyecto

```
opentest/
├── src/
│   ├── index.js           # Punto de entrada
│   └── utils/
│       ├── validateStructure.js   # Valida la estructura de carpetas
│       └── adjustStructure.js     # Crea carpetas/archivos faltantes
├── structure.md           # Archivo con la estructura esperada
├── package.json
└── README.md
```

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

## Flujo de Trabajo

1. El usuario ejecuta `npm run validate`
2. El sistema solicita la ruta de la carpeta a validar
3. Si no existe `structure.md` en la ruta, pregunta si desea copiar el template de la raíz
4. El sistema compara la estructura actual con la esperada
5. Muestra las diferencias (carpetas faltantes o extras)
6. Permite al usuario ajustar la estructura automáticamente

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Muestra la pantalla de bienvenida |
| `npm run validate` | Modo interactivo de validación |
| `npm run validate <ruta>` | Validar carpeta específica |
| `npm run validate <ruta> <archivo>` | Validar con archivo MD específico |
| `npm test` | Ejecutar pruebas |

## Licencia

MIT