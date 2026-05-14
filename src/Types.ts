
export interface RepoResponse {
    id: number;
    name: string;
    description: string;
    url: string;
    license?: License;
    owner: Owner;
    fork: boolean,
    forks_url: string;
    keys_url: string;
    created_at: Date;
    updated_at: Date;
    pushed_at: Date;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    forks_count: number;
    open_issues_count: number;
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
}


interface Owner {
    id: number,
    login: string,
    url: string,
}

interface License {
    key: string;
    name: string;
    url: string;
}

export interface SearchRepoResponse {
    incomplete_results: boolean;
    items: RepoResponse[];
    total_count: number;
}