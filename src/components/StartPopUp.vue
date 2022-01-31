<template lang="pug">
.startpopup
</template>

<script>
export default {
  name: 'StartPopUp'
}
</script>

<style scoped lang="stylus">
.startpopup
  width 100vw
  height 100vh
  position: fixed
  z-index: 100
  background url("/Startpopup.png")
  background-size: cover;
  animation: fade 8s linear;
  pointer-events: none;
  opacity: 0;

@keyframes fade {
  0% {
    opacity: 0
  }

  10% {
    opacity: 1
  }

  to {
    opacity: 0
  }
}
</style>
