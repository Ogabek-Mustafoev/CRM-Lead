import {useEffect, useState} from "react";
import {httpClient} from "@/utils/index.js";
import {PageLoading} from "@/components/index.js";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {logIn, logOut} from "@/store/auth-slice/index.js";
import {AuthorizedRoutes, UnAuthorizedRoutes} from "@/router";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname, search} = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const {isAuth} = useSelector((state) => state.auth);
  const isPublicApi = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const {data} = await httpClient({
        method: "post",
        url: "/auth/me",
      });
      const link = localStorage.getItem("link");
      dispatch(logIn(data?.snapData));
      if (link !== '/') return navigate(link);
      navigate("/lead");
    } catch (err) {
      console.log(err);
      dispatch(logOut());
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("link", `${pathname}${search}`);
  }, [pathname, search]);

  useEffect(() => {
    if (isPublicApi) {
      fetchData();
    } else {
      dispatch(logOut())
      setIsLoading(false)
      navigate("/login");
    }
  }, [isAuth]);

  return isLoading ? <PageLoading/> : isAuth ? <AuthorizedRoutes/> : <UnAuthorizedRoutes/>;
}

export default App;
