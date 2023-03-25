import React from 'react';
import User from './user';

const Users = ({users, ...rest}) => {  
    return (
        <>
        {users.length > 0 && (
        <table className="table">
            <thead>
                <tr>
                    <th className='m-2'>Имя</th>
                    <th className='m-2'>Качества</th>
                    <th className='m-2'>Проффессия</th>
                    <th className='m-2'>Встретился, раз</th>
                    <th className='m-2'>Оценка</th>
                    <th className='m-2'>Избранное</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user)=>(
                    <User key={user._id} {...rest} {...user}/>
                ))}
            </tbody>
        </table>
        )}
    </>
    );
};

export default Users;