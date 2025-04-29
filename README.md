# vue-wasm-worker-example

A short example of using WASM in a JS worker in a Vue 3 application.

## 1. Create a vue application

1. Create a new Vue project: `npm create vue@latest`
2. Install dependencies: `npm i`
3. Run dev: `npm run dev`
4. Follow http://localhost:5174/ and open the browser console.

## 2. Create a rust library

1. Create a new Rust library: `cargo new mywasm --lib`
2. Add `wasm-bindgen`: `cargo add wasm-bindgen`
3. Add `cdylib` in `Cargo.toml`: `[lib] crate-type = ["cdylib"]`
4. Add `#[wasm_bindgen]` to the `add` function (including `use wasm_bindgen::prelude::*;`).
5. Replace the type `u64` to `i32` in `add` function.
6. Build the project: `wasm-pack build --release --target bundler --out-dir ./mywasm-pkg`

## 3. Run WASM function in Vue

1. Install `vite-plugin-wasm`: `npm i vite-plugin-wasm`
2. Modify `vite.config.js` by adding `import wasm from "vite-plugin-wasm"` and `wasm()` to the listed `plugins`.
3. Install `mywasm` as a dependency: `npm i ./mywasm/mywasm-pkg`
4. Add the code to `App.vue`:

```js
import { onMounted } from 'vue'

onMounted(async () => {
  const mywasm = await import('mywasm')
  const c = mywasm.add(-4, 12)
  console.log(c)
})
```

5. Check `8` in the console.

## 4. Add worker

1. Create a file `test.worker.js` with the following content:

```js
self.onmessage = event => {
  const c = event.data.a + event.data.b
  console.log(c)
}
```

2. Add the code to `App.vue`

```js
import TestWorker from './test.worker?worker'
const worker = new TestWorker()
setInterval(() => {
  worker.postMessage({a: -5, b: 12})
}, 2000)
```

3. Check `7` in the console.

## 5. Import WASM in worker

Set this code in `test.worker.js`:

```js
import("mywasm").then(wasm => {
  self.onmessage = event => {
    const c = wasm.add(event.data.a, event.data.b)
    console.log(c)
  }
})
```

Everything should work the same way as in the previous step.
