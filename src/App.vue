<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
  </div>
</template>

<style>
@font-face {
  font-family: 'oracle';
  src: url("/fonts/oraclegm-regularmono-webfont-webfont.woff2") format('woff2'), url("/fonts/oraclegm-regularmono-webfont-webfont.woff") format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "ArmandGrotesk";
  src: local("ArmandGrotesk"), url("/fonts/ArmandGroteskTRIAL-Bold.otf") format("opentype");
  font-weight: bold;
}
@font-face {
  font-family: "ArmandGrotesk";
  src: local("ArmandGrotesk"), url("/fonts/ArmandGroteskTRIAL-SemiLight.otf") format("opentype");
  font-weight: normal;
  font-stretch: 87.5% 112.5%;
}
@font-face {
  font-family: "Sneaky-Times";
  src: url("/fonts/Sneaky-Times.woff2") format('woff2'), url("/fonts/Sneaky-Times.woff") format('woff');
  font-weight: normal;
}
@font-face {
  font-family: "SissiDisplay";
  src: url("/fonts/SissiDisplay-Regular.woff") format('woff');
  font-weight: normal;
}
body {
  margin: 0;
  filter: var(--grain)
}
#app {
  font-family: oracle, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}
:root {
  --grain: url('data:image/svg+xml,\
    <svg xmlns="http://www.w3.org/2000/svg">\
      <filter id="grain"> \
      <feTurbulence type="turbulence" baseFrequency="0.5" numOctaves="2" result="turbulence"/> \
      <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="1" xChannelSelector="R" yChannelSelector="G"/> \
      </filter> \
  </svg>#grain');
  --grain-2: url('data:image/svg+xml,\
    <svg xmlns="http://www.w3.org/2000/svg">\
      <filter id="grain"> \
      <feTurbulence type="turbulence" baseFrequency="0.5" numOctaves="2" result="turbulence"/> \
      <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="4" xChannelSelector="R" yChannelSelector="G"/> \
      </filter> \
  </svg>#grain');
  --grain-3: url('data:image/svg+xml,\
    <svg xmlns="http://www.w3.org/2000/svg">\
      <filter id="grain"> \
      <feTurbulence type="turbulence" baseFrequency="0.5" numOctaves="2" result="turbulence"/> \
      <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="15" xChannelSelector="R" yChannelSelector="G"/> \
      </filter> \
  </svg>#grain');
}
</style>
