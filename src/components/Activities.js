import React, { useEffect, useState } from 'react';

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
}

export default Activities;