// github_cli.js
class GithubCli {

	constructor(user = null, token = null, owner = null, repo = null) {
		this.user = user;
		this.token = token;
		this.endpoint = 'https://api.github.com';
		this.owner = owner;
		this.repo = repo;
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

	async getIssues(repo, page = 1) {

		return this.request(`/repos/${this.owner}/${repo}/issues?page=${page}`);
	}

	async request(resource, options = {}) {
		try {
			const creds = `${this.user}:${this.token}`;
			const auth = btoa(creds);
			options.mode = 'cors';
			options.headers = {
				Authorization: 'Basic ' + auth,
			};
			const response = await fetch(`${this.endpoint}${resource}`, options);
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
