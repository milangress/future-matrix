<template lang="pug">
a-entity(:rotation="rotation")
  a-entity(v-for="pos in barList")
    a-box(:position='pos' depth="0.04" height="0.04" :width="barLength" :color='barColor')

</template>

<script>
export default {
  name: 'EndlessAxis',
  props: {
    barColor: String,
    startPosition: {
      type: Number,
      default: 0
    },
    rotation: {
      type: String,
      default: '0 0 0'
    }
  },
  data () {
    return {
      totalLength: 30,
      barLength: 3
    }
  },
  computed: {
    barList: function () {
      return Array.from({ length: this.totalLength }, (v, i) => {
        const nextPosition = i * this.barLength * 2
        return `${nextPosition + this.startPosition} 0 0`
        // return (i % 2 ? 1 : 0)
      })
    }
  }
}
</script>

<style scoped>

</style>
