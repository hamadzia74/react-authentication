import { Redirect, Route } from 'react-router-dom';
import { useUser } from './useUser'

export const PrivateRoute = props => {
    // const user = null;
    const user = useUser(); // That will allow us to actually access these routes once the user's logged in.
    if(!user) return <Redirect to="/login"/>
    return <Route {...props} />
}