<template>
  <div class="logo-container">
    <div v-if="!loading">
      <img src="~assets/logo.gif">
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: true,
  }),
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>

<style>
.logo-container {
  display: inline-block;
  position: relative;
  overflow: hidden;
  height: 345px;
  width: 345px;
}

.logo-container img {
  width: 100%;
  height: 100%;

}
</style>
