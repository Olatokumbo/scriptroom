import { useEffect, useState } from "react";
import { IScript } from "../interfaces/script.interface";

const useScripts = (query: any, id?: string, needId?: boolean) => {
  const [scripts, setScripts] = useState<IScript[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      if (!id && needId) return;
      setLoading(true);
      try {
        const data = id ? await query(id) : await query();
        setLoading(false);
        setScripts(data);
      } catch (error: any) {
        alert(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id || query]);

  return { loading, scripts };
};

export default useScripts;
