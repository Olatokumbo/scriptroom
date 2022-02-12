import { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import { EditorState } from "draft-js";
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

const AddScript: NextPage = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  
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
            margin="normal"
            fullWidth
          />

          <TextField
            size="small"
            variant="outlined"
            label="Author"
            margin="dense"
            fullWidth
          />
          <FormControl margin="dense">
            <InputLabel id="demo-simple-select-label">Genre</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value=
              defaultValue="full-length-movies"
              label="Genre"
              // onChange={handleChange}
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
          <Button variant="contained" color="primary">
            Save
          </Button>
        </div>
      </Layout>
    </>
  );
};

export default AddScript;
