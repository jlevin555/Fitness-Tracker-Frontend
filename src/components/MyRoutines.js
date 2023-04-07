import React, { useEffect, useState } from 'react';
import { fetchAllPosts } from './Fetch'
import { renderAllPosts, renderNewPostForm, renderLogin, renderRegister } from './Render'

const fetchAllRoutines = async ( username, token ) => {
    try {
        const response = await fetch(`https://fitness-tracker-gsjx.onrender.com/api/users/${username}/allroutines`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
        const result = await response.json();
        if (result.error) {
            throw result.error;
        }
        return result;
      } catch (error) {
        console.error('Error fetching things', error);
      }
};


const MyRoutines = ({ token, user }) => {
    const [routines, setRoutines] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const result = await fetchAllRoutines(user, token);
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

export default MyRoutines;