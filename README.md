# PostCSS Center [![Build Status][ci-img]][ci]

[PostCSS] plugin Plugin shortcut for center elements.

Plugin supports several properties
center
center-abs
horizontal
horizontal-abs
vertical
vertical-abs

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/Arhitector/postcss-center.svg
[ci]:      https://travis-ci.org/Arhitector/postcss-center

```css
.foo {
    center: center;
}
```

```css output
.foo {
  position: relative;
  top: 50%;
  left: 50%;
}
```

## Usage

```js
postcss([ require('postcss-center') ])
```

See [PostCSS] docs for examples for your environment.
