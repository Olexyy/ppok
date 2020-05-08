<template>
  <div v-if="iAmRepoConnect" class="mdl-grid mdl-cell mdl-cell--12-col">
    <button :disabled="!repos.length" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      <span class="material-icons">
        keyboard_arrow_left
      </span>
    </button>
    <div v-if="repos.length" class="getmdl-select__fix-height mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select mdl-cell mdl-cell--5-col">
      <input v-on:change="repoChange" type="text" value="" class="mdl-textfield__input" id="repo" readonly>
      <input type="hidden" value="" name="repo">
      <label for="repo" class="mdl-textfield__label">Repo...</label>
      <ul for="repo" class="mdl-menu mdl-menu--top-left mdl-js-menu">
          <li v-for="(rep, i) in repos" :key="`ind-${rep.id}-${i}`" class="mdl-menu__item" :data-val="rep.name">{{rep.name}}</li>
      </ul>
    </div>
    <button :disabled="!repos.length" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      <span class="material-icons">
        keyboard_arrow_right
      </span>
    </button>
    <div v-if="projects.length" class="getmdl-select__fix-height mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select mdl-cell mdl-cell--5-col">
      <input v-on:change="projectChange" type="text" value="" class="mdl-textfield__input" id="project" readonly>
      <input type="hidden" value="" id='project-value' name="project">
      <label for="project" class="mdl-textfield__label">Repo...</label>
      <ul for="project" class="mdl-menu mdl-menu--top-left mdl-js-menu">
          <li v-for="(project, i) in projects" :key="`ind-${project.id}-${i}`" class="mdl-menu__item" :data-val="project.id">{{project.name}}</li>
      </ul>
    </div>
    <div v-if="labels.length" class="mdl-grid mdl-cell mdl-cell--12-col">
      <button :disabled="!topicIssue" :data-label="label.name" v-on:click="setLabel" v-for="(label, i) in labels" :key="`ind-${label.id}-${i}`" v-bind:style="{ background: '#'+label.color}" class="mdl-button mdl-shadow--2dp mdl-cell mdl-cell--1-col">
        {{label.name}}
      </button>
    </div>
    <div v-if="topicIssue" class="mdl-grid mdl-cell mdl-cell--12-col">
      <div  class="mdl-card mdl-cell--12-col" style="min-height:auto;">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">{{'Topic:' + topicIssue.number + ' / ' + repo + ' / ' + topicIssue.state }}</h2>
        </div>
        <div class="mdl-card__supporting-text">
           {{topicIssue.title}}
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <div class="mdl-card mdl-shadow--2dp mdl-cell--12-col">
            <div class="mdl-card__supporting-text" v-html="renderMd(topicIssue.body)" />
          </div>
        </div>
        <div class="mdl-card__menu"></div>
      </div>
      <div v-if="topicIssue.labels.length" class="mdl-grid mdl-cell mdl-cell--12-col">
        <button v-for="(label, i) in topicIssue.labels" :key="`ind-${label.id}-${i}`" v-bind:style="{ background: '#'+label.color}" class="mdl-button mdl-shadow--2dp mdl-cell mdl-cell--2-col">
          {{label.name}}
        </button>
      </div>
    </div>
    <div v-else class="mdl-grid mdl-cell mdl-cell--12-col">
      No issue is selected as topic yet.
    </div>
    <div v-if="issues.length" class="mdl-grid mdl-cell mdl-cell--12-col">
      <div v-for="(issue, i) in issues" :key="`ind-${issue.number}-${i}`"
        class="mdl-card mdl-cell--12-col" style="min-height:auto;">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">{{issue.number + ' / ' + issue.state }}</h2>
        </div>
        <div class="mdl-card__supporting-text">
           {{issue.title}}
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <div :id="`ind-${issue.number}-${i}`" style="display:none;" class="mdl-card mdl-shadow--2dp mdl-cell--12-col">
            <div class="mdl-card__supporting-text" v-html="renderMd(issue.body)" />
          </div>
        </div>
        <div class="mdl-card__menu">
          <button :data-index="i" v-on:click="setTopic" class="mdl-button mdl-button--colored mdl-js-buttont">
            Set topic
          </button>
          <button :data-toggle="`ind-${issue.number}-${i}`" v-on:click="doToggle" class="mdl-button mdl-button--colored mdl-js-button">
            Details
          </button>
          <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <a :href="issue.html_url" style="color:gray;"><span class="material-icons"> open_in_new </span></a>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="mdl-grid mdl-cell mdl-cell--12-col">
    <!--button :disabled="!repos.length" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      <span class="material-icons">
        keyboard_arrow_left
      </span>
    </button>
    <div v-if="repos.length" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select mdl-cell mdl-cell--5-col">
      <input v-on:change="repoChange" type="text" value="" class="mdl-textfield__input" id="repo" readonly>
      <input type="hidden" value="" name="repo">
      <label for="repo" class="mdl-textfield__label">Repo...</label>
      <ul for="repo" class="mdl-menu mdl-menu--bottom-left mdl-js-menu">
          <li v-for="(rep, i) in repos" :key="`ind-${rep.id}-${i}`" class="mdl-menu__item" :data-val="rep.name">{{rep.name}}</li>
      </ul>
    </div>
    <button :disabled="!repos.length" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      <span class="material-icons">
        keyboard_arrow_right
      </span>
    </button-->
    <div v-if="labels.length" class="mdl-grid mdl-cell mdl-cell--12-col">
      <button :disabled="true" :data-label="label.name" v-on:click="setLabel" v-for="(label, i) in labels" :key="`ind-${label.id}-${i}`" v-bind:style="{ background: '#'+label.color}" class="mdl-button mdl-shadow--2dp mdl-cell mdl-cell--1-col">
        {{label.name}}
      </button>
    </div>
    <div v-if="topicIssue" class="mdl-grid mdl-cell mdl-cell--12-col">
      <div  class="mdl-card mdl-cell--12-col" style="min-height:auto;">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">{{'Topic:' + topicIssue.number + ' / ' + repo + ' / ' + topicIssue.state }}</h2>
        </div>
        <div class="mdl-card__supporting-text">
           {{topicIssue.title}}
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <div class="mdl-card mdl-shadow--2dp mdl-cell--12-col">
            <div class="mdl-card__supporting-text" v-html="renderMd(topicIssue.body)" />
          </div>
        </div>
        <div class="mdl-card__menu"></div>
      </div>
      <div v-if="topicIssue.labels.length" class="mdl-grid mdl-cell mdl-cell--12-col">
        <button v-for="(label, i) in topicIssue.labels" :key="`ind-${label.id}-${i}`" v-bind:style="{ background: '#'+label.color}" class="mdl-button mdl-shadow--2dp mdl-cell mdl-cell--2-col">
          {{label.name}}
        </button>
      </div>
    </div>
    <div v-else class="mdl-grid mdl-cell mdl-cell--12-col">
      No issue is selected as topic yet (waiting for issues list).
    </div>
    <div v-if="issues.length" class="mdl-grid mdl-cell mdl-cell--12-col">
      <div v-for="(issue, i) in issues" :key="`ind-${issue.number}-${i}`"
        class="mdl-card mdl-cell--12-col" style="min-height:auto;">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">{{issue.number + ' / ' + repo + ' / ' + issue.state }}</h2>
        </div>
        <div class="mdl-card__supporting-text">
           {{issue.title}}
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <div :id="`ind-${issue.number}-${i}`" style="display:none;" class="mdl-card mdl-shadow--2dp mdl-cell--12-col">
            <div class="mdl-card__supporting-text" v-html="renderMd(issue.body)" />
          </div>
        </div>
        <div class="mdl-card__menu">
          <!--button :data-index="i" v-on:click="setTopic" class="mdl-button mdl-button--colored mdl-js-buttont">
            Set topic
          </button-->
          <button :data-toggle="`ind-${issue.number}-${i}`" v-on:click="doToggle" class="mdl-button mdl-button--colored mdl-js-button">
            Details
          </button>
          <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <a :href="issue.html_url" style="color:gray;"><span class="material-icons"> open_in_new </span></a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var md = require('markdown-it')();
  export default {
    name: 'Repo',
    methods: {
      setLabel(e) {
        if (this.topicIssue) {
          const name = e.target.getAttribute('data-label');
          const issue = this.topicIssue.number;
          this.$store.state.githubCli.setLabels(
            this.repo, issue, [name]
          ).then(
            res => {console.log(res);}
          );
        }
      },
      renderMd(string) {
        return md.render(string);
      },
      repoChange(e) {
        this.$store.dispatch('setRepo', e.target.value);
        if (e.target.value) {
          this.$store.dispatch('setIssues', []);
          this.$store.state.githubCli.getIssues(this.repo).then(issues => {
            this.$store.dispatch('setIssues', issues);
          });
          this.$store.dispatch('setLabels');
        }
      },
      projectChange(e) {
        const val = document.getElementById('project-value').value;
        console.log(val);
        this.$store.dispatch('setProject', val);
        if (val) {
          this.$store.state.githubCli.getIssuesByProject(val).then(issues => {
            this.$store.dispatch('setIssues', issues);
          });
          this.$store.dispatch('setLabels');
        }
      },
      doToggle(e) {
        const target = document.getElementById(e.target.getAttribute('data-toggle'));
        const display = target.style.display;
        if (display === 'none') {
          target.style.display = 'block';
        } else {
          target.style.display = 'none';
        }
      },
      setTopic(e) {
        const index = e.target.getAttribute('data-index');
        this.$store.dispatch('setTopicIssue', this.issues[index]);
      },
    },
    computed: {
      repos() {
        return this.$store.state.githubData.repos;
      },
      projects() {
        return this.$store.state.githubData.projects;
      },
      project() {
        return this.$store.state.githubData.project;
      },
      repo() {
        return this.$store.state.githubData.repo;
      },
      iAmRepoConnect() {
        return this.$store.state.iAmRepoConnect;
      },
      issues() {
        return this.$store.state.githubData.issues;
      },
      labels() {
        return this.$store.state.githubData.labels;
      },
      topicIssue() {
        return this.$store.state.githubData.topicIssue;
      }
    },
    updated() {
      if(!this.repo) {
        window.getmdlSelect.init('.getmdl-select');
      }
      window.componentHandler.upgradeAllRegistered();
    }
  }
</script>
