import './App.css'
import Button from './components/ui/Button'
import Card from './components/ui/Card'
import VirtualRoomThumbnail from './components/displays/VirtualRoomThumbnail'

function App() {
  
  const title:string = 'button';

  function onClickHandler(event:React.MouseEvent) {
    console.log('clicked');
  }

  return (
    <div>
      hi
      {/* <VirtualRoomThumbnail src='#' alt='hihi'/> */}
      <Card>
        <Button onClickHandler={onClickHandler}>Button</Button>
      </Card>
    </div>
  )
}

export default App
