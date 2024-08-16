import { Component, State, Prop, h } from '@stencil/core';

// Definición del componente web
@Component({
  tag: 'user-table',
  styleUrl: 'user-table.css',
  shadow: true,
})
export class UserTable {
  // Propiedad que recibe la URL de la API para obtener los usuarios
  @Prop() apiUrl: string = 'https://jsonplaceholder.typicode.com/users';

  // Estados del componente
  @State() users: any[] = [];  // Lista completa de usuarios
  @State() filteredUsers: any[] = [];  // Usuarios filtrados según la búsqueda
  @State() sortField: string = 'id';  // Campo por el que se ordenan los usuarios
  @State() sortOrder: string = 'asc';  // Orden de la clasificación: ascendente o descendente
  @State() loading: boolean = true;  // Estado de carga de datos
  @State() error: string = '';  // Mensaje de error en caso de fallo al cargar datos

  // Método llamado antes de que el componente se cargue
  componentWillLoad() {
    this.fetchData();  // Carga los datos de los usuarios desde la API
  }

  // Método para obtener los datos de la API
  async fetchData() {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      this.users = data;
      this.filteredUsers = [...this.users];
      this.loading = false;  // Finaliza el estado de carga
    } catch (error) {
      this.error = 'Error al cargar los datos';  // Manejo de errores
      this.loading = false;
    }
  }

  // Método para manejar la búsqueda de usuarios
  handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  }

  // Actualiza el campo por el cual se ordenarán los usuarios
  updateSortField(event) {
    this.sortField = event.target.value;
    this.sortUsers();  // Reordenar usuarios después de actualizar el campo
  }

  // Alterna entre orden ascendente y descendente
  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortUsers();  // Reordenar usuarios después de cambiar el orden
  }

  // Ordena los usuarios en función del campo y orden seleccionado
  sortUsers() {
    this.filteredUsers = [...this.filteredUsers].sort((a, b) => {
      const fieldA = a[this.sortField];
      const fieldB = b[this.sortField];

      // Detectar si el campo es numérico
      if (!isNaN(fieldA) && !isNaN(fieldB)) {
        return this.sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }

      // Comparación de cadenas de texto
      const compareA = fieldA.toString().toLowerCase();
      const compareB = fieldB.toString().toLowerCase();
      return this.sortOrder === 'asc'
        ? compareA.localeCompare(compareB)
        : compareB.localeCompare(compareA);
    });
  }

  // Desordena aleatoriamente los usuarios filtrados
  shuffleUsers() {
    this.filteredUsers = [...this.filteredUsers].sort(() => Math.random() - 0.5);
  }

  // Renderiza el componente web
  render() {
    return (
      <div>
        <header>
          <h1>Componente Web en Stencil</h1>
          <br />
          <p>Desarrolla tus habilidades en la creación de componentes Web utilizando Stencil.</p>
        </header>

        {this.loading ? (
          <p>Cargando...</p>  // Mensaje mostrado mientras se cargan los datos
        ) : this.error ? (
          <div>
            <p>{this.error}</p>
            <button onClick={() => this.fetchData()}>Reintentar</button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              onInput={(event) => this.handleSearch(event)}
            />

            <div class="sort-controls">
              <label htmlFor="sortField">Ordenar por:</label>
              <select id="sortField" onChange={(event) => this.updateSortField(event)}> 
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="username">Username</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
              <button onClick={() => this.toggleSortOrder()}>Cambiar Orden</button>
              <button onClick={() => this.shuffleUsers()}>Desordenar</button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {this.filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
