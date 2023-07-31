// apiService.js

import { axiosClient } from "../axios";// Đường dẫn tới file axiosClient

const baseImageUrl = 'https://api.imgur.com/3/image';

const getToken = () => localStorage.getItem('token');

const uploadImageToImgur = async (imageFile: string | Blob) => {
  try {
    const clientId = '983c8532c49a20e'; // Thay YOUR_CLIENT_ID bằng Client ID của bạn
    const apiUrl = baseImageUrl;
    const token = getToken();

    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axiosClient.post(apiUrl, formData, {
      headers: {
        Authorization: `Client-ID ${clientId}`,
        // config.headers['Authorization'] = `Bearer ${token}`    
      },
    });

    if (response.data.success) {
      return response.data.data.link; // Đường dẫn (URL) của hình ảnh đã được upload thành công
    } else {
      throw new Error('Failed to upload image to Imgur');
    }
  } catch (error) {
    // Handle errors here or rethrow them to be caught by the caller
    throw error;
  }
};

export { uploadImageToImgur };
