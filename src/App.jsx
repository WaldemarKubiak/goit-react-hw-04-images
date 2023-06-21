import React, { useState, useEffect } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Button } from './components/Button/Button';
import { Loader } from './components/Loader/Loader';
import { Modal } from './components/Modal/Modal';
import { getGallery } from 'services/getGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import c from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [queryString, setQueryString] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageForModal, setImageForModal] = useState('');

  const handleFormSubmit = queryString => {
    setImages([]);
    setPage(1);
    setQueryString(queryString);
  };

  useEffect(() => {
    if (!queryString) {
      return;
    }

    const getImages = async () => {
      try {
        setIsLoading(true);
        const { hits } = await getGallery(queryString, page);
        setImages(prevImages => [...prevImages, ...hits]);
      } catch (error) {
        setError(error.message);
        toast.error(`GetImages error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [queryString, page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  });

  const handleImageClick = imageLink => {
    setImageForModal(imageLink);
    toggleModal();
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);

    if (isModalOpen) {
      setImageForModal('');
    }
  };

  const isImages = images.length > 0;

  return (
    <div className={c.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {isImages && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isImages && isLoading === false && (
        <Button value="Load more" onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal
          image={imageForModal}
          decription={queryString}
          onClose={toggleModal}
        />
      )}
      {error && <ToastContainer autoClose={5000} />}
    </div>
  );
};
