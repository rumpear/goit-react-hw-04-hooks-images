import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { InView } from 'react-intersection-observer';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from '../services/pixabayService';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { PageUpButton } from './PageUpButton';
import { ErrorMessage } from './ErrorMessage';

import { Wrapper } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('nature');
  const [totalNumberOfPhotos, setTotalNumberOfPhotos] = useState(null);
  const [photoList, setPhotoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
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

        setPhotoList(photoList => [...photoList, ...photos]);
        setTotalNumberOfPhotos(totalHits);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos(searchQuery, page);
  }, [searchQuery, page]);

  useEffect(() => {
    if (totalNumberOfPhotos === photoList.length) {
      toast.warn(`You've reached the end of search results`);
    }
  }, [totalNumberOfPhotos, photoList.length]);

  const handleSearch = value => {
    setSearchQuery(value);
    setPhotoList([]);
    setPage(1);
    setError(null);
    setTotalNumberOfPhotos(null);
  };

  const handlePagination = () => {
    setPage(page => page + 1);
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

      {totalNumberOfPhotos > photoList.length && (
        <InView
          as="div"
          onChange={inView => inView && !isLoading && handlePagination()}
        />
      )}

      <PageUpButton />

      <ToastContainer
        position="top-right"
        autoClose={3000}
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
