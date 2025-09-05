'use client'

import React, { useState } from 'react';
import Compressor from 'compressorjs';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n.js';

function CompressPageContent() {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [quality, setQuality] = useState(0.2); // Начинаем с минимального сжатия (максимального качества)
  const [isCompressing, setIsCompressing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [compressedPreviewUrl, setCompressedPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setCompressedFile(null);
      
      // Очищаем старые превью
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (compressedPreviewUrl) URL.revokeObjectURL(compressedPreviewUrl);
      setCompressedPreviewUrl(null);
      
      // Создаем превью изображения
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setCompressedFile(null);
      
      // Очищаем старые превью
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (compressedPreviewUrl) URL.revokeObjectURL(compressedPreviewUrl);
      setCompressedPreviewUrl(null);
      
      // Создаем превью изображения
      const url = URL.createObjectURL(droppedFile);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleCompress = () => {
    if (!file) return;

    setIsCompressing(true);
    
    new Compressor(file, {
      quality: quality,
      success: (result) => {
        setCompressedFile(result);
        // Создаем превью сжатого изображения
        const compressedUrl = URL.createObjectURL(result);
        setCompressedPreviewUrl(compressedUrl);
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
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getQualityColor = (quality) => {
    if (quality >= 0.8) return 'text-green-600'; // Минимальное сжатие = зеленый
    if (quality >= 0.5) return 'text-yellow-600'; // Среднее сжатие = желтый
    return 'text-red-600'; // Максимальное сжатие = красный
  };

  const getQualityLabel = (quality) => {
    if (quality >= 0.8) return t('compress_quality_low'); // Минимальное сжатие
    if (quality >= 0.5) return t('compress_quality_medium'); // Среднее сжатие
    return t('compress_quality_high'); // Максимальное сжатие
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t('compress_title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('compress_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              {t('compress_select_image')}
            </h2>

            {/* File Upload */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                    isDragOver 
                      ? 'border-blue-400 bg-blue-50 scale-105' 
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">{t('compress_upload_hint')}</span> {t('compress_drag_hint')}
                    </p>
                    <p className="text-xs text-gray-500">{t('compress_file_types')}</p>
                  </div>
                </label>
              </div>
              
              {file && (
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{file.name}</p>
                      <p className="text-xs text-gray-600">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quality Settings */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-medium text-gray-700">
                  {t('compress_quality_label')}
                </label>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-semibold ${getQualityColor(quality)}`}>
                    {getQualityLabel(quality)}
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    {Math.round((1 - quality) * 100)}%
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{t('compress_level_maximum')}</span>
                  <span>{t('compress_level_medium')}</span>
                  <span>{t('compress_level_minimum')}</span>
                </div>
              </div>
            </div>

            {/* Compress Button */}
            <button
              onClick={handleCompress}
              disabled={!file || isCompressing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
            >
              {isCompressing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t('compress_processing')}
                </div>
              ) : (
                t('compress_button')
              )}
            </button>
          </div>

          {/* Preview and Results Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-md flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {t('compress_result_title')}
            </h2>

            {compressedPreviewUrl && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('compress_compressed_image')}</h3>
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={compressedPreviewUrl}
                    alt="Compressed"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {t('compress_size_label')}: {formatFileSize(compressedFile.size)}
                </p>
              </div>
            )}

            {isCompressing && (
              <div className="mb-6">
                <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100 h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-gray-700">{t('compress_processing_text')}</p>
                    <p className="text-sm text-gray-500 mt-2">{t('compress_processing_subtitle')}</p>
                  </div>
                </div>
              </div>
            )}

            {compressedFile && (
              <div className="space-y-6">
                {/* Results Stats */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('compress_stats_title')}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{t('compress_original_size')}:</span>
                      <span className="font-semibold text-gray-800">{formatFileSize(file.size)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{t('compress_compressed_size')}:</span>
                      <span className="font-semibold text-green-600">{formatFileSize(compressedFile.size)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{t('compress_savings')}:</span>
                      <span className="font-bold text-blue-600 text-lg">
                        {Math.round(((file.size - compressedFile.size) / file.size) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('compress_download')}
                </button>
              </div>
            )}

            {!file && !isCompressing && !compressedFile && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg">{t('compress_upload_to_start')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

export default function CompressPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <CompressPageContent />
    </I18nextProvider>
  );
}
