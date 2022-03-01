import { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import { useState } from "react";

import {
  Button,
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

const AddScript: NextPage = () => {
  const router = useRouter();
  const { uid } = useRecoilValue(userState);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("full-length-movies");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
            <label htmlFor="photos">
              <div className="flex">
                <UploadIcon className="h-7 w-7 text-gray-500" />
                <h1 className="font-bold text-gray-700">Upload PDF</h1>
              </div>
            </label>
            <input
              type="file"
              id="photos"
              // multiple
              hidden
              accept=".pdf"
              onChange={handleUpload}
              required
            />
          </div>
          <Button
            disabled={!(title && author && category && file) || loading}
            onClick={save}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </div>
      </Layout>
    </>
  );
};

export default PrivateRoute(AddScript);
