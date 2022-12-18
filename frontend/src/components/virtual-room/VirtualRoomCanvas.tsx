import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

import { useEffect, useRef } from 'react';
import VirtualRoomCanvasPropI from '../../types/displays/VirtualRoomCanvasPropI';
import VirtualRoomButton from '../ui/VirtualRoomButton';
import './VirtualRoomCanvas.css';
import {
  ArrowHelper,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  TextureLoader,
  WebGLRenderer,
} from 'three';

class VirtualHouseRender {
  private scene;
  private camera: PerspectiveCamera | null;
  private renderer: WebGLRenderer | null;
  private controls: TrackballControls | null;
  private raycaster: Raycaster;
  private sceneMeshes: Object3D[];
  // private arrowHelper:ArrowHelper;

  // x: length,y:width,z:height
  constructor() {
    this.scene = new THREE.Scene();
    // this.scene.add(new THREE.AxesHelper(5));
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.raycaster = new THREE.Raycaster();
    this.sceneMeshes = [];
    // this.arrowHelper = new THREE.ArrowHelper(
    // new THREE.Vector3(),
    // new THREE.Vector3(),
    // .25,
    // 0xffff00)
    // this.scene.add(this.arrowHelper)

    // create a room for the entry Room
    // load initial cube with no images, default images are on public/assets
  }
  loadCubeRoom(x: number, y: number, z: number) {
    console.log('loading CubeRoom');
    const boxGeometry = new THREE.BoxGeometry(x, y, z);

    // load defaultimages onto the walls
    const textureLoader = new THREE.TextureLoader().setPath(
      'assets/default-walls/'
    );
    const image_urls = this.getDefaultWallImagesUrl('default.png');
    const materials = this.loadWallDefaultWallMaterial(
      textureLoader,
      image_urls
    );

    // create cube
    const cube = new THREE.Mesh(boxGeometry, materials);
    // place the cube such that its left corner is at the x-y axis
    cube.position.x = 0;
    this.scene.add(cube);
  }

  // create a perspective camera
  createCamera(
    initial_x: number,
    initial_y: number,
    initial_z: number,
    look_at_x: number,
    look_at_y: number,
    look_at_z: number
  ): PerspectiveCamera {
    console.log('creating cameras');

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // red:x, green:y,blue: z
    this.camera.position.set(initial_x, initial_y, initial_z);
    this.camera.lookAt(look_at_x, look_at_y, look_at_z);
    return this.camera;
  }

  // create a renderer object
  createRenderer(canvasRef: HTMLCanvasElement) {
    console.log('creating renderer');
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // add controls functionality
  addControls() {
    console.log('creating controls');

    if (this.camera == null) {
      console.log(`camera is not initialised`);
      throw new Error();
    }

    if (this.renderer == null) {
      console.log(`renderer is not initialised`);
      throw new Error();
    }
    this.controls = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
  }

  defineWindowResizeHandler() {
    console.log('initialising window resize listener');
    window.addEventListener(
      'resize',
      () => {
        if (this.camera == null) {
          console.log(`camera is not initialised`);
          throw new Error();
        }

        if (this.renderer == null) {
          console.log(`renderer is not initialised`);
          throw new Error();
        }
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
      },
      false
    );
  }

  animate() {
    if (this.controls == null) {
      console.log(`controls not initialised`);
      throw new Error();
    }

    if (this.renderer == null) {
      console.log(`renderer not initialised`);
      throw new Error();
    }

    if (this.camera == null) {
      console.log(`renderer not initialised`);
      throw new Error();
    }

    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  defineChangeHandler() {
    console.log('initialising change event listener');
    window.addEventListener('change', this.animate.bind(this));
  }

  // helper functions
  // gets all the urls of the default images
  getDefaultWallImagesUrl(defaultImageName: string): string[] {
    const images = [];
    for (let i = 0; i < 6; i++) {
      images.push(defaultImageName);
    }

    return images;
  }

  loadWallDefaultWallMaterial(
    textureLoader: TextureLoader,
    image_urls: Array<string>
  ): Array<MeshBasicMaterial> {
    const materials = image_urls.map((img) => {
      return new THREE.MeshBasicMaterial({
        map: textureLoader.load(img),
        side: THREE.BackSide,
      });
    });

    return materials;
  }

  updateCurrentSceneMeshes() {
    const sceneMeshes: Object3D[] = [];
    const queue = this.scene.children;

    while (queue.length > 0) {
      const currentChild = queue.shift();
      sceneMeshes.push(currentChild!);

      if (currentChild?.children) {
        for (let i = 0; i < currentChild.children.length; i++) {
          queue.push(currentChild.children[i]);
        }
      }
    }
    this.sceneMeshes = sceneMeshes;
  }

  addMouseEventListener() {
    console.log('added mouse event listener');
    const handler = (event: MouseEvent) => {
      if (this.renderer == null) {
        console.log(`renderer is not initialised`);
        throw new Error();
      }
      if (this.camera == null) {
        console.log(`renderer is not initialised`);
        throw new Error();
      }
      // getting normalised coordinates of the mouse
      const mouse = {
        x: (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1,
        y: -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1,
      };

      this.raycaster.setFromCamera(mouse, this.camera);
      this.updateCurrentSceneMeshes();
      const intersects = this.raycaster.intersectObjects(
        this.scene.children,
        false
      );

      // note intersects[0].face.index is the same direction as the images
      if (intersects.length > 0) {
        console.log(intersects[0]);
        // let n = new THREE.Vector3()
        // n.copy((intersects[0].face as THREE.Face).normal)

        // this.arrowHelper.setDirection(n);
        // this.arrowHelper.position.copy(intersects[0].point)
      }
    };
    window.addEventListener('mousemove', handler.bind(this));
  }
}

const VirtualRoomCanvas: React.FC<VirtualRoomCanvasPropI> = (props) => {
  const componentRef = useRef() as React.RefObject<HTMLCanvasElement>;

  // render virtual room on component mount
  useEffect(() => {
    const virtualHouse = new VirtualHouseRender();
    virtualHouse.loadCubeRoom(2, 2, 2);
    virtualHouse.createCamera(1, 0, 0, 0, 0, 1);
    virtualHouse.createRenderer(componentRef.current!);
    virtualHouse.addControls();
    virtualHouse.defineWindowResizeHandler();
    virtualHouse.defineChangeHandler();
    // virtualHouse.addMouseEventListener();
    virtualHouse.animate();
  }, []);

  // button to close virtual Room
  const onClickHandler = (event: React.MouseEvent): void => {
    props.onExitVirtualRoomHandler(event);
  };

  return (
    <div>
      <VirtualRoomButton type='button' onClick={onClickHandler}>
        Exit Virtual Room
      </VirtualRoomButton>
      <canvas className='container' ref={componentRef}></canvas>
    </div>
  );
};

export default VirtualRoomCanvas;

// const renderVirtualRoom =(canvasRef:HTMLCanvasElement):void=>{
//     const scene = new THREE.Scene();
//     scene.add(new THREE.AxesHelper(5));

//     const boxGeometry = new THREE.BoxGeometry(2, 2, 2);

//     const textureLoader = new THREE.TextureLoader().setPath('img/');

//     const images = ['zp.jpg', 'zn.jpg', 'yp.jpg', 'yn.jpg', 'xp.jpg', 'xn.jpg'];
//     const materials = images.map((img) => {
//       return new THREE.MeshBasicMaterial({
//         map: textureLoader.load(img),
//         side: THREE.BackSide,
//       });
//     });

//     const cube = new THREE.Mesh(boxGeometry, materials);
//     cube.position.x = 0;
//     scene.add(cube);

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );

//     // red:x, green:y,blue: z
//     camera.position.set(1, 0, 0);
//     camera.lookAt(0, 0, 1);

//     const renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       canvas: canvasRef,
//     });

//     renderer.setSize(window.innerWidth, window.innerHeight);

//     const controls = new TrackballControls(camera,renderer.domElement);

//     // controls.addEventListener('change', () => console.log("Controls Change"))
//     // controls.addEventListener('start', () => console.log("Controls Start Event"))
//     // controls.addEventListener('end', () => console.log("Controls End Event"))
//     controls.rotateSpeed = 1.0
//     controls.zoomSpeed = 1.2
//     controls.panSpeed = 0.8

//     window.addEventListener('resize', onWindowResize, false);

//     function onWindowResize() {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.render(scene, camera);
//     }

//     const animate = ()=>{
//       requestAnimationFrame(animate)
//       controls.update()
//       renderer.render(scene, camera);
//     }

//     window.addEventListener('change',animate)

//     animate()

// }
