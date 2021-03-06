import React from 'react';
import Helmet from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';

type Props = {
  description?: string;
  lang?: string;
  meta?: { property: string; content: any; name?: undefined }[];
  keywords?: string[];
  title: string;
  children?: never;
};

export const SEO = (props: Props) => {
  const {
    description,
    lang = `en`,
    meta = [],
    keywords = [],
    title,
  } = props;

  return (
    <StaticQuery
      query={seoQuery}
      render={(data) => {
        const metaDescription = description || data.site.siteMetadata.description;
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                    name: `keywords`,
                    content: keywords.join(`, `),
                  }
                  : [],
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
};

const seoQuery = graphql`
    query SEOQuery {
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`;
