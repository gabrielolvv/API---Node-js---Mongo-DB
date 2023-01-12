const express = require('express');
const Pedidos = require('../models/Pedidos');
const router = express.Router();

router.post('/register', async(req, res)=>{
    const {nome} = req.body
    try{
        if(await Pedidos.findOne({nome}))
            return res.status(400).json({error:'pedidos já existe !'})
        const pedidos = Pedidos.create(req.body);
        return res.send({ pedidos } )
    }catch(error){
        res.status(400).json({error:'registro falhou'})
    }
});

router.get('/', async(req,res)=>{
    try {
        const pedidos = await Pedidos.find()
        res.send(pedidos)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.get('/:id', async(req,res)=>{
    const id = req.params.id
    try {
        const pedidos = await Pedidos.findOne({_id:id})
        if(!pedidos){
            res.status(422).json({message:'o pedidos não foi encontrado'})
            return
        }
        res.status(200).json(pedidos)
    } catch (error) {
        res.status(500).json({error:error})
    }
})



router.patch('/:id', async(req,res)=>{
    
    const id = req.params.id

    const {cliente, prato, valor,dataPedido,dataEntrega,observacao,status} = req.body

    const pedidos ={cliente, prato, valor,dataPedido,dataEntrega,observacao,status}
    try {
        const updateCliente = await Pedidos.updateOne({_id:id}, pedidos)
        if(updateCliente.matchedCount === 0){
            res.status(422).json({message:'o pedidos não foi encontrado'})
            return
        }
        if(!pedidos){
            res.status(422).json({message:'o pedidos não foi encontrado'})
            return
        }
        res.status(200).json(pedidos)
    } catch (error) {
        res.status(500).json({error:error})
    }
})


router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    try {
        await Pedidos.deleteOne({_id: id})
       res.status(200).json({message:'Apagado com sucesso'})
    } catch (error) {
        res.status(500).json({error:error})
    }
})
module.exports = app => app.use('/pedidos', router);
