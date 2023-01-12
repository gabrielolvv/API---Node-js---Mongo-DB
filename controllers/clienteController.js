const express = require('express');
const Cliente = require('../models/Clientes');
const router = express.Router();

router.post('/register', async(req, res)=>{
    const {nome} = req.body
    try{
        if(await Cliente.findOne({nome}))
            return res.status(400).json({error:'cliente já existe !'})
        const cliente = Cliente.create(req.body);
        return res.send({ cliente } )
    }catch(error){
        res.status(400).json({error:'registro falhou'})
    }
});

router.get('/', async(req,res)=>{
    try {
        const cliente = await Cliente.find()
        res.send(cliente)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.get('/:id', async(req,res)=>{
    const id = req.params.id
    try {
        const cliente = await Cliente.findOne({_id:id})
        if(!cliente){
            res.status(422).json({message:'o cliente não foi encontrado'})
            return
        }
        res.status(200).json(cliente)
    } catch (error) {
        res.status(500).json({error:error})
    }
})



router.patch('/:id', async(req,res)=>{
    
    const id = req.params.id

    const {nome, cpf, telefone,cep,bairro,rua,numero} = req.body

    const cliente ={nome, cpf, telefone,cep,bairro,rua,numero}
    try {
        const updateCliente = await Cliente.updateOne({_id:id}, cliente)
        if(updateCliente.matchedCount === 0){
            res.status(422).json({message:'o cliente não foi encontrado'})
            return
        }
        if(!cliente){
            res.status(422).json({message:'o cliente não foi encontrado'})
            return
        }
        res.status(200).json(cliente)
    } catch (error) {
        res.status(500).json({error:error})
    }
})


router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    try {
        await Cliente.deleteOne({_id: id})
       res.status(200).json({message:'Apagado com sucesso'})
    } catch (error) {
        res.status(500).json({error:error})
    }
})
module.exports = app => app.use('/cliente', router);
