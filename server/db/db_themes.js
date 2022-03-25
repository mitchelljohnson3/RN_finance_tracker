const query = require("./connection");

const updateTheme = async (data) => {
  const { primary, accent, text_color, background_color, unselected } = data;
  _query = `UPDATE Theme SET primary_c="${primary}", accent="${accent}",
            text="${text_color}",background="${background_color},unselected="${unselected}"`;
  await query(_query);
};

const fetchTheme = async () => {
  _query = `SELECT primary_c,accent,text,background,unselected FROM Theme`;
  const result = await query(_query);
  const theme = {
    primary: result[0].primary_c,
    accent: result[0].accent,
    text_color: result[0].text,
    background_color: result[0].background,
    unselected: result[0].unselected,
  };
  return theme;
};

module.exports = {
  updateTheme,
  fetchTheme,
};
