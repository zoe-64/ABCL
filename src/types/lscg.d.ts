declare global {
  interface Window {
    /** Set once LSCG's script has finished loading. */
    LSCG?: LSCGGlobal;
    LSCG_OnLoad?: LSCGLoadCallback[] | LSCGLoadQueue;
  }
  interface WindowEventMap {
    /** Fired on `window` once LSCG is ready. */
    "lscg:ready": CustomEvent<LSCGGlobal>;
  }
}
