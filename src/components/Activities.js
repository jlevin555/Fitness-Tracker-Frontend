import React, { useEffect, useState } from 'react';
import { fetchAllPosts } from './Fetch'
import { renderAllPosts, renderNewPostForm, renderLogin, renderRegister } from './Render'

const fetchAllActivities = async () => {
    try {
        const response = await fetch(`https://fitness-tracker-gsjx.onrender.com/api/activities`);
        const result = await response.json();
        if (result.error) {
            throw result.error;
        }
        return result;
      } catch (error) {
        console.error('Error fetching things', error);
      }
};


const Activities = ({ token }) => {
    const [activities, setActivities] = useState([])
    // const [id, setid] = useState()
    // const [content, setcontent] = useState("");
    // const [stuff, setStuff] = useState("");
    
    // const handleSubmit = async event => {
    //   console.log("String", event)
    //     event.preventDefault();
    //     const arr = {
    //         name: {content},
    //         description: {stuff},

    //     }
    //     // console.log("String 2", obj)
    //     // setid(event.target[1].value)
    //     // await messageUser(obj, token, id)
    // }

//     const handleDelete = async event => {
//       event.preventDefault();
//       setid(event.target[0].value)
//       await deletePost(token, id);
//       console.log("String 5", event.target[0].value)

//   }

    useEffect(() => {
        const fetchData = async () => {
          const result = await fetchAllActivities();
          setActivities(result);

        };
    
        fetchData();
      }, []);
    return activities.map((activity) => (
        <div key={activity.id} class="routine">
            <div>
                <h4>{activity.name}</h4>
                <div>id: {activity.id}</div> 
                <div>Description: {activity.description}</div> 
            </div> 
        </div>
    ))

    //renderAllPosts(posts)
    //renderLogin()
    //renderRegister()
    //renderNewPostForm()
}

export default Activities;