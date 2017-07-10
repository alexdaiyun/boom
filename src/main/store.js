const electron = require('electron');
import path from 'path';
import fs from 'fs';

class Store {
  constructor() {
    const dataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(dataPath, 'config.json');
    this.config = parseConfig(this.path);
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    this.config[key] = value;
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.config));
    } catch (e) {
      console.error(e);
    }
  }
}

function parseConfig(file) {
  if (!fs.existsSync(file)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(file));
  } catch (e) {
    return {};
  }
}

export default new Store();
