import { useEffect, useState } from 'react'
import type { RepoResponse } from './Types'
import { ApiService } from './services/ApiService'
import './App.css'
import CardComponent from './components/Card'
import { Box } from '@chakra-ui/react/box'
import { Heading, Image, SimpleGrid } from '@chakra-ui/react'
import icon from './assets/icon-repo.svg';
import { ContextProvider } from './Context'
import PaginationComponent from './components/Pagination'
import SearchComponent from './components/Search'

const ITEMS_PER_PAGE = 10;
const TOTAL_ITEMS = 100;

function App() {
  const [repo, setRepo] = useState<RepoResponse[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [pinned, setPinned] = useState<RepoResponse[]>(() => {
    const stored = localStorage.getItem("pinned_repos");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    (async () => {
      // let results: RepoResponse[] = [];
      if (searchQuery.length > 3) {
        const res = await ApiService.searchRepos(
          searchQuery,
          page,
          ITEMS_PER_PAGE
        );

        if (!res.incomplete_results) setRepo(res.items);
      } else {
        const res = await ApiService.retrieveRepos(
          page,
          ITEMS_PER_PAGE
        );
        setRepo(res);
      }
    })();
  }, [page, searchQuery]);

  useEffect(() => {
    localStorage.setItem("pinned_repos", JSON.stringify(pinned));
  }, [pinned]);

  return (
    <ContextProvider.Provider value={{pinned, setPinned}}>
      <Box as="section" p={8}>
        <Heading marginBottom={'4'} fontSize={'16px'}>
          Pinned
        </Heading>

        <SimpleGrid columns={2} gap={4}>  
          {pinned.length && pinned.map((r, index) => {
            return <CardComponent repo={r} is_small={true} key={index} />
          })}
        </SimpleGrid>

      </Box>

      <Box as="section" p={8}>
        <Heading marginBottom={'4'} fontSize={'16px'}>
          <Image display={'inline-block'} width="16px" height="16px" src={icon} alt="Caffe Latte" marginRight={'10px'} />
          Repositories
        </Heading>

        <SearchComponent searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {repo.length && repo.map((r, index) => {
          return <CardComponent repo={r} is_small={false} key={index} />
        })}

        <PaginationComponent
          page={page}
          totalItems={TOTAL_ITEMS}
          pageSize={ITEMS_PER_PAGE}
          onPageChange={setPage}
        />
      </Box>
    </ContextProvider.Provider>
  )
}

export default App
