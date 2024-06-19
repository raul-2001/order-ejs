// GET /jobs (display all the job listings belonging to this user)
// POST /jobs (Add a new job listing)
// GET /jobs/new (Put up the form to create a new entry)
// GET /jobs/edit/:id (Get a particular entry and show it in the edit box)
// POST /jobs/update/:id (Update a particular entry)
// POST /jobs/delete/:id (Delete an entry) %/


const Item = require('../models/item')


const getAllItems = async (req, res) => {
    
    const items = await Item.find().sort('-createdAt')
    res.render('items', { items });
}


const newItemForm = (req, res) => {
    res.render("newItem")
}

const createItem = async (req, res) => {
    try {
        req.body.createdBy = req.user
        await Item.create(req.body)    
    } catch (error) {
        console.log(error)
    }
    
    res.redirect("/items")
}

const editItem = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('edit', {item, _csrf: req.body._csrf})
    // res.send({item})
}


const updateItem = async (req, res) => {

    const { user: {userId}, params: {id: itemId}} = req

    console.log(req.body)
    const item = await Item.findByIdAndUpdate({_id: itemId, createdBy: userId}, req.body, {new: true, runValidators: true})
    if (!item) {
        throw new NotFoundError(`No item with id ${itemId}`)
    }  

    res.redirect('/items');

}



module.exports = {
    getAllItems,
    createItem,
    newItemForm,
    editItem,
    updateItem,
}