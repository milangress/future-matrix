/*jshint -W109 */
<template lang="pug">
  .home
    .aframe-matrix
      a-scene(embedded vr-mode-ui="enabled: false")
        a-assets
          a-mixin(id="SpaceBox"
            material="shader: flat; side: double; depthTest: false; color: white; transparent: true; opacity: 0.03"
            animation__mouseenter="property: components.material.material.color; type: color; to: black; startEvents: mouseenter; dur: 200"
            animation__mouseleave="property: components.material.material.color; type: color; to: white; startEvents: mouseleave; dur: 200")
        horizontal-axis(leftTxt="Nature over Human" rightTxt="Human over Nature")
        horizontal-axis(rotation="0 90 0" leftTxt="Offen" rightTxt="Geschlossen")
        vertical-axis(leftTxt="Touching" rightTxt="Swiping")
        SpaceBoxes
        // a-sky(color='#ECECEC')
        a-sphere#point(v-on:click="newRandomPoint" position="0 0 0" color="yellow" radius="0.5")
        a-entity(camera="fov: 30" look-controls orbit-controls="target: 0 0 0; minDistance: 0.5; maxDistance: 180; initialPosition: 30 15 45")
        a-entity(cursor='rayOrigin: mouse')
    .interface
      div.newPoint.btn(v-on:click="newRandomPoint")
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HorizontalAxis from '@/components/HorizontalAxis'
import VerticalAxis from '@/components/VerticalAxis'
import SpaceBoxes from '@/components/SpaceBoxes'

export default {
  name: 'Home',
  components: {
    HorizontalAxis,
    VerticalAxis,
    SpaceBoxes
  },
  data () {
    return {
      worldRotation: 0
    }
  },
  methods: {
    newRandomPoint: function (event) {
      console.log(event.target)
      const point = document.querySelector('#point')
      const randomPoint = `${Math.random() * 20 - 10} ${Math.random() * 20 - 10} ${Math.random() * 20 - 10}`
      point.setAttribute('animation', `property: position; to: ${randomPoint}; dur: 500; easing: easeInOutQuad; loop: false`)
      // point.setAttribute('position', `${Math.random() * 20 - 10} ${Math.random() * 20 - 10} ${Math.random() * 20 - 10}`)
    }
  }
}
</script>

<style lang="stylus">
.aframe-matrix
  width: 100vw
  height: 100vh
.interface
  top 0px
  margin 1rem
  position fixed
  z-index 1000000
.btn
  cursor pointer
.newPoint
  width 4rem
  height 10rem
  border-radius 1rem
  background linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(0,212,255,0) 100%)
</style>
