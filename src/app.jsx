import React, {useState} from 'react';
import api from './api';
import Users from './components/users';
import SearchStatus from './components/searchStatus';

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        const newUser = users.filter((u)=> u._id !== userId);
        setUsers(newUser);
    };
        const hundleToggleBookmark = (id) => {
        const bookmark = users.map(mark =>{
            if(mark._id === id){
                return {...mark, bookmark: !mark.bookmark}
            }
            return mark
            });
            setUsers(bookmark);
        }
    return (
    <div>
    <SearchStatus length={users.length}  />
    <Users onDelete={handleDelete}  onToggleBookmark={hundleToggleBookmark} users={users}/>
    </div>
    );
};

export default App;