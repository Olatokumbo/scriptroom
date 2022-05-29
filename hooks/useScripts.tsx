import { useEffect, useState } from "react";
import { IScript } from "../interfaces/script.interface";

const useScripts = (
  query: any,
  id?: string,
  needId?: boolean,
  nextQuery?: any
) => {
  const [scripts, setScripts] = useState<IScript[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [last, setLast] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (!id && needId) return;
      setLoading(true);
      try {
        const data = id ? await query(id) : await query();
        setLoading(false);
        if (data.scripts) {
          setScripts(data.scripts);
          setLast(data.last);
        } else setScripts(data);
      } catch (error: any) {
        alert(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id || query]);

  const next = async () => {
    const data = await nextQuery(last);
    setScripts((prev) => [...prev, ...data.scripts]);
    setLast(data.scripts.length == 10 ? data.last : null);
  };
  return { loading, scripts, last, next };
};

export default useScripts;
