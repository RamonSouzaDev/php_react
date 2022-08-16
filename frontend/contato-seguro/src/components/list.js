import React from 'react';
import { Link } from 'react-router-dom';
 
class Usuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {usuarios: []};
        this.headers = [
            { key: 'id', label: 'Id'},
            { key: 'nome', label: 'Nome' },
            { key: 'email', label: 'Email' },
            { key: 'nascimento', label: 'Data de Nascimento' },
            { key: 'cidade', label: 'Cidade de Nascimento' },
            { key: 'empresa_id', label: 'Empresa' }
        ];
        this.deleteUsuario = this.deleteProduct.bind(this);
    }
     
    componentDidMount() {
        fetch('http://localhost:8080/usuario')
            .then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
                this.setState({
                    usuarios:result
                });
            });
    }
     
    deleteUsuario(id) {
        if(window.confirm("Tem certeza  que quer deletar usuário?")) {
            fetch('http://localhost:8080/usuario/' + id, {
                                method : 'DELETE'
                                   }).then(response => { 
                    if(response.status === 200) {
                        alert("Usuario excluido com sucesso");
                        fetch('http://localhost:8080/usuario')
                        .then(response => {
                            return response.json();
                        }).then(result => {
                            console.log(result);
                            this.setState({
                                usuario:result
                            });
                        });
                    } 
             });
        }
    }
     
    render() {
        return (
            <div id="container">
                <Link to="/create">Add Usuario</Link>
                <p/>
                <table>
                    <thead>
                        <tr>
                        {
                            this.headers.map(function(h) {
                                return (
                                    <th key = {h.key}>{h.label}</th>
                                )
                            })
                        }
                          <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.usuarios.map(function(item, key) {
                            return (
                                <tr key = {key}>
                                  <td>{item.id}</td>
                                  <td>{item.nome}</td>
                                  <td>{item.email}</td>
                                  <td>{item.nascimento}</td>
                                  <td>{item.cidade}</td>
                                  <td>{item.empresa_id}</td>
                                  <td>
                                        <Link to={`/update/${item.id}`}>Edit</Link>
                                        &nbsp;&nbsp;
                                        <a href="javascript:void(0);" onClick={this.deleteUsuario.bind(this, item.id)}>Delete</a>
                                  </td>
                                </tr>
                                            )
                            }.bind(this))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
 
export default Usuarios;