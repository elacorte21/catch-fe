
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
    // git_url: git://github.com/github/.github.git,
    // ssh_url: git@github.com:github/.github.git,
    // clone_url: https://github.com/github/.github.git,
    // svn_url: https://github.com/github/.github,
}


interface Owner {
    id: number,
    login: string,
    // avatar_url: https://avatars.githubusercontent.com/u/9919?v=4,
    // gravatar_id: ,
    // url: https://api.github.com/users/github,
    // html_url: https://github.com/github,
    // followers_url: https://api.github.com/users/github/followers,
    // following_url: https://api.github.com/users/github/following{/other_user},
    // gists_url: https://api.github.com/users/github/gists{/gist_id},
    // starred_url: https://api.github.com/users/github/starred{/owner}{/repo},
    // subscriptions_url: https://api.github.com/users/github/subscriptions,
    // organizations_url: https://api.github.com/users/github/orgs,
    // repos_url: https://api.github.com/users/github/repos,
}

interface License {
    key: string;
    name: string;
    url: string;
}