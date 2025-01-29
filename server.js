const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Build the file path based on the requested URL
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

  // Get the file extension
  const extname = path.extname(filePath);

  // Default Content-Type
  let contentType = "text/html";

  // Set Content-Type based on file extension
  switch (extname) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".html":
      contentType = "text/html";
      break;
  }

  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // File not found
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        // Some server error
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      }
    } else {
      // Serve the file
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
