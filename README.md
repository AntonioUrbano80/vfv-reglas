# V for Victory — PWA con libros privados

Esta carpeta es la versión preparada para publicar. No contiene los PDF ni su OCR completo. Incluye explicaciones y tablas de consulta ya presentes en la aplicación, más el lector PDF.js (licencia Apache-2.0 en vendor).

## Publicar en GitHub Pages

1. Crea un repositorio vacío en GitHub, por ejemplo `vfv-reglas`.
2. Sube **solo el contenido de esta carpeta**, de forma que `index.html` quede en la raíz del repositorio. Conserva las carpetas `data`, `icons` y `vendor`. Puedes usar GitHub Desktop: clona el repositorio vacío, copia ahí estos archivos, crea un commit y pulsa Push. Así evitas el límite de archivos de la subida por la web. Subir el ZIP sin descomprimir no publica la aplicación.
3. En Settings → Pages, elige Deploy from a branch → main → /(root), y guarda.
4. Cuando termine el despliegue, abre `https://TU-USUARIO.github.io/vfv-reglas/` desde el móvil. Comprueba que está activado HTTPS.

No subas la carpeta original del proyecto: contiene tus libros y el OCR. El ZIP público entregado es la opción sencilla para crear el repositorio. No incluyas después archivos personales en ese repositorio: `.gitignore` no impide las subidas manuales por la web.

## Instalar

- Android: Chrome → menú → Instalar aplicación / Añadir a pantalla de inicio.
- iPhone/iPad: Safari → Compartir → Añadir a pantalla de inicio.
- Abre la aplicación instalada, espera «Disponible sin conexión», y después importa los PDF en **Mis libros**.
- Comprueba una vez el funcionamiento en modo avión.

La instalación requiere HTTPS o localhost. Una IP local servida por HTTP permite probar parte de la web, pero no sirve para comprobar la instalación ni el service worker.

## Libros locales y búsqueda

En **Mis libros**, selecciona Reglamento, suplemento 39–43 o GCE, y pulsa **Importar mi PDF**. La selección es manual: no se envían archivos. El libro se guarda en IndexedDB, asociado al navegador, sitio y dispositivo. El lector abre las páginas citadas dentro de la aplicación y funciona sin conexión.

Se extrae en el dispositivo el texto que ya exista en el PDF. **No se incluye reconocimiento OCR de imágenes**: si el libro es un escaneo, puedes leerlo, pero para buscar su contenido necesitas importar un JSON OCR propio mediante **Añadir texto OCR local**. Los temas y preguntas funcionan sin libros.

Formato del JSON:

```json
{"docId":"crb","pages":[{"page":1,"text":"Texto de la primera página del PDF"}]}
```

Identificadores: `crb` (básico), `e43` (1939–1943), `gce` (Guerra Civil). Las páginas son las del PDF, empezando por 1. Comprueba que el OCR corresponde exactamente a tu edición y paginación. Las referencias preparadas se basan en las copias originales del proyecto y pueden no coincidir con otra edición.

Puedes sustituir o eliminar cada copia local. Sustituir el PDF reemplaza también su texto. Borrar los datos del navegador, desinstalar o liberar almacenamiento puede eliminar los libros: conserva los originales. La app solicita almacenamiento persistente, pero el navegador decide si lo concede. No se sincronizan libros entre dispositivos ni entre Safari y otras aplicaciones.

## Actualizaciones y privacidad

**Más → Constructor de listas** permite preparar la infantería británica de Francia 1940. Los destinos de cada refuerzo se eligen manualmente; la lista se guarda en este navegador y puede exportarse como texto. El constructor funciona también sin conexión. Esta primera lista no incluye otras campañas ni gestión de transportes asignados.

Los soldados se representan mediante círculos, con el arma debajo; **C** identifica al comandante y **J** a los jefes. Los círculos grises con **+** son huecos para refuerzos. Una vez comprados, toca esos huecos para colocar las figuras; toca una figura colocada para moverla o devolverla al banco. También se conserva «Asignar por nombre» como alternativa.

El francotirador cuesta **1♦ = dos figuras**. Al elegirlo se abre una ventana: toca dos fusileros distintos para descartarlos, o elige dos figuras de refuerzo normal sin colocar. Solo se recluta al confirmar las dos bajas; cancelar no cambia la lista. El panel muestra el pago **2/2**, y las bajas se señalan en sus equipos. Esas figuras no pueden volver a utilizarse mientras el francotirador siga incluido.

El botón **Actualizar aplicación** aparece cuando hay una nueva versión lista. Actualizar la aplicación no borra IndexedDB. El modo sin conexión guarda únicamente los recursos públicos de la app; los PDF y OCR personales se guardan por separado en el dispositivo.

El lector PDF.js está incluido, sin CDN. No hay analítica ni servicios de subida. La primera carga y las actualizaciones descargan archivos públicos del alojamiento. Las búsquedas externas solo se abren cuando pulsas su enlace, y envían la consulta al buscador.

Aplicación de ayuda no oficial. Consulta el original en caso de duda; las explicaciones no sustituyen el reglamento ni las aclaraciones oficiales.
