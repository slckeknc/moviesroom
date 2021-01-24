import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Movie,
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const Movies = () => {
  const {
    wpcontent: {
      page: {
        moviesMeta: { moviesPageDescription, moviesPageHeaderPicture },
      },
      movies: { nodes: movies },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "movies", idType: URI) {
          moviesMeta {
            moviesPageDescription
            moviesPageHeaderPicture {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
        }
        movies {
          nodes {
            movie {
              title
              director
              duration
              imdbRating
              poster {
                sourceUrl
                imageFile {
                  childImageSharp {
                    fluid(quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                altText
              }
              releaseYear
            }
            slug
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Movies" />
      <Wrapper movieColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={moviesPageHeaderPicture.imageFile.childImageSharp.fluid}
            alt={moviesPageHeaderPicture.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2 style={{ justifyContent: "center" }}>Movies</h2>
          <p>{moviesPageDescription}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="movies">
          <div className="movie-items">
            {movies.map(({ movie, slug, i }) => (
              <Movie to={`/${slug}`} key={i}>
                <Image
                  fluid={movie.poster.imageFile.childImageSharp.fluid}
                  alt={movie.poster.altText}
                />
                <div className="movie-info">
                  <p>{movie.title}</p>
                  <p>
                    {movie.duration} min. | IMDB: {movie.imdbRating}
                  </p>
                  <div className="detail">
                    <p>{movie.director}</p>
                    <p>{movie.releaseYear}</p>
                  </div>
                </div>
              </Movie>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default Movies
