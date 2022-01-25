// import { useQuery } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { Container, Header, SearchBar } from '../components';
import { GET_MODELS_BY_FILTER_WITH_PAGINATION } from '../graphql/models';
// import { GET_ALL_USERS } from '../graphql/auth';


const HomePage = () => {

  return (
    <>
      <Header />
      <Container>
        <SearchBar />
      </Container>
    </>

  )
}

export default HomePage
