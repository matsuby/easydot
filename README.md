# easydot
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

"dot-string access" for target object

## Installing

#### For Browser (CDN)
```
<script src="https://cdn.jsdelivr.net/gh/matsuby/easydot/dist/easydot.min.js"></script>
```

#### For Node.js
```
// Install from npm
npm install --save easydot

// Install from yarn
yarn add easydot
```

and

```
// Use ES Modules
import easydot from "easydot"

// Use Common JS
const easydot = require("easydot");
```

## Usage
```
const target = {
  what: {
    is: {
      easydot: 42
    }
  }
};

// create proxy that implements `dot-string acccess`
const proxy = easydot(target);

// get nested property
console.log(proxy["what.is.easydot"]);
// => 42

// set nested property
proxy["what.is.easydot"] = "set value";
console.log(proxy.what.is.easydot);
// => "set value"

// this is a just proxy, so target status was affected
proxy["what.is.name"] = "john";
console.log(JSON.stringify(target, null, 2));
// =>
// {
//  "what": {
//    "is": {
//      "easydot": "set value",
//      "name": "john"
//    }
//  }
// }
```

## Over jump access

```
const target = {
  what: {
    is: {
      easydot: 42
    }
  }
};

// unsafe over jump access(default)
const unsafeProxy = easydot(target);
try {
  unsafeProxy["not.exist.property"];
} catch (e) {
  console.error("error");
}


// safe over jump access(optional)
const safeProxy = easydot(target, true);
safeProxy["not.exist.property"] = "safe";
```