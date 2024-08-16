# Link de NPMJS
https://www.npmjs.com/package/component-01-gjarias

# Stencil Component Starter

## Componente UserTable

### Descripción
El componente `UserTable` es un componente web desarrollado con Stencil que permite mostrar una lista de usuarios en una tabla, con funcionalidad de búsqueda y ordenamiento. Este componente es altamente reutilizable y está diseñado para trabajar con datos provenientes de una API.

### Propiedades
- **apiUrl (Prop):** Esta propiedad recibe la URL de la API desde la cual se obtendrán los datos de los usuarios.

### Estado
- **users (State):** Estado que almacena la lista de usuarios obtenidos de la API.
- **error (State):** Estado que almacena un mensaje de error en caso de que falle la solicitud a la API.
- **loading (State):** Estado que indica si los datos están en proceso de carga.
- **searchTerm (State):** Estado que almacena el término de búsqueda ingresado por el usuario.
- **sortField (State):** Estado que almacena el campo por el cual se está ordenando la tabla.
- **sortOrder (State):** Estado que almacena el orden de clasificación (ascendente o descendente).

### Ciclo de Vida
- **componentWillLoad:** Método del ciclo de vida que se ejecuta antes de que el componente se renderice, utilizado para iniciar la carga de datos desde la API.

### Métodos
- **fetchData:** Método asíncrono que realiza la solicitud a la API y maneja los datos o errores resultantes.
- **handleSearch:** Método que actualiza el término de búsqueda basado en el input del usuario.
- **handleSort:** Método que maneja la ordenación de los datos al hacer clic en los encabezados de la tabla.

### Renderizado
El componente renderiza una interfaz que incluye:
- Un mensaje de carga mientras los datos se están obteniendo.
- Un mensaje de error si ocurre algún problema en la carga de los datos, con un botón para reintentar.
- Un campo de búsqueda para filtrar usuarios por nombre o correo.
- Una tabla que muestra los usuarios con funcionalidades de ordenación por ID, nombre, nombre de usuario, correo electrónico y teléfono.

### Estilos
Los estilos personalizados para este componente se encuentran en el archivo `user-table.css`, que se aplica al componente mediante el Shadow DOM para evitar conflictos de estilos con otros elementos de la página.
