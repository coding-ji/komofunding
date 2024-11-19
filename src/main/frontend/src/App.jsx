import './App.css'
import Img from './components/Img'
import Label from './components/Label'
import Progress from './components/Progress'

function App() {
  return (
    <>
      <Label text="popular" color='var(--navy-color) '/>
      <Img></Img>
      <Progress value={10} max={100} color='var(--navy-color)'></Progress>
    </>
  )
}

export default App
