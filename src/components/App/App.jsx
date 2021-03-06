import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { Button, Searchbar, Modal, ImageGallery, Loader } from 'components';
import { getPhoto } from 'services/PixabayApi';
import { searchObject, Status } from 'constants/var';
import './App.scss';

searchObject.safesearch = true;

export function App() {
  const [images, setImages] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [totalHits, setTotalHits] = useState(0);

  // const isImgUrl = useRef(false);

  useEffect(() => {
    if (searchQuery) {
      async function getImages() {
        if (page > 1) {
          setStatus(Status.PENDING_LOAD_MORE);
        } else {
          setStatus(Status.PENDING);
        }

        searchObject.searchPhrase = searchQuery;
        searchObject.page = page;

        try {
          const data = await getPhoto(searchObject);
          // console.log(data);
          setTotalHits(data.totalHits);
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
  }, [searchQuery, page]);

  // useEffect(() => {
  //   if (isImgUrl.current) {
  //     // setShowModal(!showModal);
  //     toggleModal();
  //   }
  //   isImgUrl.current = true;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [imgUrl]);

  // function toggleModal() {
  //   setShowModal(!showModal);
  // }

  function updSearchQuery(e, searchQuery) {
    e.preventDefault();
    if (searchQuery) {
      searchQuery = searchQuery.toLowerCase();
      if (searchQuery.endsWith('&&&')) {
        searchObject.safesearch = false;
        searchQuery = searchQuery.replaceAll('&&&', '');
      } else {
        searchObject.safesearch = true;
      }
      setSearchQuery(searchQuery);
      setPage(1);
    }
  }

  function nextPageRequest() {
    setPage(pS => pS + 1);
  }

  const renderLoader =
    status === Status.PENDING || status === Status.PENDING_LOAD_MORE;
  const renderGallery =
    status === Status.RESOLVE || status === Status.PENDING_LOAD_MORE;
  const renderButtonLoadMore =
    images.length !== 0 && totalHits > page * searchObject.per_page;

  return (
    <div className="App">
      <Searchbar onSubmit={updSearchQuery} />
      {renderLoader && <Loader />}
      {renderGallery && <ImageGallery images={images} onClick={setImgUrl} />}
      {renderButtonLoadMore && <Button onClick={nextPageRequest} />}
      {/* {showModal && (
        <Modal onClose={toggleModal}>
          <img src={imgUrl} alt="" />
        </Modal>
      )} */}
      {imgUrl && (
        <Modal
          onClose={() => {
            setImgUrl(null);
          }}
        >
          <img src={imgUrl} alt="" />
        </Modal>
      )}
    </div>
  );
}
