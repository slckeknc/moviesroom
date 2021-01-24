const { grapql } = require("gatsby")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      wpcontent {
        movies {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(error => console.log(error.toString()))
      return Promise.reject(result.errors)
    }

    const movies = result.data.wpcontent.movies.edges
    movies.forEach(movie => {
      const { id, slug } = movie.node
      createPage({
        path: slug,
        component: path.resolve(`src/templates/movie.js`),
        context: {
          id,
          slug,
        },
      })
    })
  })
}
/* Aan de hand van dit stukje code worden de images vanuit WPgraphql omgezet tot images waarop Gatsby image optimization kan toepassen */
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WPGraphql_MediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}
