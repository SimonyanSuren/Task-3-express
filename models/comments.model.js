const fs = require('fs');
const path = require('path');

function addNewPost(newPost, userId) {
  const filePath = path.join(__dirname, 'clients');
  const folders = fs.readdirSync(filePath);
  const folder = folders.find((item) => item.includes(userId));
  const userFolderPath = path.resolve(filePath, folder, 'posts.json');
  console.log(folder);
  fs.writeFileSync(userFolderPath, JSON.stringify(newPost));
}

module.exports = {
  addNewPost,
};
