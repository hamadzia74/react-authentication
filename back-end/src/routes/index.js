import { logInRoute } from './logInRoute';
import { signUpRoute } from './signUpRoute';
import { testEmailRoute } from './testEmailRoute';
import { testRoute } from './testRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoutes';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { resetPasswordRoute } from './resetPasswordRoute';

export const routes = [
    testRoute,
    signUpRoute,
    // And then in order to make our server pay attention to environment variable "JWT_SECRET" when it starts up,
    // So, we just have to add a little thing to our server startup command. So, open up the package.json file.
    // Add -r dotenv/config - make the dotenv package load all of our environment variables right when the server starts up.
    logInRoute,
    resetPasswordRoute,
    updateUserInfoRoute,
    testEmailRoute,
    verifyEmailRoute,
    forgotPasswordRoute,
];
