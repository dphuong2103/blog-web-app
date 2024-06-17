module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/blogs:route*",
        destination: "/api/proxy?path=blogs:route*",
      },
      {
        source: "/test/:path*",
        destination: "/api/proxy?path=:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/blog:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
};
