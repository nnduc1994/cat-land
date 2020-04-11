const dev = {
  backendURL: "http://localhost:3000"
};

const prod = {
  backendURL: ""
};

const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  ...config
};