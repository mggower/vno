<template>
  <!-- Piano contianer -->
  <div class="mt-5 container has-text-centered">
    <!-- Display controls -->
    <Controls
      class="mb-5"
      v-on:oscillator-click-event="handleOscillatorClick"
      v-on:attack-change-event="handleAttackChange"
      v-on:sustain-change-event="handleSustainChange"
      v-on:decay-change-event="handleDecayChange"
      v-on:release-change-event="handleReleaseChange"
    />
    <!-- Loop through all the keys -->
    <div class="key-container" v-for="key in keys" :key="key.id">
      <Key v-bind:pianoKey="key" v-on:key-click-event="handleKeyClick" />
    </div>
  </div>
</template>

<script>
import Key from './Key';
import Controls from './Controls';
import * as Tone from 'tone';
export default {
  name: 'Piano',
  components: { Key, Controls },
  data: () => ({
    customAttack: 0.1,
    synth: new Tone.Synth({
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.1,

        decay: 0.75,

        sustain: 0.35,

        release: 0.1,
      },
    }),
    keys: [
      {
        id: 1,
        keyName: 'C',
        type: 'white',
        character: 'A',
      },
      {
        id: 2,
        keyName: 'C#',
        type: 'black',
        character: 'W',
      },
      {
        id: 3,
        keyName: 'D',
        type: 'white',
        character: 'S',
      },
      {
        id: 4,
        keyName: 'D#',
        type: 'black',
        character: 'E',
      },
      {
        id: 5,
        keyName: 'E',
        type: 'white',
        character: 'D',
      },
      {
        id: 6,
        keyName: 'F',
        type: 'white',
        character: 'F',
      },
      {
        id: 7,
        keyName: 'F#',
        type: 'black',
        character: 'T',
      },
      {
        id: 8,
        keyName: 'G',
        type: 'white',
        character: 'G',
      },
      {
        id: 9,
        keyName: 'G#',
        type: 'black',
        character: 'Y',
      },
      {
        id: 10,
        keyName: 'A',
        type: 'white',
        character: 'H',
      },
      {
        id: 11,
        keyName: 'A#',
        type: 'black',
        character: 'U',
      },
      {
        id: 12,
        keyName: 'B',
        type: 'white',
        character: 'J',
      },
    ],
  }),
  created() {
    window.addEventListener('keydown', (event) => {
      if (event.defaultPrevented) {
        return;
      }

      var pressedKeyCode = event.keyCode;

      var pressedCharacter = String.fromCharCode(pressedKeyCode);
      var pianoKey = this.keys.filter(function (e) {
        return e.character === pressedCharacter;
      });
      try {
        this.synth.toDestination();
        this.synth.triggerAttackRelease(pianoKey[0].keyName + '4', '8n');
      } catch (err) {
        console.log(err);
      }

      event.preventDefault();
    });
  },
  methods: {
    handleKeyClick(pianoKey) {
      this.synth.toDestination();
      this.synth.triggerAttackRelease(pianoKey.keyName + '4', '8n');
    },
    handleOscillatorClick(newOscillator) {
      this.synth.oscillator.type = newOscillator;
      this.$forceUpdate();
    },
    handleAttackChange(customAttack) {
      this.synth.envelope.attack = customAttack / 100;

      this.$forceUpdate();
    },
    handleSustainChange(customSustain) {
      this.synth.envelope.sustain = customSustain / 100;
      this.$forceUpdate();
    },
    handleDecayChange(customDecay) {
      this.synth.envelope.decay = customDecay / 100;
      this.$forceUpdate();
    },
    handleReleaseChange(customRelease) {
      this.synth.envelope.release = customRelease / 100;
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped>
.key-container {
  padding: 1px !important;
  margin: 0px !important;
  max-width: 50% !important;
  flex-grow: unset !important;
  display: inline-block;
  position: relative;
}
</style>
