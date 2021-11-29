const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const app = express();
const port = 7555;
app.use(cors());

function _transformUser(user) {
  return {
    ...user,
    websiteHref: (!user.website.includes('http')) ? `http://${user.website}` : user.website
  };
}

app
  .get('/posts-data', (req, res) => {
    const _requests = [
      axios.get('https://jsonplaceholder.typicode.com/posts'),
      axios.get('https://jsonplaceholder.typicode.com/users'),
      axios.get('https://jsonplaceholder.typicode.com/comments')
    ];
    axios.all(_requests)
      .then(axios.spread((...responses) => {
        const posts = responses[0].data;
        const usersApi = responses[1].data;
        const commentsApi = responses[2].data;
        const users = usersApi.map((user) => _transformUser(user));
        const response = {
          posts: posts.map((post) => {
            const user = users.find((user) => user.id === post.userId);
            const comments = commentsApi.filter((comment) => comment.postId === post.id);
            return { ...post, user, comments };
          }),
          users
        };
        res.json(response);
      })).catch((reason) => {
        res.status(reason.status).json(reason.data);
      });
  })
  .get('/one-post-data/:id', (req, res) => {
    const _requests = [
      axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`),
      axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`)
    ];
    axios.all(_requests)
      .then(axios.spread((...responses) => {
        const post = responses[0].data;
        const comments = responses[1].data;
        axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
          .then((user) => {
            const response = {
              ...post,
              user: _transformUser(user.data),
              comments
            };
            res.json(response);
          })
          .catch((reason) => {
            res.status(reason.status).json(reason.data);
          });
      })).catch((reason) => {
        res.status(reason.status).json(reason.data);
      });
  });

app.get('/healthcheck', (req, res) => {
  console.log('OK, Check');
  res.json('OK, Check');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
