# Oráculo de los Apus

## Mazo de 72 cartas

El mazo reúne los 22 arcanos mayores existentes y 50 cartas originales en cinco caminos: Tierra, Agua, Fuego, Aire y Comunidad. Las nuevas cartas ya participan en las tiradas y aparecen en `/#/cartas`, con filtros por camino, significado al derecho, sombra y consejo. Sus ilustraciones son gráficas simbólicas provisionales. Los textos de las 50 cartas son una primera edición editorial y deben revisarse con el método de lectura de la autora; no se presentan como significados tradicionales documentados. Las traducciones detalladas de estas 50 cartas también están pendientes.

**Pendiente prioritario:** crear y revisar las 50 imágenes individuales antes de considerar terminado el mazo. La lista completa por carta está en [`docs/pendientes-ilustraciones.md`](docs/pendientes-ilustraciones.md).

## Interpretaciones locales

La aplicación genera la lectura gratuita en el dispositivo mediante el método Pilar.
Esa interpretación no necesita claves ni servicios externos.

La **Interpretación de la Maestra** es opcional: llama a `POST /api/maestra` en el servidor.
Copia `.env.example` a `.env` y añade `OPENAI_API_KEY`. Sin esa clave, el botón muestra un error controlado y la lectura gratuita no se pierde.

La tienda incluye un asistente para preguntas sobre servicios (`POST /api/services`). Con `OPENAI_API_KEY` utiliza IA y responde únicamente con los datos configurados de la lectura privada (US$80, 60 minutos, videollamada y resumen), el grimorio (US$39, en preparación) y la reserva por WhatsApp. Sin clave muestra una respuesta informativa automática. La clave permanece en el servidor; no debe ponerse en el código del navegador.

Para iniciar la aplicación:

   ```powershell
   npm run build
   npm start
   ```

Abre `http://127.0.0.1:8787`.

## Tienda textil (catálogo de preparación)

La portada `/#/tienda` conduce a páginas separadas para kits con precios referenciales, prendas y accesorios. Ninguna prenda de muestra se puede comprar: para habilitar una variante se requiere composición documentada, fotografía del artículo real, precio de venta, stock y disponibilidad. Los kits aún no admiten pedidos.

La tienda ahora tiene páginas independientes: `/#/tienda` (categorías), `/#/tienda/ropa`, `/#/tienda/accesorios`, `/#/tienda/kits` y `/#/tienda/espiritual`. Las fichas textiles muestran encuadres CSS de las imágenes suministradas, sin cambiar personas ni prendas. Las capturas pequeñas se amplían en pantalla, pero esa ampliación no recupera detalle real de la fotografía original. Antes de publicar fotos tomadas de redes sociales, verificar el permiso de uso y que la prenda que se consiga corresponda a la imagen.

El carrito está en `/#/tienda/carrito` y también se abre desde el encabezado de la tienda. Permite revisar cantidades y preparar un mensaje de consulta por WhatsApp. El pedido y el pago aún se coordinan manualmente; el carrito no reserva stock. Si un producto pierde disponibilidad, el carrito impide preparar el pedido hasta corregirlo.

El editor está en `/#/admin-tienda`. En esta instalación local, el token administrativo ya está configurado en el archivo `.env`: copie el valor de `STORE_ADMIN_TOKEN` en la pantalla administrativa para cargar y guardar el catálogo. El formulario permite completar productos, composición y variantes; también hay un editor JSON avanzado. Los campos privados `supplier`, `purchasePricePen` y `composition.evidenceNote` no aparecen en la API pública. Las imágenes deben existir previamente en `public/images/`. El tipo de cambio PEN/USD es configurable con `exchangeRatePenPerUsd`; si no se configura, solo se muestran soles.

Antes de publicar la venta: confirmar proveedor, composición con respaldo, fotos exactas, cuidado, origen cuando corresponda, precios, stock, tallas, colores, costos de envío y términos del pedido. El catálogo se guarda en `data/store-catalog.json`, almacenamiento local que debe sustituirse por persistencia de producción al desplegar. Todavía no hay cobro en línea ni gestión de pedidos.

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
