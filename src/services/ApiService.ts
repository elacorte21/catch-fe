import type { RepoResponse, SearchRepoResponse } from "../Types";

export class ApiService {

    public static async retrieveRepos(
        page: number,
        items: number = 10
    ): Promise<RepoResponse[]> {
        try {
            const response = await fetch(
                `https://api.github.com/orgs/github/repos?sort=name&per_page=${items}&page=${page}`
            );

            return response.ok ? response.json() : [];
        } catch (error) {
            console.error(error);
            throw new Error("Network response was not ok");
        }
    }
    
    public static async searchRepos(
        query: string,
        page: number,
        items: number = 10
    ): Promise<SearchRepoResponse> {
        try {
            const response = await fetch(
                `https://api.github.com/search/repositories?q=${query}&per_page=${items}&page=${page}`
            );

            return response.ok && response.json();
        } catch (error) {
            console.error(error);
            throw new Error("Network response was not ok");
        }
    }
}