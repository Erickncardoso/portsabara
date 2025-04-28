
import React from 'react';
import { Heart } from 'lucide-react';

interface CartaoAreaProps {
  titulo: string;
}

const CartaoArea: React.FC<CartaoAreaProps> = ({ titulo }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="bg-gray-100 p-3 rounded-full">
        <Heart className="h-6 w-6 text-sabara-blue" />
      </div>
      <h3 className="font-medium text-gray-800">{titulo}</h3>
    </div>
  );
};

export default CartaoArea;
