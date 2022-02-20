const mkdir = (name, meta = {}, arraychild = []) => {
  const dir = {};
  dir.name = name;
  dir.type = 'directory';
  dir.meta = meta;
  dir.children = arraychild;
  return dir;
};

const mkfile = (name, meta = {}) => {
  const file = {};
  file.name = name;
  file.type = 'file';
  file.meta = meta;
  return file;
};

const getChildren = (directory) => {
  return directory.children;
};

const getMeta = (file) => file.meta;

const getName = (file) => file.name;

export { mkdir, mkfile, getChildren, getMeta, getName };