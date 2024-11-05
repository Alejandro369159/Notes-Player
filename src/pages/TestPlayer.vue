<script setup lang="ts">
import { ref } from 'vue'
import * as Tone from 'tone'

const synth = new Tone.Synth().toDestination()

// Listado de notas desde A#3 hasta B5 (escala)
const scale = [
  'A#3',
  'B3',
  'C4',
  'C#4',
  'D4',
  'D#4',
  'E4',
  'F4',
  'F#4',
  'G4',
  'G#4',
  'A4',
  'A#4',
  'B4',
  'C5',
  'C#5',
  'D5',
  'D#5',
  'E5',
  'F5',
  'F#5',
  'G5',
  'G#5',
  'A5',
  'A#5',
  'B5'
]

// Función para tocar la escala
const playScale = async () => {
  // Iniciar el contexto de audio
  await Tone.start()
  console.log('Audio context started')

  // Reproducir cada nota con 1.5s de diferencia
  scale.forEach((note, index) => {
    setTimeout(() => {
      synth.triggerAttackRelease(note, '1.5s')
    }, index * 1500) // Cada nota se retrasa 1.5 segundos
  })
}
</script>

<template>
  <div>
    <p>Desde A#3 hasta B5</p>
    <button @click="playScale">Play scale</button>
  </div>
</template>
