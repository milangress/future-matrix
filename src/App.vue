<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
  </div>
</template>

<style lang="stylus">
@font-face
  font-family: 'oracle';
  src: url('/fonts/oraclegm-regularmono-webfont-webfont.woff2') format('woff2'),
    url('/fonts/oraclegm-regularmono-webfont-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;

body
  margin 0
#app
  font-family oracle, Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  //text-align center
  color #ffffff
</style>
