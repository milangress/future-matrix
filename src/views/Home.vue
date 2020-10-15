/*jshint -W109 */
<template lang="pug">
  .home
    .aframe-matrix
      a-scene(embedded vr-mode-ui="enabled: false")
        a-assets
          a-mixin(id="SpaceBox"
            material="shader: flat; side: double; depthTest: false; color: #726042; transparent: true; opacity: 0.03"
            animation__mouseenter="property: components.material.material.color; type: color; to: white; startEvents: mouseenter; dur: 200"
            animation__mouseleave="property: components.material.material.color; type: color; to: #726042; startEvents: mouseleave; dur: 200")
        horizontal-axis(leftTxt="Natur über Mensch" rightTxt="Mensch über Natur")
        horizontal-axis(rotation="0 90 0" leftTxt="Offen" rightTxt="Geschlossen")
        vertical-axis(leftTxt="Touching" rightTxt="Swiping")
        SpaceBoxes
        a-sky(color='#726042')
        a-sphere#point(v-on:click="newRandomPoint" position="0 0 0" color="yellow" radius="0.5")
        a-entity(camera="fov: 30" look-controls orbit-controls="target: 0 0 0; minDistance: 0.5; maxDistance: 180; initialPosition: 30 15 45: dampingFactor: 0.3")
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
  width 100%
  height 100%
  position fixed
  z-index 1000
  display grid
  grid-template-columns: 2rem repeat(18, 1fr) 2rem
  grid-template-rows: 2rem repeat(10, 1fr) 2rem
  pointer-events none
.btn
  cursor pointer
  pointer-events all
.newPoint
  grid-column: 2 / span 1
  grid-row: 2 / 5
  border-radius 1rem
  background linear-gradient(90deg, #ad6bd0 0%, rgba(0,212,255,0) 100%)
</style>
