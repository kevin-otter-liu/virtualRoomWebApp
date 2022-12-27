import { Fragment, useContext } from 'react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import './OptionsPage.css'
import { AuthContext } from '../context/auth-context';
const OptionsPage: React.FC = () => {
  const authCtx = useContext(AuthContext)
  const onLogout = () => {
    authCtx.logout();
  };

  return (
    <Fragment>
      <div className='options-container'>
        <Link to='/'>
        <Button type='button' onClick={onLogout}>
          logout
        </Button>
        </Link>
        <Link to='/my-virtual-houses'>
          <Button type='button'>Create a Virtual House</Button>
        </Link>
        <Link to='/my-virtual-houses'>
          <Button type='button'>View other Virtual Houses</Button>
        </Link>
      </div>
    </Fragment>
  );
};

export default OptionsPage;
