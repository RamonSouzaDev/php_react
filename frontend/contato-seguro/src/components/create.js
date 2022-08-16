import React from 'react';
import { Link } from 'react-router-dom';
 
class Create extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = {nome: '', email:'', nascimento:'', cidade:'', empresa_id:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
   
  handleChange(event) {
      const state = this.state
      state[event.target.nome] = event.target.value
      this.setState(state);
  }
   
  handleSubmit(event) {
      event.preventDefault();
      fetch('http://localhost:8080/usuario', {
            method: 'POST',
            body: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                nascimento: this.state.nascimento,
                cidade: this.state.cidade,
                empresa_id: this.state.empresa_id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
                if(response.status === 201) {
                    alert("Usuario cadastrado com sucesso !");
                }
            });
  }
   
  render() {
    return (
        <div id="container">
          <Link to="/">Products</Link>
              <p/>
              <form onSubmit={this.handleSubmit}>
                <p>
                    <label>Nome:</label>
                    <input type="text" name="nome" value={this.state.nome} onChange={this.handleChange} placeholder="Nome" />
                </p>
                <p>
                    <label>Email:</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                </p>
                <p>
                    <label>Nascimento:</label>
                    <input type="text" name="nascimento" value={this.state.nascimento} onChange={this.handleChange} placeholder="Data de nascimento" />
                </p>
                <p>
                    <label>Cidade de nascimento:</label>
                    <input type="text" name="cidade" value={this.state.cidade} onChange={this.handleChange} placeholder="Cidade de nascimento" />
                </p>
                <p>
                    <label>Empresa:</label>
                    <input type="text" name="empresa_id" value={this.state.empresa_id} onChange={this.handleChange} placeholder="Empresa" />
                </p>
                <p>
                    <input type="submit" value="Submit" />
                </p>
              </form>
           </div>
    );
  }
}
 
export default Create;