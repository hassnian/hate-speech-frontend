<template>
    <form>
        <div class="row">
            <div class="col">
                <b-form-group
                id="input-1"
                label-for="input-1"
                >
                    <h4>Escribe el mensaje aquí y descubre que grado de Hater eres!</h4>
                        <b-form-input id="input-1" v-model="name" label="Escribe aquí el mensaje" trim></b-form-input>
                </b-form-group>
                
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Submit extends Vue {
  
}
</script>


<style>

</style>