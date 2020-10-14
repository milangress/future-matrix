<template lang="pug">
  .home
    a-scene
      horizontal-axis(leftTxt="Nature over Human" rightTxt="Human over Nature")
      horizontal-axis(rotation="0 90 0" leftTxt="Offen" rightTxt="Geschlossen")
      a-entity(rotation='0 90 90')
        a-box(position='0 0 0' rotation='0 90 0' depth="20" height="0.1" width="0.1" color='#9E4CD9')
        a-entity(position="11 0 0" rotation='-45 0 -90' text="anchor: center; align: center; width: 10; side: double; wrapCount: 20; color: black; value: Touching;")
        a-entity(position="-11 0 0" rotation='-45 0 -90' text="anchor: center; align: center; width: 10; side: double; wrapCount: 20; color: black; value: Swiping;")
      a-sky(color='#ECECEC')
      a-entity(camera="fov: 30" look-controls orbit-controls="target: 0 0 0; minDistance: 0.5; maxDistance: 180; initialPosition: 30 15 45")
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HorizontalAxis from '@/components/HorizontalAxis'

export default {
  name: 'Home',
  components: {
    HorizontalAxis
  }
}
</script>
