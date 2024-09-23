export const actions = {
    // Autenticação automática
    async authenticateUser({ commit }) {
      let token = localStorage.getItem('access_token'); // Verificar se há token armazenado

      if (!token) {
        // Se não houver token, realizar chamada Axios para o serviço de autenticação
        try {
          
          commit('setToken', token); // Salvar o token no Vuex e localStorage
        } catch (error) {
          console.error('Erro ao obter token:', error);
          return;
        }
      }

      // Decodificar o token para obter perfis e permissões
      const decodedToken = jwtDecode(token);
      const profiles = decodedToken.profiles || []; // Perfis do usuário

      commit('setAuthentication', true);
      commit('setUserProfiles', profiles);

      // Definir permissões com base nos perfis
      const permissions = {
        canRead: false,
        canUpdate: false,
        canDelete: false,
        canCreate: false
      };

      profiles.forEach(profile => {
        if (profile === 'admin') {
          permissions.canRead = true;
          permissions.canUpdate = true;
          permissions.canDelete = true;
          permissions.canCreate = true;
        } else if (profile === 'usuario') {
          permissions.canRead = true;
        }
      });

      commit('setUserPermissions', permissions);
    },
    logout({ commit }) {
      commit('setAuthentication', false);
      commit('setUserProfiles', []);
      commit('setUserPermissions', {});
      localStorage.removeItem('token'); // Remover token do localStorage
    }
}