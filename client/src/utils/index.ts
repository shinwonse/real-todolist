export const bind = (template) => {
  template = template.replace(/<!--(.*)-->/g, '');
  return template.replace(/{{\s*[\w.+? ()]+\s*}}/g, (mustache) => {
    return eval(mustache.match(/[\w.?+ ()]+/)[0]);
  });
};

export const getToken = () => localStorage.getItem('token');

export const isLogin = () => !!localStorage.getItem('token');

export const saveToken = (token) => localStorage.setItem('token', token);

export const deleteToken = () => localStorage.removeItem('token');
