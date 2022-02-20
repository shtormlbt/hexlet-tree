import { mkdir, mkfile, getName, getMeta, getChildren, isDirectory, isFile } from './index.js';
import _ from 'lodash';

const downcaseFileNames = (tree) => {
  const name = getName(tree);
  const newMeta = _.cloneDeep(getMeta(tree));

  if (isFile(tree)) {
      return mkfile(name, newMeta);
  }

  const children = _.cloneDeep(getChildren(tree));
  const newChild = [];
  for (const ch of children) {
    
    if (ch.type === 'directory') {
      const nch = downcaseFileNames(ch);
      newChild.push(nch);
    } else {
      ch.name = getName(ch).toLowerCase();
      newChild.push(ch);
    }
    
    
  }

  //const newChild = children.map((child) => child.name = getName(child).toLowerCase());



  const newTree = mkdir(name, newChild, newMeta);
  return newTree;
};

const tree = mkdir('/', [
  mkdir('eTc', [
    mkdir('NgiNx'),
    mkdir('CONSUL', [
      mkfile('config.json'),
    ]),
  ]),
  mkfile('hOsts'),
]);
 
console.log(JSON.stringify(downcaseFileNames(tree), null , 2));