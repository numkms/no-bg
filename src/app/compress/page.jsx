'use client'

import React, { useState } from 'react';
import Compressor from 'compressorjs';

export default function CompressPage() {
  const [file, setFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [quality, setQuality] = useState(0.8);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setCompressedFile(null);
    }
  };

  const handleCompress = () => {
    if (!file) return;

    setIsCompressing(true);
    
    new Compressor(file, {
      quality: quality,
      success: (result) => {
        setCompressedFile(result);
        setIsCompressing(false);
      },
      error: (err) => {
        console.error('Compression error:', err);
        setIsCompressing(false);
      }
    });
  };

  const handleDownload = () => {
    if (!compressedFile) return;
    
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Сжатие изображений</h1>
          <p className="text-lg text-gray-600">Загрузите изображение и сожмите его</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Загрузка файла */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Выберите изображение
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {file && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Файл: {file.name} ({formatFileSize(file.size)})
                </p>
              </div>
            )}
          </div>

          {/* Настройки качества */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Качество сжатия: {Math.round(quality * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Кнопка сжатия */}
          <div className="mb-6">
            <button
              onClick={handleCompress}
              disabled={!file || isCompressing}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isCompressing ? 'Сжимаю...' : 'Сжать изображение'}
            </button>
          </div>

          {/* Результат */}
          {compressedFile && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Результат сжатия</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Исходный размер:</span>
                  <span className="font-medium">{formatFileSize(file.size)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Сжатый размер:</span>
                  <span className="font-medium text-green-600">{formatFileSize(compressedFile.size)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Экономия:</span>
                  <span className="font-medium text-blue-600">
                    {Math.round(((file.size - compressedFile.size) / file.size) * 100)}%
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleDownload}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Скачать сжатое изображение
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
