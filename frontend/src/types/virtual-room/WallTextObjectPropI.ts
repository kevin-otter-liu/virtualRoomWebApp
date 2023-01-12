export interface WallTextObjectPropI {
  createMode: boolean;
  doorRotation: Array<number>;
  doorPosition: Array<number>;
  index: number;
  onImageButtonClick: (e: React.MouseEvent) => void;
  onDoorButtonClick: (e: React.MouseEvent) => void;
  onNextRoomClick: (e: React.MouseEvent) => void;
  scale: number;
  showDoorButton: boolean;
}
