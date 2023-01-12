import { Canvas } from '@react-three/fiber';
import { Fragment, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateVirtualHouseForm from '../components/forms/CreateVirtualHouseForm';
import VirtualRoomButton from '../components/ui/VirtualRoomButton';
import VirtualHouseCanvas from '../components/virtual-room/VirtualHouseCanvas';
import { AuthContext } from '../context/auth-context';
import { VirtualHouseContext } from '../context/virtual-house-context';
import { VirtualHouse } from '../types/responses/VirtualHouse';
const CreateVirtualHousePage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('virtualhouseform page rerendered');
    const checkAuthRefresh = async () => {
      console.log('checking authorization');
      await authCtx.checkAuth();
    };
    checkAuthRefresh();
  });
  const authCtx = useContext(AuthContext);

  !authCtx.isLoggedIn && navigate('/');

  const VHctx = useContext(VirtualHouseContext);
  console.log('createvirtualhousepage');
  console.log(authCtx.isLoggedIn);

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
                <VirtualHouseCanvas createMode={true} />
              </Canvas>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreateVirtualHousePage;
