import { Fragment } from 'react';
import { useRouteError } from 'react-router-dom';
import './ErrorPage.css';
type RouteError = {
    statusText?: string;
    message?:string;
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as RouteError;
  return (
    <Fragment>
      <div className='error-page'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error?.statusText || error.message}</i>
        </p>
      </div>
    </Fragment>
  );
};

export default ErrorPage;
