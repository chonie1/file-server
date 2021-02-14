# File Server

## Summary
File server and client where:
* Clients can connect to the server via TCP and send a request for a file (by filename)
* The server looks for requested files locally and sends back the data

For demonstration purposes, the server only looks in a directory called "files" and writes the content to the "downloads folder"