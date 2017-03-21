### Rhythm

Rhythm is an interpolation framework intended for type usage. It allows type to degrade proportionally and gracefully as it should. Rhythm is available in one port, vanilla javascript (no jQuery). At the moment, SASS support is on hold. This is because a SASS implementation is likely to be confusing or broken because most browsers do not currently support heterogeneous CSS calculations. Rhythm is only to be used with properties that take `pixel`, `em`, `rem`, and `viewport` units because Rhythm only interpolates number values. Color (rgb(a), hsl, hex) support is coming in the future, but is not currently available.

#### Installation

To install rhythm, you can clone the git repository or install the npm package.

```bash
# Clone the repo from github
git clone https://github.com/samolaogun/rhythm.git
```

```bash
# Install from npm
npm install rhythm-type
```

#### Parameters

`Rhythm(element, props, pairs[, opts])`

- `element` {string|element|(string|element)[]}
  - The element(s) upon which the property or properties are applied.
  - If a string or element object argument is supplied, the property or properties will be applied to all instances of that element type. If an array argument is supplied with an array of strings or element objects, the property or properties will be applied to all instances of that element type. Array arguments may be heterogeneous (string or element object).
- `props` {string|string[string, string...]}
  - The property or properties that are being manipulated.
- `pairs` {number[number, number]}
  - An array containing value-breakpoint pairs. `[[value, breakpoint], [value, breakpoint]...]`
  - If the array contains duplicate values for a single breakpoint, the smaller value is applied before the breakpoint and the larger value is applied after the breakpoint.
- `opts` {object}[opts={}]
  - An object allowing the framework's behavior to be manipulated.

#### Options

The options object takes 2 arguments, each altering how rhythm functions.

- `clamp` {boolean}
  - Specifies whether or not values that exceed the value bracket provided should be managed. This option is set to **true by default**.
- `unit` {string}
  - The unit of property or properties. For brevity, **only pixel units can be used to describe breakpoints**. The **default unit is px**.

#### Usage

Aforementioned, the `Rhythm` function has 3 parameters — element, property/properties, and options. The `element` parameter specifies the element(s) upon which the property or properties will be applied. The `props` parameter specifies the aspects of the element which are being interpolated. The pair parameter takes an array of value-breakpoint pairs as an argument. **You may have as many value-breakpoint pairs as you like**. The `opts` parameter takes an object—which allows you to edit functionality for your purpose—as an argument. More on that above. Remember to be careful when using the `clamp` option. If the `clamp` option is set to false and the relationship between the breakpoints and the value(s) of property or properties is steep, the value(s) of the property or properties will be exaggerated (bad things happen). For safety, the clamp option is set to true by default. Additionally, **only homogeneous units** can be interpolated.

```javascript
/* Basic Usage */

/* The Rhythm function takes the string 'h1' as an argument. This means that the interpolation will be applied to all 'h1' element types. Notice how the CSS property is named by the DOM convention (fontSize). In this case, the 'h1' elements' font sizes are interpolated from 3ems @800px to 6ems @1200px. */
Rhythm('h1', 'fontSize', [[3, 800], [6, 1200]], {
    unit: 'em'
})

/* The Rhythm function takes the element object 'img' as an argument. In this case, the 'img' element's width is interpolated from 200px @800px to 400px @1200px. Because the unit is not specified, it is assumed to be px. */
let img = document.querySelector('img')
Rhythm(img, 'width', [[200, 1000], [400, 1200]])


/* Advanced Cases */

/* The Rythmn function takes the array 'h1' as an argument. Note that more than two value-breakpoint pairs are used. In this case, the 'h1' elements' font sizes are interpolated from 3ems @800px to 6ems @1200px and 8ems @1400px. Remember, you can have as many breakpoints as you like. Again, here an array of element objects are passed through as an argument and are each manipulated. */
let h1 = document.querySelectorAll('h1')
Rhythm(h1, 'fontSize', [[3, 800], [6, 1200], [8, 1400]], {
    unit: 'em'
})

/* The Rhythm function takes the array 'h1' as an argument. Note that multiple CSS properties are manipulated and more than two value-breakpoint pairs are used. In this case, the 'margin-left' and 'margin-right' properties are interpolated from 4vw @600px to 8vw @1000px and back down to 6vw @1200px. This is possible because each value-breakpoint pair is automagically sorted by its breakpoint value. When the client's screen size either surpasses or lags behind the lower or upper extremes, the value of the property or properties will maintain its last relationship with the screen size because clamp is turned off. */
Rhythm('main', ['marginLeft', 'marginRight'], [[8, 1000], [6, 1200], [4, 600]], {
      clamp: false,
      unit: 'vw'
})
```

Color support and heterogeneous units are currently in consideration. Have fun interpolating.

#### License

See the license [here](https://github.com/samolaogun/rhythm/blob/master/LICENSE).
