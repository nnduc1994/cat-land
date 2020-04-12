const dev = {
  backendURL: "http://localhost:3000"
};

const prod = {
  backendURL: "https://h8200fczdd.execute-api.eu-west-1.amazonaws.com/prod"
};

const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  ...config
};