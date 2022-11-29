import { useLocation } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

const SEO = ({
  title,
  description,
  image,
  article,
  twitter,
  noindex,
  children,
}) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            titleTemplate
            defaultDescription: description
            siteUrl: url
            defaultImage: image
            twitterUsername
          }
        }
      }
    `
  );

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;

  const seoContent = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <>
      <title>{`${seoContent.title} ${titleTemplate}`}</title>
      <meta name="description" content={seoContent.description} />
      <meta name="image" content={seoContent.image} />
      {noindex && <meta name="robots" content="noindex" />}
      {seoContent.url && <meta property="og:url" content={seoContent.url} />}
      {article && <meta property="og:type" content="article" />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta
          name="twitter:creator"
          content={twitter?.handle ? twitter.handle : twitterUsername}
        />
      )}
      {seoContent.title && (
        <meta
          name="twitter:title"
          content={twitter?.title ? twitter.title : seoContent.title}
        />
      )}
      {seoContent.description && (
        <meta
          name="twitter:description"
          content={
            twitter?.description ? twitter.description : seoContent.description
          }
        />
      )}
      {seoContent.image && (
        <meta
          name="twitter:image"
          content={twitter?.image ? twitter.image : seoContent.image}
        />
      )}
      <meta
        name="ahrefs-site-verification"
        content="25469e6d85dfd7d0bad2fa33395ada4769f37628a4b5cf8a9afac0d8a9842cab"
      />
      {children}
    </>
  );
};

export default SEO;
