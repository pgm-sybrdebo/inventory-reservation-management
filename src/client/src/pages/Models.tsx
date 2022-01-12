import { Container, Header, ListCards, ModelCard, Topic } from '../components';
import device from '../assets/device.jpg';

//import defaultPic from '../assets/def.jpg';
import { useQuery } from '@apollo/client';
import {GET_ALL_MODELS_WITH_PAGINATION } from '../graphql/models';
import {ModelCardData} from '../interfaces'

const defaultPicture = device;
const Models = () => {
  const { error, loading, data} = useQuery(GET_ALL_MODELS_WITH_PAGINATION , {
    variables:{ offset: 1, limit: 24 },
  });
  if(loading) {return <div className="loading"><h1 className="loading__text">Loading...</h1></div>}
  if(error) {return <div className="loading"><h1 className="loading__text">Error {error.message}</h1></div>}
  const result = data.modelsWithPagination;
  console.log(data)
  const quantity=result.length;
  return (
    <>
      <Header />
      
      <Topic quantity={quantity}/>
      <Container>
        <ListCards>
          {result.map((model: ModelCardData) => 
            <ModelCard key={model.id} src={defaultPicture} title={model.name.slice(0,21)} quantity={model.quantity} description={`${model.description.slice(0,42)}...`} id={model.id}/>
          )}
        </ListCards>
      </Container>
    </>

  )
}

export default Models
