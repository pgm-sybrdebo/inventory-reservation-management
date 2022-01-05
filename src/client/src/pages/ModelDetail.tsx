import { Container, GeneralList, Header, ModelImage, ModelInfo } from '../components';
import device from '../assets/device.jpg'
import { useQuery } from '@apollo/client';
import {GET_MODEL_BY_ID} from '../graphql/models';
import { useParams } from 'react-router-dom';

const ModelDetail = () => {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_MODEL_BY_ID, {
    variables: { id },
  });
  if(loading) {return <div className="loading"><h1 className="loading__text">Loading...</h1></div>}
  if(error) {return <div className="loading"><h1 className="loading__text">Error {error.message}</h1></div>}
  const result = data.model;
  const info = JSON.parse(result.specifications)
  const arr = Object.entries(info)
  const joinedArr = arr.map(i => i.join(": "))
  const newArr = Array.prototype.concat.apply([], joinedArr)
  console.log(newArr)
  return (
    <>
      <Header />
      
      <Container>
        <GeneralList>
          <ModelImage src={device}/>
          <ModelInfo name={result.name} quantity={result.quantity} description={result.description} specifications={newArr} tags={tags}/>
        </GeneralList>
        
      </Container>
    </>

  )
}

export default ModelDetail

