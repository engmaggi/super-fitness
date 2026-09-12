/**
 * Super Fitness tokens from Figma Copy:
 * https://www.figma.com/design/txXjWnlBoAT00iJikaxVgV
 *
 * Named variables in the file: Main, Font 2.
 * Everything else is from applied layers on Login, Register, OTP,
 * About, Classes, and the Get Started control.
 */
export const figmaTokens = {
  color: {
    main: "#FF4100",
    linkAccent: "#FF6A00",
    font2: "#D3D3D3",
    text: "#F3F3F4",
    surface: "#242424",
    surface10: "rgba(36, 36, 36, 0.1)",
    surface50: "rgba(36, 36, 36, 0.5)",
    surface60: "rgba(36, 36, 36, 0.6)",
    surface95: "rgba(36, 36, 36, 0.95)",
    border: "#282828",
    input: "#D9D9D9",
  },
  font: {
    heading: "Baloo Thambi 2",
    body: "Rubik",
    ticker: "Inter",
  },
  radius: {
    image: 18,
    control: 20,
    auth: 50,
    pill: 100,
  },
  space: [8, 16, 24, 32, 40, 50, 64, 80] as const,
  type: {
    input: { family: "heading", size: 12, weight: 400, lineHeight: 1.4 },
    uiSm: { family: "heading", size: 14, weight: 400, lineHeight: 1.4 },
    ctaAuth: { family: "heading", size: 14, weight: 800 },
    ctaPage: { family: "heading", size: 16, weight: 800 },
    getStarted: { family: "body", size: 16, weight: 600 },
    greeting: { family: "heading", size: 18, weight: 400, lineHeight: 1.4 },
    body: { family: "body", size: 18, lineHeight: 28.8 },
    welcome: { family: "heading", size: 20, weight: 800, lineHeight: 1.4 },
    authTitle: { family: "heading", size: 24, weight: 800, lineHeight: 1.4 },
    pageTitle: {
      family: "heading",
      size: 40,
      weight: 500,
      lineHeight: 1.4,
      color: "#F3F3F4",
      transform: "capitalize",
    },
    section: { family: "heading", size: 64, weight: 700 },
  },
  control: {
    inputHeight: 48,
    getStartedHeight: 50,
    icon: 20,
    social: 32,
    authBlur: 17.3,
  },
} as const
