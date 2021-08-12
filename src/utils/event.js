export const noRefreshEvent = (e) => {
  if (e.keyCode == 116) {
      return false;
  }
  else if(e.ctrlKey && (e.keyCode==78 || e.keyCode == 82))
  {
      return false;
  }
};