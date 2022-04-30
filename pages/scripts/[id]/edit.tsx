import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import PrivateRoute from "../../../hoc/PrivateRoute";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/user";
import {
  deleteScript,
  scriptById2,
  updateScript,
} from "../../../firebase/scripts";
import { ParsedUrlQuery } from "querystring";
import { IScript } from "../../../interfaces/script.interface";
import { PencilIcon } from "@heroicons/react/solid";
import useDisplayPhoto from "../../../hooks/useDisplayPhoto";
import {
  checkImageFileTypeOrFail
} from "../../../utils/checkFileType";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface IScriptInfo {
  script: IScript;
}

const EditScript: NextPage<IScriptInfo> = ({ script }) => {
  const {
    query: { id },
    push,
  } = useRouter();
  const { uid } = useRecoilValue(userState);
  const [title, setTitle] = useState(script.title);
  const [author, setAuthor] = useState(script.author);
  const [category, setCategory] = useState(script.category);
  const [description, setDescription] = useState(
    script.description.join("\r\n")
  );
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const display = useDisplayPhoto(coverPhoto);

  const [loading, setLoading] = useState<boolean>(false);

  const handleUploadCoverPhoto = (e: any) => {
    try {
      checkImageFileTypeOrFail(e.target.files[0].type);
      if (e.target.files[0] !== undefined) setCoverPhoto(e.target.files[0]);
    } catch (error) {
      alert(error);
    }
  };

  const save = async () => {
    setLoading(true);
    try {
      await updateScript(id as string, {
        title,
        category,
        description: description.split(/\r?\n/),
        author,
        coverPhoto,
        posterURL: script.posterURL
      });
      setLoading(false);
      alert("Script Updated");
      push(`/profile/${uid}`);
    } catch (error) {
      alert(error);
    }
  };

  const remove = async () => {
    setLoading(true);
    try {
      await deleteScript(id as string);
      setLoading(false);
      alert("Script Deleted");
      push(`/profile/${uid}`);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (script.userId !== uid) push("/");
  }, []);
  return (
    <>
      <Head>
        <title>Edit Script</title>
      </Head>
      <Layout>
        <div className="p-3 m-auto max-w-[42rem]">
          <h1 className="text-lg font-semibold">Edit Script</h1>
          <div className="h-40 w-full rounded-md relative">
            {uid === script.userId && (
              <div className="m-3 right-0 rounded-full absolute">
                <div>
                  <label htmlFor="photos">
                    <div className="p-3 rounded-full bg-gray-300 hover:bg-gray-200 hover:bg-opacity-90 bg-opacity-60 transition ease-in-out">
                      <PencilIcon
                        width={25}
                        height={25}
                        className="text-slate-800"
                      ></PencilIcon>
                    </div>
                  </label>
                  <input
                    type="file"
                    id="photos"
                    hidden
                    accept=".jpeg, .jpg, .png"
                    onChange={handleUploadCoverPhoto}
                    required
                  />
                </div>
              </div>
            )}
            <img
              className="h-full w-full object-cover rounded-md"
              src={display.length > 0 ? display : script.posterURL}
            />
          </div>
          <TextField
            size="medium"
            variant="outlined"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            size="small"
            variant="outlined"
            label="Author"
            margin="dense"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
          />
          <FormControl margin="dense">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              defaultValue="full-length-movies"
              label="Category"
              onChange={(e) => setCategory(e.target.value as string)}
            >
              <MenuItem value={"full-length-movies"}>
                Full length Movies
              </MenuItem>
              <MenuItem value={"stage-plays"}>Stage Plays</MenuItem>
              <MenuItem value={"musicals"}>Musicals</MenuItem>
              <MenuItem value={"spoken-word"}>Spoken Word</MenuItem>
              <MenuItem value={"short-films"}>Short Films</MenuItem>
              <MenuItem value={"skits"}>Skits</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            variant="outlined"
            label="Description"
            margin="dense"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={2}
            fullWidth
          />
          <div className="flex justify-between items-center">
            <Button
              disabled={!(title && category && description) || loading}
              onClick={save}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
            {loading && <CircularProgress />}
            <Button
              disabled={loading}
              onClick={remove}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PrivateRoute(EditScript);

export const getServerSideProps: GetServerSideProps = async (context) => {
  let script;
  const { id } = context.params as IParams;
  try {
    script = await scriptById2(id);
    script = JSON.parse(script);
  } catch (error) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      script,
    },
  };
};
