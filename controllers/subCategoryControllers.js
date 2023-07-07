const { response } = require('express');

const subCategoria = require('../models/subCategoryPrograms');
<<<<<<< HEAD
const Programs = require('../models/programs');



const getSubCategoriaById = async(req, res  = response ) => {

  const idSubCategoria = req.params.id;

  try {
      return subCategoria.find({ _id: idSubCategoria })
      .exec()
      .then((data) => {
          return res.status(200).json({
          ok: true,
          data,
          });
      })
      .catch((error) => {
          console.error('No se encontrado registro alguno:', error);
      });
  } catch (error) {
      console.log(error);
  }


}

=======


>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
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



<<<<<<< HEAD
  const updateSubCategory = async (req, res = response) => {
=======
  const updateLines = async (req, res = response) => {
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871

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
  
<<<<<<< HEAD
      const existName = await subCategoria.findOne({ name });
=======
      const existName = await Lines.findOne({ name });
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
      
     
  
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
  
<<<<<<< HEAD
  const deleteSubCategory = async (req, res = response) => {
=======
  const deleteLines = async (req, res = response) => {
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
    const _id = req.params.id;
  
    try {
      const subCategoriaDB = await subCategoria.findById(_id);
  
      if (!subCategoriaDB) {
        return res.status(404).json({
          ok: false,
<<<<<<< HEAD
          msg: 'No se encontró la subcategoría con ese identificador',
        });
      }
      const isUsedInPrograms = await Programs.exists({ Subcategory: subCategoriaDB.name });
  
      if (isUsedInPrograms) {
        return res.status(500).json({
          ok: false,
          msg: 'No se puede eliminar la subcategoría porque está siendo utilizada en uno o más programas',
=======
          msg: 'No se encontro subCategoria con ese identificado',
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
        });
      }
  
      const subCategoriaDelete = await subCategoria.findByIdAndDelete(_id);
  
      return res.status(200).json({
        ok: true,
<<<<<<< HEAD
        msg: 'Se ha eliminado la subcategoría',
        data: subCategoriaDelete,
      });
    } catch (error) {
      console.log('Error al eliminar la subcategoría', error);
  
      return res.status(500).json({
        ok: false,
        msg: 'Error al eliminar la subcategoría',
      });
    }
  };
  

  
=======
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
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871

module.exports={
    getSubCategory,
    registerSubCategory,
<<<<<<< HEAD
    updateSubCategory,
    deleteSubCategory,
    getSubCategoriaById
=======
    updateLines,
    deleteLines
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
}