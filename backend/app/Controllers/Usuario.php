<?php
namespace App\Controllers;
 
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\RequestInterface;
 
class Usuario extends ResourceController {
     
    protected $modelName = 'App\Models\UsuarioModel';
    protected $format    = 'json';
 
    // busca todos usuarios
    public function index() {
        return $this->respond($this->model->findAll());
    }
 
    // salva usuarios
    public function create() {
        // get posted JSON
        //$json = json_decode(file_get_contents("php://input", true));
        $json = $this->request->getJSON();
         
        $nome = $json->nome;
        $email = $json->email;
        $nascimento = $json->nascimento;
        $cidade = $json->cidade;
        $empresa_id = $json->empresa_id;
         
        $data = array(
            'nome' => $nome,
            'email' => $email,
            'nascimento' => $nascimento,
            'cidade' => $cidade,
            'empresa_id' => $empresa_id
        );
         
        $this->model->insert($data);
         
        $response = array(
            'status'   => 201,
            'messages' => array(
                'success' => 'Usuario registrado com sucesso !'
            )
        );
         
        return $this->respondCreated($response);
    }
 
    // fetch single product
    public function show($id = null) {
        $data = $this->model->where('id', $id)->first();
         
        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('Usuario não encontrado !');
        }
    }
 
    // update product by id
    public function update($id = NULL){     
        //$json = json_decode(file_get_contents("php://input", true));
        $json = $this->request->getJSON();
         
        $nome = $json->nome;
        $email = $json->email;
        $nascimento = $json->nascimento;
        $cidade = $json->cidade;
        $empresa_id = $json->empresa_id;
         
        $data = array(
            'id' => $id,
            'nome' => $nome,
            'email' => $email,
            'nascimento' => $nascimento,
            'cidade' => $cidade,
            'empresa_id' => $empresa_id
        );
         
        $this->model->update($id, $data);
         
        $response = array(
            'status'   => 200,
            'messages' => array(
                'success' => 'Usuario atualizado com sucesso'
            )
        );
       
        return $this->respond($response);
    }
 
    // delete product by id
    public function delete($id = NULL){
        $data = $this->model->find($id);
         
        if($data) {
            $this->model->delete($id);
             
            $response = array(
                'status'   => 200,
                'messages' => array(
                    'success' => 'Usuario exluido com sucesso !'
                )
            );
             
            return $this->respondDeleted($response);
        } else {
            return $this->failNotFound('Usuario não encontrado !');
        }
    }
}