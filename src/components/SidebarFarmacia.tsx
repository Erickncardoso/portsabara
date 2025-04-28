import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, User, LogOut, Phone, Users, Pill, Hospital, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { toast } from 'sonner';

const SidebarFarmacia: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    toast.info(isCollapsed ? 'Sidebar expandida' : 'Sidebar minimizada', {
      position: 'bottom-right',
      duration: 2000
    });
  };
  
  return (
    <>
      {/* Botão de menu para dispositivos móveis */}
      {isMobile && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
        >
          {sidebarOpen ? <X size={24} className="text-red-500" /> : <Menu size={24} className="text-blue-500" />}
        </button>
      )}
      
      {/* Sidebar */}
      <div 
        className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          fixed md:static top-0 left-0 z-40 h-screen 
          ${isCollapsed && !isMobile ? 'w-20' : 'w-64'} 
          bg-gradient-to-b from-white to-gray-50 shadow-xl transition-all duration-300 ease-in-out
          border-r border-gray-100
        `}
      >
        {/* Logo */}
        <div className="bg-white p-6 flex items-center justify-center relative">
          <img 
            src="/images/logo-sabara.png" 
            alt="Logo Hospital Sabará" 
            className={`transition-all duration-300 ${isCollapsed && !isMobile ? 'h-8 w-8' : 'h-10 md:h-12'} object-contain`}
          />
          
          {/* Botão de minimizar/maximizar - Apenas para desktop */}
          {!isMobile && (
            <button 
              onClick={toggleCollapse}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md border border-gray-200 group hover:bg-blue-50 transition-colors"
              title={isCollapsed ? "Expandir menu" : "Minimizar menu"}
            >
              {isCollapsed ? (
                <ChevronRight size={16} className="text-blue-600 group-hover:text-blue-800" />
              ) : (
                <ChevronLeft size={16} className="text-blue-600 group-hover:text-blue-800" />
              )}
            </button>
          )}
        </div>
        
        {/* Menu de navegação */}
        <nav className="flex-1 py-4 md:py-6 px-4 space-y-1 md:space-y-1.5 overflow-y-auto">
          <Link 
            to="/home-farmacia" 
            className={`
              flex items-center px-3 md:px-4 py-2.5 md:py-3 text-gray-700 
              hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200
              ${location.pathname === '/home-farmacia' ? 'bg-blue-100 text-blue-700 font-medium' : ''}
            `}
          >
            <FileText size={isMobile ? 18 : 20} className={`${isCollapsed && !isMobile ? 'mx-auto' : 'mr-3'}`} />
            {(!isCollapsed || isMobile) && <span className="text-sm md:text-base">Receitas</span>}
          </Link>
          <Link 
            to="/pacientes-farmacia" 
            className="flex items-center px-3 md:px-4 py-2.5 md:py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
          >
            <Users size={isMobile ? 18 : 20} className={`${isCollapsed && !isMobile ? 'mx-auto' : 'mr-3'}`} />
            {(!isCollapsed || isMobile) && <span className="text-sm md:text-base">Pacientes</span>}
          </Link>
          <Link 
            to="/medicamentos-farmacia" 
            className="flex items-center px-3 md:px-4 py-2.5 md:py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
          >
            <Pill size={isMobile ? 18 : 20} className={`${isCollapsed && !isMobile ? 'mx-auto' : 'mr-3'}`} />
            {(!isCollapsed || isMobile) && <span className="text-sm md:text-base">Medicamentos</span>}
          </Link>
          <Link 
            to="/internacao-farmacia" 
            className="flex items-center px-3 md:px-4 py-2.5 md:py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
          >
            <Hospital size={isMobile ? 18 : 20} className={`${isCollapsed && !isMobile ? 'mx-auto' : 'mr-3'}`} />
            {(!isCollapsed || isMobile) && <span className="text-sm md:text-base">Internação</span>}
          </Link>
        </nav>
        
        {/* Seção ACCOUNT */}
        <div className="px-6 py-3 md:py-4 border-t border-gray-100">
          {(!isCollapsed || isMobile) && (
            <p className="text-xs font-semibold text-gray-400 mb-3 md:mb-4 tracking-wider">CONTA</p>
          )}
          
          <Link 
            to="/perfil-farmacia" 
            className="flex items-center px-3 md:px-4 py-2.5 md:py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
          >
            <User size={isMobile ? 18 : 20} className={`${isCollapsed && !isMobile ? 'mx-auto' : 'mr-3'}`} />
            {(!isCollapsed || isMobile) && <span className="text-sm md:text-base">Perfil</span>}
          </Link>
          
          <Link 
            to="/" 
            className="flex items-center px-3 md:px-4 py-2.5 md:py-3 text-blue-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
          >
            <LogOut size={isMobile ? 18 : 20} className={`${isCollapsed && !isMobile ? 'mx-auto' : 'mr-3'}`} />
            {(!isCollapsed || isMobile) && <span className="text-sm md:text-base">Sair</span>}
          </Link>
        </div>
        
        {/* Número de emergência */}
        {(!isCollapsed || isMobile) && (
          <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-100 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center text-blue-600 text-xs md:text-sm">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Phone size={isMobile ? 16 : 18} className="text-blue-500" />
              </div>
              <div>
                <p className="font-semibold">Número de emergência:</p>
                <p>+55 (11) xxxx - xxxx</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay para fechar o menu em dispositivos móveis */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default SidebarFarmacia;
