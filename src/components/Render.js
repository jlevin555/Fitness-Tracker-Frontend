import { fetchAllPosts, fetchSinglePost, addNewPost, removePost, addNewMessage, addNewUser, userLogin } from './Fetch'

const postContainer = document.getElementById('all-posts-container');
const newPostFormContainer = document.getElementById('new-post-form');
const loginContainer = document.getElementById('login-form');
const registerContainer = document.getElementById('register-form');

export const renderAllPosts = (postList) => {
  if (!postList || !postList.length) {
    postContainer.innerHTML = '<h3>No posts to display!</h3>';
    return;
  }

  let postContainerHTML = '';
  for (let i = 0; i < postList.length; i++) {
    const Post = postList[i];
    let postHTML = `
      <div class="single-post">
        <div class="post-info">
          <h4 class="post-title">${Post.title}</h4>
          <p class="post-id">${Post._id}</p>
          <p class="post-number">${Post.description}</p>
          <p class="post-price">${Post.price}</p>
          <p class="post-location">${Post.location}</p>
        </div>
        <button class="detail-button" data-id=${Post._id}>See details</button>
        <button class="delete-button" data-id=${Post._id}>DELETE POST</button>
      </div>
    `;
    postContainerHTML += postHTML;
  }

  postContainer.innerHTML = postContainerHTML;

  let detailButtons = [...document.getElementsByClassName('detail-button')];
  for (let i = 0; i < detailButtons.length; i++) {
    const button = detailButtons[i];
    button.addEventListener('click', async () => {
      
      const ID = await fetchSinglePost(button.dataset.id);
      renderSinglePost(ID);
      console.log(button.dataset.id)
      console.log(ID)
      
    });
  }

  let deleteButtons = [...document.getElementsByClassName('delete-button')];
  for (let i = 0; i < deleteButtons.length; i++) {
  const button = deleteButtons[i];
  button.addEventListener('click', async () => {
    await removePost(button.dataset.id);
    const post = await fetchAllPosts();
    renderAllPosts(post);
  });
  } 
}

export const renderSinglePost = (postObj) => {
  if (!postObj || !postObj._id) {
    postContainer.innerHTML = "<h3>Couldn't find data for this post</h3>";
    return;
  }

  let postHTML = `
    <div class="single-post-view">
      <div class="post-info">
        <p class="post-title">${postObj.title ? postObj.title : 'Unassigned'}</p>
        <p class="post-id">${postObj._id ? postObj._id : 'Unassigned'}</p>
        <p class="post-description">${postObj.description ? postObj.description : 'Unassigned'}</p>
        <p class="post-price">${postObj.price ? postObj.price : 'Unassigned'}</p>
        <p class="post-location">${postObj.location ? postObj.location : 'Unassigned'}</p>
      </div>
      <button id="see-all">Back to all posts</button>
    </div>
  `;

  postContainer.innerHTML = postHTML;

  const seeAll = document.getElementById('see-all');
  seeAll.addEventListener('click', async () => {  

    const posts = await fetchAllPosts()
    renderAllPosts(posts)
  
    renderNewPostForm()

  });
}

export const renderNewPostForm = () => {
  let formHTML = `
    <form>
      <label for="title">Title:</label>
      <input type="text" name="title" />
      <label for="description">Description:</label>
      <input type="text" name="description" />
      <label for="price">Price:</label>
      <input type="text" name="price" />
      <label for="location">Location:</label>
      <input type="text" name="location" />
      <button type="submit">Submit New Post</button>
    </form>
  `;
  newPostFormContainer.innerHTML = formHTML;

  let form = document.querySelector('#new-post-form > form');
  form.addEventListener('submit', async (event) => {

    event.preventDefault();
    let postData = {
      title: form.elements.title.value,
      description: form.elements.description.value,
      price: form.elements.price.value,
      location: form.elements.location.value,
    }
    await addNewPost(postData)

    const posts = await fetchAllPosts()
    renderAllPosts(posts)
    renderNewPostForm()
  });
}

export const renderLogin = () => {
  let formHTML = `
  <form>
    <label for="username">Username:</label>
    <input type="text" name="username" />
    <label for="password">Password:</label>
    <input type="text" name="password" />
    <button id="login" class="nav">
        Login
    </button>
  </form>`;

  loginContainer.innerHTML = formHTML;

  let form = document.querySelector('#login-form > form');
  form.addEventListener('submit', async (event) => {

    event.preventDefault();
    let userData = {
      username: form.elements.username.value,
      password: form.elements.password.value,
    }

    await userLogin(userData)



    const posts = await fetchAllPosts()
    renderAllPosts(posts)
    renderLogin()
});
}

export const renderRegister = () => {
  let formHTML = `
  <form>
    <label for="username">Username:</label>
    <input type="text" name="username" />
    <label for="password">Password:</label>
    <input type="text" name="password" />
    <button id="register" type="submit" class="nav">
        Register
    </button>
  </form>`;

  registerContainer.innerHTML = formHTML;

  let form = document.querySelector('#register-form > form');
  form.addEventListener('submit', async (event) => {

    event.preventDefault();
    let userData = {
      username: form.elements.username.value,
      password: form.elements.password.value,
    }

    await addNewUser(userData)



    const posts = await fetchAllPosts()
    renderAllPosts(posts)
    renderRegister()
});
}

export const renderUserProfile = (UserObj) => {}

export const renderMessages = () => {}

export const renderNewMessageForm = () => {}