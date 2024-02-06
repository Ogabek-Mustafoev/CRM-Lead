import {CirclesWithBar} from "react-loader-spinner";

export const PageLoading = () => {
  return (
    <CirclesWithBar
      height="100"
      width="100"
      color="#4fa94d"
      outerCircleColor="#001529"
      innerCircleColor="#001529"
      barColor="#001529"
      ariaLabel="circles-with-bar-loading"
      wrapperStyle={{}}
      wrapperClass="h-screen w-screen flex items-center justify-center"
      visible={true}
    />
  )
}
