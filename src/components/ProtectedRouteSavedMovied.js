import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRouteSavedMovies = ({componentHeader: ComponentHeader, componentMain: ComponentMain, componentFooter: ComponentFooter, ...props}) => {
  return (
    <Route>
      {
        () => props.loggedIn 
              ? <>
                  <ComponentHeader {...props} />
                  <ComponentMain {...props} />
                  <ComponentFooter />
                </>
              : <Redirect to="/signin" />
      }
    </Route>
)}

export default ProtectedRouteSavedMovies;