# js-to-scss

`npm install js-to-scss -D`

This is a simple module that will flatten down a javascript object into a
string. You can inject that string inside your Sass engine, via the
[data option](https://github.com/sass/node-sass#data)

## Example:

```js
const const flattenObjSass = require("js-to-scss");

const color= {
    black: '#000000',
    white: '#ffffff'
}
flattenObjSass(color);
```

will return:

```scss
$black: #000000;
$white: #ffffff;
```

## Extras

This module will convert arrays in Sass-list-like string and will go recursively
down to your object. Example:

```js
const settings = {
  color: {
    primary: {
      light: "#2ecc71",
      normal: "#27ae60",
      dark: "#16a085"
    }
  },
  remSize: ["14px", "16px", "18px"]
};
```

```scss
$color-primary-light: #2ecc71;
$color-primary-normal: #27ae60;
$color-primary-dark: #16a085;
$remSize: (
  14px,
  16px,
  18px
);
```

## Options

```js
flattenObjSass(
    obj,
    prefix = "$",
    transform = (prop, val) => val`
)
```

* `obj`: The object that will be transformed
* `prefix` = String prepended to every "property", default is `$` to mimic Sass
  variables
* `transform`: you can manipulate the `prop` (everything before the `:`) and the
  value. example

```js
flattenObjSass(
  {
    transform: 1,
    thatKey: 2,
    complex: {
      a: [1, 2, 3],
      b: "#fff"
    }
  },

  "$transform-",

  (key, val) => {
    if (typeof val === "number") {
      val = val * 100;
    }

    if (key === "thatKey") {
      val = val / 100;
    }

    if (Array.isArray(val)) {
      val = val.map(n => n * 100);
    }

    return val;
  }
);
```

```scss
    $transform-transform: 100;
    $transform-thatKey: 200;
    $transform-complex-a: (100,200,300);
    $transform-complex-b: #fff; "
```

### Why that?

I like to have a config file with all tha design option configuration: color,
breakpoints, typography etc... So I can use that across all the application
(breakpoint are really useful in your template engine if you use Elements
Queries)

### Why not a Webpack loader / Gulp plugin / Whatelse?

I wanted something simple importable in every node based project I have around
