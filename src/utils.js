export const isImage = fileName => {
  const imgExtensions = ["gif", "png", "jpg", "jpeg", "svg", "bmp"];
  const fileNameChunks = fileName.split('.');
  return fileNameChunks.length > 1 &&
    imgExtensions
      .indexOf(fileNameChunks[fileNameChunks.length - 1].toLowerCase()) !== -1;
};