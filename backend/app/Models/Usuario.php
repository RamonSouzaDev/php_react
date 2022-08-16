<?php
namespace App\Models;
use CodeIgniter\Model;
 
class ProductModel extends Model {
 
    protected $table      = 'usuario';
    protected $primaryKey = 'id';
     
    protected $returnType     = 'array';
 
    protected $allowedFields = ['nome', 'email', 'nascimento', 'cidade', 'empresa_id'];
 
    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
     
}