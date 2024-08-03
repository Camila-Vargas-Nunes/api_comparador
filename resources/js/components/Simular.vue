<template>
    <div>
      <form @submit.prevent="formularioEnviado">
        <ValorDoEmprestimo v-model="valorEmprestimo" />
        <Instituicao v-model="instituicoes" />
        <Convenio v-model="convenios" />
        <Parcelas v-model="parcelas" />
        <button type="submit">Simular</button>
      </form>
    </div>
  </template>
  
  <script>
  import ValorEmprestimo from './ValorEmprestimo.vue';
  import Instituicao from './ Instituicao.vue';
  import Convenio from './Convenio.vue';
  import Parcelas from './Parcelas.vue';
  import axios from 'axios';
  
  export default {
    components: {
      ValorEmprestimo,
      Instituicao,
      Convenio,
      Parcelas
    },
    data() {
      return {
        valorEmprestimo: '',
        instituicoes: [],
        convenios: [],
        parcelas: ''
      };
    },
    methods: {
      formularioEnviado() {
        const payload = {
          valorEmprestimo: this.valorEmprestimo,
          instituicoes: this.instituicoes,
          convenios: this.convenios,
          parcelass: this.parcelas
        };
  
        axios.post('/api/simular', payload)
          .then(response => {
            this.$emit('simulation-results', response.data);
          })
          .catch(error => {
            console.error("Erro na simulação!", error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Adicione os estilos desejados aqui */
  </style>
  
