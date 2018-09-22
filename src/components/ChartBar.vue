<template>
    <div v-if="series.length > 0 && categories.length > 0">
      <h3>{{title}}</h3>
      <apex-charts height="650" :type="type" :options="options" :series="series"/>
  </div>
</template>

<script>
  import ApexCharts from 'vue-apexcharts';

  export default {
    name: "ChartBar",
    props: ['title', 'type', 'categories', 'series'],
    watch: {
      categories: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          console.log(newVal);
          this.options = {
            plotOptions: {
              bar: {
                distributed: true
              }
            },
            xaxis: {
              categories: newVal
            },
          };
        }
      }
    },
    data() {
      return {
        options: {
          plotOptions: {
            bar: {
              distributed: true
            }
          },
          xaxis: {
            categories: this.categories
          },
        }
      }
    },
    components: {
      ApexCharts
    }
  }
</script>
