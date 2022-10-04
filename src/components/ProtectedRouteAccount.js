import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRouteAccount = ({componentHeader: ComponentHeader, componentAccount: ComponentAccount, ...props}) => {
  return (
    <Route>
      {
        () => props.loggedIn 
              ? <>
                  <ComponentHeader {...props} />
                  <ComponentAccount {...props} />
                </>
              : <Redirect to="/signin" />
      }
    </Route>
)}

export default ProtectedRouteAccount;