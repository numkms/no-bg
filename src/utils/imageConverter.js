// Утилиты для конвертации изображений (только для клиента)
import {useUrl, convertAllOfHeif} from 'libheif-web';

// Функция для конвертации HEIC/DNG в JPEG
export const convertToJpeg = async (file) => {
  try {
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();
    
    // Проверяем, является ли файл HEIC/HEIF
    if (fileType.includes('heic') || fileType.includes('heif') || 
        fileName.endsWith('.heic') || fileName.endsWith('.heif')) {
      
      console.log('Converting HEIC/HEIF to JPEG...');
      
      try {
        // Инициализируем libheif-web только когда нужно
        useUrl('/libheif.min.js');
        
        // Используем libheif-web для конвертации
        const images = await convertAllOfHeif(file);
        if (images && images.length > 0) {
          // Берем первое изображение и конвертируем в JPEG
          const result = await images[0].convert('converted.jpg', 'image/jpeg');
          return result;
        }
      } catch (libheifError) {
        console.warn('libheif-web failed, falling back to heic2any:', libheifError);
      }
      
      // Fallback на heic2any
      const heic2any = (await import('heic2any')).default;
      const imageBlobs = await heic2any({ 
        blob: file, 
        multiple: false, 
        toType: 'image/jpeg',
        quality: 0.9
      });
      
      if (imageBlobs && imageBlobs.length > 0) {
        return imageBlobs[0];
      }
    }
    
    // Проверяем, является ли файл DNG
    if (fileType.includes('dng') || fileName.endsWith('.dng')) {
      console.log('Converting DNG to JPEG...');
      
      // Для DNG используем canvas для конвертации
      return await convertDngToJpeg(file);
    }
    
    // Если файл уже JPEG или другой поддерживаемый формат, возвращаем как есть
    if (fileType.includes('jpeg') || fileType.includes('jpg') || 
        fileType.includes('png') || fileType.includes('webp')) {
      return file;
    }
    
    throw new Error('Unsupported file format');
    
  } catch (error) {
    console.error('Error converting file to JPEG:', error);
    throw error;
  }
};

// Функция для конвертации DNG в JPEG через canvas
const convertDngToJpeg = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Ограничиваем размер для производительности
          const maxWidth = 4000;
          const maxHeight = 4000;
          
          let { width, height } = img;
          
          // Масштабируем если изображение слишком большое
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Рисуем изображение с учетом масштабирования
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert DNG to JPEG'));
            }
          }, 'image/jpeg', 0.9);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load DNG image. DNG files may not be supported in this browser.'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read DNG file'));
    reader.readAsDataURL(file);
  });
};

