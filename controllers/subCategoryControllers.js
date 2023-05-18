const { response } = require('express');

const subCategoria = require('../models/subCategoryPrograms');


const getSubCategory = async (req, res = response) => {

    const [subCategory, total] = await Promise.all([
        subCategoria.find({}, 'name  description created_at updated_at'),
        subCategoria.countDocuments(),
    ]);
  
    res.json({
      ok: true,
      subCategory,
      total,
    });
}

const registerSubCategory = async (req, res = response) => {
    const { name } = req.body;
  
    try {
      const existName = await subCategoria.findOne({ name });
     
  
      if (existName) {
        return res.status(400).json({
          ok: false,
          msg: ' Ya existe una categoria con ese nombre',
        });
      } 
  
      const subCategory = new subCategoria(req.body);
  
      await subCategory.save();
  
      res.json({
        ok: true,
        msg: 'Se ha registrado una nueva subCategoria',
        subCategory,
      });
    } catch (error) {
      console.log('ERROR al crear la subCategoria:', error);
  
      res.status(500).json({
        ok: false,
        msg: 'Unexpected error... check logs',
      });
    }
  };



  const updateLines = async (req, res = response) => {

    try {
      const _id = req.params.id;
      const subCategoriaDB = await subCategoria.findById({ _id });
  
      if (!subCategoriaDB) {
        return res.status(404).json({
          ok: false,
          msg: 'No se encontro subCategoria con ese Id',
        });
      }
  
      const { name,  ...campos } = req.body;
  
      const existName = await Lines.findOne({ name });
      
     
  
      if (existName  && existName._id.toString() !== _id) {
        return res.status(400).json({
          ok: false,
          msg: ' Ya existe una subCategoria con ese nombre',
        });
  
        
      } 
      campos.name = name;
    
  
      const subcategoria = await subCategoria.findByIdAndUpdate(_id, campos);
  
      return res.status(200).json({
        ok: true,
        msg: 'Se ha actualizado la subcategoria',
      });
    } catch (err) {
      console.log('error en update subcategoria ', err);
      return res.status(500).json({
        ok: false,
        msg: 'error when updating',
      });
    }
  };
  
  const deleteLines = async (req, res = response) => {
    const _id = req.params.id;
  
    try {
      const subCategoriaDB = await subCategoria.findById(_id);
  
      if (!subCategoriaDB) {
        return res.status(404).json({
          ok: false,
          msg: 'No se encontro subCategoria con ese identificado',
        });
      }
  
      const subCategoriaDelete = await subCategoria.findByIdAndDelete(_id);
  
      return res.status(200).json({
        ok: true,
        msg: 'Se ha eliminado la subCategoria',
        data: subCategoriaDelete,
      });
    } catch (error) {
      console.log('Error en el eliminar la subCategoria', error);
  
      return res.status(500).json({
        ok: false,
        msg: 'Error para eliminar la subCategoria',
      });
    }
  };

module.exports={
    getSubCategory,
    registerSubCategory,
    updateLines,
    deleteLines
}