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
import { createScript } from "../../firebase/scripts";

const AddScript: NextPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("full-length-movies");
  const [description, setDescription] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // console.log(convertToRaw(editorState.getCurrentContent()).blocks);

  const save = () => {
    const body = convertToRaw(editorState.getCurrentContent()).blocks.map(
      (data) => data.text
    );

    createScript({
      title,
      author,
      description: description.split("/n"),
      body,
      category,
    });
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
          <ScriptEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />
          <Button
            disabled={
              !(
                title &&
                author &&
                category &&
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
