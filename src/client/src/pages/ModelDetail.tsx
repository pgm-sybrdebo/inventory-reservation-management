import { Container, GeneralList, Header, ModelImage, ModelInfo } from '../components';
import device from '../assets/device.jpg'

const specifications = ["Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet."];
const tags = ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet."];
const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pharetra semper purus vel elementum. Pellentesque non est a urnaliquam consequat ac ut erat. Maecenas lobortis ante sed gravida ornare.";
const ModelDetail = () => {
  return (
    <>
      <Header />
      
      <Container>
        <GeneralList>
          <ModelImage src={device}/>
          <ModelInfo name="Raspberry pi 4" quantity={30} description={description} specifications={specifications} tags={tags}/>
        </GeneralList>
        
      </Container>
    </>

  )
}

export default ModelDetail