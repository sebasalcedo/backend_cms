const fs = require('fs');

function getDestinationFolder(fileType) {
    let destinationFolder = '';
  console.log(fileType);
    switch (fileType) {
      case 'image':
        destinationFolder = 'uploads/images';
        break;
      case 'video':
        destinationFolder = 'uploads/videos';
        break;
      default:
        destinationFolder = 'uploads/otros';
        break;
    }
  
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }
  
    return destinationFolder;
  }

module.exports = getDestinationFolder