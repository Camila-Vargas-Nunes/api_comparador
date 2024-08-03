<template>
    <div>
      <div v-for="resultado in resultados" :key="resultado.id">
        <h2>{{ resultado.instituicao }}</h2>
        <p>Valor solicitado: {{ resultado.valorSolicitado }}</p>
        <p><strong>Quantidade de parcelas x Valor: {{ resultado.parcelas }} x {{ resultado.valorParcela }}</strong></p>
        <p>Taxa de juros ao mês: {{ resultado.taxaJuros }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['resultados']
  };
  </script>
  
  <style scoped>
  /* Adicione os estilos desejados aqui */
  </style>