import { Badge, Box, Button, Card, Image } from "@chakra-ui/react";
import { HiStar, HiExclamationCircle, HiBookmark } from "react-icons/hi"
import icon from '../assets/icon-repo.svg';
import type { RepoResponse } from "@/Types";
import moment from 'moment';
import { LuNetwork } from "react-icons/lu";
import { useContextProvider } from "@/Context";

const CardComponent = ({
    repo,
    is_small,
}: {
    repo: RepoResponse;
    is_small: boolean
}) => {
    const {pinned, setPinned} = useContextProvider();

    const handlePinRepo = (id: number) => {
        const isPinned = pinned.some((pin) => pin.id === id);
    
        setPinned(prev => {
          const updated = isPinned
            ? prev.filter(item => item.id !== id)
            : [repo, ...prev.filter(r => r.id !== id)];
    
          return updated;
        });
    }

    return (
        <Card.Root flexDirection="row" overflow="hidden" marginBottom={'2'}>
            <Box>
                {!is_small &&
                    <Button onClick={() => handlePinRepo(repo.id)}
                        position={'absolute'} right={0} top={'16px'} rounded={'none'} size={'xs'}>
                        <HiBookmark />Pin
                    </Button>
                }
                <Card.Body>
                    <Card.Title mb="2">
                        {is_small && <Image display={'inline-block'} width="16px" height="16px" src={icon} alt="Caffe Latte" marginRight={'10px'} />}
                        <a href={repo.url}>{repo.name}</a> {repo.visibility && <Badge variant="outline">{repo.visibility}</Badge>}
                    </Card.Title>
                    <Card.Description>{repo.description}</Card.Description>
                </Card.Body>
                <Card.Footer>
                    {repo.language && <Badge>{repo.language}</Badge>}
                    {repo.stargazers_count && <Badge><HiStar /> {repo.stargazers_count}</Badge>}
                    {(repo.license?.name && !is_small) && <Badge>{repo.license?.name}</Badge>}
                    {repo.forks_count && <Badge><LuNetwork />{repo.forks_count}</Badge>}
                    {(repo.open_issues && !is_small) && <Badge><HiExclamationCircle />{repo.open_issues}</Badge>}
                    {!is_small && <Badge>Updated {moment(repo.updated_at).fromNow()}</Badge>}
                </Card.Footer>
            </Box>
        </Card.Root>
    )
}

export default CardComponent;