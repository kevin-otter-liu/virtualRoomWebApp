import { Canvas } from '@react-three/fiber';
import { Fragment, useContext, useEffect } from 'react';
import CreateVirtualHouseForm from '../components/forms/CreateVirtualHouseForm';
import VirtualRoomButton from '../components/ui/VirtualRoomButton';
import VirtualHouseCanvas from '../components/virtual-room/VirtualHouseCanvas';
import { AuthContext } from '../context/auth-context';
import { VirtualHouseContext } from '../context/virtual-house-context';
import { VirtualHouse } from '../types/responses/VirtualHouse';
const CreateVirtualHousePage: React.FC = () => {
  useEffect(() => {
    console.log('virtualhouseform page rerendered');
    const checkAuthRefresh = async () => {
      console.log('checking authorization');
      await authCtx.checkAuth();
    };
    checkAuthRefresh();
  });
  const authCtx = useContext(AuthContext);
  const VHctx = useContext(VirtualHouseContext);

  const handlePostSubmit = (virtualHouseRes: VirtualHouse) => {
    VHctx.setVirtualHouse(virtualHouseRes);
  };

  // exit Virtual Room Handler
  const onExitVirtualRoomHandler = (event: React.MouseEvent) => {
    VHctx.setVirtualHouse(null);
  };

  //
  return (
    <Fragment>
      {authCtx.isLoggedIn && (
        <Fragment>
          <CreateVirtualHouseForm handlePostSubmit={handlePostSubmit} />
          {VHctx.virtualHouse && (
            <div className='container'>
              <VirtualRoomButton
                type='button'
                onClick={onExitVirtualRoomHandler}>
                Exit Virtual Room{' '}
              </VirtualRoomButton>
              <Canvas>
                <VirtualHouseCanvas createMode />
              </Canvas>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreateVirtualHousePage;
