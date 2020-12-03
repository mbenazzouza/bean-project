const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const pool = require('./db');
let fs = require('fs');

const fileUpload = require('express-fileupload');
const FileType = require('file-type');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json()) // le body de la requête (req.body)


app.use(bodyParser.json())
app.use(fileUpload());
// DB
const knex = require('knex')({
    client: 'pg',
    connection: {
        user: "postgres",
        password: "postgres",
        database: "bean_database",
        host: "localhost",
        port: 5432
    },
    useNullAsDefault: true
});
//ROUTES//


//get all beans

app.get('/beans', async (req, res) => {
    try {
        const allBeans = await pool.query("SELECT * FROM bean");
        res.json(allBeans.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a bean

app.get('/beans/:name', async (req, res) => {
    const { name } = req.params;
    const bean = await pool.query("SELECT * FROM bean WHERE name = $1", [name]);
    console.log(bean.rows.length)
    if (bean.rows.length > 0) {
        res.json(bean.rows[0]);
    } else {
        res.status(404).json('No elements found');
    }
    try {
    } catch (err) {
        console.error(err.message);
    }

});

// get a bean
app.get('/beans/:id', async (req, res) => {
    const { id } = req.params;
    const bean = await knex.select('*').where({id}).returning('*');
    if (bean) {
        res.json(bean);
    } else {
        res.status(404).json('No elements found');
    }
    try {
    } catch (err) {
        console.error(err.message);
    }

});

//create a bean

app.post('/beans', async (req, res) => {

    const { name, description } = req.body;
    console.log(req.body);
    if (name) {
        const createdBean = await knex.insert({ name: name, description: description }).into('bean').returning('*').catch(
            (err) => {
                console.log(err);
            }
        );
        res.status(200).json(createdBean);
    } else {
        res.sendStatus(400);
    }
});

//update a bean

app.put('/beans/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get bean id from the request params
        const { description } = req.body;// Get description property from the request body
        let updatedBean = [];
        console.log(req.files);
        if (req.files) {
            const { data } = req.files.file;
            updatedBean = await knex.update({ description: description, image: data }).where({ id }).into('bean').returning('*');
        } else {
            updatedBean = await knex.update({ description: description }).where({ id }).into('bean').returning('*');
        }
        if (updatedBean.length > 0) {
            res.status(200).json(updatedBean);
        } else {
            res.status(404).json(`No bean found with id ${id}`);
        }



    } catch (err) {
        console.error(err.message);
    }
});

//delete a bean

app.delete('/beans/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletebean = await pool.query("DELETE FROM bean WHERE id = $1", [id]);

        res.status(204).json('bean deleted');
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(3000, () => {
    console.log('app is listening on port 3000')
})