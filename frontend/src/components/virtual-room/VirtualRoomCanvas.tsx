import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { useEffect, useRef } from 'react';
import VirtualRoomCanvasPropI from '../../types/displays/VirtualRoomCanvasPropI';
import VirtualRoomButton from '../ui/VirtualRoomButton';
import './VirtualRoomCanvas.css';
import { ExtrudeGeometry } from 'three';

const renderVirtualRoom =(canvasRef:HTMLCanvasElement):void=>{
    const scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(5));

    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);

    const textureLoader = new THREE.TextureLoader().setPath('img/');

    const images = ['zp.jpg', 'zn.jpg', 'yp.jpg', 'yn.jpg', 'xp.jpg', 'xn.jpg'];
    const materials = images.map((img) => {
      return new THREE.MeshBasicMaterial({
        map: textureLoader.load(img),
        side: THREE.BackSide,
      });
    });

    const cube = new THREE.Mesh(boxGeometry, materials);
    cube.position.x = 0;
    scene.add(cube);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 0);
    camera.lookAt(0, 1, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef,
    });

    const text = "random text"
    const parameters = {
      font: 'helvetiker',
      size:100,

    }


    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }


    function animate() {
      requestAnimationFrame(animate);

      render();
    }

    function render() {
      renderer.render(scene, camera);
    }

    animate();
}

// Virtual Room Component
const VirtualRoomCanvas: React.FC<VirtualRoomCanvasPropI> = (props) => {
  
    const componentRef = useRef() as React.RefObject<HTMLCanvasElement>;

  // render virtual room on component mount
  useEffect(()=>{
    renderVirtualRoom(componentRef.current!)
  }, []);

  // button to close virtual Room
  const onClickHandler = (event:React.MouseEvent): void => {
    props.onExitVirtualRoomHandler(event);
    componentRef.current?.remove();
  };

  return (
    <div>
      <VirtualRoomButton type='button' onClick={onClickHandler}>Exit Virtual Room</VirtualRoomButton>
      <canvas className='container' ref={componentRef}></canvas>
    </div>
  );
};

export default VirtualRoomCanvas;
