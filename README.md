# Photo Geolocation Viewer

A simple web application that processes photos directly in your browser to extract GPS metadata and display the location on Google Maps. The app guarantees privacy by performing all data processing locally without uploading your photos to a server.

## Features
- Extract GPS coordinates from photo metadata (EXIF data).
- Display the photo's location on an interactive Google Map.
- Show additional metadata, such as the date and time the photo was taken.
- Ensures user privacy by processing everything on the client-side.

## How to Use
1. Upload a photo with GPS metadata (e.g., taken with a smartphone camera).
2. View the location on the interactive Google Map.
3. See additional details like latitude, longitude, and timestamp.

## Requirements
- A modern web browser (Chrome, Firefox, Safari, Edge).
- A Google Maps API key (replace `YOUR_GOOGLE_MAPS_API_KEY` in `index.html`).

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/photo-geolocation-viewer.git
   cd photo-geolocation-viewer
2. Download Exif.js from Exif.js GitHub and place it in the static folder.
3. Serve the application locally using a static server, for example:

   ```bash
   python -m http.server
4. Open the application in your browser:
   ```bash
    http://localhost:8000

## Privacy
This application ensures privacy by processing photos entirely in your browser. No data is uploaded or shared with external servers.