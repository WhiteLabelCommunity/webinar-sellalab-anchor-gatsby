import React from "react"
import Helmet from 'react-helmet';
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { site, markdownRemark, anchorEpisode } = data // data.markdownRemark holds your post data
  const { siteMetadata } = site
  let urlId = anchorEpisode.link.split("/")[anchorEpisode.link.split("/").length-1]
  const url = "https://anchor.fm/white-label-community/embed/episodes/"+urlId;

  return (
    <Layout>
      <Helmet>
        <title>{anchorEpisode.title} | {siteMetadata.title}</title>
        <meta name="description" content={anchorEpisode.contentSnippet} />
      </Helmet>
      <div className="blog-post-container">
        <article className="post">

          <div className="post-thumbnail">
            <h1 className="post-title">{anchorEpisode.title}</h1>
            <div className="post-meta">{anchorEpisode.isoDate}</div>
            <iframe src={url} style={{width: "100%"}} frameBorder="0" scrolling="no"></iframe>
          </div>

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: anchorEpisode.content }}
          />
        </article>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    anchorEpisode(id: {eq: $id}) {
      id
      title
      link
      content
      guid
      isoDate(formatString: "DD-MM-YYYY")
      contentSnippet
    }
  }
`