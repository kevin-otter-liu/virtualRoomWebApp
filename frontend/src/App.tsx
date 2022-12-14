import './App.css';
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import VirtualRoomThumbnail from './components/displays/VirtualRoomThumbnail';
import LoadingModalOverlay from './components/overlays/LoadingModalOverlay';
import VirtualRoomCanvas from './components/displays/VirtualRoomCanvas';

import { loadingContext } from './context/loading-context';

import { Fragment, useContext, useState } from 'react';

function App() {
  const title: string = 'button';

  const ctx = useContext(loadingContext);

  const [showVirtualRoom, setShowVirtualRoom] = useState(true);

  function onClickHandler(event: React.MouseEvent) {
    ctx.setIsLoadingContext(true);
  }


  return (
    <Fragment>
        {showVirtualRoom && <VirtualRoomCanvas
          url='./bundle.js'
          id='virtual-room-root'
          setShowVirtualRoom={setShowVirtualRoom}></VirtualRoomCanvas>}
      {ctx.isLoading && (
        <LoadingModalOverlay title='Please wait' message='LOADING...' />
      )}
      <VirtualRoomThumbnail src='./react.svg' />
      <Card>
        <Button onClick={onClickHandler}>Button</Button>
      </Card>
    </Fragment>
  );
}

export default App;
