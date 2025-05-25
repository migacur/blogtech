const nextConfig = {
  images: {
    remotePatterns: [
      'i.blogs.es',
      'mundodeportivo.com',
      'es.web.img3.acsta.net',
      'phantom-marca-us.unidadeditorial.es',
      'thecosmiccircus.com',
      'imageio.forbes.com',
      'www.infobae.com',
      'res.cloudinary.com',
      'live.staticflickr.com',
    ],
  },
  async headers() {
    return [
      {
        // Aplicar a todas las rutas de API
        source: '/api/post/:id', // :path* captura todas las rutas bajo /api
        headers: [
          {
            key: 'x-user-data', // Nombre del header personalizado
            value: '', // El valor se establecerá dinámicamente en el middleware
          },
        ],
      },
    ];
  },
};

export default nextConfig;