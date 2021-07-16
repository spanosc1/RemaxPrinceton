var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var multer = require('multer');
var cloudinary = require('cloudinary');
var fs = require('fs');
var mongoose = require('mongoose');
//My models
var Post = require('../models/post');
var User = require('../models/user');
var Admin = require('../models/admin');
var Images = require('../models/image');
var Profile = require('../models/profile');
var Agent = require('../models/agent');
var Email = require('../models/emails');

var fileName;

//For multer to save images onto server so they can be saved to cloudinary and mongo
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './public/images');
	},
	filename: function(req, file, callback) {
		console.log(file);
		fileName = file.fieldname + '-' + Date.now();
		callback(null, fileName);
	}
})

//Upload function for images (MULTER BEFORE CSRF)
var upload = multer({ storage: storage }).single('userPhoto');
router.use(upload);

var csrfProtection = csrf();
router.use(csrfProtection);

//Get edit posts page for admin
router.get('/', isAdmin, function(req, res, next) {
	Post.find(function(err, docs) {
		Images.find(function(err, images) {
			Profile.find(function(err, profiles) {
				Agent.find(function(err, agents) {
					Email.find(function(err, emails) {
						res.render('admin/admin',
						{
							csrfToken: req.csrfToken(),
							title: 'Admin',
							posts: docs,
							pics: images,
							profiles: profiles,
							agents: agents,
							emails: emails,
							hiddenHeader: 'hidden',
							hiddenFooter: 'hidden'
						});
					}).sort('-date');
				}).sort('name');
			}).sort('-date');
		}).sort('-date');
	}).sort('-date');;
});

//Post add a new post
router.post('/add-post', isAdmin, function(req, res, next) {
	var feature = false;
	if(req.body.feature)
	{
		feature = true;
	}
	var post = new Post({
		imagePath: req.body.imgURL,
		imageCaption: req.body.imgCaption,
		title: req.body.postTitleAdmin,
		description: req.body.postDesc,
		body: req.body.postContent,
		authorName: req.body.author,
		featured: feature,
		date: Date.now()
	});
	post.save(function(err, result) {
		console.log(err);
		res.redirect('/admin');
	});
});

//Post add an image to the image store
router.post('/add-image', isAdmin, function(req, res, next) {
	upload(req, res, function(err) {
		if(err) {
			return res.send(err);
		}
		cloudinary.uploader.upload('public/images/' + fileName, function(result) {
			var image = new Images({
				imagePath: result.secure_url,
				date: Date.now()
			});
			image.save(function(err, result) {
				res.redirect('/admin');
			})
		})
	})
});

//Post update an existing post
router.post('/update-post', function(req, res, next) {
	var feature = false;
	if(req.body.feature)
	{
		feature = true;
	}
	Post.update({_id: req.body.id}, 
	{
		imagePath: req.body.newImgURL,
		imageCaption: req.body.newImgCaption,
		title: req.body.newPostTitle,
		description: req.body.newPostDescription,
		body: req.body.newPostContent,
		featured: feature,
	},
	function(err, result) {
		res.redirect('/admin');
	})
});

//Post delete a post based on ID
router.post('/delete/:id', function(req, res, next) {
	Post.deleteOne({_id: req.params.id}, function(err, result) {
		res.redirect('/admin');
	});
});

//Post add a new agent profile picture
router.post('/add-profile', isAdmin, function(req, res, next) {
	upload(req, res, function(err) {
		if(err) {
			return res.send(err);
		}
		cloudinary.uploader.upload('public/images/' + fileName, function(result) {
			var profile = new Profile({
				imagePath: result.secure_url,
				date: Date.now()
			});
			profile.save(function(err, result) {
				res.redirect('/admin');
			})
		})
	})
});

//Post add a new agent
router.post('/add-agent', isAdmin, function(req, res, next) {
	var agent = new Agent({
		imagePath: req.body.agentProfile,
		name: req.body.agentNameAdmin,
		title: req.body.agentTitleAdmin,
		organization: req.body.agentOrgAdmin,
		licenseNumber: req.body.agentLicenseAdmin,
		agentCode: req.body.agentCodeAdmin,
		preferredPhone: req.body.agentPreferredAdmin,
		directPhone: req.body.agentDirectAdmin,
		mobilePhone: req.body.agentPhoneAdmin,
		email: req.body.agentEmailAdmin,
		officeCode: req.body.agentOfficeCodeAdmin,
		officePhone: req.body.agentOfficePhoneAdmin,
		officeFax: req.body.agentOfficeFaxAdmin,
		bio: req.body.agentBioAdmin,
		date: Date.now(),
	});
	agent.save(function(err, result) {
		console.log(err);
		res.redirect('/admin');
	});
});

//Post update an existing agent
router.post('/update-agent', function(req, res, next) {
	Agent.update({_id: req.body.id}, 
	{
		imagePath: req.body.newAgentProfile,
		name: req.body.newAgentName,
		title: req.body.newAgentTitle,
		organization: req.body.newAgentOrg,
		licenseNumber: req.body.newAgentLicense,
		agentCode: req.body.newAgentCode,
		preferredPhone: req.body.newAgentPreferred,
		directPhone: req.body.newAgentDirect,
		mobilePhone: req.body.newAgentMobile,
		email: req.body.newAgentEmail,
		officeCode: req.body.newAgentOfficeCode,
		officePhone: req.body.newAgentOfficePhone,
		officeFax: req.body.newAgentFax,
		bio: req.body.newAgentBio
	},
	function(err, result) {
		res.redirect('/admin');
	})
});

//Post delete an agent based on ID
router.post('/delete-agent/:id', function(req, res, next) {
	Agent.deleteOne({_id: req.params.id}, function(err, result) {
		res.redirect('/admin');
	});
});

router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
  next();
});

router.get('/signup', function(req, res, next) {
	var messages = req.flash('error');
	res.render('admin/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, title: "Sign Up | Remax Princeton"});
});

router.post('/signup', passport.authenticate('local.signup', {
	successRedirect: '/admin',
	failureRedirect: '/admin/signup',
	failureFlash: true
}));

router.get('/signin', function(req, res, next) {
	var messages = req.flash('error');
	res.render('admin/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, title: "Log In | Remax Princeton"});
});

router.post('/signin', passport.authenticate('local.signin', {
	successRedirect: '/admin',
	failureRedirect: '/admin/signin',
	failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

function notLoggedIn(req, res, next) {
	if(!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

function isAdmin(req, res, next) {
	if(req.isAuthenticated())
	{
		return next();
	}
	res.redirect('/');
}