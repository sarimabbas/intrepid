import EditorInstance from "../../EditorInstance";
import { jetpack, mime } from "../../../../../../common";
import store from "../../../../../../store";

// TODO
// ! DANGER
// figure out a way to reliably remove file:// prefix to prevent jetpack reads failing
const embedAssets = contents => {
  const domParser = new DOMParser();
  const parsedDocument = domParser.parseFromString(contents, "text/html");
  const images = parsedDocument.querySelectorAll("img[src]");
  for (let image of images) {
    const imageBuffer = jetpack.read(
      image.src.replace("file://", ""),
      "buffer"
    );
    const mimeType = mime.getType(image.src);
    const base64 = imageBuffer.toString("base64");
    if (imageBuffer) {
      image.src = `data:${mimeType};base64,${base64}`;
    }
  }
  return parsedDocument.body.innerHTML;
};

const createHTML = () => {
  let contents = EditorInstance.getHTML();

  // go through all the the image tags and embed them into the document
  if (store.state.Preferences.s_embed_assets) {
    contents = embedAssets(contents);
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css">
    <title>Intrepid Export</title>
    </head>
    
    <body>
      ${contents}
    </body>
    
    </html>
    `;
};

export default createHTML;
