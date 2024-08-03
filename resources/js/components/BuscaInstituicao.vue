<template>
    <div>
      <label for="BuscaInstituicao">Instituição</label>
      <select v-model="selecionaInstituicao" multiple>
        <option v-for="inst in BuscaInstituicao" :key="inst.id" :value="inst.id">{{ inst.name }}</option>
      </select>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selecionaInstituicoes: [],
        BuscaInstituicao: []
    };
  },
  mounted() {
    axios.get('/api/instituicao')
      .then(response => {
        this.BuscaInstituicao= response.data;
      })
      .catch(error => {
        console.error("Erro ao buscar as instituições!", error);
      });
  },
  watch: {
    selecionaInstituicoes(val) {
      this.$emit('input', val);
    }
  }
};
</script>
  
  <style scoped>
  /* Adicione os estilos desejados aqui */
  </style>
  