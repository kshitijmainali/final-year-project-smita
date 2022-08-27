import TokenPersistor from './persistor';
import jwtDecode from 'jwt-decode';

const authTokenResponse = response_data => {
  const { token } = response_data.data;
  const decoded = jwtDecode(token);
  const { id, email } = decoded;

  return {
    token,
    meta: {
      id,
      email,
    },
  };
};

const Authenticator = (function () {
  function persistTokens(data) {
    TokenPersistor.write('token', data.token);
    TokenPersistor.write('meta', data.meta);
  }

  function isAuthenticated() {
    return Boolean(TokenPersistor.read('token'));
  }

  function getTokens() {
    return {
      token: TokenPersistor.read('token'),
      meta: TokenPersistor.read('meta'),
    };
  }
  function getUser() {
    const meta = TokenPersistor.read('meta');
    return {
      id: meta?.id,
      email: meta?.email,
    };
  }
  function login(data) {
    persistTokens(authTokenResponse(data));
  }

  function logout() {
    TokenPersistor.purge();
  }

  return {
    persistTokens,
    isAuthenticated,
    getTokens,
    getUser,
    login,
    logout,
  };
})();

export default Authenticator;
