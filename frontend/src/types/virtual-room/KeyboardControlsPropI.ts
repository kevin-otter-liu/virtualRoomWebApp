export type KeyboardControlsState<T extends string = string> = {
  [K in T]: boolean;
};

export type KeyboardControlsEntry<T extends string = string> = {
  /** Name of the action */
  name: T;
  /** The keys that define it, you can use either event.key, or event.code */
  keys: string[];
  /** If the event receives the keyup event, true by default */
  up?: boolean;
};

export type KeyboardControlsProps = {
  /** A map of named keys */
  map: KeyboardControlsEntry[];
  /** All children will be able to useKeyboardControls */
  children: React.ReactNode;
  /** Optional onchange event */
  onChange: (
    name: string,
    pressed: boolean,
    state: KeyboardControlsState
  ) => void;
  /** Optional event source */
  domElement?: HTMLElement;
};
