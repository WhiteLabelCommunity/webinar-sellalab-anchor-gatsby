import React from "react"
import { Link } from "gatsby"

const PostLink = ( {node} ) => {
  console.log(node)

  return <article className="card ">
    <header>
      <h2 className="post-title">
        <Link to={"episode/"+node.id} className="post-link">
          {node.title}
        </Link>
      </h2>
      <div className="post-meta">{node.isoDate}</div>
    </header>
  </article>
}
export default PostLink
