# Building Spring Boot, MongoDB and React based full stack Web Application
## CMS - Contact Management System
<meta name="google-site-verification" content="...">
<tag>Contact Management System</tag>
<hr />

## Note :-
<p><u>This is a tutorial source code and not ready for production use. This software (CMS) source code can be used for training and learning purpose without any cost. The purpose of this source code is to demonstrate how to integrate Spring boot + Mongo DB + React (Full stack development) with a full end to end example with multiple workflows, to those learner who are aspiring to become a full stack developer. Author does not support or gurantee/warantee for this tutorial software product.</u></p>

## Features of Contact Manager
<strong>CMS - </strong> <i>Contact Management System</i> provides following features (few features may be added in future) -
<ul>
	<li>This software is a digital address book which helps manage contacts, address, events with pictures</li>
	<li>Support multiple users simulataneouly, and users' data is protected by username and password.</li>
	<li>Each user can have his/her own set of contacts</li>
	<li>Contact information like Name, address can be added, edited or deleted</li>
	<li>Events informatin with Pictures can be added, edited or deleted</li>
	<li>Notification about incoming events like Wedding annierversary, birthday of listed components on dashboard</li>
	<li>Send automatic birthday and anniversary wishes to contacts, provided that a valid emailid has been provided, through scheduled process.</li>
	<li>May share the contact information over email.</li>
</ul>

### Dependencies
<ul>
	<li>Java/Jdk 1.8 or higher</li>
	<li>Maven</li>
	<li>Mongo DB</li>
	<li>React 17.xx or higher</li>
	<li>NPM 6.14.3 or higher</li>
	<li>IntelliJ or Eclipse or any java editor</li>
	<li>VSCode or your favourite Javascript/html editor.</li>	
</ul>

## Below are the steps to run this application in Development mode
### Backend Service or Java Application
<ul>
	<li>locate POM.xml file</li>
	<li>Open/import pom.xml file as Maven project</li>
	<li>Configure Maven into your workspace</li>
	<li>allow your UI application URL in allowed CORS - app.config.allowed.hosts </li>
	<li>Locate CMSApplication.java and run it</li></ul>

### UI Service for Java Application
<ul>
	<li>Open Cms-web</li>
	<li>Check your Java Service URL http://localhost:8080/cms</li>
	<li>run - npm install</li>
	<li>run - npm start</li></ul>

## Problem & Resolution -
Plugin "react" was conflicted between "package.json » eslint-config-react-app  -- Then Open package.json in vscode and save it without making any change (ctrl+s) and then run npm start</br>
