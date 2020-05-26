const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)

  const result = await graphql(`
    {
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
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allAnchorEpisode.nodes.forEach(( node ) => {
    console.log("pagina:",node)
    createPage({
      path: "episode/"+node.id,
      component: blogPostTemplate,
      context: {
        id: node.id
      }, // additional data can be passed via context
    })
  })
}