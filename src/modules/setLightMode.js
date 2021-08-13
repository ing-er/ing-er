export const SETLIGHTMODE = 'SETLIGHTMODE';

export const setIsLightMode = (isLightMode) => ({
  type: SETLIGHTMODE,
  payload: isLightMode,
});

const initialState = {
  isLightMode: false,
};

const setLightMode = (state = initialState, action) => {
  switch (action.type) {
    case SETLIGHTMODE:
      return {
        ...state,
        isLightMode: action.payload,
      };
    default:
      return state;
  }
};

export default setLightMode;
