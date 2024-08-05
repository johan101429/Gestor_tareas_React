import './App.css'

import { Home } from '../src/components/Pages/Home/Home'
import { TasksProvider } from './components/Context/Context'



export const App = () =>
    <TasksProvider>
        <Home />
    </TasksProvider>
