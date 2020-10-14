<template lang="pug">
  .home
    a-scene
      a-entity
        a-box(position='0 0 0' rotation='0 0 0' depth="20" height="0.1" width="0.1" color='#4CC3D9')
        a-entity(position="10 0 0" text="align: right; height: 20; value: Hello World;")
      a-box(position='0 0 0' rotation='0 90 0' depth="20" height="0.1" width="0.1" color='#4CC3D9')
      a-box(position='0 0 0' rotation='90 90 90' depth="20" height="0.1" width="0.1" color='#4CC3D9')
      a-sky(color='#ECECEC')
      a-entity(camera="fov: 30" look-controls orbit-controls="target: 0 0 0; minDistance: 0.5; maxDistance: 180; initialPosition: 15 15 35")
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
