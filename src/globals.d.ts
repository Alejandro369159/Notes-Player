// src/globals.d.ts
interface Navigator {
  bluetooth: {
    requestDevice(options?: RequestDeviceOptions): Promise<BluetoothDevice>
  }
}

interface BluetoothDevice {
  gatt: {
    connect(): Promise<BluetoothRemoteGATTServer>
  }
}

interface BluetoothRemoteGATTServer {
  getPrimaryService(service: string | BluetoothServiceUUID): Promise<BluetoothRemoteGATTService>
}

interface BluetoothRemoteGATTService {
  getCharacteristic(
    characteristic: string | BluetoothCharacteristicUUID
  ): Promise<BluetoothRemoteGATTCharacteristic>
}

interface BluetoothRemoteGATTCharacteristic {
  readValue(): Promise<DataView>
  startNotifications(): Promise<void>
  addEventListener(event: string, listener: (event: Event) => void): void
}
