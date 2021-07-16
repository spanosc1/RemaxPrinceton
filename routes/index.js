var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var nodemailer = require('nodemailer');
//
var Post = require('../models/post');
var Agent = require('../models/agent');
var Email = require('../models/emails');

//For emails
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'autoremaxprinceton@gmail.com',
    pass: 'remaxprincetonnassau'
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
	Post.find({featured: true}, function(err, posts) {
		unirest.get('https://api.idxbroker.com/clients/featured')
		.headers({
			'Content-Type': 'application/x-www-form-urlencoded',
			'accesskey': process.env.IDX_ACCESS_KEY
		})
		.end(function(response) {
			//console.log(response);
			var responseArray = json2array(JSON.parse(response.body));
			var firstEight = responseArray.splice(0,8);
			res.render('main/home', { title: 'Home | Remax', featuredHomes: firstEight, posts: posts, featuredPosts: posts});
		});
  }).sort('-date').limit(4);
});

router.post('/property-search', function(req, res, next) {
	console.log(req.body.term);
	console.log(req.body.price);
	res.render('properties/properties', { title: 'Properties | Remax', hiddenFooter: 'hidden', term: req.body.term, price: req.body.price, type: 'All'});
});

/* GET blog posts page */
router.get('/blog', function(req, res, next) {
	Post.find({}, function(err, posts) {
		if(err)
		{
			res.render('blog/blog', { title: 'Oops! | Remax', posts: err, hiddenFooter: 'hidden'});
		}
		res.render('blog/blog', { title: 'Blog | Remax', posts: posts, hiddenFooter: 'hidden'});
	}).sort('-date');
});

/* GET individual blog posts page */
router.get('/post/:id', function(req, res, next) {
	var postId = req.params.id;
	var thisPost;
	Post.findById(postId, function(err, post) {
		if(err) {
			res.redirect('/');
		}
		else if(post == null || post == undefined)
		{
			//post has been deleted
			res.redirect('/');
		}
		else {
			Post.find({ _id: { $nin: postId } }, function(err, posts) {
				if(err)
				{
					res.redirect('/');
				}
				res.render('blog/post', { title: post.title + ' | Remax', post: post, posts: posts, hiddenFooter: 'hidden' });
			}).sort('-date').limit(5);
		}
	});
});

/* GET properties page */
router.get('/properties/:type?', function(req, res, next) {
	var type;
	if(req.params.type == '') {
		type = 'All';
	}
	else if(req.params.type == 'residential') {
		type = 'Residential';
	}
	else if(req.params.type == 'single-family') {
		type = 'Single Family Listing';
	}
	else if(req.params.type == 'lease') {
		type = 'Residential Lease';
	}
	else if(req.params.type == 'rental') {
		type = 'Rental Listing';
	}
	else if(req.params.type == 'commercial') {
		type = 'Commercial Sale';
	}
	else {
		type = 'All';
	}
	console.log(type);
	res.render('properties/properties', { title: 'Properties | Remax', hiddenFooter: 'hidden', type });
});

router.get('/featured', function(req, res, next) {
	unirest.get('https://api.idxbroker.com/clients/featured')
	.headers({
		'Content-Type': 'application/x-www-form-urlencoded',
		'accesskey': process.env.IDX_ACCESS_KEY
	})
	.end(function(response) {
		//console.log(response);
		var responseArray = json2array(JSON.parse(response.body));
		res.json({featured: responseArray});
	});
});

/* GET agents page */
router.get('/agents', function(req, res, next) {
	Agent.find({}, function(err, agents) {
		if(err)
		{
			res.render('agents/agents', { title: 'Oops! | Remax', posts: err});
		}
		Post.find({featured: true}, function(err, posts) {
			res.render('agents/agents', { title: 'Agents | Remax', agents: agents, posts: posts, featuredPosts: posts });
		}).sort('-date').limit(4);
	}).sort('name');
});

/* GET individual agents page */
router.get('/agent/:id', function(req, res, next) {
	Agent.findById(req.params.id, function(err, agent) {
		Post.find({}, function(err, posts) {
			if(err)
			{
				res.render('agents/agent', { title: 'Oops! | Remax', posts: err});
			}
			res.render('agents/agent', { title: agent.name + ' | Remax', agent: agent, featuredPosts: posts });
		}).sort('-date').limit(4);
	}).sort('-date');
});

/* GET properties with params */
router.get('/properties/:type?/:sort?/:latlng?/:zoom?', function(req, res, next) {
	res.json({ homes });
});

/* Get information for specific property */
router.get('/property/:id', function(req, res, next) {
	var home = homes[req.params.id];
	res.json({ home });
});

/* GET contact page */
router.get('/contact', function(req, res, next) {
	Post.find({featured: true}, function(err, posts) {
		res.render('contact/contact', { title: 'Contact | Remax', posts: posts, featuredPosts: posts });
	}).sort('-date').limit(4);
});

/* POST send contact email to Remax */
router.post('/emailremax', function(req, res, next) {
	var body = "tel: " + req.body.number + '\n' + "email: " + req.body.email + "\n\n" + req.body.message;
	var mailOptions = {
		from: 'autoremaxprinceton@gmail.com',
		to: 'remaxprincetonnassau@gmail.com',
		subject: 'Contact form message from ' + req.body.name,
		text: body
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) console.log(error);
	});
	res.json({data: req.body, status: 200});
});

/* POST send contact email to agent */
router.post('/emailagent', function(req, res, next) {
	var body = "email: " + req.body.email + "\n\n" + req.body.message;
	var mailOptions = {
		from: 'autoremaxprinceton@gmail.com',
		to: req.body.agentEmail,
		subject: 'Contact form message from ' + req.body.name,
		text: body
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) console.log(error);
	});
	res.json({data: req.body, status: 200});
});

/* POST sign up for Remax newsletter */
router.post('/newsletter', function(req, res, next) {
	Email.findOne({email: req.body.email}, function(err, email) {
		if(!email)
		{
			var email = new Email({
				email: req.body.email,
				date: Date.now(),
			});
			email.save(function(err, result) {
				res.json({new: true, status: 200});
			})
		}
		else
		{
			res.json({new: false, status: 200});
		}
	});
});

function json2array(json){
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function(key){
    result.push(json[key]);
  });
  return result;
}

module.exports = router;
