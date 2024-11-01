/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Define variations
 */
export const variations = [
  {
    name: "divider-tilt",
    title: __("Divider - Tilt", "svg-block"),
    description: __("A tilt divider", "svg-block"),
    icon: (
      <svg viewBox="0 0 1920 150" preserveAspectRatio="none">
        <path d="M0 0v150h1920Z" />
      </svg>
    ),
    attributes: {
      content:
        '<svg viewBox="0 0 1920 150" preserveAspectRatio="none"><path d="M0 0v150h1920Z"/></svg>',
      title: __("A tilt divider", "svg-block"),
      align: "full",
      fillColor: { value: "#d20962" },
    },
    example: {
      attributes: {
        content:
          '<svg viewBox="0 0 1920 150" preserveAspectRatio="none"><path d="M0 0v150h1920Z"/></svg>',
        title: __("A tilt divider", "svg-block"),
        align: "full",
        fillColor: { value: "#d20962" },
      },
    },
  },
  {
    name: "divider-triangle",
    title: __("Divider - Triangle", "svg-block"),
    description: __("A triangle divider", "svg-block"),
    icon: (
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M1200 0L0 0 598.97 114.72 1200 0z"></path>
      </svg>
    ),
    attributes: {
      content:
        '<svg viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M1200 0L0 0 598.97 114.72 1200 0z"></path></svg>',
      title: __("A triangle divider", "svg-block"),
      align: "full",
      fillColor: { value: "#d20962" },
    },
  },
  {
    name: "divider-asymmetrical-triangle",
    title: __("Divider - Asymmetrical Triangle", "svg-block"),
    description: __("An asymmetrical triangle divider", "svg-block"),
    icon: (
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M1200 0L0 0 892.25 114.72 1200 0z"></path>
      </svg>
    ),
    attributes: {
      content:
        '<svg viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M1200 0L0 0 892.25 114.72 1200 0z"></path></svg>',
      title: __("An asymmetrical triangle divider", "svg-block"),
      align: "full",
      fillColor: { value: "#d20962" },
    },
  },
  {
    name: "divider-waves",
    title: __("Divider - Waves", "svg-block"),
    description: __("A waves divider", "svg-block"),
    icon: (
      <svg preserveAspectRatio="none" viewBox="0 0 1920 120">
        <path
          fill-rule="evenodd"
          d="M0 55.962c300.496 50.616 620.496 50.616 960 0s659.504-50.616 960 0V120H0V55.962Z"
        />
      </svg>
    ),
    attributes: {
      content:
        '<svg preserveAspectRatio="none" viewBox="0 0 1920 120"><path fill-rule="evenodd" d="M0 55.962c300.496 50.616 620.496 50.616 960 0s659.504-50.616 960 0V120H0V55.962Z"/></svg>',
      title: __("A waves divider", "svg-block"),
      align: "full",
      fillColor: { value: "#d20962" },
    },
  },
  {
    name: "divider-curve",
    title: __("Divider - Curve", "svg-block"),
    description: __("A curve divider", "svg-block"),
    icon: (
      <svg preserveAspectRatio="none" viewBox="0 0 1920 120">
        <path
          fill-rule="evenodd"
          d="M0,0 C320,60 640,90 960,90 C1280,90 1600,60 1920,0 L1920,120 L0,120 L0,0 Z"
        ></path>
      </svg>
    ),
    attributes: {
      content:
        '<svg preserveAspectRatio="none" viewBox="0 0 1920 120"><path fill-rule="evenodd" d="M0,0 C320,60 640,90 960,90 C1280,90 1600,60 1920,0 L1920,120 L0,120 L0,0 Z"></path></svg>',
      title: __("A curve divider", "svg-block"),
      align: "full",
      fillColor: { value: "#d20962" },
    },
  },
  {
    name: "divider-curve-upside-down",
    title: __("Divider - Curve - upside down", "svg-block"),
    description: __("An upside down curve divider", "svg-block"),
    icon: (
      <svg preserveAspectRatio="none" viewBox="0 0 1920 120">
        <path
          fill-rule="evenodd"
          d="M0,0 C320,60 640,90 960,90 C1280,90 1600,60 1920,0 L0,0 Z"
        ></path>
      </svg>
    ),
    attributes: {
      content:
        '<svg preserveAspectRatio="none" viewBox="0 0 1920 120"><path fill-rule="evenodd" d="M0,0 C320,60 640,90 960,90 C1280,90 1600,60 1920,0 L0,0 Z"></path></svg>',
      title: __("An upside down curve divider", "svg-block"),
      align: "full",
      fillColor: { value: "#d20962" },
    },
  },
  {
    name: "divider-arrow",
    title: __("Divider - Arrow", "svg-block"),
    description: __("An arrow divider", "svg-block"),
    icon: (
      <svg viewBox="0 0 1920 120" preserveAspectRatio="none">
        <path
          d="M0 120h1920V80H1030L960 0l-70 80H0z"
          fill-rule="evenodd"
        ></path>
      </svg>
    ),
    attributes: {
      content:
        '<svg viewBox="0 0 1920 120" preserveAspectRatio="none"><path d="M0 120h1920V80H1030L960 0l-70 80H0z" fill-rule="evenodd"></path></svg>',
      title: __("An arrow divider", "svg-block"),
      align: "full",
      fillColor: { value: "#d20962" },
    },
  },
];
