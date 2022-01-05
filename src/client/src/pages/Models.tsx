import { Container, Header, ListCards, ModelCard, Topic } from '../components';
import device from '../assets/device.jpg';

//import defaultPic from '../assets/def.jpg';
import { useQuery } from '@apollo/client';
import {GET_ALL_MODELS} from '../graphql/models';
import {ModelCardData} from '../interfaces'

const defaultPicture = device;
const Models = () => {
  const { error, loading, data} = useQuery(GET_ALL_MODELS);
  if(loading) {return <div className="loading"><h1 className="loading__text">Loading...</h1></div>}
  if(error) {return <div className="loading"><h1 className="loading__text">Error {error.message}</h1></div>}
  const result = data.models;
  const quantity=result.length;
  console.log(result)
  return (
    <>
      <Header />
      
      <Container>
        <Topic quantity={quantity}/>
        <ListCards>
          {result.map((model: ModelCardData) => 
            <ModelCard key={model.id} src={defaultPicture} title={model.name.slice(0,60)} quantity={model.quantity} description={`${model.description.slice(0,120)}...`} id={model.id}/>
          )}
        </ListCards>
      </Container>
    </>

  )
}

export default Models
