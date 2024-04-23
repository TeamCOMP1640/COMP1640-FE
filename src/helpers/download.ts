import JSZip from "jszip";
import { saveAs } from "file-saver";

export const downloadFilesAsZip = async (
  imageUrl: string,
  wordFileName: string
) => {
  const zip = new JSZip();

  // Fetch the Image
  const imageResponse = await fetch(imageUrl);
  const imageData = await imageResponse.blob();

  // Fetch the Word file
  const wordResponse = await fetch(
    `http://localhost:8080/Articles/uploads/${wordFileName}`
  );
  const wordData = await wordResponse.blob();

  // Add to ZIP
  zip.file("Image.png", imageData);
  zip.file("Document.docx", wordData);

  // Generate ZIP
  zip.generateAsync({ type: "blob" }).then((blob) => {
    saveAs(blob, "Publication.zip");
  });
};

export const getFileNameFromUrl = (url: string) => {
  let parts = url.split("/");
  return parts[parts.length - 1];
};
