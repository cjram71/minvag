import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App from "./App";

const locationStub = { hash: "#/", reload: () => undefined };
const localStorageStub = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

Object.defineProperty(globalThis, "window", {
  configurable: true,
  value: {
    location: locationStub,
    localStorage: localStorageStub,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    setTimeout,
    clearTimeout,
  },
});

const routes = [
  "/",
  "/start",
  "/upptack",
  "/jag",
  "/utforska",
  "/program/teknik",
  "/yrkesomrade/teknik-system",
  "/behorighet?program=teknik",
  "/min-vag",
  "/alternativ",
  "/nasta",
  "/dela",
  "/syv",
  "/kallor",
  "/installningar",
  "/hjalp",
  "/saknas",
];

describe("application routes", () => {
  it.each(routes)("renders %s without a runtime error", (route) => {
    locationStub.hash = `#${route}`;
    const markup = renderToStaticMarkup(<App />);

    expect(markup).toContain("MINVÄG");
    expect(markup.length).toBeGreaterThan(500);
  });
});
