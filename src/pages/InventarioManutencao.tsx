import React, { useState, useEffect } from 'react';
import SidebarManutencao from '../components/SidebarManutencao';
import { HeaderManutencao } from '../components/HeaderManutencao';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Plus, 
  Package, 
  MapPin, 
  Edit, 
  Trash2, 
  Filter,
  Grid3X3,
  List,
  Wrench,
  AlertTriangle,
  CheckCircle,
  X,
  Save
} from 'lucide-react';
import { toast } from 'sonner';
import FloatingChat from '../components/FloatingChat';

interface InventarioItem {
  id: number;
  item: string;
  quantidade: number;
  status: string;
  localização: string;
  categoria: string;
  ultimaManutencao: string;
  proximaManutencao: string;
}

const InventarioManutencao = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventarioItem | null>(null);
  const [editFormData, setEditFormData] = useState<InventarioItem | null>(null);
  const [currentUser] = useState({
    id: 'manutencao-1',
    name: 'Robert Silva',
    role: 'Manutenção',
  });

  const [inventario, setInventario] = useState<InventarioItem[]>([
    {
      id: 1,
      item: "Chave de Fenda",
      quantidade: 5,
      status: "Disponível",
      localização: "Armário 1",
      categoria: "Ferramentas",
      ultimaManutencao: "2024-01-15",
      proximaManutencao: "2024-04-15"
    },
    {
      id: 2,
      item: "Multímetro Digital",
      quantidade: 2,
      status: "Em Uso",
      localização: "Caixa de Ferramentas",
      categoria: "Equipamentos",
      ultimaManutencao: "2024-02-10",
      proximaManutencao: "2024-05-10"
    },
    {
      id: 3,
      item: "Kit de Manutenção",
      quantidade: 3,
      status: "Disponível",
      localização: "Estante 2",
      categoria: "Kits",
      ultimaManutencao: "2024-01-20",
      proximaManutencao: "2024-04-20"
    },
    {
      id: 4,
      item: "Furadeira Elétrica",
      quantidade: 1,
      status: "Manutenção",
      localização: "Oficina",
      categoria: "Equipamentos",
      ultimaManutencao: "2024-02-01",
      proximaManutencao: "2024-03-01"
    },
    {
      id: 5,
      item: "Alicate Universal",
      quantidade: 8,
      status: "Disponível",
      localização: "Armário 2",
      categoria: "Ferramentas",
      ultimaManutencao: "2024-01-10",
      proximaManutencao: "2024-04-10"
    },
    {
      id: 6,
      item: "Martelo",
      quantidade: 4,
      status: "Disponível",
      localização: "Armário 1",
      categoria: "Ferramentas",
      ultimaManutencao: "2024-01-05",
      proximaManutencao: "2024-04-05"
    }
  ]);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleMenuClick = () => {
    if (isMobile) {
      setIsSheetOpen(true);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const filteredInventario = inventario.filter(item => {
    const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.localização.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'Todos' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (item: InventarioItem) => {
    setSelectedItem(item);
    setEditFormData({ ...item });
    setIsEditModalOpen(true);
  };

  const handleDelete = (item: InventarioItem) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editFormData) return;

    setInventario(prev => 
      prev.map(item => 
        item.id === editFormData.id ? editFormData : item
      )
    );

    setIsEditModalOpen(false);
    setSelectedItem(null);
    setEditFormData(null);
    toast.success(`Item "${editFormData.item}" atualizado com sucesso!`);
  };

  const handleConfirmDelete = () => {
    if (!selectedItem) return;

    setInventario(prev => prev.filter(item => item.id !== selectedItem.id));
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
    toast.success(`Item "${selectedItem.item}" removido com sucesso!`);
  };

  const handleEditFormChange = (field: keyof InventarioItem, value: string | number) => {
    if (!editFormData) return;

    setEditFormData(prev => ({
      ...prev!,
      [field]: value
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Em Uso':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Manutenção':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Disponível':
        return <CheckCircle size={16} />;
      case 'Em Uso':
        return <Wrench size={16} />;
      case 'Manutenção':
        return <AlertTriangle size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const stats = {
    total: inventario.length,
    disponivel: inventario.filter(item => item.status === 'Disponível').length,
    emUso: inventario.filter(item => item.status === 'Em Uso').length,
    manutencao: inventario.filter(item => item.status === 'Manutenção').length
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarManutencao 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderManutencao 
          titulo="INVENTÁRIO"
          nome="ROBERT SILVA"
          tipo="MANUTENÇÃO"
          onMenuClick={handleMenuClick}
          className={cn(
            "sticky top-0 z-30"
          )}
        />
        <main className="flex-1 p-3 sm:p-6 bg-gray-50 space-y-6">
          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total de Itens</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Disponível</p>
                    <p className="text-2xl font-bold text-green-600">{stats.disponivel}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Em Uso</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.emUso}</p>
                  </div>
                  <Wrench className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Manutenção</p>
                    <p className="text-2xl font-bold text-red-600">{stats.manutencao}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Barra de Controles */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      placeholder="Buscar itens..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="Todos">Todos</option>
                      <option value="Disponível">Disponível</option>
                      <option value="Em Uso">Em Uso</option>
                      <option value="Manutenção">Manutenção</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid3X3 size={16} />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List size={16} />
                    </Button>
                  </div>
                  
                  <Button>
                    <Plus size={16} className="mr-2" />
                    Adicionar Item
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Itens */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInventario.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{item.item}</CardTitle>
                        <p className="text-sm text-gray-600">{item.categoria}</p>
                      </div>
                      <Badge className={cn("border", getStatusColor(item.status))}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(item.status)}
                          {item.status}
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Quantidade:</span>
                      <span className="font-semibold">{item.quantidade}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{item.localização}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      <p>Última manutenção: {new Date(item.ultimaManutencao).toLocaleDateString()}</p>
                      <p>Próxima manutenção: {new Date(item.proximaManutencao).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit size={14} className="mr-1" />
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 size={14} className="mr-1" />
                        Remover
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {filteredInventario.map((item, index) => (
                    <div key={item.id} className={cn(
                      "p-4 flex items-center justify-between hover:bg-gray-50",
                      index !== filteredInventario.length - 1 && "border-b"
                    )}>
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.item}</h3>
                          <p className="text-sm text-gray-600">{item.categoria}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="font-semibold">{item.quantidade}</p>
                          <p className="text-xs text-gray-500">Qtd</p>
                        </div>
                        
                        <Badge className={cn("border", getStatusColor(item.status))}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(item.status)}
                            {item.status}
                          </div>
                        </Badge>
                        
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin size={14} />
                          {item.localização}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(item)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      {/* Modal de Edição */}
      {isEditModalOpen && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Editar Item</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditModalOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="item">Nome do Item</Label>
                <Input
                  id="item"
                  value={editFormData.item}
                  onChange={(e) => handleEditFormChange('item', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="categoria">Categoria</Label>
                <select
                  id="categoria"
                  value={editFormData.categoria}
                  onChange={(e) => handleEditFormChange('categoria', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Ferramentas">Ferramentas</option>
                  <option value="Equipamentos">Equipamentos</option>
                  <option value="Kits">Kits</option>
                </select>
              </div>

              <div>
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input
                  id="quantidade"
                  type="number"
                  value={editFormData.quantidade}
                  onChange={(e) => handleEditFormChange('quantidade', parseInt(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={editFormData.status}
                  onChange={(e) => handleEditFormChange('status', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Disponível">Disponível</option>
                  <option value="Em Uso">Em Uso</option>
                  <option value="Manutenção">Manutenção</option>
                </select>
              </div>

              <div>
                <Label htmlFor="localizacao">Localização</Label>
                <Input
                  id="localizacao"
                  value={editFormData.localização}
                  onChange={(e) => handleEditFormChange('localização', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="ultimaManutencao">Última Manutenção</Label>
                <Input
                  id="ultimaManutencao"
                  type="date"
                  value={editFormData.ultimaManutencao}
                  onChange={(e) => handleEditFormChange('ultimaManutencao', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="proximaManutencao">Próxima Manutenção</Label>
                <Input
                  id="proximaManutencao"
                  type="date"
                  value={editFormData.proximaManutencao}
                  onChange={(e) => handleEditFormChange('proximaManutencao', e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1"
                onClick={handleSaveEdit}
              >
                <Save size={16} className="mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {isDeleteModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-red-600">Confirmar Exclusão</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">
                Tem certeza que deseja remover o item <strong>"{selectedItem.item}"</strong>?
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Esta ação não pode ser desfeita.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleConfirmDelete}
              >
                <Trash2 size={16} className="mr-2" />
                Remover
              </Button>
            </div>
          </div>
        </div>
      )}

      <FloatingChat
        currentUser={{
          id: currentUser.id,
          name: currentUser.name,
          role: currentUser.role
        }}
      />
    </div>
  );
};

export default InventarioManutencao;
