<template>
  <div>
    <nuxt-link class="waves-effect waves-light btn" to="/">here</nuxt-link>
    Welcome to About!
    <MarkDown />
  </div>
</template>
<script>
import MarkDown from '~/markdown/test.md';

export default {
  components: {
    MarkDown,
  },
};
</script>
