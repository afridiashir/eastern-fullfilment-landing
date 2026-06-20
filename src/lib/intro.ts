/**
 * Coordination between the intro <Loader /> and anything that should hold its
 * entrance animation until the loader has slid away (e.g. the hero heading).
 *
 * The loader sets `window.__introDone` and dispatches the `intro:done` event
 * once it starts leaving. Consumers either run immediately (if the intro has
 * already finished) or wait for the event.
 */

export const INTRO_DONE_EVENT = "intro:done";

export type IntroWindow = Window & { __introDone?: boolean };

/** Run `cb` once the intro loader has finished (or immediately if it already has). */
export function onIntroDone(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if ((window as IntroWindow).__introDone) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(INTRO_DONE_EVENT, handler, { once: true });
  return () => window.removeEventListener(INTRO_DONE_EVENT, handler);
}
