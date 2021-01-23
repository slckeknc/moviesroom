import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper,
  Image,
  Movie,
  BottomEdgeDown,
  BottomEdgeUp,
} from "./pageStyles/pageStyles"
import { COLORS } from "../constants"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homePageMeta: {
          homePageDescription,
          homePageHeaderDescription,
          homePageHeaderTitle,
          homePageHeaderPicture,
          homePageFeaturedMovies,
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "home", idType: URI) {
          homePageMeta {
            homePageDescription
            homePageHeaderDescription
            homePageHeaderTitle
            homePageHeaderPicture {
              altText
              slug
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            homePageFeaturedMovies {
              ... on WPGraphql_Movie {
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
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image
            fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid}
            alt={homePageHeaderPicture.altText}
          />
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
            <p className="header-description">{homePageHeaderDescription}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{homePageDescription}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="movies">
          <div className="movie-items">
            {homePageFeaturedMovies.map(({ movie, slug }) => (
              <Movie to={`/${slug}`} key={movie.title}>
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
export default IndexPage
