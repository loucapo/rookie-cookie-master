import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import classList from './classes';
import NavBar from './NavBar';
import NewClassForm from './NewClassForm';

const App = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    setClasses(classList)
  }, []);

  const handleClassSubmit = (newClass) => {
    newClass.id = classes.length + 1;
    setClasses([...classes, newClass]);
  };

  const handleDeleteClass = (idDelete) => {
    setClasses(classes.filter(klass => {
      return klass.id !== idDelete
    }));
  };

  return (
    <Wrapper>
      <NavBar/>
      <h1>Welcome to RookieCookie!</h1>
      <ClassCardContainer>
        <NewClassForm handleClassSubmit={handleClassSubmit} />
        {classes.map(klass => <ClassCard key={klass.id} handleDeleteClass={handleDeleteClass} content={klass} />)}
      </ClassCardContainer>
    </Wrapper>
  )
};

export default App;

const ClassCard = ({content, handleDeleteClass}) => (
  <ClassCardWrapper>
    <img height="50%" width="100%" alt="" src={content.featureImage} />
    <DeleteButton>
      <button onClick={handleDeleteClass.bind(null, content.id)}>X</button>
    </DeleteButton>
    <h4>{content.title}</h4>
    <h5>{content.instructor}</h5>
    <h5>{content.description}</h5>
    <h5>{content.duration} min</h5>
  </ClassCardWrapper>
);

const DeleteButton = styled.div`
  font-size: 11px;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Wrapper = styled.div `
  margin-top: 45px;
  text-align: center;
`;

const ClassCardWrapper = styled.div`
  background-color: #fff;
  border: solid 1px black;
  border-radius: 5px;
  margin: 20px 10px;
  min-height: 300px;
  overflow: hidden;
  padding-bottom: 15px;
  position: relative;
  transition: 150ms linear;
  width: 175px;

  /* add a slight hover animation for users that don't have reduce motion turned on */
  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const ClassCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin: 0 20px;
`;
