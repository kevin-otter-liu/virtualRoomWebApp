import React, { useEffect, useState } from 'react';
import VirtualHouseContextProviderPropI from '../types/contexts/VirtualHouseContextPropI';
import VirtualHouseContextI from '../types/contexts/VirtualHouseContextI';
import {VirtualHouse} from '../types/responses/VirtualHouse'

export const VirtualHouseContext = React.createContext<VirtualHouseContextI>({
  virtualHouse: null,
  setVirtualHouse: ()=>{}
});

export const VirtualHouseProvider: React.FC<VirtualHouseContextProviderPropI> = (props) => {
  const [virtualHouse, setVirtualHouse] = useState<VirtualHouse|null>(null);
  useEffect(()=>{
    console.log('virtualhouse provider re-rendered')
    console.log(`current virtual hosue context:`)
    console.log(virtualHouse)
  })

  return (
    <VirtualHouseContext.Provider
      value={{
        setVirtualHouse:setVirtualHouse,
        virtualHouse:virtualHouse
      }}>
      {props.children}
    </VirtualHouseContext.Provider>
  );
};
