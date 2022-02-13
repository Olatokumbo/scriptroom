import { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import { convertToRaw, EditorState } from "draft-js";
import { useState } from "react";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import ScriptEditor from "../../components/Editor";
import { functions } from "../../firebase/config";

const AddScript: NextPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("full-length-movies");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  console.log(convertToRaw(editorState.getCurrentContent()).blocks);

  const save = () => {
    const data = functions.httpsCallable("getPdfUrl");
    data({ title, author, genre })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log(e.message));
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
            <InputLabel id="demo-simple-select-label">Genre</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={genre}
              defaultValue="full-length-movies"
              label="Genre"
              onChange={(e) => setGenre(e.target.value as string)}
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
          <ScriptEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />
          <Button
            disabled={
              !(
                title &&
                author &&
                genre &&
                editorState.getCurrentContent().hasText()
              )
            }
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

export default AddScript;
