import { Fragment } from "react"
import './ErrorPage.css'
const ErrorPage:React.FC=()=>{
    return(
        <Fragment>
            <div className='error-page'>
                <h1>Oops 404 Page not found</h1>
            </div>
        </Fragment>
    )
}

export default ErrorPage;