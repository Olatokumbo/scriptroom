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
import {
  checkImageFileTypeOrFail,
  checkPdfFileTypeOrFail,
} from "../../utils/checkFileType";

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
    if (e.target.files[0] === undefined) return;
    try {
      checkImageFileTypeOrFail(e.target.files[0].type);
      setCoverPhoto(e.target.files[0]);
    } catch (error) {
      alert(error);
    }
  };

  const handleUpload = (e: any) => {
    if (e.target.files[0] === undefined) return;
    try {
      checkPdfFileTypeOrFail(e.target.files[0].type);
      setFile(e.target.files[0]);
    } catch (error) {
      alert(error);
    }
  };

  const save = async () => {
    setLoading(true);
    await uploadScript({
      title,
      author,
      description: description.split(/\r?\n/),
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
                {/* <div className="flex"> */}
                {/* <UploadIcon className="h-7 w-7 text-gray-500" /> */}
                <h1 className="font-bold text-gray-700 mb-2">Cover Photo</h1>
                {/* </div> */}
              </label>
              <input
                type="file"
                id="photos"
                className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
              "
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
          <div className="mt-2 mb-5">
            <label htmlFor="script">
              <h1 className="font-bold text-gray-700 mb-3">Upload PDF</h1>
            </label>
            <input
              type="file"
              id="script"
              className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
              "
              hidden
              accept=".pdf"
              onChange={handleUpload}
              required
            />
          </div>
          <div className="flex items-center">
            <Button
              disabled={
                !(
                  title &&
                  author &&
                  category &&
                  file &&
                  coverPhoto &&
                  description
                ) || loading
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
