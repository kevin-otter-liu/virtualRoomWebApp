import './Root.css';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import LoadingModalOverlay from '../components/overlays/LoadingModalOverlay';
import VirtualRoomCanvas from '../components/displays/VirtualRoomCanvas';

import { loadingContext } from '../context/loading-context';
import VirtualRoomDescriptionBox from '../components/virtual-room/VirtualRoomDescriptionBox';
import { Fragment, useContext, useState } from 'react';

function Root() {
  const title: string = 'button';


  const [showVirtualRoom, setShowVirtualRoom] = useState(false);

  function onEnterVirtualRoomHandler(event: React.MouseEvent) {
    setShowVirtualRoom(true);
  }

  function onExitVirtualRoomHandler(event: React.MouseEvent) {
    setShowVirtualRoom(true);
  }

  return (
    <Fragment>
      <VirtualRoomDescriptionBox imageSrc='./img/xn.jpg' description='Virtual Room' onClick={onEnterVirtualRoomHandler}/>
        {showVirtualRoom && <VirtualRoomCanvas
          setShowVirtualRoom={setShowVirtualRoom}></VirtualRoomCanvas>}
    </Fragment>
  );
}

export default Root;
