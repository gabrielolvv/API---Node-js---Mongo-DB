const express = require('express');
const Cardapio = require('../models/Cardapio');
const router = express.Router();


router.post('/register', async(req, res)=>{
    const {nome} = req.body
    try{
        if(await Cardapio.findOne({nome}))
            return res.status(400).json({error:'Usuário já existe !'})
        const cardapio = Cardapio.create(req.body);
        return res.send({ cardapio } )
    }catch(error){
        res.status(400).json({error:'registro falhou'})
    }
});

router.get('/', async(req,res)=>{
    try {
        const cardapio = await Cardapio.find()
        res.send(cardapio)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.get('/:id', async(req,res)=>{
    const id = req.params.id
    try {
        const cardapio = await Cardapio.findOne({_id:id})
        if(!cardapio){
            res.status(422).json({message:'o cardapio não foi encontrado'})
            return
        }
        res.status(200).json(cardapio)
    } catch (error) {
        res.status(500).json({error:error})
    }
})


router.patch('/:id', async(req,res)=>{
    
    const id = req.params.id

    const {nome, descricao, valorAtual,valorAnterior,valorOferta,nomeRestaurante,status} = req.body

    const cardapio ={nome, descricao, valorAtual,valorAnterior,valorOferta,nomeRestaurante,status}
    try {
        const updateCardapio = await Cardapio.updateOne({_id:id}, cardapio)
        if(updateCardapio.matchedCount === 0){
            res.status(422).json({message:'o cardapio não foi encontrado'})
            return
        }
        if(!cardapio){
            res.status(422).json({message:'o cardapio não foi encontrado'})
            return
        }
        res.status(200).json(cardapio)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    try {
        await Cardapio.deleteOne({_id: id})
       res.status(200).json({message:'Apagado com sucesso'})
    } catch (error) {
        res.status(500).json({error:error})
    }
})

module.exports = app => app.use('/cardapio', router);