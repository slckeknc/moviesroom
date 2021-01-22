import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>MOVIESROOM</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Hi, I'm now here!</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/404/">Go to page 2</Link> <br />
  </Layout>
)

export default IndexPage
