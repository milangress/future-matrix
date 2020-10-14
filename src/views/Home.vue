<template lang="pug">
  .home
    a-scene
      a-entity(rotation='0 0 0')
        a-box(position='0 0 0' depth="20" height="0.1" width="0.1" color='#9e4cd9')
        a-entity(position="11 0 0" text="anchor: left; align: left; width: 10; side: double; wrapCount: 20; color: black; value: Nature over Human;")
        a-entity(position="-11 0 0" text="anchor: right; align: right; width: 10; side: double; wrapCount: 20; color: black; value: Human over Nature;")
      a-entity(rotation='0 90 0')
        a-box(position='0 0 0' depth="20" height="0.1" width="0.1" color='#9E4CD9')
        a-entity(position="11 0 0" text="anchor: left; align: left; width: 10; side: double; wrapCount: 20; color: black; value: Offen;")
        a-entity(position="-11 0 0" text="anchor: right; align: right; width: 10; side: double; wrapCount: 20; color: black; value: Geschlossen;")
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

export default {
  name: 'Home',
  components: {
  }
}
</script>
