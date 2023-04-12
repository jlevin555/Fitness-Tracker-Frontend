import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { UserRoutines } from '.'

const fetchAllRoutines = async () => {
    try {
        const response = await fetch(`https://fitness-tracker-gsjx.onrender.com/api/routines`);
        const result = await response.json();
        if (result.error) {
            throw result.error;
        }
        return result;
      } catch (error) {
        console.error('Error fetching things', error);
      }
};

const fetchUserRoutines = async (username) => {
    try {
        const response = await fetch(`https://fitness-tracker-gsjx.onrender.com/api/users/${username}/routines`);
        const result = await response.json();
        if (result.error) {
            throw result.error;
        }
        console.log(result)
        return result;
      } catch (error) {
        console.error('Error fetching things', error);
      }
};




const Routines = ({ token }) => {
    const [routines, setRoutines] = useState([])
    const [name, setName] = useState();
    const [open, setOpen] = useState(false);
    const [userR, setuserR] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
          const result = await fetchAllRoutines();
          setRoutines(result);

        };
    
        fetchData();
      }, []);

      const handleUserRoutines = async event => {
        event.preventDefault();
        setName(event.target[1].value)
        console.log("Stringstringstring", event)
      }
      
    return routines.map((routine) => (
        <div key={routine.id} class="routine">
            <div>
                <h1>{routine.name}</h1>
                <div>Id: {routine.id}</div> 
                <div>Creator Id: {routine.creatorId}</div> 
                <div>Creator Name: {routine.creatorName}</div> 
                <form onSubmit={handleUserRoutines}>
                    <div>
                        <button type="submit">
                            <Link className='userroutines' to='/user/routines'>
                                View User Routines (DOES NOT WORK YET)
                            </Link>
                        </button>
                        <Routes>
                            <Route path='/user/routines' element={<UserRoutines name={ name }/>} />
                        </Routes>
                        <input value={routine.creatorName} class="hidden"></input>
                    </div>
                </form>                
                <div>Public: {routine.isPublic ? "Yes" : "No"}</div> 
                <div>Goal: {routine.goal}</div> 
                <div><h3>Activities:</h3> {routine.activities.map((activity) => (
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
}

export default Routines;