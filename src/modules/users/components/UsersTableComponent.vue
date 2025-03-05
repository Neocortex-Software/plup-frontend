<template>
  <q-table flat bordered ref="tableRef" title="Users" :rows="userStore.users" :columns="columns" row-key="id"
    v-model:pagination="pagination" :loading="userStore.loading" :filter="filter" binary-state-sort
    @request="onRequest">
    <template v-slot:top-left>
      <q-btn unelevated color="primary" label="Add user" @click="openCreateUserModal()" />
    </template>
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useUserStore } from 'src/modules/users/stores/user-store';
import { Dialog } from 'quasar';
import CreateUserModalComponent from './CreateUserModalComponent.vue';

const userStore = useUserStore();
const filter = ref('');
const pagination = ref({
  sortBy: 'firstName', // Coincide con orderBy
  descending: false, // Se convierte a 'asc' o 'desc'
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0, // Se actualizará con el total del backend
});

const columns = [
  { name: 'firstName', label: 'First Name', field: 'firstName', align: 'left', sortable: true },
  { name: 'lastName', label: 'Last Name', field: 'lastName', align: 'left', sortable: true },
  { name: 'email', label: 'Email', field: 'email', align: 'left', sortable: true },
  {
    name: 'role', label: 'Role', field: row => row.role?.name || 'N/A', align: 'left', sortable: false
  },
];

function openCreateUserModal() {
  Dialog.create({
    component: CreateUserModalComponent,
  }).onOk(async () => {
    console.log('OK');
    await onRequest({ pagination: pagination.value });
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}

async function onRequest(props) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  pagination.value = props.pagination;

  // Convertir `descending` boolean a 'asc' | 'desc'
  const order = descending ? 'desc' : 'asc';

  await userStore.getUsers(page, rowsPerPage, sortBy, order, filter.value);
  pagination.value.rowsNumber = userStore.totalUsers; // Usamos el total del backend
}

// Observa cambios en el filtro y actualiza los datos
watch(filter, () => {
  pagination.value.page = 1; // Resetear a la primera página al filtrar
  onRequest({ pagination: pagination.value });
});

// Cargar datos al montar el componente
onMounted(() => {
  onRequest({ pagination: pagination.value });
});
</script>
