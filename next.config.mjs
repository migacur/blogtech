const nextConfig = {
    experimental: {
    // Deshabilitar caché de rutas estáticas
    staticPageGenerationTimeout: 0,
    // Deshabilitar caché de imágenes
    images: {
      unoptimized: true,
    },
  },
  // Deshabilitar caché de compilación
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60, // 1 hora
    pagesBufferLength: 5,
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
        // Aplicar a todas las rutas de API
        source: "/api/post/:id", // :path* captura todas las rutas bajo /api
        headers: [
          {
            key: "x-user-data", // Nombre del header personalizado
            value: "", // El valor se establecerá dinámicamente en el middleware
          },
        ],
      },
    ];
  },
};

export default nextConfig;
