import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const AboutUsPage = () => {
  const {
    wpcontent: {
      page: {
        aboutUsMeta: { aboutUsPageDescription, aboutUsPageHeaderPicture },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "about-us", idType: URI) {
          aboutUsMeta {
            aboutUsPageDescription
            aboutUsPageHeaderPicture {
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
      }
    }
  `)

  return (
    <Layout>
      <SEO title="About Us" />
      <Wrapper descriptionColor={COLORS.PRIMARY}>
        <div className="banner">
          <Image
            fluid={aboutUsPageHeaderPicture.imageFile.childImageSharp.fluid}
            alt={aboutUsPageHeaderPicture.altText}
          />
          <BottomEdgeDown color={COLORS.PRIMARY} />
        </div>
        <div className="description">
          <h2 style={{ justifyContent: "center" }}>About Us</h2>
          <p>{aboutUsPageDescription}</p>
          <BottomEdgeUp color={COLORS.SECONDARY} />
        </div>
      </Wrapper>
    </Layout>
  )
}

export default AboutUsPage
