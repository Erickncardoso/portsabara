import jsPDF from "jspdf";

interface ReceitaData {
  nome: string;
  idade: string;
  sexo: string;
  medicamento: string;
  dosagem: string;
  duracao: string;
  data: string;
  observacoes?: string;
}

interface MedicoData {
  nome: string;
  crm: string;
  especialidade: string;
  telefone?: string;
  email?: string;
}

export const generateReceitaPDF = async (
  receita: ReceitaData,
  medico: MedicoData
) => {
  try {
    console.log("=== INICIANDO GERAÇÃO DO PDF ===");
    console.log("Dados da receita:", receita);
    console.log("Dados do médico:", medico);

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Função para criar logo em formas geométricas (fallback)
    const createGeometricLogo = () => {
      console.log("Usando logo geométrico como fallback...");
      const logoX = pageWidth / 2 - 40;
      const logoY = 20;

      // Círculo vermelho
      doc.setFillColor(231, 76, 60);
      doc.circle(logoX, logoY, 4, "F");

      // Retângulo verde
      doc.setFillColor(76, 175, 80);
      doc.rect(logoX + 8, logoY - 6, 12, 8, "F");

      // Quadrados azuis
      doc.setFillColor(52, 152, 219);
      doc.rect(logoX + 8, logoY + 4, 6, 6, "F");
      doc.rect(logoX + 16, logoY + 4, 6, 6, "F");

      // Texto "Sabará"
      doc.setTextColor(52, 152, 219);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("Sabará", logoX + 25, logoY + 5);

      // Texto "HOSPITAL INFANTIL"
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(76, 175, 80);
      doc.text("HOSPITAL INFANTIL", logoX + 25, logoY + 15);
    };

    // Tentar carregar o logo real
    try {
      console.log("Tentando carregar logo real...");

      // Usar fetch para carregar a imagem como blob
      const response = await fetch("/images/logo-sabara.png");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      console.log("Imagem carregada como blob");

      // Converter blob para data URL
      const dataURL = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      console.log("Imagem convertida para data URL");

      // Criar uma imagem para obter dimensões
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = dataURL;
      });

      console.log("Dimensões da imagem obtidas:", img.width, "x", img.height);

      // Calcular posição centralizada
      const logoWidth = 50;
      const logoHeight = (img.height / img.width) * logoWidth;
      const logoX = (pageWidth - logoWidth) / 2;
      const logoY = 15;

      // Adicionar ao PDF
      doc.addImage(dataURL, "PNG", logoX, logoY, logoWidth, logoHeight);
      console.log("Logo real adicionado ao PDF com sucesso!");
    } catch (error) {
      console.warn("Erro ao carregar logo real, usando fallback:", error);
      createGeometricLogo();
    }

    // Espaçamento após logo
    let yPosition = 70;

    // Dados do paciente
    console.log("Adicionando dados do paciente...");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(`Paciente: ${receita.nome}`, 20, yPosition);
    yPosition += 20;

    doc.text(`Data: ${receita.data}`, 20, yPosition);
    yPosition += 40;

    // Prescrição
    console.log("Adicionando prescrição...");
    doc.setFont("helvetica", "bold");
    doc.text("Prescrição:", 20, yPosition);
    yPosition += 20;

    doc.setFont("helvetica", "normal");

    // Montar texto da prescrição de forma mais natural
    let prescricaoTexto = `${receita.medicamento}`;

    if (receita.dosagem && receita.duracao) {
      prescricaoTexto += ` ${receita.dosagem} ${receita.duracao}`;
    } else if (receita.dosagem) {
      prescricaoTexto += ` ${receita.dosagem}`;
    } else if (receita.duracao) {
      prescricaoTexto += ` por ${receita.duracao}`;
    }

    // Quebrar texto se for muito longo
    const splitText = doc.splitTextToSize(prescricaoTexto, pageWidth - 40);
    doc.text(splitText, 20, yPosition);

    // Calcular altura do texto da prescrição
    const textHeight = splitText.length * 6;
    yPosition += textHeight + 60;

    // Data da assinatura
    console.log("Adicionando data da assinatura...");
    const dataAtual = new Date().toLocaleDateString("pt-BR");
    doc.text(`Assinado digitalmente em: ${dataAtual}`, 20, yPosition);
    yPosition += 40;

    // Área da assinatura (centralizada)
    console.log("Adicionando assinatura...");
    const assinaturaX = pageWidth / 2 - 60;

    // Criar assinatura manuscrita mais realista
    createHandwrittenSignature(doc, medico.nome, assinaturaX, yPosition);

    // Ajustar posição após a assinatura
    yPosition += 25;

    // Dados do médico (mais elegantes)
    console.log("Adicionando dados do médico...");
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`${medico.especialidade}`, assinaturaX, yPosition);
    yPosition += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`CRM: ${medico.crm}`, assinaturaX, yPosition);

    // Gerar e baixar o PDF
    const nomeArquivo = `receita_${receita.nome.replace(
      /\s+/g,
      "_"
    )}_${dataAtual.replace(/\//g, "-")}.pdf`;

    console.log("Salvando PDF com nome:", nomeArquivo);
    doc.save(nomeArquivo);
    console.log("=== PDF GERADO COM SUCESSO ===");

    return nomeArquivo;
  } catch (error) {
    console.error("=== ERRO AO GERAR PDF ===");
    console.error("Tipo do erro:", typeof error);
    console.error("Mensagem do erro:", error);
    console.error("Stack trace:", error instanceof Error ? error.stack : "N/A");
    throw error;
  }
};

// Função para criar assinatura manuscrita mais realista
function createHandwrittenSignature(
  doc: jsPDF,
  nomeCompleto: string,
  x: number,
  y: number
) {
  // Configurar cor da tinta (azul elegante)
  doc.setTextColor(30, 30, 120);

  const startX = x;
  const startY = y;

  // Criar uma assinatura elegante e simples
  doc.setFont("helvetica", "italic");
  doc.setFontSize(22);

  // Usar apenas o primeiro nome e inicial do último
  const nomes = nomeCompleto.split(" ");
  const primeiroNome = nomes[0] || "";
  const ultimoNome = nomes[nomes.length - 1] || "";
  const inicialUltimo = ultimoNome.charAt(0);

  // Assinatura elegante: "Dr. J. Silva" -> "Dr. J."
  const assinaturaTexto = `${primeiroNome} ${inicialUltimo}.`;

  // Escrever a assinatura
  doc.text(assinaturaTexto, startX, startY);

  // Linha decorativa simples e elegante abaixo
  const textWidth = doc.getTextWidth(assinaturaTexto);
  doc.setDrawColor(120, 120, 120);
  doc.setLineWidth(0.3);
  doc.line(startX, startY + 6, startX + textWidth + 10, startY + 6);

  // Nome completo em fonte pequena e discreta
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(nomeCompleto, startX, startY + 16);
}

// Função auxiliar para dados padrão do médico (buscar do perfil atual)
export const getMedicoDefault = (): MedicoData => {
  // Tentar buscar dados do localStorage ou contexto do usuário
  const userData = localStorage.getItem("currentUser");

  if (userData) {
    try {
      const user = JSON.parse(userData);
      return {
        nome: user.name || "Dr. João Silva",
        crm: user.crm || "123456-SP",
        especialidade: user.especialidade || "Pediatria",
        telefone: user.telefone || "(11) 3155-8000",
        email: user.email || "joao.silva@hospitalsabara.org.br",
      };
    } catch (error) {
      console.warn("Erro ao buscar dados do usuário:", error);
    }
  }

  // Dados padrão baseados no médico atual do sistema
  return {
    nome: "Dr. João Silva",
    crm: "123456-SP",
    especialidade: "Pediatria",
    telefone: "(11) 3155-8000",
    email: "joao.silva@hospitalsabara.org.br",
  };
};
