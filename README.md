nano.js
=======

Generate nano (formerly Raiblocks) addresses in node.js and in the browser

Usage
=====

It exports only one function (`generateAddress`) that takes two arguments, a seed (UInt8Array) and a account number (integer)


To use in node.js:


First install:
```
npm install --save nano.js

```

Then use
```
const nanoJS = require('nano.js');
console.log(nanoJS.generateAddress(new Uint8Array(32), 0));
// {
//   secret: '9f0e444c69f77a49bd0be89db92c38fe713e0963165cca12faf5712d7657120f',
//   address: 'xrb_3i1aq1cchnmbn9x5rsbap8b15akfh7wj7pwskuzi7ahz8oq6cobd99d4r3b7' 
// }

```


To use in the browser:

```
<script src="nano.js/dist/nano.min.js"></script>
```

Then use
```
console.log(nanoJS.generateAddress(new Uint8Array(32), 0));
// {
//   secret: '9f0e444c69f77a49bd0be89db92c38fe713e0963165cca12faf5712d7657120f',
//   address: 'xrb_3i1aq1cchnmbn9x5rsbap8b15akfh7wj7pwskuzi7ahz8oq6cobd99d4r3b7' 
// }

```

TODO
====

In the future nano.js will become a fully-featured library to:

- Interact (via RPC with the nano daemon)
- Generate blocks
- Sign Blocks
- Generate PoW
