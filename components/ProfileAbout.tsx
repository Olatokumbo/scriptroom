import { Button, CircularProgress, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { updateProfile } from "../firebase/user";
import useProfile from "../hooks/useProfile";
import { userState } from "../store/user";

interface IProfileAbout {
  id: string;
}
const ProfileAbout: React.FC<IProfileAbout> = ({ id }) => {
  const { profile, setProfile } = useProfile(id as string);
  const { uid } = useRecoilValue(userState);
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const canEdit = uid === id;

  useEffect(() => {
    profile && setDescription(profile?.description);
  }, [profile]);

  const handleCancel = () => {
    profile && setDescription(profile?.description);
    setEditMode(false);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateProfile(id, {
        description,
      });

      setProfile({...profile, description})
      alert("Profile Updated");
      setEditMode(false);
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };
  return (
    <div>
      {profile && (
        <div>
          <div className="flex justify-between">
            <h1 className="text-gray-500 font-semibold mr-2">Description</h1>
            {canEdit && (
              <h2
                className="underline text-gray-500 cursor-pointer"
                onClick={() => setEditMode(true)}
              >
                Edit
              </h2>
            )}
          </div>
          {editMode && canEdit ? (
            <div>
              <TextField
                size="small"
                variant="outlined"
                label="Description"
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                minRows={2}
                fullWidth
              />
              {loading && (
                <CircularProgress style={{ marginLeft: 20, marginRight: 20 }} />
              )}
              <div className="flex items-center">
                <Button
                  onClick={handleCancel}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  style={{ marginLeft: 10 }}
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              </div>
            </div>
          ) : (
            <h1 className="mt-2">{description}</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileAbout;
