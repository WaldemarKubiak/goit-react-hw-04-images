import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const getGallery = async (query, page) => {
  try {
    const response = await axios.get(
      `/?q=${query}&page=${page}&key=34859493-53a9b5cb834f8dfe1be273cf4&image_type=photo&orientation=horizontal&per_page=12`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
