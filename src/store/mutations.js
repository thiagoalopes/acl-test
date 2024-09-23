export const mutations = {
    setAuthentication(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
      },
      setToken(state, token) {
        state.token = token;
        localStorage.setItem('token', token); // Armazenar o token localmente
      },
      setUserProfiles(state, profiles) {
        state.userProfiles = profiles;
      },
      setUserPermissions(state, permissions) {
        state.userPermissions = permissions;
      }
}