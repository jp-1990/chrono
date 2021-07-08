import { createStore, action, Action, createTypedHooks } from "easy-peasy";

interface Auth {
  token: string | undefined;
  tokenExpires: number | undefined;
}

interface AuthModel {
  auth: Auth;
  setAuth: Action<AuthModel, Auth>;
}

interface StoreModel extends AuthModel {}

const typedHooks = createTypedHooks<StoreModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export const store = createStore<StoreModel>({
  auth: {
    token: undefined,
    tokenExpires: undefined,
  },
  setAuth: action((state, payload) => {
    state.auth.token = payload.token;
    state.auth.tokenExpires = payload.tokenExpires;
  }),
});
