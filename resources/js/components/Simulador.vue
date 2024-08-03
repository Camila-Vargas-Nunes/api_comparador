<template>
    <div>
      <h2 v-if="isNewProduct">Adicionar Produto</h2>
      <h2 v-else>Editar Produto</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="loan-amount" class="form-label">Valor do Empréstimo:</label>
          <input class="form-control" type="text" id="loan-amount" v-model="product.loanAmount" @input="formatCurrency" required />
        </div>
        <div class="mb-3">
          <label for="institution" class="form-label">Instituição:</label>
          <select class="form-control" id="institution" v-model="product.institution" multiple>
            <option v-for="institution in institutions" :key="institution.valor" :value="institution.chave">
              {{ institution.chave }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="agreement" class="form-label">Convênio:</label>
          <select class="form-control" id="agreement" v-model="product.agreement" multiple>
            <option v-for="agreement in agreements" :key="agreement.valor" :value="agreement.chave">
              {{ agreement.chave }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="installments" class="form-label">Parcelas:</label>
          <select class="form-control" id="installments" v-model="product.installments">
            <option value="36">36</option>
            <option value="48">48</option>
            <option value="60">60</option>
            <option value="72">72</option>
            <option value="84">84</option>
          </select>
        </div>
        <button type="submit" v-if="isNewProduct" class="btn btn-primary">Adicionar</button>
        <button type="submit" v-else class="btn btn-primary">Salvar</button>
      </form>
  
      <div v-if="Object.keys(simulationResults).length">
        <h3>Resultados da Simulação:</h3>
        <div v-for="(results, institution) in simulationResults" :key="institution">
          <h4>{{ institution }}</h4>
          <table class="table">
            <thead>
              <tr>
                <th>Taxa</th>
                <th>Parcelas</th>
                <th>Valor da Parcela</th>
                <th>Convênio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in results" :key="result.parcelas + result.convenio">
                <td>{{ result.taxa }}%</td>
                <td>{{ result.parcelas }}</td>
                <td>{{ (result.valor_parcela / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
                <td>{{ result.convenio }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        product: {
          loanAmount: '',
          institution: [],
          agreement: [],
          installments: ''
        },
        institutions: [],
        agreements: [],
        simulationResults: []
      };
    },
    computed: {
      isNewProduct() {
        return !this.$route.path.includes('edit');
      }
    },
    async created() {
      await this.fetchInstitutions();
      await this.fetchAgreements();
      if (!this.isNewProduct) {
        const response = await axios.get(`/api/products/${this.$route.params.id}`);
        this.product = response.data;
      }
    },
    methods: {
      async fetchInstitutions() {
        try {
          const response = await axios.get('/api/instituicao');
          this.institutions = response.data;
        } catch (error) {
          console.error('Erro ao buscar instituições:', error);
        }
      },
      async fetchAgreements() {
        try {
          const response = await axios.get('/api/convenio');
          this.agreements = response.data;
        } catch (error) {
          console.error('Erro ao buscar convênios:', error);
        }
      },
      async submitForm() {
        try {
          const requestData = {
            valor_emprestimo: this.product.loanAmount.replace(/\D/g, ''),
            instituicoes: this.product.institution,
            convenios: this.product.agreement,
            parcela: this.product.installments
          };
          const response = await axios.post('/api/simular', requestData);
          this.simulationResults = response.data;
        } catch (error) {
          console.error('Erro ao enviar dados para simulação:', error);
        }
      },
      formatCurrency(event) {
        let value = event.target.value.replace(/\D/g, '');
        value = (Number(value) / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
        event.target.value = value;
      }
    }
  };
  </script>
  
  <style>
  .result-block {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
  }
  
  .result-block strong {
    color: #007bff;
  }
  </style>
  