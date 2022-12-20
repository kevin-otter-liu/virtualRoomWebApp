import { Vector3 } from 'three';
import PropI from '../PropI';

export default interface PlaneMeshI extends PropI {
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
}
