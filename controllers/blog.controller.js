const models = require('../models');
const fs = require("fs");

async function createBlog(req,res){
	const images = [];

	if(req.files.blogImage){
		for(i=0;i<req.files.blogImage.length;i++){
			let imageFile = req.files.blogImage[i].path;
			images.push(imageFile);
		}
	}

	if(req.files)
	{
		var blogData = {
			title:req.body.title,
			description:req.body.description,
			blogImage:JSON.stringify(images),
			categoryId:parseInt(req.body.categoryId)
		}

	}

	else{
		var blogData = {
			title:req.body.title,
			description:req.body.description,
			categoryId:parseInt(req.body.categoryId)
		}
	}


	let blogs = await models.Blog.create(blogData);
	if(blogs){
		res.status(201).json({
			message:"blog created sucessfully"
		})
	}
	else{
		res.status(500).json({
			message:"Something went wrong"
		})
	}



}


async function showBlog(req,res){
	let blogs = await models.Blog.findAll({
	include:[{
			model:models.Category,
			as:"category"
		}]

	});
	if(blogs){
		res.status(200).json({
			data:blogs
		})
	}
	else
	{
		res.status(500).json({
			message:"Something went wrong"
		})
	}
}


async function showById(req,res){
	const id = req.params.id;
	let getdata = await models.Blog.findByPk(id);
	if(getdata){
		res.status(201).json({
			data:getdata
		})
	}
	else if(!getdata){
		res.status(404).json({
			message:"Data not found"
		})

	}
	else
	{
		res.status(500).json({
			message:"Something went wrong"
		})
	}
}

function deleteFiles(files,callback){

	var i = files.length;
	files.forEach(function (filepath){
		fs.unlink(filepath, function(err){
			i--;
			if(err){
				callback(err);
				return;
			}else if(i <=0){
				callback(null);
			}
		});
	})
}

 async function update(req,res){
	const id = req.params.id;
	let blogupdate = await models.Blog.findByPk(id);

	if(!blogupdate)
	{
		return res.status(404).json({
			message:"Place Data not found"
		})
	}

	else{

		if(!req.files.blogImage){
			var blogData = {
			title:req.body.title,
			description:req.body.description,
			categoryId:parseInt(req.body.categoryId)
			}
		}
		else
		{
			if(blogupdate.blogImage){
				const oldImages = blogupdate.blogImage;
				let images = JSON.parse(oldImages);

				deleteFiles(images,function(err){
					if(err){
						console.log(err);
					}
					else{
						console.log("Previous images removed");
					}
				})

				
			}


		const blogImages = [];

		if(req.files.blogImage){
			for(i=0;i<req.files.blogImage.length;i++){
				let imageFile = req.files.blogImage[i].path;
				blogImages.push(imageFile);
			}
		}	

		var blogData = {
			title:req.body.title,
			description:req.body.description,
			blogImage:JSON.stringify(blogImages),
			categoryId:parseInt(req.body.categoryId)
		}

		}

		let updatedDatas = models.Blog.update(blogData,{where:{id:id}});
		if(updatedDatas){
			res.status(200).json({
				message:"Data updated sucessfully"
			})
		}
		else{
			res.status(500).json({
				message:"Something went wrong"
			})
		}
	}



}



module.exports = {
	createBlog:createBlog,
	showBlog:showBlog,
	showById:showById,
	update:update
}