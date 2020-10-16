/*jshint -W109 */
<template lang="pug">
  .home
    .aframe-matrix
      a-scene(embedded vr-mode-ui="enabled: false")
        a-assets
          a-mixin(id="SpaceBox"
            material="shader: flat; side: double; depthTest: false; color: #726042; transparent: true; opacity: 0.03"
            animation__mouseenter="property: components.material.material.color; type: color; to: white; startEvents: mouseenter; dur: 200"
            animation__mouseleave="property: components.material.material.color; type: color; to: #000; startEvents: mouseleave; dur: 200"
            aabb-collider="objects: #point;")
        a-entity#mainAxis(animation="startEvents: startRotating; easing:easeOutElastic; property:rotation; from:0 0 0; to:0 1080 0; dur: 1700; loop:false")
          horizontal-axis(:leftTxt="xAxis[0]" :rightTxt="xAxis[1]" :barColor="barColor")
          horizontal-axis(rotation="0 90 0" :leftTxt="yAxis[0]" :rightTxt="yAxis[1]" :barColor="barColor")
          vertical-axis(:leftTxt="zAxis[0]" :rightTxt="zAxis[1]" :barColor="barColor")
          SpaceBoxes
          a-sky(color='#000' animation="startEvents: changeSky; property: color; from: #ffffff; to: #000; dir:alternate;")
          a-entity#point(data-aabb-collider-dynamic="true" aabb-collider="objects: .spaceBox;")
            a-entity(light="color: #blue; intensity: 2.8; type: point; distance: 40; decay: 5" position="0 0 0")
            a-sphere(v-on:click="newRandomPoint" position="0 0 0" color="blue" radius="0.3")
        a-entity(light="type: ambient; color: #BBB")
        a-entity(light="type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1")
        a-entity(camera="fov: 30" look-controls orbit-controls="target: 0 0 0; minDistance: 0.5; maxDistance: 180; initialPosition: 30 15 45: dampingFactor: 0.3")
        a-entity(cursor='rayOrigin: mouse')
    .interface
      div.newPoint.btn(v-on:click="newRandomPoint")
      div.newWords.btn(v-on:click="startNewWordPairs")
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Vue from 'vue'
import HorizontalAxis from '@/components/HorizontalAxis'
import VerticalAxis from '@/components/VerticalAxis'
import SpaceBoxes from '@/components/SpaceBoxes'

const sheetURL = 'https://spreadsheets.google.com/feeds/cells/1LwSUWGNRwzb_5nKIQfBJTAt8Jq5C99Pu9bJSuWjdxio/1/public/full?alt=json'

export default {
  name: 'Home',
  components: {
    HorizontalAxis,
    VerticalAxis,
    SpaceBoxes
  },
  data () {
    return {
      xAxis: ['Natur über Mensch', 'Mensch über Natur'],
      yAxis: ['Offen', 'Geschlossen'],
      zAxis: ['Touching', 'Swiping'],
      allWordPairs: Array,
      barColor: '#fea421' // Old Bar: '#ad6bd0' old Sky: #726042
    }
  },
  mounted () {
    this.loadSheet()
  },
  methods: {
    newRandomPoint: function (event) {
      console.log(event.target)
      const point = document.querySelector('#point')
      const randomPoint = `${Math.random() * 18 - 9} ${Math.random() * 18 - 9} ${Math.random() * 18 - 9}`
      point.setAttribute('animation', `property: position; to: ${randomPoint}; dur: 500; easing: easeInOutQuad; loop: false`)
      // point.setAttribute('position', `${Math.random() * 20 - 10} ${Math.random() * 20 - 10} ${Math.random() * 20 - 10}`)
    },
    loadSheet: async function () {
      const sheetData = await fetch(sheetURL).then(response => response.json())
      const entries = sheetData.feed.entry.filter(entry => entry.gs$cell.row !== '1')
      const AlphaSide = entries.filter(entry => entry.gs$cell.col === '1').map(entry => entry.content.$t)
      const OmegaSide = entries.filter(entry => entry.gs$cell.col === '2').map(entry => entry.content.$t)
      const bothSidesMerged = AlphaSide.map((entry, index) => {
        return [entry, OmegaSide[index]]
      })
      this.allWordPairs = this.shuffleArray(bothSidesMerged)
      console.log(entries)
      console.log(bothSidesMerged)
    },
    startNewWordPairs: function () {
      const that = this
      const originalBarColor = this.barColor
      const mainAxis = document.querySelector('#mainAxis')
      const sky = document.querySelector('a-sky')
      mainAxis.emit('startRotating')
      sky.emit('changeSky')
      const mainLoopId = setInterval(function () {
        // Do your update stuff...
        that.newWordPairs()
      }, 3)
      window.setTimeout(() => {
        clearInterval(mainLoopId)
        this.barColor = originalBarColor
      }, 1000)
    },
    newWordPairs: function () {
      const shuffledWordPairs = this.shuffleArray(this.allWordPairs)
      this.$set(this, 'xAxis', shuffledWordPairs[0])
      this.$set(this, 'yAxis', shuffledWordPairs[1])
      this.$set(this, 'zAxis', shuffledWordPairs[2])
      // this.$set(this, 'barColor', `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`)
      const randomColor = Math.floor(Math.random() * 16777215).toString(16)
      this.barColor = `#${randomColor}`
    },
    shuffleArray: function (arrParam) {
      const arr = arrParam.slice()
      let length = arr.length
      let temp
      let i
      while (length) {
        i = Math.floor(Math.random() * length--)
        temp = arr[length]
        arr[length] = arr[i]
        arr[i] = temp
      }
      return arr
    }
  }
}
</script>

<style lang="stylus">
.aframe-matrix
  width: 100vw
  height: 100vh
.interface
  top 0
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
.newWords
  grid-column: -3 / span 1
  grid-row: -2 / -4
  border-radius 1rem
  background linear-gradient(-90deg, #ad6bd0 0%, rgba(0,212,255,0) 100%)
</style>
