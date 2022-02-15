const fs = require('fs');
const path = require('path');

function getPosts() {
  const folderPath = path.join(__dirname, 'clients');
  const userFolders = fs.readdirSync(folderPath);
  const posts = [];
  for (let folder of userFolders) {
    let filerPath = path.resolve(folderPath, folder, 'posts.json');
    let fileData = fs.readFileSync(filerPath);
    posts.push(...JSON.parse(fileData));
  }
  return posts;
}

function getSpecPost(id) {
  const posts = getPosts();
  if (id > posts.length) {
    return false;
  }
  const specPost = posts.find((post) => post.id === id);
  return specPost;
}

function usersId() {
  const usersPath = path.join(__dirname, 'clients');
  const users = fs.readdirSync(usersPath);
  const usersId = users.map((user) => (user = user.split('_')[0]));
  return usersId;
}

function addNewPost(newPost, userId) {
  const filePath = path.join(__dirname, 'clients');
  const folders = fs.readdirSync(filePath);
  const folder = folders.find((item) => item.includes(userId));
  const userFolderPath = path.resolve(filePath, folder, 'posts.json');
  fs.writeFileSync(userFolderPath, JSON.stringify(newPost));
}

module.exports = {
  getPosts,
  usersId,
  addNewPost,
  getSpecPost,
};
