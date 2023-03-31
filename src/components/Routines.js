import React, { useEffect, useState } from 'react';
import { fetchAllPosts } from './Fetch'
import { renderAllPosts, renderNewPostForm, renderLogin, renderRegister } from './Render'

const fetchAllRoutines = async () => {
    try {
        const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines`);
        const result = await response.json();
        if (result.error) {
            throw result.error;
        }
        return result;
      } catch (error) {
        console.error('Error fetching things', error);
      }
};


const Routines = ({ token }) => {
    const [routines, setRoutines] = useState([])
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
          const result = await fetchAllRoutines();
          setRoutines(result);

        };
    
        fetchData();
      }, []);
    return routines.map((routine) => (
        <div key={routine.id} class="routine">
            <div>
                <h4>{routine.name}</h4>
                <div>Id: {routine.id}</div> 
                <div>Creator Id: {routine.creatorId}</div> 
                <div>Creator Name: {routine.creatorName}</div> 
                <div>Public: {routine.isPublic ? "Yes" : "No"}</div> 
                <div>Goal: {routine.goal}</div> 
                <div>Activities: {routine.activities.map((activity) => (
                    <div key={activity.id} class="inner">
                        <div>Id: {activity.id}</div> 
                        <div>Name: {activity.name}</div> 
                        <div>Description: {activity.description}</div> 
                        <div>Duration: {activity.duration}</div> 
                        <div>Count: {activity.count}</div> 
                        <div>RoutineActivityId: {activity.routineActivityId}</div> 
                        <div>RoutineId: {activity.routineId}</div> 
                    </div>))}</div> 
            </div> 
        </div>
    ))

    //renderAllPosts(posts)
    //renderLogin()
    //renderRegister()
    //renderNewPostForm()
}

export default Routines;