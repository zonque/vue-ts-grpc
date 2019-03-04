<template>
  <button class="btn btn-danger" type="button">Reboot</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { grpc } from '@improbable-eng/grpc-web';
import { Webtest } from '../grpc/webtest_pb_service';
import { Empty, StreamData } from '../grpc/webtest_pb';

@Component

export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  constructor() {
    super();
    console.log('constructor');

    const client = grpc.client(Webtest.ReadData, {
      host: 'http://localhost:8000',
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
