import './Root.css';
import LoadingModalOverlay from '../components/overlays/LoadingModalOverlay';

import { loadingContext } from '../context/loading-context';
import VirtualRoomDescriptionBox from '../components/virtual-room/VirtualRoomDescriptionBox';
import { Fragment, useContext, useState } from 'react';

function Root() {
  const title: string = 'button';

  return (
    <Fragment>
      <VirtualRoomDescriptionBox imageSrc='./assets/img/4.jpg' description='Virtual Room'/>
    </Fragment>
  );
}

export default Root;
