import './Ident.css';
import React from 'react';
import { Link } from 'react-router-dom';
import HeaderWithoutNavigation from '../HeaderWithoutNavigation/HeaderWithoutNavigation';
import Form from './Form/Form';

function Ident({
                 children,
                 submitButtonText,
                 handleSubmit,
                 isSubmitButtonActive,
                 isThereServerMessage,
                 serverMessage,
                 title,
                 bottomQuestion
}) {
  return (
    <section className="ident">
      <HeaderWithoutNavigation>
        { title }
      </HeaderWithoutNavigation>
      <Form
        handleSubmit={ handleSubmit }
        submitButtonText={ submitButtonText }
        isSubmitButtonActive={ isSubmitButtonActive }
        isThereServerMessage={ isThereServerMessage }
        serverMessage={ serverMessage }
      >
        { children }
      </Form>
      <p className="ident__bottom-question">
        {bottomQuestion.question}
        <Link
          to={bottomQuestion.link.target}
          className="ident__bottom-question-link"
        >
          {bottomQuestion.link.text}
        </Link>
      </p>
    </section>
  );
}

export default Ident;
