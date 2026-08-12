# Oráculo de los Apus

## Interpretaciones locales

La aplicación genera todas las lecturas en el dispositivo mediante el método Pilar.
No necesita claves, servicios externos, compras ni conexión con proveedores de IA.

Para iniciar la aplicación:

   ```powershell
   npm run build
   npm start
   ```

Abre `http://127.0.0.1:8787`.

## Lectura de acción

Cuando Carta del día recibe una pregunta como «¿Vendrá hoy?», la aplicación la
analiza antes de extraer cartas y recomienda la Lectura de acción de tres cartas:
intención actual, obstáculo o impulso, y acción más probable. El usuario conserva
la opción de continuar con una carta, cuya respuesta se presenta como tendencia
limitada y no como certeza.

## Base técnica

React + TypeScript + Vite.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
