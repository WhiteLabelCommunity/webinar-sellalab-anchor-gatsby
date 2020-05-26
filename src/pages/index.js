import React from "react"
import Helmet from 'react-helmet';
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import PostLink from "../components/post-link"
import HeroHeader from "../components/heroHeader"

const IndexPage = ({
  data: {
    site,
    allAnchorEpisode: { nodes },
  },
}) => {

  const Posts = nodes
    .map(node => <PostLink key={node.id} node={node} />)

  return (
    <Layout>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <HeroHeader/>
      <h2>Episodi &darr;</h2>
      <div className="grids">
        {Posts}
      </div>
    </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allAnchorEpisode(sort: {order: DESC, fields: isoDate}) {
      nodes {
        id
        title
        link
        content
        guid
        isoDate(formatString: "DD-MM-YYYY")
        contentSnippet
      }
    }
  }
`
