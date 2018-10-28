module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
  ? '/music/'
    : '/',
  devServer: {
    public: "0.0.0.0:8000"
  }
}