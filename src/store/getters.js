export const mutations = {
    userCanRead(state) {
        return state.userPermissions.canRead;
    },
    userCanUpdate(state) {
        return state.userPermissions.canUpdate;
    },
    userCanDelete(state) {
        return state.userPermissions.canDelete;
    },
    userCanCreate(state) {
        return state.userPermissions.canCreate;
    }
  }