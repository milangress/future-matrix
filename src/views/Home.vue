/*jshint -W109 */
<template lang="pug">
.home
  StartPopUp
  .aframe-matrix
    a-scene(embedded vr-mode-ui="enabled: false" loading-screen="dotsColor: white; backgroundColor: white" background="transparent")
      a-assets
        //a-asset-item(id="helixA" src="/helix-simplified-A.glb")
        //a-asset-item(id="helixB" src="/helix-simplified-B.glb")
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
        horizontal-axis(:leftTxt="query.xAxis[0]" :rightTxt="query.xAxis[1]" :barColor="barColor" :activeAxis="activeAxis")
        horizontal-axis(rotation="0 90 0" :leftTxt="query.yAxis[0]" :rightTxt="query.yAxis[1]" :barColor="barColor" :activeAxis="activeAxis")
        vertical-axis(:leftTxt="query.zAxis[0]" :rightTxt="query.zAxis[1]" :barColor="barColor" :activeAxis="activeAxis")
        SpaceBoxes
        a-sky(color='#fff' animation="startEvents: changeSky; property: color; from: #000; to: #fff; dir:alternate;")
        a-entity#point(:position="animatedPointPositionString" data-aabb-collider-dynamic="true" aabb-collider="objects: .spaceBox;")
          a-entity(light="color: white; intensity: 2.8; type: point; distance: 40; decay: 5" position="0 0 0")
          a-sphere(v-on:click="newRandomPoint" position="0 0 0" color="blue" radius="0.3")
        a-entity(v-if="helixIsVisible") <!--animation="easing:linear; property:rotation; from:0 0 0; to:0 360 0; dur: 17000; loop:true"-->
          a-gltf-model(:visible="helixIsVisible" src="#helixA")
          a-gltf-model(:visible="helixIsVisible" src="#helixB")
      a-entity(light="type: ambient; color: #BBB")
      a-entity(light="type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1")
      a-entity(camera="fov: 30" look-controls orbit-controls="target: 0 0 0; minDistance: 0.5; maxDistance: 180; initialPosition: 25 15 40: dampingFactor: 0.3")
      a-entity(cursor='rayOrigin: mouse' raycaster="objects: .clickable")
  HeadlineWhatHow(
    :point-position="pointPosition"
    :x-axis="query.xAxis"
    :y-axis="query.yAxis"
    :z-axis="query.zAxis"
    )
  a.website(href="https://www.unreal.enterprises/") unreal.enterprises

  .interface
    //div.btn.newPoint
    //  div.newPointInner(v-on:click="newRandomPoint") 【1】 Zufälliger Punkt
    div.buttons-wrapper
      img.btn(src="/NEW_POINT.png" v-on:click="newRandomPoint")
      img.btn(src="/NEW-AXES.png" v-on:click="startNewWordPairs")
      //btn(v-on:click="startNewWordPairs") Zufällige Achsen
    //div.hideHelix.btn(v-on:click="toggleHelixVisibility")
    QuestionBox(:questions="questions")
    //div.btn.openQuestionWindow(v-on:click="toggleQuestionWindowIsVisible" :class="{hidden: !questionWindowIsNOTVisible}") ②
    div.wrapperChangePointQuestions(:class="{hidden: questionWindowIsNOTVisible}")
      div.btn.closeWindow(v-on:click="toggleQuestionWindowIsVisible")
        img(src="/CloseWindow-X.svg" alt="hide Window" height="20")
      p ② Du wachst auf – gestrandet in einer flimmernden Welt. Realitäten pulsieren ein und aus, überlagern sich, durchscheinend, weder überzeugend echt noch völlig virtuell. Um in diesem liminalen Raum zu überleben, besteht deine einzige Hoffnung darin, für dich selbst und für andere eine neue Bedeutung zu erschaffen. Wenn du in einem anderen Szenario aufwachen möchtest, kannst du hier den Punkt auch verschieben:
      div.changePoint
        custom-slider.slider(min="-9" max="9" step="1" v-model:value="pointPosition.x" :leftText="xAxis[1]" :rightText="xAxis[0]")
        custom-slider.slider(min="-9" max="9" step="1" v-model:value="pointPosition.z" :leftText="yAxis[0]" :rightText="yAxis[1]")
        custom-slider.slider(min="-9" max="9" step="1" v-model:value="pointPosition.y" :leftText="zAxis[1]" :rightText="zAxis[0]")
      p ③ Anschließend musst du dir deine eigene Bedeutung schaffen… Diese Fragen und Aufgaben können dir helfen dein Szenario besser zu verstehen:
      p.questions {{questions[0]}}
      div.btn.nextQuestionBtn(v-on:click="newQuestion") Nächste Frage…
      p ④ Wenn du nicht mehr weißt, wo du bist, kannst du auch die
        |
        |
        a(href='https://faas-machine.vercel.app/gen/1MuXLBM_WGHm9vS_jhAtDVKHGDK9FJ171fpkqwBXJIKU') FaaS-Maschine
        |
        | benutzen.
      p Aktuell sind {{numberOfPossibleMatrixes}} verschiedene Matrizes möglich
</template>

// TODO: Text schreiben
// TODO: Fenster animieren (fade in)
// Test Redeploy

<script>
// @ is an alias to /src
import HorizontalAxis from '@/components/HorizontalAxis'
import VerticalAxis from '@/components/VerticalAxis'
import SpaceBoxes from '@/components/SpaceBoxes'
import gsap from 'gsap'
import CustomSlider from '@/components/CustomSlider'
import { useQuery } from '@oarepo/vue-query-synchronizer'
import HeadlineWhatHow from '../components/HeadlineWhatHow'
import StartPopUp from '../components/StartPopUp'
import QuestionBox from '@/components/QuestionBox'

const sheetURL = 'https://sheets.googleapis.com/v4/spreadsheets/1LwSUWGNRwzb_5nKIQfBJTAt8Jq5C99Pu9bJSuWjdxio/values/Wortpaare!A1:F1001?majorDimension=COLUMNS&key=AIzaSyB2vKMMSjRWVW1CJQby6-ZyfyHqJOH5zZM'
const sheetURLQuestions = 'https://sheets.googleapis.com/v4/spreadsheets/1LwSUWGNRwzb_5nKIQfBJTAt8Jq5C99Pu9bJSuWjdxio/values/Fragen!A1:A1001?majorDimension=COLUMNS&key=AIzaSyB2vKMMSjRWVW1CJQby6-ZyfyHqJOH5zZM'

export default {
  name: 'Home',
  components: {
    QuestionBox,
    StartPopUp,
    HeadlineWhatHow,
    HorizontalAxis,
    VerticalAxis,
    SpaceBoxes,
    CustomSlider
  },
  setup () {
    return {
      query: useQuery()
    }
  },
  data () {
    return {
      xAxis: ['Natur über Mensch', 'Mensch über Natur'],
      yAxis: ['Transparenz', 'Opazität'],
      zAxis: ['Berührung', 'Virtualität'],
      allWordPairs: Array,
      wordPairs: {
        xAxis: undefined,
        yAxis: undefined,
        zAxis: undefined
      },
      barColor: '#000', // Old Bar: '#ad6bd0' old Sky: #726042 // fea421
      helixIsVisible: false,
      questionWindowIsNOTVisible: true,
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
    newRandomPoint: function () {
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
      try {
        const sheetData = await fetch(sheetURL).then(response => response.json())
        const values = sheetData.values
          .map(column => column.slice(1)) // Remove first line (headline)
          .map(column => column.map(value => value.trim())) // Remove whitespace

        console.log(values)
        this.wordPairs.xAxis = this.mergeColumns(values[0], values[1])
        console.log(this.wordPairs.xAxis)
        this.wordPairs.yAxis = this.mergeColumns(values[2], values[3])
        console.log(this.wordPairs.yAxis)
        this.wordPairs.zAxis = this.mergeColumns(values[4], values[5])
        console.log(this.wordPairs.zAxis)

        console.log(this.wordPairs)
      } catch (err) {
        console.error(err)
      }
    },
    mergeColumns: function (firstArray, secondArray) {
      return firstArray.map((entry, index) => {
        return [entry, secondArray[index]]
      })
    },
    loadSheetQuestions: async function () {
      try {
        const sheetData = await fetch(sheetURLQuestions).then(response => response.json())
        this.questions = this.shuffleArray(sheetData.values[0])
        console.log(`successfully loaded ${this.questions.length} Questions`)
      } catch (err) {
        console.error(err)
      }
    },
    startNewWordPairs: function () {
      const that = this
      const originalBarColor = '#000'
      const mainAxis = document.querySelector('#mainAxis')
      const sky = document.querySelector('a-sky')
      mainAxis.emit('startRotating')
      sky.emit('changeSky')
      const mainLoopId = setInterval(function () {
        // Do your update stuff...
        that.newWordPairs()
      }, 3)
      window.setTimeout(() => {
        this.query.xAxis = this.shuffleArray(this.wordPairs.xAxis)[0]
        this.query.yAxis = this.shuffleArray(this.wordPairs.yAxis)[0]
        this.query.zAxis = this.shuffleArray(this.wordPairs.zAxis)[0]
      }, 700)
      window.setTimeout(() => {
        clearInterval(mainLoopId)
        this.barColor = originalBarColor
      }, 1000)
    },
    newWordPairs: function () {
      // this.$set(this, 'barColor', `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`)
      const randomColor = Math.floor(Math.random() * 16777215).toString(16)
      this.barColor = `#${randomColor}`
    },
    /* toggleHelixVisibility: function () {
      this.helixIsVisible = !this.helixIsVisible
    }, */
    toggleQuestionWindowIsVisible: function () {
      this.questionWindowIsNOTVisible = !this.questionWindowIsNOTVisible
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
    numberOfPossibleMatrixes: function () {
      if (this.wordPairs.xAxis) {
        return this.wordPairs.xAxis.length * this.wordPairs.yAxis.length * this.wordPairs.zAxis.length
      } else {
        return 0
      }
    },
    animatedPointPosition: function () {
      return {
        x: this.tweenedPointPosition.x.toFixed(2),
        y: this.tweenedPointPosition.y.toFixed(2),
        z: this.tweenedPointPosition.z.toFixed(2)
      }
    },
    animatedPointPositionString: function () {
      return `${this.animatedPointPosition.x} ${this.animatedPointPosition.y} ${this.animatedPointPosition.z}`
    },
    activeAxis: function () {
      const x = this.pointPosition.x > 0 ? this.query.xAxis[0] : this.query.xAxis[1]
      const y = this.pointPosition.z > 0 ? this.query.yAxis[1] : this.query.yAxis[0]
      const z = this.pointPosition.y > 0 ? this.query.zAxis[0] : this.query.zAxis[1]
      const exludeZero = {
        x: this.pointPosition.x === 0 ? 0 : x,
        y: this.pointPosition.y === 0 ? 0 : y,
        z: this.pointPosition.z === 0 ? 0 : z
      }
      return {
        ...exludeZero,
        all: [exludeZero.x, exludeZero.y, exludeZero.z]
      }
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
.a-loader-title
  display none;
  opacity: 0;
canvas
  //filter: var(--grain)
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
.website
  position: fixed;
  bottom: 0;
  left 51%
  color black;
  font-variant-ligatures: normal;
  font-feature-settings: "calt" 1;
  text-decoration: none;
.wrapperChangePointQuestions
  grid-column 2 / span 9
  grid-row span 7 / -2
  background rgba(0, 0, 0, 0.8)
  border solid 2px rgba(173, 107, 208, 0.2)
  box-shadow 10px 10px 10px rgba(173, 107, 208, 0.03)
  border-radius 1rem
  padding 1rem
  overflow scroll
  pointer-events all
  cursor default
  color black

@supports ((-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px)))
  .wrapperChangePointQuestions
    background rgba(173, 107, 208, 0.07)
    backdrop-filter blur(10px)
    background-clip padding-box

.wrapperChangePointQuestions.hidden
  display none
.closeWindow
  position absolute
  top 10px
  right 10px
.btn
  cursor pointer
  pointer-events all
  padding 0.5rem
  text-align center
.newPoint
  grid-column: 2 / span 1
  grid-row: 2 / 5
.newPointInner
  width 100%
  height 100%
  border-radius 1rem
  background linear-gradient(-90deg, #ad6bd0 0%, rgba(0,0,0,0) 100%)
  writing-mode: vertical-lr
  transform: rotate(180deg)
  display: flex
  justify-content: center
  align-items: center
.buttons-wrapper
  position: absolute;
  right 5%
  bottom 5%
  border-radius 50%
  //background radial-gradient(#fff, #000);
  background-color #32bd56
  width: 50vw
  height: 30vw
  writing-mode: vertical-lr
  display: flex
  justify-content: center
  align-items: center
  color: white
  transform-origin: bottom right
  transform: scale(0.30)
  box-shadow: -5px -5px 15px #e37ff2, 0px 0px 15px #e37ff2, 5px 5px 20px rgba(255, 255, 255, 0.5) inset
  filter var(--grain-3)
  img
    pointer-events all
    max-height 160px
.hideHelix
  grid-column: -3 / span 1
  grid-row: 2 / 2
  border-radius 1rem
  background linear-gradient(-90deg, #ad6bd0 0%, rgba(0,0,0,0) 100%)
.openQuestionWindow
  grid-column 2 / span 1
  grid-row span 1 / -2
  border-radius 1rem
  background linear-gradient(90deg, #ad6bd0 0%, rgba(0,0,0,0) 100%)
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
@media (prefers-reduced-motion: no-preference) and (min-width: 800px)
  .btn:hover
    animation: wiggle-me .2s cubic-bezier(.1,.6,.4,1) infinite;
@media (max-width: 800px)
  .wrapperChangePointQuestions
    grid-column 2 / span 12
    grid-row span 6 / -2
@media (max-width: 500px)
  .wrapperChangePointQuestions
    grid-column 2 / span 18
    grid-row span 10 / -2
  .btn
    font-size 0.7em
  .newPoint, .openQuestionWindow
    grid-column 2 / span 2
  .newPoint
    padding 0
  .newWords
    grid-column span 2 / -2
@keyframes wiggle-me
  0%,to
    transform: scale(1.05) rotate(1.5deg)
  25%
    transform: scale(1.05) rotate(0deg)
  50%
    transform: scale(1.05) rotate(-1.5deg)
  75%
    transform: scale(1.05) rotate(0deg)
</style>
