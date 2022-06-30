import React from "react";

export function useFetchAPI(url, option) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);
    async function getDataAPI() {
      try {
        if (!url) return;
        const respon = await fetch(url, option, signal);
        const data = await respon.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setErrMsg(error);
      }
    }
    getDataAPI();
    return () => controller.abort();
  }, [url]);
  return [data, loading, errMsg];
}

// note: how to use

// const [data, loading, errMsg] = useFetchAPI('your url')

// return (
//   <div>
//     {loading ? 'loading...' : <YourComponent data={data} />}
//     {errMsg && <p>{errMsg}</p>}
//   </div>
// )
