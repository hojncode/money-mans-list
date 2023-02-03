/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/person/:path*", // *는 뒤에 어떤 주소가 와도 연결해준다.
        destination: "/person/:path*",
        permanent: false, //!필수입력할것
      },
    ];
  },
  // rewrites 는 유저가 url 변화를 볼 수 없다. (유저가 api 를 볼 수 없다.)
  async rewrites() {
    return [
      {
        source: "/person/",
        destination: `https://billions-api.nomadcoders.workers.dev/person/`,
      },
    ];
  },
};

module.exports = nextConfig;
