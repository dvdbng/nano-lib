nano-lib
========

Generate nano (formerly Raiblocks) addresses in node.js and in the browser

Usage
=====

It exports only one function (`generateAddress`) that takes two arguments, a seed (UInt8Array) and a account number (integer)


To use in node.js:


First install:
```
npm install --save nano-lib

```

Then use
```
const nanoJS = require('nano-lib');
console.log(nanoJS.generateAddress(new Uint8Array(32), 0));
// {
//   secret: '9f0e444c69f77a49bd0be89db92c38fe713e0963165cca12faf5712d7657120f',
//   address: 'xrb_3i1aq1cchnmbn9x5rsbap8b15akfh7wj7pwskuzi7ahz8oq6cobd99d4r3b7' 
// }

```


To use in the browser:

```
<script src="nano-lib/dist/nano-lib.min.js"></script>
```

Then use
```
console.log(nanoJS.generateAddress(new Uint8Array(32), 0));
// {
//   secret: '9f0e444c69f77a49bd0be89db92c38fe713e0963165cca12faf5712d7657120f',
//   address: 'xrb_3i1aq1cchnmbn9x5rsbap8b15akfh7wj7pwskuzi7ahz8oq6cobd99d4r3b7' 
// }

```

Security
========

**USE A GOOD ENTROPY SOURCE TO GENERATE THE SEEDS**. This library intentionally doesn't come
with a CSPRNG to generate the seeds. To generate them, **please** use a good CSPRNG like the
browser's `window.crypto.getRandomValues()` or node's `crypto.randomBytes()`.

`Math.random()` Is not a CSPRNG and shouldn't be used to generate the seeds.


TODO:
====

In the future nano-lib will become a fully featured library to:

- Interact (via RPC with the nano daemon)
- Generate blocks
- Sign Blocks
- Generate PoW

Donations:
==========

Like it? Need a feature implemented? Help support the development!

```
xrb_3g185cma1kqoaxeosmnrr5y8z6gmaeh11zz3h5t1fcrkp9xwmyyg67upfwmx
```
Thanks!
