import("mywasm").then(wasm => {
  self.onmessage = event => {
    const c = wasm.add(event.data.a, event.data.b)
    console.log(c)
  }
})

// self.onmessage = event => {
//   const c = event.data.a + event.data.b
//   console.log(c)
// }
