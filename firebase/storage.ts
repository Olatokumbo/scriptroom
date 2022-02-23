import firebase, { storage } from "./config";

export const fileUpload = (file: File, path: string, name: string) => {
    return new Promise((resolve, reject) => {
  
      const uploadTask = storage.ref().child(`/${path}/${name}.${file.type.split("/")[1]}`).put(file as File);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          resolve(downloadURL);
        }
      );
    });
  };