module.exports = {
  siteMetadata: {
    title: `MoviesRoom`,
    description: `All about movies.`,
    author: `aekinci`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/moviesroom-logo.jpg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-graphql",

      options: {
        typeName: "WPGraphql",

        fieldName: "wpcontent",

        url: "http://moviesroom.local/graphql/",
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,

      options: {
        fonts: [`Roboto`, `Oswald`],

        display: "swap",
      },
    },
    `gatsby-plugin-styled-components`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
