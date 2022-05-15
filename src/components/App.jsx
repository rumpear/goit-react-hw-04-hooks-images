import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from '../services/pixabayService';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { PageUpButton } from './PageUpButton';
import { ErrorMessage } from './ErrorMessage';

import { Wrapper } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('nature');
  const [totalNumberOfPhotos, setTotalNumberOfPhotos] = useState(0);
  const [photoList, setPhotoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPhotos(searchQuery, page);
  }, [searchQuery, page]);

  const handleSearch = value => {
    setSearchQuery(value);
    setPhotoList([]);
    setPage(1);
    setError(null);
  };

  const handlePagination = () => {
    setPage(page => page + 1);
  };

  const getPhotos = async (searchQuery, page) => {
    try {
      setIsLoading(true);
      const { totalHits, hits } = await fetchImages(searchQuery, page);

      if (hits.length === 0) {
        toast.warn(`We didn't find any photos matching your request`);
        return;
      }

      if (page === 1 && searchQuery !== 'nature')
        toast.success(`We found ${totalHits} images`);

      const photos = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
        return {
          id,
          webformatURL,
          largeImageURL,
          tags,
        };
      });

      setPhotoList([...photoList, ...photos]);
      setTotalNumberOfPhotos(totalHits);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkPages = () => {
    const totalPages = Math.floor(totalNumberOfPhotos / 12);
    return page < totalPages && photoList.length >= 12;
  };

  return (
    <Wrapper>
      <Searchbar
        onSubmit={handleSearch}
        isSearch={isLoading}
        searchQuery={searchQuery}
      />
      {error && <ErrorMessage message={error.message} />}
      {photoList.length > 0 && <ImageGallery photoList={photoList} />}
      {isLoading && <Loader />}
      {checkPages() && (
        <Button isLoading={isLoading} onClick={handlePagination} />
      )}
      {/* <PageUpButton></PageUpButton> */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Wrapper>
  );
};
