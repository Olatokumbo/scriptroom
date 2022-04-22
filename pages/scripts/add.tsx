import { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import { useState } from "react";

import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { uploadScript } from "../../firebase/scripts";
import { UploadIcon } from "@heroicons/react/outline";
import PrivateRoute from "../../hoc/PrivateRoute";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/user";
import useDisplayPhoto from "../../hooks/useDisplayPhoto";

const AddScript: NextPage = () => {
  const router = useRouter();
  const { uid } = useRecoilValue(userState);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("full-length-movies");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const display = useDisplayPhoto(coverPhoto);

  const handleUploadCoverPhoto = (e: any) => {
    if (e.target.files[0] !== undefined) setCoverPhoto(e.target.files[0]);
  };

  const handleUpload = (e: any) => {
    setFile(e.target.files[0]);
  };

  const save = async () => {
    setLoading(true);
    await uploadScript({
      title,
      author,
      description: description.split("/n"),
      category,
      file,
      coverPhoto,
    });

    setLoading(false);
    alert("Script Uploaded");
    router.push(`/profile/${uid}`);
  };

  return (
    <>
      <Head>
        <title>Add Script</title>
      </Head>
      <Layout>
        <div className="p-3 m-auto max-w-[42rem]">
          <h1 className="text-lg font-semibold">Add Script</h1>
          <div>
            <div className="bg-slate-400 h-32 w-full rounded-lg flex border-2 border-slate-600">
              <img src={display} className="w-full object-cover rounded-lg" />
            </div>
            <div className="mt-2 mb-5">
              <label htmlFor="photos">
                <div className="flex">
                  <UploadIcon className="h-7 w-7 text-gray-500" />
                  <h1 className="font-bold text-gray-700">
                    Upload Cover Photo
                  </h1>
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
          {/* <ScriptEditor
            editorState={editorState}
            setEditorState={setEditorState}
          /> */}
          <div className="mt-2 mb-5">
            <label htmlFor="script">
              <div className="flex border-2 border-slate-600 w-fit p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
                <UploadIcon className="h-7 w-7 text-gray-500" />
                <h1 className="font-bold text-gray-700">Upload PDF</h1>
              </div>
            </label>
            <input
              type="file"
              id="script"
              // multiple
              hidden
              accept=".pdf"
              onChange={handleUpload}
              required
            />
          </div>
          <div className="flex items-center">
            <Button
              disabled={
                !(title && author && category && file && coverPhoto) || loading
              }
              onClick={save}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            {loading && <CircularProgress />}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PrivateRoute(AddScript);
