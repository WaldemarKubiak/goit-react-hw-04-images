import { Component } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Button } from './components/Button/Button';
import { Loader } from './components/Loader/Loader';
import { Modal } from './components/Modal/Modal';
import { getGallery } from 'services/getGallery';
import c from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    queryString: '',
    error: null,
    isLoading: false,
    isModalOpen: false,
    imageForModal: '',
  };

  handleFormSubmit = queryString => {
    this.setState({
      images: [],
      page: 1,
      queryString: queryString,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.queryString !== this.state.queryString) {
      this.getImages();
    }
    if (prevState.page < this.state.page) {
      this.getImages();
    }
    if (this.state.page > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  getImages = async () => {
    const { queryString, page } = this.state;

    try {
      this.setState({
        isLoading: true,
      });

      const { hits } = await getGallery(queryString, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));
    } catch (error) {
      console.log(`GetGallery error: ${error}`);
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleImageClick = imageLink => {
    this.setState({ imageForModal: imageLink });
    this.toggleModal();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));

    if (this.state.isModalOpen) {
      this.setState({
        imageForModal: '',
      });
    }
  };

  render() {
    const { images, queryString, isLoading, isModalOpen, imageForModal } =
      this.state;

    const isImages = images.length > 0;

    return (
      <div className={c.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isImages && (
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
        )}
        {isImages && isLoading === false && (
          <Button value="Load more" onClick={this.handleLoadMore} />
        )}
        {isLoading && <Loader />}
        {isModalOpen && (
          <Modal
            image={imageForModal}
            decription={queryString}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}
