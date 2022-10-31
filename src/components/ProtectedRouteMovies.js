import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRouteMovies = ({componentHeader: ComponentHeader, componentMain: ComponentMain, componentFooter: ComponentFooter, ...props}) => {
  return (
    <Route>
      {
        () => props.loggedIn 
          && <>
              <ComponentHeader {...props} />
              <ComponentMain {...props} />
              <ComponentFooter />
            </>
      }
    </Route>
)}

export default ProtectedRouteMovies;