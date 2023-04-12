import React from 'react';

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

const UserRoutines = ({ token }) => {


    return <div>
        Username
    </div>
}

export default UserRoutines;