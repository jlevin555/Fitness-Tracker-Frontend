import React, { useEffect, useState } from 'react';
import { fetchAllPosts } from './Fetch'
import { Activities, renderNewPostForm, renderLogin, renderRegister } from './'

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

const fetchAllActivities = async () => {
  try {
      const response = await fetch(`https://fitness-tracker-gsjx.onrender.com/api/activities`);
      const result = await response.json();
      if (result.error) {
          throw result.error;
      }
      console.log("Attached completed", result)
      return result;
    } catch (error) {
      console.error('Error fetching things', error);
    }
};

const attachActivity = async ( routineId, obj ) => {
  try {
      const response = await fetch(`https://fitness-tracker-gsjx.onrender.com/api/routines/${routineId}/activities`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
      const result = await response.json();
      if (result.error) {
          throw result.error;
      }
      return result;
    } catch (error) {
      console.error('Error fetching things', error);
    }
};

const deleteRoutine = async ( routineId, token ) => {
  try {
      const response = await fetch(`https://fitness-tracker-gsjx.onrender.com/api/routines/${routineId}`, {
        method: "DELETE",
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
      console.error('Error deleting', error);
    }
};

const updateRoutine = async ( routineId, obj, token ) => {
  try {
      const response = await fetch(`https://fitness-tracker-gsjx.onrender.com/api/routines/${routineId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          },
        body: JSON.stringify(obj)
      })
      const result = await response.json();
      if (result.error) {
          throw result.error;
      }
      return result;
    } catch (error) {
      console.error('Error fetching things', error);
    }
};

const updateRoutineActivity = async ( routineActivityId, obj, token ) => {
  try {
      const response = await fetch(`https://fitness-tracker-gsjx.onrender.com/api/routine_activities/${routineActivityId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          },
        body: JSON.stringify(obj)
      })
      const result = await response.json();
      if (result.error) {
          throw result.error;
      }
      return result;
    } catch (error) {
      console.error('Error fetching things', error);
    }
};

const deleteActFromRout = async ( routineActivityId, token ) => {
  try {
      const response = await fetch(`https://fitness-tracker-gsjx.onrender.com/api/routine_activities/${routineActivityId}`, {
        method: "DELETE",
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
      console.error('Error deleting', error);
    }
};

const MyRoutines = ({ token, setToken, user }) => {
    const [routines, setRoutines] = useState([])
    const [open, setOpen] = useState(false);
    const [activities, setActivities] = useState([])
    const [activityId, setactivityId] = useState()
    const [routineId, setroutineId] = useState()
    const [count, setcount] = useState()
    const [duration, setduration] = useState()
    const [name, setName] = useState();
    const [goal, setGoal] = useState();
    const [isPublic, setIsPublic] = useState();
    const [routineActivityId, setroutineActivityId] = useState()

    useEffect(() => {
        const fetchData = async () => {
          const result = await fetchAllRoutines(user, token);
          setRoutines(result);
          const actResult = await fetchAllActivities();
          setActivities(actResult);
        };
    
        fetchData();
      }, []);

      function handleOpen() {
        setOpen(!open);
      }

      const handleAttach = async event => {
        event.preventDefault();

        console.log("NNNNNNNNNNNNNNNNNN", event.target[4].value)

        setactivityId(event.target[3].value)
        setroutineId(event.target[4].value)

        console.log("ZZZZZZZZZZZZZZZZ", activityId, routineId, count, duration)

        const obj = {
          activityId, count , duration
        }
          await attachActivity(routineId, obj);
      }

      const handleDelete = async event => {
        event.preventDefault();
        setroutineId(event.target[1].value)
        console.log("String", routineId)
        await deleteRoutine(routineId, token);
      }

      const handleUpdate = async event => {
        event.preventDefault();
        setroutineId(event.target[5].value)
        const obj = {
          name, goal, isPublic
        }
        console.log("Stringgggggggggggg", event)
        await updateRoutine(routineId, obj, token)
      }

      const handleActUpdate = async event => {
        event.preventDefault();
        setroutineActivityId(event.target[3].value)
        const obj = {
          count, duration
        }
        console.log("GGGGGGGGGGGGG", event)
        await updateRoutineActivity(routineActivityId, obj, token)
      }

      const handleActDelete = async event => {
        event.preventDefault();
        setroutineActivityId(event.target[1].value)
        console.log("Stringstringstring", event)
        await deleteActFromRout(routineActivityId, token)
      }

    return routines.map((routine) => (
        <div key={routine.id} class="routine">
            <div>
                <h4>{routine.name}</h4>
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>
                          <p>Name</p>
                          <input type="text" onChange={event => setName(event.target.value)} placeholder="Name..."/>
                        </label>
                        <label>
                          <p>Goal</p>
                          <input type="text" onChange={event => setGoal(event.target.value)} placeholder="Goal..."/>
                        </label>
                        <label class="isPublic">
                          <p>Public?</p>
                          <div class="box">
                            <p>Yes</p>
                            <input type="checkbox" onChange={event => setIsPublic(true)}/>
                          </div>
                          <div class="box">
                            <p>No</p>
                            <input type="checkbox" onChange={event => setIsPublic(false)}/>
                          </div>
                        </label>
                        <button type="submit">Double Click to Update Routine</button>
                        <input value={routine.id} class="hidden"></input>
                    </div>
                </form>
                <form onSubmit={handleDelete}>
                    <div>
                        <button type="submit">Double Click to Delete Routine</button>
                        <input value={routine.id} class="hidden"></input>
                    </div>
                </form>
                <div>Id: {routine.id}</div> 
                <div>Creator Id: {routine.creatorId}</div> 
                <div>Creator Name: {routine.creatorName}</div> 
                <div>Public: {routine.isPublic ? "Yes" : "No"}</div> 
                <div>Goal: {routine.goal}</div> 
                <div class="dropdown">
                  Attach Activities
                  <button onClick={handleOpen} class="dropbtn">Dropdown</button>
                  <div>
                    {open ? activities.map((activity) => (
                      <div key={activity.id} class="routine">
                          <form onSubmit={handleAttach}>
                              <button type="submit">Double Click To Attach Activity</button>
                              <h5>{activity.name}</h5>
                              <label>
                                <p>Count</p>
                                <input type="number" onChange={event => setcount(event.target.value)} placeholder="Count..."/>
                              </label>
                              <label>
                                <p>Duration</p>
                                <input type="number" onChange={event => setduration(event.target.value)} placeholder="Duration..."/>
                              </label>
                              <div>id: {activity.id}</div> 
                              <div>Description: {activity.description}</div> 
                              <input value={activity.id} class="hidden"></input>
                              <input value={routine.id} class="hidden"></input>
                          </form> 
                      </div>
                    )) : null}
                  </div>
                </div>
                <div>Activities: {routine.activities.map((activity) => (
                    <div key={activity.id} class="inner">
                        <form onSubmit={handleActDelete}>
                            <div>
                                <button type="submit">Double Click to Delete Activity from Routine</button>
                                <input value={activity.routineActivityId} class="hidden"></input>
                            </div>
                        </form>
                        <div>Id: {activity.id}</div> 
                        <div>Name: {activity.name}</div> 
                        <div>Description: {activity.description}</div> 
                        <div>Duration: {activity.duration}</div> 
                        <div>Count: {activity.count}</div> 
                        <form onSubmit={handleActUpdate}>
                            <div>
                              <label>
                                <p>Count</p>
                                <input type="number" onChange={event => setcount(event.target.value)} placeholder="Count..."/>
                              </label>
                              <label>
                                <p>Duration</p>
                                <input type="number" onChange={event => setduration(event.target.value)} placeholder="Duration..."/>
                              </label>
                                <button type="submit">Double Click to Update Activity</button>
                                <input value={activity.routineActivityId} class="hidden"></input>
                            </div>
                        </form>
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