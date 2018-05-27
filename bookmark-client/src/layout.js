import React from 'react';
import { Route, Link } from 'react-router-dom';

import List from './components/admin/list';
import SearchList from './components/search_list';
import ListView from './components/listView';

const Layout = () => {
    return (
        <div className='layout'>
            <header>
                <nav>
                    <ul>
                        <li><Link to='/search'>saerch</Link></li>
                        <li><Link to='/admin'>admin</Link></li>
                    </ul>
                </nav>
            </header>
            <div>
                {/* <Route exact path='/' component={Home} /> */}
                <Route path='/search' component={SearchList} />
                <Route path='/admin' component={List} />
            </div>
        </div>
    )
}

export default Layout;