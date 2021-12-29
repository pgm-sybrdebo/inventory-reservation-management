// import { useQuery } from '@apollo/client';
import { Container, Header, SearchBar } from '../components';
// import { GET_ALL_USERS } from '../graphql/auth';


const HomePage = () => {
  // Just for testing if path is protected
  // const {error, loading, data} = useQuery(GET_ALL_USERS);

  // if (data) {
  //   console.log('yes', data)
  // }

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
