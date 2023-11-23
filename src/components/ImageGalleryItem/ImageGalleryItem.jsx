import { useState } from 'react';
import Modal from '../Modal';
import { GalleryPic, ImgCard } from './ImageGalleryItem.styled';
import Skeleton from 'components/Skeleton/Skeleton';

function ImageGalleryItem({
  image: { webformatURL, tags, largeImageURL },
  skeleton,
}) {
  const [isModalShown, setIsModalShown] = useState(false);

  const toggleModal = () => {
    setIsModalShown(isModalShown => !isModalShown);
  };

  return (
    <>
      <GalleryPic onClick={toggleModal}>
        {skeleton ? <Skeleton /> : <ImgCard src={webformatURL} alt={tags} />}
      </GalleryPic>
      {isModalShown && (
        <Modal src={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
    </>
  );
}

export default ImageGalleryItem;
