import { Input, InputGroup, Kbd } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

interface SearchComponentProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

const SearchComponent = ({
    searchQuery,
    onSearchChange
}: SearchComponentProps) => (
  <InputGroup flex="1" startElement={<LuSearch />} marginBottom={4}>
    <Input
      id="Search"
      name="Search"
      placeholder="Search repositories"
      type="text"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </InputGroup>
)

export default SearchComponent;