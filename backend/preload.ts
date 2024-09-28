const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel: string, data: unknown) => ipcRenderer.send(channel, data),
    on: (channel: string, func: (...args: unknown[]) => void) => ipcRenderer.on(channel, (_event, ...args) => func(...args)),
    invoke: (channel: string, ...args: unknown[]) => ipcRenderer.invoke(channel, ...args),
  }
})
