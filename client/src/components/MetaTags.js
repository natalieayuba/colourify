import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { description, title, image } from '../config';

const MetaTags = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta itemprop='name' content={title} />
        <meta name='description' content={description} />
        <meta property='og:description' content={description} />
        <meta itemprop='description' content={description} />
        <meta property='og:image' content={image} />
        <meta itemprop='image' content={image} />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaTags;
