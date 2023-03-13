import React, {useState} from 'react';
import api from '../api'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers(prevState=>prevState.filter(user=> user !== userId))
    };
    const renderPhrase = (number) => {
        if(number>=5 || number===1){
            return <span className='badge bg-primary'>{number + ' человек тусанет с тобой сегодня' }</span>
        } else if(number<=4 && number>=1){
            return <span className='badge bg-primary'>{number + ' человека тусанут с тобой сегодня'}</span>
        } else{
            return <span className='badge bg-danger'>{'Никто не тусанет с тобой сегодня'}</span>
        }
    }
    const rowUser = () => {
        return(  
        <>
            {users.map(user=>(
                <>
                <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.qualities.map((quality) =>(
                    <div className={'badge m-1 bg-'+ quality.color}>{quality.name}</div>// undefined
                ))}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <button onClick={()=>handleDelete(user)} className='btn bg-danger'>delete</button>
                </tr>
                </>
                ))
            }
            
        </>
        )
    };
    return (
        <>
        {renderPhrase(users.length)}
        <table className="table">
            <thead>
                <tr>
                    <th className='m-2'>Имя</th>
                    <th className='m-2'>Качества</th>
                    <th className='m-2'>Проффессия</th>
                    <th className='m-2'>Встретился, раз</th>
                    <th className='m-2'>Оценка</th>
                </tr>
            </thead>
            <tbody>
                {rowUser()}
            </tbody>
        </table>
    </>
    )
}

export default Users;