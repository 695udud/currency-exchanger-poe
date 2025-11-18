import { useState } from "react";
import Button from "./components/ui/button";
import Card from "./components/ui/card";
import Input from "./components/ui/input";


export default function PrecosDashboard() {
  const [moeda1, setMoeda1] = useState(1);
  const [moeda2, setMoeda2] = useState(1);
  const [produtos, setProdutos] = useState([]);
  
  
  const [form, setForm] = useState({ nome: "", c1: "", v1: "", c2: "", v2: "" });
  
  
  const adicionarProduto = () => {
    if (!form.nome) return;
    setProdutos([...produtos, { ...form, id: crypto.randomUUID() }]);
    setForm({ nome: "", c1: "", v1: "", c2: "", v2: "" });
  };
  
  
  const melhoresOpcoes = produtos
  .map((p) => {
    const ganhoMoeda1 = p.v1 - p.c1;
    const ganhoMoeda2 = p.v2 - p.c2;
    return { ...p, ganhoMoeda1, ganhoMoeda2 };
  })
  .sort((a, b) => b.ganhoMoeda1 - a.ganhoMoeda1);
  
  
  return (
    <div style={{ padding: 20 }}>
      <h1>Sistema de Preços e Dashboard</h1>
      
      
      <Card>
        <h2>Moedas</h2>
        <div>
          <Input type="number" value={moeda1} onChange={(e) => setMoeda1(Number(e.target.value))} />
          <Input type="number" value={moeda2} onChange={(e) => setMoeda2(Number(e.target.value))} />
        </div>
      </Card>
      
      
      <Card>
        <h2>Cadastrar Produto</h2>
        <Input placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
        <Input placeholder="Compra M1" type="number" value={form.c1} onChange={(e) => setForm({ ...form, c1: Number(e.target.value) })} />
        <Input placeholder="Venda M1" type="number" value={form.v1} onChange={(e) => setForm({ ...form, v1: Number(e.target.value) })} />
        <Input placeholder="Compra M2" type="number" value={form.c2} onChange={(e) => setForm({ ...form, c2: Number(e.target.value) })} />
        <Input placeholder="Venda M2" type="number" value={form.v2} onChange={(e) => setForm({ ...form, v2: Number(e.target.value) })} />
        
        
        <Button onClick={adicionarProduto}>Adicionar</Button>
      </Card>
      
      
      <Card>
        <h2>Melhores opções</h2>
        {melhoresOpcoes.map((p) => (
        <Card key={p.id}>
          <h3>{p.nome}</h3>
          <p>Ganho M1: {p.ganhoMoeda1}</p>
          <p>Ganho M2: {p.ganhoMoeda2}</p>
        </Card>
        ))}
      </Card>
    </div>
  );
}
