export const checkPdfFileTypeOrFail = (fileType: string) => {
  const splitFileType = fileType.split("/");

  if (!/application\/pdf/.test(fileType) || splitFileType.length !== 2)
    throw new Error("Invalid File type");

  return splitFileType[1];
  
};

export const checkImageFileTypeOrFail = (fileType: string) => {
  const splitFileType = fileType.split("/");

  if (!/image\/(jpeg|jpg|png|gif)/.test(fileType) || splitFileType.length !== 2)
    throw new Error("Invalid File type");

  return splitFileType[1];
};
