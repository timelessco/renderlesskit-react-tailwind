const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette")
  .default;
const buildSelectorVariant = require("tailwindcss/lib/util/buildSelectorVariant")
  .default;

module.exports = {
  purge: ["./src/theme.tsx", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
      },
      fontFamily: {
        sans: ["Inter"],
      },
      spacing: {
        em: "1em",
      },
      lineHeight: {
        em: "1em",
      },
      minWidth: {
        ...defaultTheme.spacing,
      },
      minHeight: {
        ...defaultTheme.spacing,
      },
      borderBottom: {},
      zIndex: {
        1: 1,
      },
      border: {
        1.5: "1.5px",
      },
    },
  },
  variants: {
    extend: {
      accessibility: ["lib", "DEFAULT", "responsive", "focus-within", "focus"],
      alignContent: ["lib", "DEFAULT", "responsive"],
      alignItems: ["lib", "DEFAULT", "responsive"],
      alignSelf: ["lib", "DEFAULT", "responsive"],
      animation: ["lib", "DEFAULT", "responsive"],
      appearance: ["lib", "DEFAULT", "responsive"],
      backgroundAttachment: ["lib", "DEFAULT", "responsive"],
      backgroundClip: ["lib", "DEFAULT", "responsive"],
      backgroundColor: [
        "DEFAULT",
        "aria-selected",
        "is-range-selection",
        "is-range-start",
        "is-range-end",
        "responsive",
        "dark",
        "group-hover",
        "focus-within",
        "hover",
        "focus",
        "lib",
      ],
      backgroundImage: ["lib", "DEFAULT", "responsive"],
      backgroundOpacity: [
        "lib",
        "DEFAULT",
        "responsive",
        "group-hover",
        "focus-within",
        "hover",
        "focus",
      ],
      backgroundPosition: ["lib", "DEFAULT", "responsive"],
      backgroundRepeat: ["lib", "DEFAULT", "responsive"],
      backgroundSize: ["lib", "DEFAULT", "responsive"],
      borderCollapse: ["lib", "DEFAULT", "responsive"],
      borderColor: [
        "lib",
        "DEFAULT",
        "responsive",
        "dark",
        "group-hover",
        "focus-within",
        "hover",
        "focus",
      ],
      borderOpacity: [
        "lib",
        "DEFAULT",
        "responsive",
        "group-hover",
        "focus-within",
        "hover",
        "focus",
      ],
      borderRadius: [
        "lib",
        "DEFAULT",
        "is-range-selection",
        "is-range-end",
        "is-range-start",
        "responsive",
      ],
      borderStyle: ["lib", "DEFAULT", "responsive"],
      borderWidth: ["lib", "DEFAULT", "responsive"],
      boxShadow: [
        "lib",
        "DEFAULT",
        "responsive",
        "group-hover",
        "focus-within",
        "hover",
        "focus",
      ],
      boxSizing: ["lib", "DEFAULT", "responsive"],
      clear: ["lib", "DEFAULT", "responsive"],
      container: ["lib", "DEFAULT", "responsive"],
      cursor: ["lib", "DEFAULT", "disabled", "responsive"],
      display: ["lib", "DEFAULT", "responsive"],
      divideColor: ["lib", "DEFAULT", "responsive", "dark"],
      divideOpacity: ["lib", "DEFAULT", "responsive"],
      divideStyle: ["lib", "DEFAULT", "responsive"],
      divideWidth: ["lib", "DEFAULT", "responsive"],
      fill: ["lib", "DEFAULT", "responsive"],
      flex: ["lib", "DEFAULT", "responsive"],
      flexDirection: ["lib", "DEFAULT", "responsive"],
      flexGrow: ["lib", "DEFAULT", "responsive"],
      flexShrink: ["lib", "DEFAULT", "responsive"],
      flexWrap: ["lib", "DEFAULT", "responsive"],
      float: ["lib", "DEFAULT", "responsive"],
      fontFamily: ["lib", "DEFAULT", "responsive"],
      fontSize: ["lib", "DEFAULT", "responsive"],
      fontSmoothing: ["lib", "DEFAULT", "responsive"],
      fontStyle: ["lib", "DEFAULT", "responsive"],
      fontVariantNumeric: ["lib", "DEFAULT", "responsive"],
      fontWeight: ["lib", "DEFAULT", "responsive"],
      gap: ["lib", "DEFAULT", "responsive"],
      gradientColorStops: [
        "lib",
        "DEFAULT",
        "responsive",
        "dark",
        "hover",
        "focus",
      ],
      gridAutoColumns: ["lib", "DEFAULT", "responsive"],
      gridAutoFlow: ["lib", "DEFAULT", "responsive"],
      gridAutoRows: ["lib", "DEFAULT", "responsive"],
      gridColumn: ["lib", "DEFAULT", "responsive"],
      gridColumnEnd: ["lib", "DEFAULT", "responsive"],
      gridColumnStart: ["lib", "DEFAULT", "responsive"],
      gridRow: ["lib", "DEFAULT", "responsive"],
      gridRowEnd: ["lib", "DEFAULT", "responsive"],
      gridRowStart: ["lib", "DEFAULT", "responsive"],
      gridTemplateColumns: ["lib", "DEFAULT", "responsive"],
      gridTemplateRows: ["lib", "DEFAULT", "responsive"],
      height: ["lib", "DEFAULT", "responsive"],
      inset: ["lib", "DEFAULT", "responsive"],
      justifyContent: ["lib", "DEFAULT", "responsive"],
      justifyItems: ["lib", "DEFAULT", "responsive"],
      justifySelf: ["lib", "DEFAULT", "responsive"],
      letterSpacing: ["lib", "DEFAULT", "responsive"],
      lineHeight: ["lib", "DEFAULT", "responsive"],
      listStylePosition: ["lib", "DEFAULT", "responsive"],
      listStyleType: ["lib", "DEFAULT", "responsive"],
      margin: ["lib", "DEFAULT", "responsive"],
      maxHeight: ["lib", "DEFAULT", "responsive"],
      maxWidth: ["lib", "DEFAULT", "responsive"],
      minHeight: ["lib", "DEFAULT", "responsive"],
      minWidth: ["lib", "DEFAULT", "responsive"],
      objectFit: ["lib", "DEFAULT", "responsive"],
      objectPosition: ["lib", "DEFAULT", "responsive"],
      opacity: [
        "lib",
        "DEFAULT",
        "disabled",
        "responsive",
        "group-hover",
        "focus-within",
        "hover",
        "focus",
      ],
      order: ["lib", "DEFAULT", "responsive"],
      outline: ["lib", "DEFAULT", "responsive", "focus-within", "focus"],
      overflow: ["lib", "DEFAULT", "responsive"],
      overscrollBehavior: ["lib", "DEFAULT", "responsive"],
      padding: ["lib", "DEFAULT", "responsive"],
      placeContent: ["lib", "DEFAULT", "responsive"],
      placeItems: ["lib", "DEFAULT", "responsive"],
      placeSelf: ["lib", "DEFAULT", "responsive"],
      placeholderColor: ["lib", "DEFAULT", "responsive", "dark", "focus"],
      placeholderOpacity: ["lib", "DEFAULT", "responsive", "focus"],
      pointerEvents: ["lib", "DEFAULT", "responsive"],
      position: ["lib", "DEFAULT", "responsive"],
      resize: ["lib", "DEFAULT", "responsive"],
      ringColor: [
        "lib",
        "DEFAULT",
        "responsive",
        "dark",
        "focus-within",
        "focus",
      ],
      ringOffsetColor: [
        "lib",
        "DEFAULT",
        "responsive",
        "dark",
        "focus-within",
        "focus",
      ],
      ringOffsetWidth: [
        "lib",
        "DEFAULT",
        "responsive",
        "focus-within",
        "focus",
      ],
      ringOpacity: ["lib", "DEFAULT", "responsive", "focus-within", "focus"],
      ringWidth: ["lib", "DEFAULT", "responsive", "focus-within", "focus"],
      rotate: ["lib", "DEFAULT", "responsive", "hover", "focus"],
      scale: ["lib", "DEFAULT", "responsive", "hover", "focus"],
      skew: ["lib", "DEFAULT", "responsive", "hover", "focus"],
      space: ["lib", "DEFAULT", "responsive"],
      stroke: ["lib", "DEFAULT", "responsive"],
      strokeWidth: ["lib", "DEFAULT", "responsive"],
      tableLayout: ["lib", "DEFAULT", "responsive"],
      textAlign: ["lib", "DEFAULT", "responsive"],
      textColor: [
        "lib",
        "DEFAULT",
        "aria-selected",
        "aria-disabled",
        "is-range-selection",
        "is-range-start",
        "is-range-end",
        "responsive",
        "dark",
        "group-hover",
        "focus-within",
        "hover",
        "focus",
      ],
      textDecoration: [
        "lib",
        "DEFAULT",
        "responsive",
        "group-hover",
        "focus-within",
        "hover",
        "focus",
      ],
      textOpacity: [
        "lib",
        "DEFAULT",
        "responsive",
        "group-hover",
        "focus-within",
        "hover",
        "focus",
      ],
      textOverflow: ["lib", "DEFAULT", "responsive"],
      textTransform: ["lib", "DEFAULT", "responsive"],
      transform: ["lib", "DEFAULT", "responsive"],
      transformOrigin: ["lib", "DEFAULT", "responsive"],
      transitionDelay: ["lib", "DEFAULT", "responsive"],
      transitionDuration: ["lib", "DEFAULT", "responsive"],
      transitionProperty: ["lib", "DEFAULT", "responsive"],
      transitionTimingFunction: ["lib", "DEFAULT", "responsive"],
      translate: ["lib", "DEFAULT", "responsive", "hover", "focus"],
      userSelect: ["lib", "DEFAULT", "responsive"],
      verticalAlign: ["lib", "DEFAULT", "responsive"],
      visibility: ["lib", "DEFAULT", "responsive"],
      whitespace: ["lib", "DEFAULT", "responsive"],
      width: ["lib", "DEFAULT", "responsive"],
      wordBreak: ["lib", "DEFAULT", "responsive"],
      zIndex: ["lib", "DEFAULT", "responsive", "focus-within", "focus"],
    },
  },
  plugins: [
    plugin(function ({ addUtilities, e, theme, variants }) {
      const colors = flattenColorPalette(theme("borderColor"));
      delete colors["default"];

      const colorMap = Object.keys(colors).map(color => ({
        [`.border-t-${color}`]: { borderTopColor: colors[color] },
        [`.border-r-${color}`]: { borderRightColor: colors[color] },
        [`.border-b-${color}`]: { borderBottomColor: colors[color] },
        [`.border-l-${color}`]: { borderLeftColor: colors[color] },
      }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, ["lib", "DEFAULT", "responsive"]);
    }),
    plugin(function ({ addUtilities }) {
      const utilities = {
        ".collapse-border > :first-of-type:not(:last-of-type)": {
          "border-top-right-radius": "0px",
          "border-bottom-right-radius": "0px",
        },
        ".collapse-border > :not(:first-of-type):not(:last-of-type)": {
          "border-radius": "0px",
        },
        ".collapse-border > :not(:first-of-type):last-of-type": {
          "border-top-left-radius": "0px",
          "border-bottom-left-radius": "0px",
        },
        ".w-inherit": {
          width: "inherit",
        },
        ".h-inherit": {
          height: "inherit",
        },
        ".inherit": {
          display: "inherit",
        },
      };

      addUtilities(utilities, ["lib", "DEFAULT", "responsive"]);
    }),
    plugin(function ({ addVariant, e }) {
      addVariant("aria-selected", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `aria-selected${separator}${className}`,
          )}[aria-selected="true"]`;
        });
      });
    }),
    plugin(function ({ addVariant, e }) {
      addVariant("aria-disabled", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `aria-disabled${separator}${className}`,
          )}[aria-disabled="true"]`;
        });
      });
    }),
    plugin(function ({ addVariant, e }) {
      addVariant("is-range-selection", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `is-range-selection${separator}${className}`,
          )}[data-is-range-selection]`;
        });
      });
    }),
    plugin(function ({ addVariant, e }) {
      addVariant("is-range-start", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `is-range-start${separator}${className}`,
          )}[data-is-selection-start]`;
        });
      });
    }),
    plugin(function ({ addVariant, e }) {
      addVariant("is-range-end", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `is-range-end${separator}${className}`,
          )}[data-is-selection-end]`;
        });
      });
    }),
    plugin(function ({ addVariant, e }) {
      addVariant(
        "lib",
        ({ container, separator, modifySelectors }) => {
          modifySelectors(({ selector }) => {
            return buildSelectorVariant(selector, "lib", separator, message => {
              throw container.error(message);
            });
          });
        },
        { unstable_stack: true },
      );
    }),
  ],
};
