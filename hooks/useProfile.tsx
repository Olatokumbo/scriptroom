import { useEffect, useState } from "react";
import { getUserById } from "../firebase/user";

const useProfile = (id: string) => {
  const [profile, setProfile] = useState<
    null | firebase.default.firestore.DocumentData | undefined
  >(undefined);
  const [notFound, setNotFound] = useState<null | boolean>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      if (!id) return;
      setLoading(true);
      const user = await getUserById(id);
      if (user === null) {
        setNotFound(true);
        alert("Profile Not Found");
      } else {
        setProfile(user);
        setNotFound(false);
      }
      setLoading(false);
    };
    getData();
  }, [id]);

  return { profile, notFound, loading };
};

export default useProfile;
