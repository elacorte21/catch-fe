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

const ITEMS_PER_PAGE = 10;
const TOTAL_ITEMS = 100;

function App() {
  const [repo, setRepo] = useState<RepoResponse[]>([]);
  const [page, setPage] = useState(1);

  const [pinned, setPinned] = useState<RepoResponse[]>(() => {
    const stored = localStorage.getItem("pinned_repos");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    (async () => {
      const res = await ApiService.retrieveRepos(
        page,
        ITEMS_PER_PAGE
      );

      setRepo(res);
    })();
  }, [page]);

  useEffect(() => {
    localStorage.setItem("pinned_repos", JSON.stringify(pinned));
  }, [pinned]);
  
  console.log(repo)

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
      
      {/* <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section> */}
    </ContextProvider.Provider>
  )
}

export default App
