// github_cli.js
class GithubCli {

	constructor(user = null, token = null, owner = null, repo = null) {
		this.user = user;
		this.token = token;
		this.endpoint = 'https://api.github.com';
		this.owner = owner;
		this.repo = repo;
	}

	async getProjects() {

		return this.request(`/orgs/${this.owner}/projects`, {
			headers: {
				Accept: 'application/vnd.github.inertia-preview+json'
			},
		});
	}

	async getUser() {

		return this.request('/user');
	}

	async getRepos() {

		return this.request(`/orgs/${this.owner}/repos`);
	}
		
	async getLabels(repo, page = 1) {

		return this.request(`/repos/${this.owner}/${repo}/labels?page=${page}`);
	}

	async setLabels(repo, issue, labelNames) {
		try {
			const creds = `${this.user}:${this.token}`;
			const auth = btoa(creds);
			let response = await fetch(`${this.endpoint}/repos/${this.owner}/${repo}/issues/${issue}/labels`, {
				mode: 'cors',
				method: 'POST',
				headers: {
					Authorization: 'Basic ' + auth,
				},
				body: JSON.stringify({
					labels: labelNames
				})
			});
			let result = await response.json();

			return result;
		} catch(e) {
			return null;
		}
	}

	async getProjectColumns(projectId) {
		
		return this.request(`/projects/${projectId}/columns`, {
			headers: {Accept: 'application/vnd.github.inertia-preview+json'}
		});
	}

	async getColumnCards(columnId) {
		return this.request(`/projects/columns/${columnId}/cards`, {
			headers:  {Accept: 'application/vnd.github.inertia-preview+json'}
		});
	}

	async getCardIssue(card) {
		if(card.hasOwnProperty('content_url')) {
			const issue = await this.requestRaw(card.content_url);
			// const matches = card.content_url.match(/https:\/\/api\.github\.com\/repos\/(.*)\/(.*)\/issues\/(\d*)/);
			// if (matches.length === 4) {
			// 	return {
			// 		owner: matches[1],
			// 		repo: matches[2],
			// 		issue: matches[3]
			// 	};
			// }
			return issue;
		}
		return null;
	}

	async getIssuesByProject(projectId) {
		const issues = [];
		const columns = await this.getProjectColumns(projectId);
		console.log(columns);
		let cards = [];
		for (let column of columns) {
			const items = await this.getColumnCards(column.id);
			cards = cards.concat(items);
		}
		console.log(cards);
		for(let card of cards) {
			const item = await this.getCardIssue(card);
			if (item) {
				issues.push(item);
			}
		}
		console.log(issues);
		return issues;
	}

	async getIssues(repo, page = 1) {

		return this.request(`/repos/${this.owner}/${repo}/issues?page=${page}`);
	}

	async request(resource, options = {headers:{}}) {
		try {
			const creds = `${this.user}:${this.token}`;
			const auth = btoa(creds);
			options.mode = 'cors';
			options.headers.Authorization = 'Basic ' + auth;
			const response = await fetch(`${this.endpoint}${resource}`, options);
			const json = await response.json();
			return json;
		} catch(e) {
			return null;
		}
	}

	async requestRaw(url, options = {headers:{}}) {
		try {
			const creds = `${this.user}:${this.token}`;
			const auth = btoa(creds);
			options.mode = 'cors';
			options.headers.Authorization = 'Basic ' + auth;
			const response = await fetch(`${url}`, options);
			const json = await response.json();
			return json;
		} catch(e) {
			return null;
		}
	}

	async fromObject(data) {
		try {
			if (data === Object(data)) {
				if (data.hasOwnProperty('u') && data.hasOwnProperty('t')) {
					this.user = data.u;
					this.token = data.t;
					this.owner = data.o;
					const user = await this.getUser();

					return user;
				}
			}
			return null;
		} catch(e) {
			return null;
		}
	}
}

export default GithubCli;
