import dbConn from '../config';
// import User from './User';
// import Image from './Image';
// import VirtualRoom from './VirtualRoom';

// sync model
dbConn.sync({ alter: true }).then(() => {
  console.log('model synced');
});

// export { User, Image, VirtualRoom };
