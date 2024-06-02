
 
/** @type {import('next').NextConfig} */
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const withMDX = nextMDX({
  options: {
    // More MDX options
    remarkPlugins: [remarkGfm],
  }
})

export default withMDX({
  // Next.js options
})