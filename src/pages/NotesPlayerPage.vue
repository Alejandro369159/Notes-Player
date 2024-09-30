<script setup lang="ts">
import { ref, watch } from 'vue'
import * as Tone from 'tone'

const currentNote = ref<string>('')
const currentFrequency = ref<number>(0)
const error = ref<null | string>(null)

const synth = new Tone.Synth().toDestination()

let bluetoothDevice: BluetoothDevice | null = null
let server: BluetoothRemoteGATTServer | null = null
let rxCharacteristic: BluetoothRemoteGATTCharacteristic | null = null
let txCharacteristic: BluetoothRemoteGATTCharacteristic | null = null

const connectBluetooth = async () => {
  try {
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e'] // UUID del servicio UART
    })

    server = await bluetoothDevice.gatt?.connect()
    const service = await server?.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e')

    rxCharacteristic = await service?.getCharacteristic('6e400002-b5a3-f393-e0a9-e50e24dcca9e')
    txCharacteristic = await service?.getCharacteristic('6e400003-b5a3-f393-e0a9-e50e24dcca9e')

    await txCharacteristic?.startNotifications()
    txCharacteristic?.addEventListener('characteristicvaluechanged', handleNotifications)

    currentNote.value = 'None'
  } catch (e) {
    console.error('Error de conexión', error)
    error.value = `Error al conectar: ${error.value}`
  }
}

const handleNotifications = (event: any) => {
  const value = new TextDecoder().decode(event.target.value)
  const [_note, frequency] = value.split(' ')
  currentNote.value = _note
  currentFrequency.value = parseFloat(frequency)
}

function soundCycle(newNote: string, oldNote: string) {
  if (newNote === 'None') return synth.triggerRelease()
  if (oldNote === newNote) return
  synth.triggerRelease()
  synth.triggerAttack(newNote)
}

watch(currentNote, (newNote, oldNote) => soundCycle(newNote, oldNote))
</script>

<template>
  <main>
    <h2>Invisible Violin</h2>
    <span class="subtitle">by Equipo 06</span>

    <button type="button" @click="connectBluetooth">Conectar Bluetooth</button>

    <div class="note-block">
      <p>Nota reproduciendose:</p>
      <h3>{{ currentNote === '' ? 'Ninguna' : currentNote }}</h3>
    </div>
    <p>Hz: {{ currentFrequency === 0 ? '---' : currentFrequency }}</p>
  </main>
</template>

<style scoped>
main {
  margin: auto;
  width: 100%;
  max-width: 1220px;
}

h2 {
  margin-top: 3rem;
  margin-bottom: 0;
  text-align: center;
}

.subtitle {
  display: block;
  margin: 0;
  margin-top: 0.4rem;
  text-align: center;
  width: 100%;
}

button {
  cursor: pointer;
  padding: 10px 20px;
  font-weight: bold;
  border: 1px solid lightgray;
  display: block;
  margin: 2rem auto 0 auto;
}

.note-block {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
  margin-top: 2rem;
  background-color: aliceblue;
  border: 1px solid lightgray;
  border-radius: 0.3rem;
}

.note-block > p {
  width: 100%;
  font-weight: bold;
  text-align: center;
}

h3 {
  margin: 0 0 1rem 0;
  text-align: center;
  color: rgb(17, 58, 240);
}

p {
  text-align: center;
}
</style>
