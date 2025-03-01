import heic2any from 'heic2any'
import {useUrl, convertAllOfHeif} from 'libheif-web';
useUrl('/libheif.min.js');

/// Process file to MP4 
/// @param {File} file - input file


export const processFile = async (file) => { 
    try {
        var stderr = "";
        var stdout = "";
        const images = await convertAllOfHeif(file);
        // alert(images.length)
        console.log(images)
        let results = await Promise.all(images.map(async (e) => await e.convert('filename.png', 'image/png')))
        return results.map((e) => URL.createObjectURL(e))
        const imageBlobs = await heic2any({ blob: file, multiple: true, toType: 'image/jpeg' });
        console.log(imageBlobs)
        var blobs = []
        for (let i = 0; i < imageBlobs.length; i++) {
          const imageBlob = imageBlobs[i];
          const imageName = `image_${i}.jpg`;
          const arrayBuffer = await imageBlob.arrayBuffer();
          const buffer = new Uint8Array(arrayBuffer);
          blobs.push({
            name: imageName,
            data: buffer
          })
        }

        return imageBlobs.map((e) => URL.createObjectURL(e))

        // const ffmpegWorker = new Worker("ffmpeg-worker-mp4.js");
        
        // ffmpegWorker.onmessage = function(e) {
        //     const msg = e.data;
        //     switch (msg.type) {
        //     case 'ready':
        //         ffmpegWorker.postMessage({
        //         type: 'run',
        //         MEMFS: blobs,
        //         arguments: [
        //            "-i", "image_%d.jpg", "-y", "output.mp4", "-preset", "ultrafast" 
        //         ],
        //         TOTAL_MEMORY: 100435456 * 2
        //         });
        //         break;
        //     case 'stdout':
        //         stdout += msg.data + "\n";
        //         break;
        //     case 'stderr':
        //         stderr += msg.data + "\n";
        //         break;
        //     case 'done':
        //         const data = msg.data;
        //         console.log("Process exited with code " + data.exitCode);
        //         console.log(stderr);
        //         console.log(stdout);
        //         const videoBlob = new Blob([data.MEMFS[0].data], { type: 'video/mp4' });
        //         return URL.createObjectURL(videoBlob);
        //     }
        // };
      } catch (error) {
         return ["heic convertation error:", error];
      }
}


/**
 * @param {Array<File>} files - Array of files to create collage from
 */

const fileToImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}


export const createCollage = async (files) => {
  return createMoodboard(files);
  try {
    let images = await Promise.all(files.map(async (file) => await fileToImage(file)))
    const canvas = document.createElement("canvas");
    canvas.width = 4000;
    canvas.height = 4000; // Adjust canvas size as needed
    const ctx = canvas.getContext('2d');
    const cols = Math.ceil(Math.sqrt(images.length));
    const rows = Math.ceil(images.length / cols);
    const imgWidth = canvas.width / cols;
    const imgHeight = canvas.height / rows;
    const padding = 20; // Add padding between images

    images.forEach((img, index) => {
      const x = (index % cols) * (imgWidth + padding);
      const y = Math.floor(index / cols) * (imgHeight + padding);
      const aspectRatio = img.width / img.height;
      const drawWidth = imgWidth - padding;
      const drawHeight = imgHeight - padding;

      let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;

      if (aspectRatio > 1) {
        sHeight = img.height;
        sWidth = sHeight * aspectRatio;
        sx = (img.width - sWidth) / 2;
      } else {
        sWidth = img.width;
        sHeight = sWidth / aspectRatio;
        sy = (img.height - sHeight) / 2;
      }

      ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, imgWidth - padding, imgHeight - padding);
    });

    return canvas.toDataURL('image/jpeg');
  } catch (error) {
    console.error("Error creating collage:", error);
    return null;
  }
};

const canvas = document.createElement("canvas")
document.body.appendChild(canvas)
export const createMoodboard = async (files, config = {}) => {
  try {
    const defaultConfig = {
      padding: 10, // Уменьшенный отступ для касания картинок
      maxImageWidthRatio: 0.4,
      minImageWidth: 300,
      maxAttempts: 50,
      maxOverlapRatio: 0.002, // Максимальное пересечение (20%)
      borderColor: '#FFFFFF', // Цвет рамки
      borderWidth: 20 // Толщина рамки
    };
    
    const settings = { ...defaultConfig, ...config };
    
    let images = await Promise.all(files.map(async (file) => await fileToImage(file)));
    const backgroundColor = await getAverageColorFromImages(images);
    console.log(backgroundColor)
    
    
    const ctx = canvas.getContext('2d');
    
    const positions = [];
    let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;
    
    images.forEach((img) => {
      const aspectRatio = img.width / img.height;
      const maxWidth = window.innerWidth * settings.maxImageWidthRatio;
      const width = Math.random() * (maxWidth - settings.minImageWidth) + settings.minImageWidth;
      const height = width / aspectRatio;
      
      let x, y;
      let overlapping;
      let attempts = 0;
      
      do {
        x = Math.random() * (window.innerWidth - width - settings.padding);
        y = Math.random() * (window.innerHeight - height - settings.padding);
        
        overlapping = positions.some(pos => {
          const overlapX = Math.max(0, Math.min(x + width, pos.x + pos.width) - Math.max(x, pos.x));
          const overlapY = Math.max(0, Math.min(y + height, pos.y + pos.height) - Math.max(y, pos.y));
          const overlapArea = overlapX * overlapY;
          const imageArea = width * height;
          return (overlapArea / imageArea) > settings.maxOverlapRatio;
        });
        attempts++;
      } while (overlapping && attempts < settings.maxAttempts);
      
      positions.push({ x, y, width, height });
      
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + width);
      maxY = Math.max(maxY, y + height);
    });
    
    const canvasWidth = maxX - minX + settings.padding;
    const canvasHeight = maxY - minY + settings.padding;
    const totalArea = canvasWidth * canvasHeight;
    const imagesArea = positions.reduce((acc, pos) => acc + (pos.width * pos.height), 0);
    const emptySpaceRatio = (totalArea - imagesArea) / totalArea;

    if (emptySpaceRatio > 0.15) {
      const scaleFactor = Math.sqrt((totalArea * 0.85) / imagesArea);
      positions.forEach(pos => {
        pos.width *= scaleFactor;
        pos.height *= scaleFactor;
        pos.x = (pos.x - minX) * scaleFactor + minX;
        pos.y = (pos.y - minY) * scaleFactor + minY;
      });
    }

    canvas.width = canvasWidth + settings.borderWidth * 2;
    canvas.height = canvasHeight + settings.borderWidth * 2;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = settings.borderColor;
    ctx.fillRect(0, 0, canvas.width, settings.borderWidth);
    ctx.fillRect(0, canvas.height - settings.borderWidth, canvas.width, canvas.height - settings.borderWidth);
    ctx.fillRect(
      canvas.width - settings.borderWidth, 
      0, 
      settings.borderWidth, 
      canvas.height
    );
    positions.forEach(({ x, y, width, height }, index) => {
      ctx.drawImage(images[index], x - minX + settings.borderWidth, y - minY + settings.borderWidth, width, height);
    });
    ctx.fillRect(0, 0, settings.borderWidth, canvas.height);
    
    return canvas.toDataURL('image/jpeg');
  } catch (error) {
    console.error("Error creating moodboard:", error);
    return null;
  }
};

const getAverageColorFromImages = async (images) => {
  try {
    let totalR = 0, totalG = 0, totalB = 0;
    let imageCount = images.length;

    for (let i = 0; i < imageCount; i++) {
      const color = await getImageAverageColor(images[i]);
      totalR += color.r;
      totalG += color.g;
      totalB += color.b;
    }

    // Calculate average color across all images
    const avgR = totalR / imageCount;
    const avgG = totalG / imageCount;
    const avgB = totalB / imageCount;

    // return { r: avgR, g: avgG, b: avgB };
    return `rgb(${avgR}, ${avgG}, ${avgB})`;
  } catch (error) {
    console.error("Error calculating average color:", error);
    return null;
  }
};

const getImageAverageColor = (img) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Draw image to the canvas
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    let r = 0, g = 0, b = 0;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i]; // Red
      g += data[i + 1]; // Green
      b += data[i + 2]; // Blue
    }

    const pixelCount = data.length / 4;
    resolve({
      r: r / pixelCount,
      g: g / pixelCount,
      b: b / pixelCount
    });
  });
};
