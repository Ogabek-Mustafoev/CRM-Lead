import {Fragment} from "react";
import {Routes, Route} from "react-router-dom";
import {BaseLayout, LoginLayout} from "@/components";
import {filteredRoutes} from "@/modules/routes.js";
import {authRoutes} from "@/modules/auth/route.js";

const nestedRoutes = (routes) =>
  routes.map(({Element, path, children = []}) => {
    if (children?.length) {
      return (
        <Fragment key={path}>
          <Route key={path} path={path} element={<Element/>}/>
          {nestedRoutes(children)}
        </Fragment>
      );
    }
    return <Route key={path} path={path} element={<Element/>}/>;
  });

export const AuthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout/>}>
        {nestedRoutes(filteredRoutes)}
      </Route>
    </Routes>
  );
};

export const UnAuthorizedRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginLayout/>}>
      {authRoutes.map(({Element, path}) => (
        <Route key={path} path={path} element={<Element/>}/>
      ))}
    </Route>
  </Routes>
);
