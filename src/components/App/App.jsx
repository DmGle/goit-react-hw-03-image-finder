import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import '../styles.css';

const API_KEY = '40969822-9ca982a77db095185d4787118';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
    perPage: 12,
  };

  handleSearchSubmit = (query) => {
    this.setState({ query, page: 1, images: [] }, () => {
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query && !this.state.query.trim()) {
      this.setState({ images: [] });
    } else if (this.state.query !== prevState.query || this.state.page !== prevState.page) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, page, perPage } = this.state;

    this.setState({ isLoading: true });

    axios
      .get(`https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
      .then((response) => {
        const newImages = response.data.hits.slice(0, perPage);

        this.setState((prevState) => ({
          images: [...prevState.images, ...newImages],
        }));
      })
      .catch((error) => console.error('Error fetching images:', error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleLoadMore = () => {
    if (!this.state.isLoading) {
      this.setState((prevState) => ({ page: prevState.page + 1 }));
    }
  };

  handleImageClick = (url) => {
    this.setState({ showModal: true, selectedImage: url });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, isLoading, showModal, selectedImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleLoadMore} hasMore={!isLoading} />}
        {showModal && <Modal image={selectedImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}

export default App;