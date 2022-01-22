export const environment: any = {
  production: false,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '8080',
    endpoints: {
      adder: {
        current: '/adder/current',
        add: '/adder?num=:param',
        accumulate: '/adder/current?num=:param',
      },
    },
  },
};
