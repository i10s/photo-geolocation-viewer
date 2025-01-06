// Handles the form submission
document.getElementById("uploadForm").onsubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    const fileInput = document.getElementById("fileInput"); // File input element
    const errorMessage = document.getElementById("errorMessage"); // Error message element
    const photoInfo = document.getElementById("photoInfo"); // Photo information element
    const file = fileInput.files[0]; // Get the selected file
  
    // Reset previous messages
    errorMessage.style.display = "none";
    photoInfo.style.display = "none";
  
    // Validate the selected file
    if (!file) {
      displayError("Please select an image file.");
      return;
    }
  
    if (!file.type.startsWith("image/")) {
      displayError("The selected file is not an image.");
      return;
    }
  
    try {
      const reader = new FileReader(); // Create a FileReader instance
      reader.onload = function () {
        // Use EXIF.js to extract metadata
        EXIF.getData(file, function () {
          const lat = EXIF.getTag(this, "GPSLatitude"); // Latitude data
          const lon = EXIF.getTag(this, "GPSLongitude"); // Longitude data
          const latRef = EXIF.getTag(this, "GPSLatitudeRef"); // Latitude reference (N/S)
          const lonRef = EXIF.getTag(this, "GPSLongitudeRef"); // Longitude reference (E/W)
          const dateTime = EXIF.getTag(this, "DateTimeOriginal"); // Date and time the photo was taken
  
          if (lat && lon && latRef && lonRef) {
            const latitude = convertToDecimal(lat, latRef); // Convert latitude to decimal
            const longitude = convertToDecimal(lon, lonRef); // Convert longitude to decimal
            displayPhotoInfo(latitude, longitude, dateTime); // Display photo information
            initMap(latitude, longitude); // Initialize the map
          } else {
            displayError("No GPS data found in the image.");
          }
        });
      };
  
      reader.onerror = () => displayError("Failed to read the file.");
      reader.readAsDataURL(file); // Read the file as a data URL
    } catch (error) {
      displayError("An unexpected error occurred: " + error.message);
    }
  };
  
  // Converts GPS coordinates to decimal format
  function convertToDecimal(gpsData, gpsRef) {
    const [degrees, minutes, seconds] = gpsData.map(coord => parseFloat(coord));
    let decimal = degrees + minutes / 60 + seconds / 3600;
    if (gpsRef === "S" || gpsRef === "W") decimal = -decimal; // Adjust for southern or western hemispheres
    return decimal;
  }
  
  // Initializes the Google Map
  function initMap(lat, lon) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: { lat, lng: lon },
    });
  
    new google.maps.Marker({
      position: { lat, lng: lon },
      map: map,
      title: "Photo Location",
    });
  }
  
  // Displays an error message to the user
  function displayError(message) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.style.display = "block";
    errorMessage.textContent = message;
  }
  
  // Displays photo information (coordinates and date/time)
  function displayPhotoInfo(lat, lon, dateTime) {
    const photoInfo = document.getElementById("photoInfo");
    photoInfo.style.display = "block";
    const formattedDate = dateTime || "Unknown date and time";
    photoInfo.innerHTML = `Photo taken at <strong>Latitude:</strong> ${lat.toFixed(
      6
    )}, <strong>Longitude:</strong> ${lon.toFixed(6)}<br><strong>Date & Time:</strong> ${formattedDate}`;
  }
  