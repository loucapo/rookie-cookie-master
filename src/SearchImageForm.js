import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';
import styled from 'styled-components';

export function SearchImageForm() {

  const [query, setQuery] = useState('');
  const [images, setImages] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://pixabay.com/api/?key=9301258-372259464c81002c422a1f28e&image_type=photo&pretty=true&safesearch=true&q=${query}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        if (myJson.totalHits > 0) {
          setImages(myJson.hits);
          showModal(images, handleClick);
        }
      });
  };

  const handleClick = (e) => {
    const urlField = document.querySelector('#url');
    urlField.value = e.target.src;
    urlField.select();
    document.execCommand('copy');
    alert('URL has been copied to your clipboard. You may now paste it into the URL field.')
  };

  const [showModal, hideModal] = useModal(() => (<ReactModal isOpen ariaHideApp={false}>
    <p>Found {images.length} image(s). Click an image to copy its URL to your clipboard.</p>
    {images.map(image => <ImageResult key={image.id} content={image} handleClick={handleClick} />)}
    <input type="text" name="url" id="url" key="url" />
    <CloseModalContainer>
      <button onClick={hideModal}>X</button>
    </CloseModalContainer>
  </ReactModal>), [images]);

  return (
    <Container>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <span>Use this section to search for your own feature image</span>
          <p>
            <LabelEl>
              Enter Search Term
              <Input type="text" name="query" value={query} onChange={e => setQuery(e.target.value)} />
            </LabelEl>
          </p>
          <button type="submit">Search</button>
        </form>
      </FormWrapper>
    </Container>
  );
}

export default SearchImageForm;

const ImageResult = ({content, handleClick}) => (
  <picture>
    <img src={content.previewURL} alt="" onClick={handleClick}/>
  </picture>
);


const FormWrapper = styled.div`
  text-align: left;
`;

const CloseModalContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Container = styled.div`
  border: 1px solid black;
  margin-top  20px;
  padding: 10px;
`;

const LabelEl = styled.label``;

const Input = styled.input``;