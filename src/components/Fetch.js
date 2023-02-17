const cohortName = '2211-ftb-et-web-pt';
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}/`;

export const fetchAllPosts = async () => {
    try {
        const response = await fetch(`${APIURL}posts`);
        const result = await response.json();
        if (result.error) {
            throw result.error;
        }
        return result.data.posts;
      } catch (error) {
        console.error('Error fetching things', error);
      }
};

export const fetchSinglePost = async (postID) => {
    try {
        const response = await fetch(`${APIURL}posts/${postID}`);
        const result = await response.json();
        console.log(response)
        if (result.error) {
            throw result.error;
        }
        return result.data.post;
      } catch (error) {
        console.error('Error fetching post ID', error);
      }
};

export const addNewPost = async (postObj) => {
  try {
      const response = await fetch(
          `${APIURL}posts`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              //'Authorization': 'Bearer TOKEN_STRING_HERE'
            },
            body: JSON.stringify(postObj),
          }
        );
      const result = await response.json();
      if (result.error) {
          throw result.error;
      }
      return;
    } catch (error) {
      console.error('Error adding post', error);
    }
};

export const removePost = async (postID) => {
  try {
      const response = await fetch(`${APIURL}/posts/${postID}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.error) throw result.error;
      return;
     } catch (err) {
      console.error(
        `Error removing post #${postID}`,
        err
      );
     }
};

export const addNewMessage = async (postID, MessageObj) => {
  try {
      const response = await fetch(
          `${APIURL}posts/${postID}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              //'Authorization': 'Bearer TOKEN_STRING_HERE'
            },
            body: JSON.stringify(MessageObj),
          }
        );
      const result = await response.json();
      if (result.error) {
          throw result.error;
      }
      return;
    } catch (error) {
      console.error('Error adding message', error);
    }
};

export const addNewUser = async (postObj) => {
  try {
      const response = await fetch(
          `${APIURL}users/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postObj),
          }
        );
      const result = await response.json();
      if (result.error) {
          throw result.error;
      }
      return;
    } catch (error) {
      console.error('Error adding user', error);
    }
};

export const userLogin = async (postObj) => {
  try {
      const response = await fetch(
          `${APIURL}users/login`,
          {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(postObj),
          }
      );
      const result = await response.json();
      if (result.error) {
          throw result.error;
      }
      return;
  } catch (error) {
      console.error('Error loging in', error);
  }
};

export const userProfile = async () => {
  try {
      const response = await fetch(
          `${APIURL}users/me`,
          {
          headers: {
              'Content-Type': 'application/json',
          },
          }
      );
      const result = await response.json();
      if (result.error) {
          throw result.error;
      }
      return;
  } catch (error) {
      console.error('Error viewing profile', error);
  }
};
