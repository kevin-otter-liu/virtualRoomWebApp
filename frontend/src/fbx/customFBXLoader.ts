import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export class CustomFBXLoader extends FBXLoader {
  public parseMaterial(
    materialNode: any,
    textureFilePaths: Map<string, string>
  ): THREE.MeshPhongMaterial {
    const textureLoader = new THREE.TextureLoader();

    const material = new THREE.MeshPhongMaterial();

    if (
      materialNode.properties !== undefined &&
      materialNode.properties.DiffuseColor !== undefined
    ) {
      const color = materialNode.properties.DiffuseColor;
      material.color.setRGB(color[0], color[1], color[2]);
    }

    if (
      materialNode.properties !== undefined &&
      materialNode.properties.Diffuse !== undefined
    ) {
      const textureFileName = materialNode.properties.Diffuse.filename;
      const textureFilePath = textureFilePaths.get(textureFileName);
      if (textureFilePath) {
        const map = textureLoader.load(textureFilePath);
        material.map = map;
      }
    }

    // Load other textures here if necessary

    return material;
  }
}
