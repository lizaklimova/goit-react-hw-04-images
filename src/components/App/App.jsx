import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { getImages } from 'services/api';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
import { Container, Message } from './App.styled';

export function App() {
  const [value, setValue] = useState('');
  const [pics, setPics] = useState([]);
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (value) getPicsBySearch(value, page);
  }, [value, page]);

  const handleSearch = value => {
    if (!value) {
      Notify.warning('Please,enter sth');

      setPics([]);
      setShowLoadMore(false);

      return;
    }

    setValue(value.trim());
    setPage(1);
    setPics([]);
    setIsEmpty(false);
  };

  const getPicsBySearch = async (value, pg) => {
    try {
      setIsLoading(true);
      setShowSkeleton(true);

      const { hits, total } = await getImages(value, page);

      if (total === 0) setIsEmpty(true);

      setPics(pics => [...pics, ...hits]);
      setShowLoadMore(pg < Math.ceil(total / 12));
    } catch (error) {
      Notify.failure(error.message);
    } finally {
      setIsLoading(false);
      setShowSkeleton(false);
    }
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery pics={pics} showSkeleton={showSkeleton} />
      {isLoading && <Loader />}
      {showLoadMore && <Button onLoadMore={onLoadMore} />}

      {isEmpty && (
        <Message>Sorry, there is no pics on query: {value}😢</Message>
      )}
    </Container>
  );
}
