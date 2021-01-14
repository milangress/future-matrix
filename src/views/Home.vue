/*jshint -W109 */
<template lang="pug">
  .home
    .aframe-matrix
      a-scene(embedded vr-mode-ui="enabled: false")
        a-assets
          a-asset-item(id="helixA" src="/helix-simplified-A.glb")
          a-asset-item(id="helixB" src="/helix-simplified-B.glb")
          img(id="SpaceBoxTextur" src="/SpaceBoxTextur.png")
          // a-mixin(id="SpaceBox"
            material="shader: flat; side: double; depthTest: false; color: #000; transparent: true; opacity: 0.03"
            animation__mouseenter="property: components.material.material.color; type: color; to: white; startEvents: mouseenter; dur: 200"
            animation__mouseleave="property: components.material.material.color; type: color; to: #000; startEvents: mouseleave; dur: 200"
            aabb-collider="objects: #point;")
          a-mixin(id="SpaceBox"
            material="shader: flat; side: double; depthTest: false; color: #000; transparent: true; opacity: 0"
            aabb-collider="objects: #point;")
        a-entity#mainAxis(animation="startEvents: startRotating; easing:easeOutElastic; property:rotation; from:0 0 0; to:0 1080 0; dur: 1700; loop:false")
          horizontal-axis(:leftTxt="xAxis[0]" :rightTxt="xAxis[1]" :barColor="barColor")
          horizontal-axis(rotation="0 90 0" :leftTxt="yAxis[0]" :rightTxt="yAxis[1]" :barColor="barColor")
          vertical-axis(:leftTxt="zAxis[0]" :rightTxt="zAxis[1]" :barColor="barColor")
          SpaceBoxes
          a-sky(color='#000' animation="startEvents: changeSky; property: color; from: #ffffff; to: #000; dir:alternate;")
          a-entity#point(:position="animatedPointPositionString" data-aabb-collider-dynamic="true" aabb-collider="objects: .spaceBox;")
            a-entity(light="color: blue; intensity: 2.8; type: point; distance: 40; decay: 5" position="0 0 0")
            a-sphere(v-on:click="newRandomPoint" position="0 0 0" color="blue" radius="0.3")
          a-entity(v-if="helixIsVisible") <!--animation="easing:linear; property:rotation; from:0 0 0; to:0 360 0; dur: 17000; loop:true"-->
            a-gltf-model(:visible="helixIsVisible" src="#helixA")
            a-gltf-model(:visible="helixIsVisible" src="#helixB")
        a-entity(light="type: ambient; color: #BBB")
        a-entity(light="type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1")
        a-entity(camera="fov: 30" look-controls orbit-controls="target: 0 0 0; minDistance: 0.5; maxDistance: 180; initialPosition: 30 15 45: dampingFactor: 0.3")
        a-entity(cursor='rayOrigin: mouse' raycaster="objects: .clickable")
    .interface
      div.newPoint.btn(v-on:click="newRandomPoint") ① [1] Zufälliger Punkt
      div.newWords.btn(v-on:click="startNewWordPairs") Zufällige Achsen
      div.hideHelix.btn(v-on:click="toggleHelixVisibility")
      div.btn.openQuestionWindow(v-on:click="toggleQuestionWindowIsVisible" v-bind:class="{hidden: !questionWindowIsVisible}") ②
      div.wrapperChangePointQuestions(v-bind:class="{hidden: questionWindowIsVisible}")
        div.btn.closeWindow(v-on:click="toggleQuestionWindowIsVisible")
          img(src="/CloseWindow-X.svg" alt="hide Window" width="20px")
        p [2] Du Kannst auch selber bestimmen welchen Punkt du untersuchen möchtest:
        div.changePoint
          .sliderWrapper
            span {{xAxis[1]}}
            input.slider(type="range" min="-9" max="9" v-model="pointPosition.x")
            span {{xAxis[0]}}
          .sliderWrapper
            span {{yAxis[0]}}
            input(type="range" min="-9" max="9" v-model="pointPosition.z")
            span {{yAxis[1]}}
          .sliderWrapper
            span {{zAxis[1]}}
            input(type="range" min="-9" max="9" v-model="pointPosition.y")
            span {{zAxis[0]}}
        p [3] Anschließend kannst du die Fragen und Aufgaben zum Brainstoming benutzen und dir gedanken zu deinem Szenario machen:
        p.questions {{questions[0]}}
        div.btn.nextQuestionBtn(v-on:click="newQuestion") Nächste Frage…
</template>

// TODO Font
// TODO Buttons beschriften
// TODO Reset Point Button

<script>
// @ is an alias to /src
import HorizontalAxis from '@/components/HorizontalAxis'
import VerticalAxis from '@/components/VerticalAxis'
import SpaceBoxes from '@/components/SpaceBoxes'
import gsap from 'gsap'

const sheetURL = 'https://spreadsheets.google.com/feeds/cells/1LwSUWGNRwzb_5nKIQfBJTAt8Jq5C99Pu9bJSuWjdxio/1/public/full?alt=json'
const sheetURLQuestions = 'https://spreadsheets.google.com/feeds/cells/1LwSUWGNRwzb_5nKIQfBJTAt8Jq5C99Pu9bJSuWjdxio/2/public/full?alt=json'

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
      yAxis: ['Transparenz', 'Opazität'],
      zAxis: ['Berührung', 'Virtualität'],
      allWordPairs: Array,
      barColor: '#fea421', // Old Bar: '#ad6bd0' old Sky: #726042
      helixIsVisible: false,
      questionWindowIsVisible: false,
      questions: [],
      pointPosition: {
        x: 0,
        y: 0,
        z: 0
      },
      tweenedPointPosition: { x: 0, y: 0, z: 0 }
    }
  },
  mounted () {
    this.loadSheet()
    this.loadSheetQuestions()
  },
  methods: {
    newRandomPoint: function (event) {
      // const point = document.querySelector('#point')
      // const randomPoint = `${Math.random() * 18 - 9} ${Math.random() * 18 - 9} ${Math.random() * 18 - 9}`
      // point.setAttribute('animation', `property: position; to: ${randomPoint}; dur: 500; easing: easeInOutQuad; loop: false`)
      // point.setAttribute('position', `${Math.random() * 20 - 10} ${Math.random() * 20 - 10} ${Math.random() * 20 - 10}`)
      this.pointPosition = {
        x: Math.random() * 18 - 9,
        y: Math.random() * 18 - 9,
        z: Math.random() * 18 - 9
      }
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
    },
    loadSheetQuestions: async function () {
      const sheetData = await fetch(sheetURLQuestions).then(response => response.json())
      const entries = sheetData.feed.entry
      const questions = entries.filter(entry => entry.gs$cell.col === '1').map(entry => entry.content.$t)
      this.questions = this.shuffleArray(questions)
    },
    newQuestion: function () {
      const newQuestion = this.shuffleArray(this.questions)
      console.log('newQuestion')
      this.$set(this, 'questions', newQuestion)
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
    toggleHelixVisibility: function () {
      this.helixIsVisible = !this.helixIsVisible
    },
    toggleQuestionWindowIsVisible: function () {
      this.questionWindowIsVisible = !this.questionWindowIsVisible
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
  },
  computed: {
    animatedPointPosition: function () {
      return {
        x: this.tweenedPointPosition.x.toFixed(2),
        y: this.tweenedPointPosition.y.toFixed(2),
        z: this.tweenedPointPosition.z.toFixed(2)
      }
    },
    animatedPointPositionString: function () {
      return `${this.animatedPointPosition.x} ${this.animatedPointPosition.y} ${this.animatedPointPosition.z}`
    }
  },
  watch: {
    pointPosition: {
      handler (newValue) {
        console.log(newValue)
        console.log(this.$data.tweenedPointPosition)
        gsap.to(this.$data.tweenedPointPosition, {
          duration: 0.5,
          x: newValue.x,
          y: newValue.y,
          z: newValue.z
        })
      },
      deep: true
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
  grid-template-rows: 2rem repeat(10, minmax(0, 1fr)) 2rem
  //grid-auto-rows: fit-content(1em)
  pointer-events none
.wrapperChangePointQuestions
  grid-column 2 / span 8
  grid-row span 6 / -2
  background rgba(255,255,255, 0.01);
  backdrop-filter blur(10px)
  border solid 2px transparent
  background-clip padding-box
  box-shadow 10px 10px 10px  rgba(255, 255, 255, 0.03)
  border-radius 1rem
  padding 1rem
  overflow scroll
  pointer-events all
  cursor default
.wrapperChangePointQuestions.hidden
  display none
.closeWindow
  float right
.sliderWrapper
  display flex
  align-items: center
  justify-content: center
.changePoint input
  width 50%
.changePoint span
  padding 0 1rem
  width 25%
  font-size 0.8em
.changePoint span:first-of-type
  text-align right
.btn
  cursor pointer
  pointer-events all
  padding 0.5rem
.newPoint
  grid-column: 2 / span 1
  grid-row: 2 / 5
  border-radius 1rem
  background linear-gradient(-90deg, #ad6bd0 0%, rgba(0,0,0,0) 100%)
  writing-mode: vertical-lr
  transform: rotate(180deg)
  display: flex
  justify-content: center
  align-items: center
.newWords
  grid-column: -3 / span 1
  grid-row: -2 / -4
  border-radius 1rem
  background linear-gradient(-90deg, #ad6bd0 0%, rgba(0,0,0,0) 100%)
  writing-mode: vertical-lr
  display: flex
  justify-content: center
  align-items: center
  color: white
.hideHelix
  grid-column: -3 / span 1
  grid-row: 2 / 2
  border-radius 1rem
  background linear-gradient(-90deg, #ad6bd0 0%, rgba(0,0,0,0) 100%)
.openQuestionWindow
  grid-column 2 / span 1
  grid-row span 1 / -2
  border-radius 1rem
  background linear-gradient(-90deg, #ad6bd0 0%, rgba(0,0,0,0) 100%)
  display: flex
  justify-content: center
  align-items: center
.openQuestionWindow.hidden
  display none
.questions
  font-size 1.3em
.nextQuestionBtn
  background linear-gradient(0deg, #ad6bd0 0%, rgba(0,0,0,0) 100%)
  display inline-block
  border-radius 1rem
/*.changePoint
  grid-column: 2 / span 3
  grid-row: -4 / -5
  //background linear-gradient(0deg, #ad6bd0 0%, rgba(0,0,0,0) 100%)
  border-radius 1rem*/
</style>
