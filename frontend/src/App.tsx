import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {

  return (
    <>
      <Button startIcon={PlusIcon({size: "md"})} variant='primary' text="Add Content" size='md' onClick={() => {}}></Button>
      <Button startIcon={ShareIcon({size: "md"})} variant='secondary' text="Share" size='md' onClick={() => {}}></Button>
    </>
  )
}

export default App
