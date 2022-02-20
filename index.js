import _ from 'lodash';

export const mkdir = (name, arraychild = [], meta = {}) => {
  const dir = {};
  dir.name = name;
  dir.type = 'directory';
  dir.meta = meta;
  dir.children = arraychild;
  return dir;
};

export const mkfile = (name, meta = {}) => {
  const file = {};
  file.name = name;
  file.type = 'file';
  file.meta = meta;
  return file;
};

export const getChildren = (directory) => {
  return directory.children;
};

export const getMeta = (file) => file.meta;

export const getName = (file) => file.name;

export const isFile = (node) => node.type === 'file';

export const isDirectory = (node) => node.type === 'directory';


const compressImages = (tree) => {
  console.log('tree: '+ JSON.stringify(tree, null, 2));
  const child = getChildren(tree);
  console.log('child: '+ JSON.stringify(child, null, 2));
  const newChild = [];
  let meta;
  for (const ch of child) {
    console.log(`ch: --- ${JSON.stringify(ch, null, 2)}`);
    if (isFile(ch)) {
      if (ch.name.endsWith('.jpg')) {
        console.log(`warning: --- ${JSON.stringify(ch, null, 2)}`);
        let meta = _.cloneDeep(getMeta(ch));
        console.log(`meta: --- ${JSON.stringify(meta, null, 2)}`);
        const newSize = meta.size / 2;
        meta.size = newSize;
        const nfile = mkfile(getName(ch),meta);
        console.log(`meta2: --- ${JSON.stringify(getMeta(ch), null, 2)}`);
        newChild.push(nfile);
      } else {
        meta = _.cloneDeep(getMeta(ch));
        const nfile = mkfile(getName(ch),meta);
        newChild.push(nfile);
      }
      
    } else {
      const dir = mkdir(getName(ch),_.cloneDeep(getChildren(ch), _.cloneDeep(getMeta(ch))));
      newChild.push(dir);
    }
    
  }
  const newDir = mkdir(getName(tree), newChild, _.cloneDeep(getMeta(tree)));
  return newDir;
};

const tree = mkdir('my documents', [
  mkfile('avatar.jpg', { size: 100 }),
  mkfile('passport.jpg', { size: 200 }),
  mkfile('family.jpg', { size: 150 }),
  mkfile('addresses', { size: 125 }),
  mkdir('presentations')
]);

 
const newTree = compressImages(tree);
console.log('result: ' + JSON.stringify(newTree, null, 2));
// То же самое, что и tree, но во всех картинках размер уменьшен в два раза