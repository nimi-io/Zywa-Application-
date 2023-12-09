export const generatePdfTemplate = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kindly Find Attached PDF Document</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 0;
      padding: 20px;
    }

    p {
      margin: 1.5em 0;
      line-height: 1.5;
    }

    h2 {
      font-size: 1.2em;
      color: #333;
      margin-bottom: 1em;
    }

    .attachment {
      font-style: italic;
      color: #777;
    }
  </style>
</head>
<body>
  <h2>Hello,</h2>
  <p>
    Please find attached a PDF document.
  </p>

  <p>
    This document provides trasaction datails of requested dates.
  </p>

  <p>
    Feel free to contact me if you have any questions or require further clarification.
  </p>

  <p>
    Sincerely,<br>
    Zywa
  </p>
</body>
</html>
`;
};
