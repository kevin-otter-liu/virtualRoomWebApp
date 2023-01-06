export interface WallTextObjectPropI {
  doorRotation: Array<number>;
  doorPosition: Array<number>;
  index: number;
  onImageButtonClick: (e: React.MouseEvent) => void;
  onDoorButtonClick: (e: React.MouseEvent) => void;
  scale: number;
}
