<template>
  <div>
    <div>
      <SelectNetwork />
    </div>
    <hr>
    <div>

    </div>
  
  </div>
  
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SelectNetwork from '@/components/SelectNetwork.vue'; // @ is an alias to /src

  @Component({
    components: {
      SelectNetwork,
    },
  })
  export default class Home extends Vue {}
</script>
