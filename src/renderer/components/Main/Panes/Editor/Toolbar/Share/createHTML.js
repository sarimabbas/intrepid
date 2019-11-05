import EditorInstance from "../../EditorInstance";

const createHTML = () => {
  const contents = EditorInstance.getHTML();
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
