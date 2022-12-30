import axios, { AxiosResponse } from 'axios';
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import VirtualHouseDescriptionBox from '../components/virtual-room/VirtualHouseDescriptionBox';
import { AuthContext } from '../context/auth-context';
import { VirtualHouse } from '../types/contexts/responses/VirtualHouse';
import './MyVirtualHousesPage.css'

const MyVirtualHousesPage: React.FC = () => {
  const [virtualHouses, setVirtualHouses] = useState<Array<VirtualHouse>>([]);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    console.log('my-virtual-houses page rerendered');
    const checkAuthRefresh = async () => {
      console.log('checking authorization');
      await authCtx.checkAuth();
    };
    checkAuthRefresh();
    getAllVirtualHouses();
  }, []);

  const getAllVirtualHouses = useCallback(async () => {
    let res: AxiosResponse<Array<VirtualHouse>> = await axios.get(
      'http://localhost:3000/virtual-house/',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    console.log('loaded virtual hosues');
    setVirtualHouses(res.data);

  }, [virtualHouses]);

  const renderDescription = () => {
    if (!authCtx.isLoggedIn) {
      return <div>Not Logged in</div>;
    }

    if (virtualHouses.length > 0) {
      const descriptionBoxes = virtualHouses.map((virtualHouse) => {
        console.log('virtual rooms');
        return (
          <VirtualHouseDescriptionBox
            virtualHouse={virtualHouse}
            key={virtualHouse.id}
            imageSrc={'#'}
            description={''}
            createMode={false}
          />
        );
      });

      return descriptionBoxes;
    }

    return <div>No virtual houses yet</div>;
  };
  return (
    <Fragment>
      <div className='my-virtual-houses-page'>
        <h1>Your Virtual Houses</h1>
        {renderDescription()}
      </div>
    </Fragment>
  );
};

export default MyVirtualHousesPage;
