const dev = process.env.NODE_ENV !== 'production';

export const host = dev ? 'http://localhost:3000' : 'https://mat.henlit.se';