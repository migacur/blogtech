const nextConfig = {
    // 1. Deshabilitar caché de compilación
  onDemandEntries: {
    maxInactiveAge: 0,  // Invalida inmediatamente
    pagesBufferLength: 1
  },
  images: {
    remotePatterns: [
      { protocol: "https", 
        hostname: "i.blogs.es", 
        port: "", 
        pathname: "/**" },
      {
        protocol: "https",
        hostname: "mundodeportivo.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "es.web.img3.acsta.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "phantom-marca-us.unidadeditorial.es",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thecosmiccircus.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imageio.forbes.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.infobae.com",
        port: "",
        pathname: "/**",
      },
       {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
       {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
        {
        protocol: "https",
        hostname: "live.staticflickr.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
   async headers() {
    return [
      {
        source: "/post/:path*",
        headers: [
          { 
            key: "Cache-Control", 
            value: "private, no-store, max-age=0, must-revalidate" 
          },
          { 
            key: "CDN-Cache-Control", 
            value: "private, no-store" 
          },
          { 
            key: "Vercel-CDN-Cache-Control", 
            value: "private, no-store" 
          }
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { 
            key: "Cache-Control", 
            value: "no-store, max-age=0" 
          }
        ],
      },
    ];
  },
};

export default nextConfig;
