//flightplan.js
var plan = require('flightplan');
var userName    = 'luminpb5';
var serverName  = 'luminoushilt.com';
var buildPath 	= '';
var gitPath		= 'public'
var webRoot 	= {
	staging: '',
	production: '~/public_html/tillmanconnection.website/'
};

// configuration
plan.target('staging', [
	{
		host: serverName,
		username: userName,
		port: 22,
		agent: process.env.SSH_AUTH_SOCK
  },
], {
	webRoot: webRoot.staging
});

plan.target('production', [
	{
		host: serverName,
		username: userName,
		port: 22,
		agent: process.env.SSH_AUTH_SOCK
  },
], {
	webRoot: webRoot.production
});

// run commands on localhost
plan.local(function(local) {
	// uncomment these if you need to run a build on your machine first
	local.log('Preparing files for deployment...');
	local.exec('gulp build', {silent: true});

	local.log('Deploying files to webserver...');
	var filesToCopy = local.exec('cd ' + gitPath + ' && git ls-files', {silent: true});
	var webRoot = plan.runtime.options.webRoot;
	// rsync files to all the destination's hosts
	local.transfer(filesToCopy, webRoot, {silent: true});
	local.log('Deployment Complete!');
});