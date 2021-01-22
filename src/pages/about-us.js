import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
} from "./pageStyles/pageStyles"
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
      <Wrapper describtionColor={COLORS.PRIMARY}>
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
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
      </Wrapper>
    </Layout>
  )
}

export default AboutUsPage
