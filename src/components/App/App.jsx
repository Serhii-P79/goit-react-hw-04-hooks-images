import { useState, useEffect, useRef } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { Button, Searchbar, Modal, ImageGallery, Loader } from 'components';
import { getPhoto } from 'services/PixabayApi';
import { searchObject, Status } from 'constants/var';
import './App.scss';

export function App() {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);

  const isSearchQuery = useRef(false);
  const isLoadMore = useRef(false);
  const isImgUrl = useRef(false);

  useEffect(() => {
    if (isSearchQuery.current && searchQuery) {
      async function getImages() {
        setStatus(Status.PENDING);
        searchObject.searchPhrase = searchQuery;
        searchObject.safesearch = false;
        try {
          const data = await getPhoto(searchObject);
          setImages([
            ...data.hits.map(({ id, webformatURL, largeImageURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            })),
          ]);
          setStatus(Status.RESOLVE);
        } catch (eror) {
          setStatus(Status.REJECTED);
        }
      }
      getImages();
    }
    isSearchQuery.current = true;
  }, [searchQuery]);

  useEffect(() => {
    if (isLoadMore.current) {
      async function getImages() {
        setStatus(Status.PENDINGD);
        searchObject.page = page;
        try {
          const data = await getPhoto(searchObject);
          setImages(prevST => {
            return page === 1
              ? [
                  ...data.hits.map(({ id, webformatURL, largeImageURL }) => ({
                    id,
                    webformatURL,
                    largeImageURL,
                  })),
                ]
              : [
                  ...prevST,
                  ...data.hits.map(({ id, webformatURL, largeImageURL }) => ({
                    id,
                    webformatURL,
                    largeImageURL,
                  })),
                ];
          });
          setStatus(Status.RESOLVE);
          scroll.scrollToBottom();
        } catch (error) {
          setStatus(Status.REJECTED);
        }
      }
      getImages();
    }
    isLoadMore.current = true;
  }, [page]);

  useEffect(() => {
    if (isImgUrl.current) {
      toggleModal();
    }
    isImgUrl.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgUrl]);

  function toggleModal() {
    setShowModal(!showModal);
  }

  function updSearchQuery(e, searchQuery) {
    e.preventDefault();
    if (searchQuery) {
      setSearchQuery(searchQuery);
      setPage(1);
    }
  }

  function nextPageRequest() {
    setPage(pS => pS + 1);
  }

  return (
    <div className="App">
      <Searchbar onSubmit={updSearchQuery} />
      {(status === Status.PENDING || status === Status.PENDINGD) && (
        <Modal onClose={() => {}} isLoader={true}>
          <Loader />
        </Modal>
      )}
      {(status === Status.RESOLVE || status === Status.PENDINGD) && (
        <ImageGallery images={images} onClick={setImgUrl} />
      )}
      {images.length !== 0 && <Button onClick={nextPageRequest} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={imgUrl} alt="" />
        </Modal>
      )}
    </div>
  );
}
