import React, { useState } from 'react';
import styled from 'styled-components';
import SearchImageForm from './SearchImageForm';

export function NewClassForm(props) {

  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [featureImage, setFeatureImage] = useState('');
  const [classType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: error handling

    const newClass = {
      title: title,
      instructor: instructor,
      description: description,
      duration: duration,
      featureImage: featureImage,
      classType: classType
    };

    props.handleClassSubmit(newClass);
  };

  return (
    <FormWrapper>
      Add a new class
      <form onSubmit={handleSubmit}>
        <LabelEl>
          Title
          <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
        </LabelEl>

        <LabelEl>
          Instructor
          <input type="text" name="instructor" value={instructor} onChange={e => setInstructor(e.target.value)} />
        </LabelEl>

        <LabelEl>
          Description
          <input type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} />
        </LabelEl>

        <LabelEl>
          Duration
          <input type="number" name="duration" value={duration} onChange={e => setDuration(e.target.value)} />
        </LabelEl>

        <LabelEl>
          Feature Image
          <input type="text" name="featureImage" value={featureImage} onChange={e => setFeatureImage(e.target.value)} />
        </LabelEl>

        <LabelEl>
          Class Type
          {/*<input type="text" name="classType" value={classType} onChange={e => setClassType(e.target.value)} />*/}
          <select>
            <option value="on-demand">on-demand</option>
            <option value="live">live</option>
          </select>
        </LabelEl>

        <input type="submit" value="Save Class" />
      </form>
      <SearchImageForm />
    </FormWrapper>
  );
}

export default NewClassForm;

const FormWrapper = styled.div`
    background-color: #fff;
    border: solid 1px black;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    margin: 20px 10px;
    min-height: 300px;
    overflow: hidden;
    padding: 10px;
    padding-bottom: 15px;
    position: relative;
    text-align: left;
    transition: 150ms linear;
    width: 175px;
  `;

const LabelEl = styled.label`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  `;