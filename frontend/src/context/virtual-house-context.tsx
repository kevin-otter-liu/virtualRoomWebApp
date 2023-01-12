import React, { useEffect, useState } from 'react';
import VirtualHouseContextProviderPropI from '../types/contexts/VirtualHouseContextPropI';
import VirtualHouseContextI from '../types/contexts/VirtualHouseContextI';
import {VirtualHouse} from '../types/responses/VirtualHouse'
import { VirtualWall } from '../types/responses/VirtualWall';


export const VirtualHouseContext = React.createContext<VirtualHouseContextI>({
  virtualHouse: null,
  setVirtualHouse: ()=>{},
  getNextRoomFromWallId: ()=>{},
});

export const VirtualHouseProvider: React.FC<VirtualHouseContextProviderPropI> = (props) => {
  const [virtualHouse, setVirtualHouse] = useState<VirtualHouse|null>(null);
  useEffect(()=>{
    console.log('virtualhouse provider re-rendered')
    console.log(`current virtual hosue context:`)
    console.log(virtualHouse)
  })

  const getRoomFromId = (currentRoomId:string )=>{

    if(!virtualHouse){
      return null
    }

    let foundRoom = virtualHouse.virtual_rooms.find((room)=>{
      return room.id===currentRoomId})
    console.log(`found room`)
    console.log(foundRoom)
    if(!foundRoom){
      return null
    }
    return foundRoom
  }

  const getNextRoomFromWallId = (currentWallId:string) => {
    if(!virtualHouse){
      return null
    }
    console.log(virtualHouse)

    for(let virtualRoom of virtualHouse.virtual_rooms) {
      for(let virtualWall of virtualRoom.virtual_walls){
        if(virtualWall.id == currentWallId){
          let curr_wall = virtualWall
          if(!curr_wall.next_room){
            return null
          }

          return getRoomFromId(curr_wall.next_room)
        }
      }
    }
  }


  return (
    <VirtualHouseContext.Provider
      value={{
        setVirtualHouse:setVirtualHouse,
        virtualHouse:virtualHouse,
        getNextRoomFromWallId:getNextRoomFromWallId
      }}>
      {props.children}
    </VirtualHouseContext.Provider>
  );
};
