<template>
    <div>
      <label for="parcelas">Parcelas</label>
      <select v-model="selecionaParcelas">
        <option v-for="opcao in opcoesParcelamento" :key="opcao">{{ opcao }}</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selecionaParcelas: '',
        opcoesParcelamento: [36, 48, 60, 72, 84]
    };
  },
  watch: {
    selecionaParcelas(val) {
      this.$emit('input', val);
    }
  }
};
</script>
  <style scoped>
  /* Adicione os estilos desejados aqui */
  </style>
  