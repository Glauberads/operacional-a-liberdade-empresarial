/**
 * Configurações Comerciais e Dados da Empresa
 * Centralize aqui todos os parâmetros de venda, links externos e identificação legal.
 * 
 * ATENÇÃO: Caso algum campo essencial (como CHECKOUT_URL ou PRECO_EBOOK) não seja
 * preenchido, a página funcionará em modo de prévia/degustação, impedindo cliques
 * em compras inválidas e sinalizando discretamente para o administrador.
 */

export interface CommercialConfig {
  /** Preço formatado do e-book (ex: 'R$ 47,00' ou 'R$ 97,00') */
  PRECO_EBOOK: string;
  
  /** URL de destino do checkout externo (ex: 'https://pay.kiwify.com.br/...' ou 'https://chk.hotmart.com/...') */
  CHECKOUT_URL: string;
  
  /** Texto com as instruções exatas de entrega e acesso ao material digital */
  ENTREGA_TEXTO: string;
  
  /** Link de suporte ao comprador (ex: 'mailto:suporte@seusite.com.br' ou link de WhatsApp/Central) */
  SUPORTE_URL: string;
  
  /** Razão Social ou Nome do Vendedor/Autor */
  VENDEDOR_NOME: string;
  
  /** CNPJ ou documento fiscal do vendedor */
  VENDEDOR_DOCUMENTO: string;
  
  /** URL da Política de Privacidade */
  PRIVACIDADE_URL: string;
  
  /** URL dos Termos de Compra e Uso */
  TERMOS_URL: string;
}

export const COMMERCIAL_CONFIG: CommercialConfig = {
  // Preencha o preço do e-book conforme sua estratégia comercial (ex: 'R$ 47,00')
  PRECO_EBOOK: '',

  // URL do checkout externo oficial
  CHECKOUT_URL: 'https://nexussaas.glauberads.com.br/checkout?product=do-operacional-a-liberdade-empresarial',

  // Instruções de entrega confirmadas
  ENTREGA_TEXTO: '',

  // Canal oficial de suporte
  SUPORTE_URL: '',

  // Dados do vendedor/empresa responsável
  VENDEDOR_NOME: '',
  VENDEDOR_DOCUMENTO: '',

  // Documentos jurídicos externos
  PRIVACIDADE_URL: '',
  TERMOS_URL: '',
};

/**
 * Constrói a URL final do checkout preservando parâmetros UTM e query params da página atual,
 * sem sobrescrever parâmetros pré-existentes na CHECKOUT_URL.
 */
export function buildCheckoutUrl(rawCheckoutUrl: string): string {
  if (!rawCheckoutUrl || !rawCheckoutUrl.trim()) {
    return '';
  }

  try {
    const currentParams = new URLSearchParams(window.location.search);
    const targetUrl = new URL(rawCheckoutUrl, window.location.origin);

    // Itera pelos parâmetros atuais da página (ex: utm_source, utm_campaign, etc.)
    currentParams.forEach((value, key) => {
      // Preserva parâmetros já configurados na CHECKOUT_URL
      if (!targetUrl.searchParams.has(key)) {
        targetUrl.searchParams.set(key, value);
      }
    });

    return targetUrl.toString();
  } catch {
    // Se a URL não for válida, retorna a original com trim
    return rawCheckoutUrl.trim();
  }
}

/**
 * Valida se as informações comerciais essenciais foram informadas
 */
export function checkCommercialStatus(config: CommercialConfig = COMMERCIAL_CONFIG) {
  const missingEssential: string[] = [];

  if (!config.CHECKOUT_URL || !config.CHECKOUT_URL.trim()) {
    missingEssential.push('CHECKOUT_URL');
  }

  const missingSecondary: string[] = [];
  if (!config.PRECO_EBOOK || !config.PRECO_EBOOK.trim()) missingSecondary.push('PRECO_EBOOK');
  if (!config.ENTREGA_TEXTO) missingSecondary.push('ENTREGA_TEXTO');
  if (!config.SUPORTE_URL) missingSecondary.push('SUPORTE_URL');
  if (!config.VENDEDOR_NOME) missingSecondary.push('VENDEDOR_NOME');
  if (!config.VENDEDOR_DOCUMENTO) missingSecondary.push('VENDEDOR_DOCUMENTO');
  if (!config.PRIVACIDADE_URL) missingSecondary.push('PRIVACIDADE_URL');
  if (!config.TERMOS_URL) missingSecondary.push('TERMOS_URL');

  return {
    isReadyForSale: missingEssential.length === 0,
    missingEssential,
    missingSecondary,
  };
}
