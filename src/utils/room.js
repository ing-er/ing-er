export const changeSessionFormat = (sessionId) => {
  const categories = {
    4: '수능',
    5: '취준',
    6: '자격증',
    7: '고시',
    8: '기타',
  };

  let category_name = categories[sessionId.charAt(0)];
  category_name = (category_name === undefined) ? '기타' : category_name;
  const title = `${category_name}방`;

  return title;
};
