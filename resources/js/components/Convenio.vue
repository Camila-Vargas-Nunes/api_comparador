<template>
    <div>
      <label for="convenio">Convênio</label>
      <select v-model="selecionaConvenios" multiple>
        <option v-for="agr in convenios" :key="agr.id" :value="agr.id">{{ agr.name }}</option>
      </select>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selecionaConvenios: [],
        convenios: []
    };
  },
  mounted() {
    axios.get('/api/convenio')
      .then(response => {
        this.convenios = response.data;
      })
      .catch(error => {
        console.error("Erro ao buscar os convênios!", error);
      });
  },
  watch: {
    selecionaConvenios(val) {
      this.$emit('input', val);
    }
  }
};
</script>
  
  <style scoped>
  /* Adicione os estilos desejados aqui */
  </style>
  