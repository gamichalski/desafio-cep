<template>
  <div class="row justify-content-center">
    <div
      class="col-12 d-flex flex-column justify-content-center align-items-center"
    >
      <div class="w-100 overflow-auto">
        <table v-if="historyCep != 0" class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th>Estado</th>
              <th>Cidade</th>
              <th>Bairro</th>
              <th>Rua</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(place, idx) in historyCep" :key="idx">
              <td>{{ place.uf }}</td>
              <td>{{ place.cidade }}</td>
              <td>{{ place.bairro }}</td>
              <td>{{ place.logradouro }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    historyCep: Array
  }
};
</script>

<style></style>
