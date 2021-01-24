import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Wrapper, Image } from "./templateStyles/movieStyles"

const MovieTemplate = ({
  data: {
    wpcontent: {
      movie: { movie },
    },
  },
}) => {
  return (
    <Layout>
      <SEO title="Movie" />
      <Wrapper>
        <div className="movie-container">
          <div className="movie-image">
            <Image
              fluid={movie.poster.imageFile.childImageSharp.fluid}
              alt={movie.poster.altText}
            />
            <div className="genres">
              {movie.genre.map(({ name, i }) => (
                <div className="genre" key={i}>
                  {name}
                </div>
              ))}
            </div>
          </div>
          <div className="movie-info">
            <h2>{movie.title}</h2>
            <h3>
              <span>IMDB: {movie.imdbRating} -</span>{" "}
              <span>{movie.duration} min</span>
            </h3>
            <p className="description">{movie.description}</p>
            <p className="info">{movie.plot}</p>
            <p className="info">
              <strong>Director:</strong> {movie.director}
            </p>
            <p className="info">
              <strong>Actors:</strong> {movie.actors}
            </p>
            <p className="info">
              <strong>Writer:</strong> {movie.writer}
            </p>
            <p className="info">
              <strong>Awards:</strong> {movie.awards}
            </p>

            <p className="info">
              <strong>Release Date:</strong> {movie.releaseYear}
            </p>
            {movie.language === "" && (
              <p className="info">
                <strong>Language:</strong> {movie.language}
              </p>
            )}
            <p className="info">
              <strong>Duration:</strong> {movie.duration}
            </p>
            <p className="info">
              <strong>IMDB:</strong> {movie.imdbRating}
            </p>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default MovieTemplate

export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
      movie(id: $id, idType: ID) {
        movie {
          title
          director
          actors
          writer
          genre {
            name
          }
          imdbRating
          duration
          awards
          country
          language
          motionPictureRating
          plot
          releaseYear
          poster {
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            altText
          }
        }
        slug
      }
    }
  }
`
