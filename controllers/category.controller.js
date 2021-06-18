const models = require('../models');
async function save(req,res)
{
	const data ={
		categoryName:req.body.categoryName
	}
	let PreviousCategory = await models.Category.findOne({where:{categoryName:req.body.categoryName},ignore:true});
	if(PreviousCategory)
	{
		return res.status(409).json({
			message:"category already exist",
		})
	}
	else
	{

	let category= await models.Category.create(data);
	if(category)
	{
		res.status(201).json({
			message:"category created",
			data:category
		})
	}
	else
	{
		res.status(500).json({
			message:"something went wrong"
		})
	}

	}

}

async function index(req,res){
	let data = await models.Category.findAll();
	if(data)
	{
		res.status(200).json({
			data:data
		})
	}
	else
	{
		res.status(500).json({
			message:"something went wrong"
		})
	}
}

async function show(req,res){
	const id  = req.params.id;
	let CategoryData = await models.Category.findByPk(req.params.id,{
		include:[{
			model:models.Blog,
			as:"blog"
		}]
	});
	if(!CategoryData){

		res.status(404).json({
			message:"data not found"
		})

	}
	else if(CategoryData){
		res.status(201).json({
			data:CategoryData
		})
	}

	else
	{
		res.status(500).json({
			message:"something went wrong"
		})
	}

}

async function destroy(req,res){
	const id = req.params.id;
	let DeleteCategory = await models.Category.destroy({where:{id:id}})
	if(DeleteCategory)
	{
		res.status(200).json({
			message:"Data deleted sucessfully"
		})
	}
	else
	{
		res.status(500).json({
			message:"Something went wrong"
		})
	}
}


async function update(req,res){
	const id = req.params.id;
	const data = req.body;
	await models.Category.update(data,{where : { id : id}}).then(result=>{
		res.status(200).json({
			message:"data updated",
			
		})

		}).catch(error=>{
			message:"something went wrong"
		})
}
module.exports = {
	save:save,
	index:index,
	show:show,
	destroy:destroy,
	update:update
}