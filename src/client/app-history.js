//import createBrowserHistory from 'history/lib/createBrowserHistory';
//export default createBrowserHistory();

//import { createHistory } from 'history';
//export default createHistory()

import createHistory from 'history/lib/createHashHistory';
export default createHistory({queryKey: false });
