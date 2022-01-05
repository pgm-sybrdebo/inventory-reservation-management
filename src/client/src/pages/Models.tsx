import { Container, Header, ListCards, ModelCard, Topic } from '../components';
import device from '../assets/device.jpg';
import defaultPic from '../assets/def.jpg';

const defaultPicture = defaultPic;
const Models = () => {
  return (
    <>
      <Header />
      
      <Container>
        <Topic quantity={6}/>
        <ListCards>
          <ModelCard src={defaultPicture} title="Raspberry pi 4" quantity={20} description="Lorem ipsum dolor sit amet, consectetur adipscing elit. Suspendisse ..."/>
          <ModelCard src={device} title="Raspberry pi 4" quantity={20} description="Lorem ipsum dolor sit amet, consectetur adipscing elit. Suspendisse ..."/>
          <ModelCard src={device} title="Raspberry pi 4" quantity={20} description="Lorem ipsum dolor sit amet, consectetur adipscing elit. Suspendisse ..."/>
          <ModelCard src={device} title="Raspberry pi 4" quantity={20} description="Lorem ipsum dolor sit amet, consectetur adipscing elit. Suspendisse ..."/>
          <ModelCard src={device} title="Raspberry pi 4" quantity={20} description="Lorem ipsum dolor sit amet, consectetur adipscing elit. Suspendisse ..."/>
          <ModelCard src={device} title="Raspberry pi 4" quantity={20} description="Lorem ipsum dolor sit amet, consectetur adipscing elit. Suspendisse ..."/>
        </ListCards>
      </Container>
    </>

  )
}

export default Models
