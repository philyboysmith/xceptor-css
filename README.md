# Xceptor 4.0 CSS

## Reading

If you're new to large CSS projects we'd recommend that you take a look at the following resources before delving into any specifics:

### [OOCSS](http://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)

The project uses a variant of OOCSS so it's worth getting your head around this for starters. If you're new to object orientated programming it's also worth exploring the [Single Responsibility Principle](http://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/) when applied to CSS.

### [Atomic Web Design](http://atomicdesign.bradfrost.com/table-of-contents/)

Although we're not explicitly using the Atomic Web Design terminology, the principles are the same.

### [ITCSS](https://www.youtube.com/watch?v=1OKZOV-iLj4)

The methodology we use throughout the project is based on ITCSS. [This video](https://www.youtube.com/watch?v=1OKZOV-iLj4) will provide a good introduction. 

### [CSS Guidelines](http://cssguidelin.es/)

If you're unsure how to write something (comments, selectors, etc), take a look at CSS Guidelines. The [last section](http://cssguidelin.es/#architectural-principles) also explains important OO princples further.

### [BEM](https://css-tricks.com/bem-101/)

On larger projects, naming conventions is vital. We're using BEM.

## Structure

The SCSS folder includes the following subfolder. This is very important for dealing with CSS dependencies when using the ITCSS css way of thinking (see ITCSS section above).

### [1.Settings](https://github.com/philyboysmith/xceptor-css/tree/master/scss/settings)

Global variables, config switches.

### [2.Tools](https://github.com/philyboysmith/xceptor-css/tree/master/scss/tools)

Default mixins and functions.

### [3.Generic](https://github.com/philyboysmith/xceptor-css/tree/master/scss/generic)

Ground-zero styles (Normalize.css, resets, box-sizing).

### [4.Elements-Base](https://github.com/philyboysmith/xceptor-css/tree/master/scss/base)

Unclassed HTML elements (type selectors).

### [5.Objects](https://github.com/philyboysmith/xceptor-css/tree/master/scss/objects)

Cosmetic-free design patterns.

### [6.Components](https://github.com/philyboysmith/xceptor-css/tree/master/scss/components)

Designed components, chunks of UI.

### [7.Trumps](https://github.com/philyboysmith/xceptor-css/tree/master/scss/trumps)

Helpers and overrides.


For more information on the contents of each folder checkout the table of contents at the top of [style.scss](https://github.com/philyboysmith/xceptor-css/blob/master/scss/style.scss)