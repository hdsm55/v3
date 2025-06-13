import { Helmet } from 'react-helmet-async';

interface HeadProps {
  title: string;
  description: string;
  image?: string;
}

export default function Head({ title, description, image }: HeadProps) {
  const siteTitle = 'Global Youth Organization';
  const fullTitle = `${title} | ${siteTitle}`;
  const defaultImage = 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* OpenGraph tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:type" content="website" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}