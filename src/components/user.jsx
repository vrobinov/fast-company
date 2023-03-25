import React, {useState} from 'react';
import Quality from './qualitie';
import Bookmark from './bookmark';

    const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onToggleBookmark,
}) => {
        return(  
                <>
                <tr key={_id}>
                <td>{name}</td>
                <td>{qualities.map((quality) =>(
                    <Quality key={quality._id} {...quality}/>
                ))}</td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}</td>
                <td> <Bookmark status={bookmark} onClick={()=>onToggleBookmark(_id)}/></td>
                <td><button onClick={()=>onDelete(_id)} className='btn bg-danger'>delete</button></td>
                </tr>
                </>
                );
    };


export default User;