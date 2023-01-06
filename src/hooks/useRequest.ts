import { useEffect, useState } from "react";

const useRequest = <T>(request: Function) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const sendRequest = async () => {
    const res = await request();
    setData(res)
  };
  useEffect(() => {
    sendRequest()
  }, []);
  return {
    data,
    setData,
    loading,
  };
};
export default useRequest;
