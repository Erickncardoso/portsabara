import React, { useState, useEffect } from 'react';
import SidebarFarmacia from '../components/SidebarFarmacia';
import HeaderFarmacia from '../components/HeaderFarmacia';
import { Camera, X } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '../hooks/use-mobile';
import { cn, getMainContentClasses } from '../lib/utils';

interface PerfilData {
  nome: string;
  registro: string;
  email: string;
  telefone: string;
  cargo: string;
  hospital: string;
  foto?: string;
}

const perfilInicial: PerfilData = {
  nome: 'Dr. Maria Santos',
  registro: 'CRF-123456',
  email: 'farmacia@sabara.com',
  telefone: '(11) 99999-8888',
  cargo: 'Farmacêutico(a)',
  hospital: 'Hospital Infantil Sabará',
};

const PerfilFarmacia: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [perfil, setPerfil] = useState<PerfilData>(perfilInicial);
  const [formData, setFormData] = useState<PerfilData>(perfilInicial);
  const [currentUser] = useState({
    id: 'farmacia-1',
    name: 'Dr. Maria Santos',
    role: 'Farmacêutico(a)',
  });

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const savedPerfil = localStorage.getItem('perfilFarmacia');
    if (savedPerfil) {
      setPerfil(JSON.parse(savedPerfil));
      setFormData(JSON.parse(savedPerfil));
    }
  }, []);

  const handleMenuClick = () => {
    if (isMobile) {
      setIsSheetOpen(true);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleNotificacoesClick = () => {
    toast.info('Funcionalidade de notificações em desenvolvimento');
  };

  const handlePerfilClick = () => {
    toast.info('Funcionalidade de perfil em desenvolvimento');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          foto: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFoto = () => {
    setFormData(prev => ({
      ...prev,
      foto: undefined
    }));
  };

  const handleSave = () => {
    setPerfil(formData);
    localStorage.setItem('perfilFarmacia', JSON.stringify(formData));
    setEditMode(false);
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleCancel = () => {
    setFormData(perfil);
    setEditMode(false);
    toast.info('Edição cancelada');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarFarmacia 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderFarmacia 
          titulo="PERFIL"
          nome="MARIA SANTOS"
          tipo="FARMACÊUTICO"
          onMenuClick={handleMenuClick}
        />
        <main className="flex-1 p-3 sm:p-6">
          <div className="px-3 sm:px-6 py-3 sm:py-4 flex justify-center items-start">
            <div className="bg-white rounded-xl shadow p-8 w-full max-w-lg">
              <h1 className="text-xl sm:text-2xl font-bold mb-6 text-sabara-blue">Perfil</h1>
              
              {/* Foto do Perfil */}
              <div className="mb-8 flex flex-col items-center">
                <div className="relative">
                  {editMode ? (
                    <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-blue-200 flex items-center justify-center relative overflow-hidden">
                      {formData.foto ? (
                        <>
                          <img 
                            src={formData.foto} 
                            alt="Foto do perfil" 
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={handleRemoveFoto}
                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center">
                          <Camera size={32} className="text-blue-500 mb-2" />
                          <span className="text-xs text-blue-500">Adicionar foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFotoChange}
                          />
                        </label>
                      )}
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-blue-200 overflow-hidden">
                      {perfil.foto ? (
                        <img 
                          src={perfil.foto} 
                          alt="Foto do perfil" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50">
                          <span className="text-3xl font-bold text-blue-500">
                            {perfil.nome.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {editMode ? (
                  // Modo de edição
                  <>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Nome</label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Registro</label>
                      <input
                        type="text"
                        name="registro"
                        value={formData.registro}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">E-mail</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Telefone</label>
                      <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Cargo</label>
                      <input
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Hospital</label>
                      <input
                        type="text"
                        name="hospital"
                        value={formData.hospital}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                ) : (
                  // Modo de visualização
                  <>
                    <div>
                      <span className="block text-xs text-gray-500">Nome</span>
                      <span className="font-semibold text-gray-800">{perfil.nome}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">Registro</span>
                      <span className="font-semibold text-gray-800">{perfil.registro}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">E-mail</span>
                      <span className="font-semibold text-gray-800">{perfil.email}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">Telefone</span>
                      <span className="font-semibold text-gray-800">{perfil.telefone}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">Cargo</span>
                      <span className="font-semibold text-gray-800">{perfil.cargo}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">Hospital</span>
                      <span className="font-semibold text-gray-800">{perfil.hospital}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-8 flex justify-center gap-4">
                {editMode ? (
                  <>
                    <button 
                      onClick={handleCancel}
                      className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={handleSave}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all"
                    >
                      Salvar
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setEditMode(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all"
                  >
                    Editar Perfil
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PerfilFarmacia; 