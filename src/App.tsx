import React, { useState, useEffect, useRef } from 'react';
import {
  COMMERCIAL_CONFIG,
  buildCheckoutUrl,
  checkCommercialStatus,
} from './config/commercial';
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Layers,
  Menu,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
  ZoomIn,
  AlertTriangle,
  ArrowRight,
  DollarSign,
  Briefcase,
} from 'lucide-react';

interface PreviewModalData {
  isOpen: boolean;
  title: string;
  imageSrc: string;
  description: string;
}

export function App() {
  const commercialStatus = checkCommercialStatus();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(0);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [modalData, setModalData] = useState<PreviewModalData>({
    isOpen: false,
    title: '',
    imageSrc: '',
    description: '',
  });

  const offerSectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);

  // Manipulação de scroll para o sticky bar mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isPastHero = scrollY > 480;

      let isNearOfferOrFooter = false;
      if (offerSectionRef.current) {
        const rect = offerSectionRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          isNearOfferOrFooter = true;
        }
      }
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        if (footerRect.top <= window.innerHeight) {
          isNearOfferOrFooter = true;
        }
      }

      setShowStickyBar(isPastHero && !isNearOfferOrFooter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechamento de modal com a tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalData.isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalData.isOpen]);

  // Foco no botão fechar ao abrir modal
  useEffect(() => {
    if (modalData.isOpen && modalCloseBtnRef.current) {
      modalCloseBtnRef.current.focus();
    }
  }, [modalData.isOpen]);

  const scrollToOffer = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    const offerElement = document.getElementById('oferta');
    if (offerElement) {
      offerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckoutClick = (e: React.MouseEvent) => {
    if (!commercialStatus.isReadyForSale) {
      e.preventDefault();
      alert(
        'Modo de prévia local: Defina os campos PRECO_EBOOK e CHECKOUT_URL em src/config/commercial.ts para habilitar o redirecionamento ao checkout.'
      );
      return;
    }

    const finalUrl = buildCheckoutUrl(COMMERCIAL_CONFIG.CHECKOUT_URL);
    if (finalUrl) {
      window.location.href = finalUrl;
    }
  };

  const openPreview = (title: string, imageSrc: string, description: string) => {
    setModalData({
      isOpen: true,
      title,
      imageSrc,
      description,
    });
  };

  const closeModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };

  // 10 Módulos do E-book
  const modules = [
    {
      num: '01',
      title: 'Fundamentos de um negócio escalável',
      desc: 'Público, oferta, custos e capacidade de crescimento.',
      detail:
        'Aprenda a estruturar o sistema que permite que as entregas sejam realizadas com padrão por outras pessoas, avaliando demanda real, viabilidade econômica e capacidade de entrega antes de acelerar.',
    },
    {
      num: '02',
      title: 'Contratação e liderança',
      desc: 'Critérios de seleção, integração, treinamento e feedback.',
      detail:
        'Como formar uma equipe que funcione além da disponibilidade do fundador, com critérios claros de recrutamento, alinhamento de expectativas e rituais simples de desenvolvimento.',
    },
    {
      num: '03',
      title: 'Autonomia do dono e indicadores',
      desc: 'Responsabilidades, limites de decisão e rotina de gestão.',
      detail:
        'Como substituir aprovações constantes por autonomia responsável, delegando com alçadas de decisão e monitorando os resultados através de indicadores-chave.',
    },
    {
      num: '04',
      title: 'Tráfego pago e funil de vendas',
      desc: 'Oferta, testes, mensuração, checkout e entrega.',
      detail:
        'Fundamentos para avaliar aquisição de clientes com responsabilidade de caixa, considerando todas as etapas do funil, qualidade de entrega e taxas de conversão.',
    },
    {
      num: '05',
      title: 'Controle financeiro e reinvestimento',
      desc: 'CAC, ROAS, contribuição, resultado e limites para crescer.',
      detail:
        'Aprenda a distinguir faturamento bruto, margem de contribuição e caixa disponível. Inclui o estudo prático detalhado de uma venda de R$ 1.000.',
    },
    {
      num: '06',
      title: 'Patrimônio e gestão de riscos',
      desc: 'Separação financeira, ativos, segurança e continuidade.',
      detail:
        'Como blindar a operação contra oscilações de mercado, organizando reservas financeiras, separação de contas PF/PJ e proteção de ativos essenciais.',
    },
    {
      num: '07',
      title: 'Despesas e eficiência de caixa',
      desc: 'Revisão de gastos e decisões de investimento.',
      detail:
        'Método prático para avaliar custos fixos e variáveis, eliminando desperdícios operacionais sem prejudicar o ritmo e a qualidade da entrega.',
    },
    {
      num: '08',
      title: 'Processos e delegação',
      desc: 'Documentação, treinamento, autonomia e automação.',
      detail:
        'Como transformar rotinas que hoje só existem na sua cabeça em manuais práticos e fluxos documentados que qualquer colaborador treinado possa executar.',
    },
    {
      num: '09',
      title: 'Expansão, fusões e aquisições',
      desc: 'Alternativas de crescimento e riscos a avaliar.',
      detail:
        'Visão introdutória sobre as possibilidades de crescimento estruturado, novas linhas de receita, parcerias e cuidados para não comprometer a sustentabilidade da empresa.',
      isIntroductory: true,
    },
    {
      num: '10',
      title: 'Governança e continuidade',
      desc: 'Regras de decisão, prestação de contas e sucessão.',
      detail:
        'Conceitos iniciais de governança aplicados a pequenos negócios: prestação de contas, regras societárias e diretrizes para garantir que o negócio permaneça sólido no longo prazo.',
      isIntroductory: true,
    },
  ];

  // 6 Benefícios Práticos
  const benefits = [
    {
      icon: <Layers size={24} />,
      title: 'Identificar tarefas delegáveis',
      desc: 'Mapeie o que consome sua energia diária e descubra o que pode ser transferido para a equipe sem perda de qualidade.',
    },
    {
      icon: <Users size={24} />,
      title: 'Definir responsáveis e prazos',
      desc: 'Estabeleça padrões claros de entrega para que cada colaborador saiba exatamente o que fazer, como fazer e quando entregar.',
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Clareza entre faturamento e lucro',
      desc: 'Aprenda a enxergar quanto sobra de verdade no caixa após descontar impostos, taxas, comissões, mídia e custos fixos.',
    },
    {
      icon: <DollarSign size={24} />,
      title: 'Avaliar anúncios com precisão',
      desc: 'Compreenda por que ROAS alto não garante lucro e aprenda a calcular o retorno real considerando todos os custos operacionais.',
    },
    {
      icon: <FileText size={24} />,
      title: 'Processos sem burocracia',
      desc: 'Crie documentações simples e utilizáveis pela equipe, evitando manuais longos que ninguém lê ou segue na rotina.',
    },
    {
      icon: <Clock size={24} />,
      title: 'Prioridades em 90 dias',
      desc: 'Tenha um roteiro estruturado mês a mês para implementar as melhorias na ordem certa, sem sobrecarregar a empresa.',
    },
  ];

  // Perguntas Frequentes (FAQ)
  const faqItems = [
    {
      q: 'O material é físico ou digital?',
      a: 'É um e-book digital em PDF. Nenhum livro físico será enviado.',
    },
    {
      q: 'Quantas páginas o e-book tem?',
      a: 'São 15 páginas com 10 módulos, exercícios, exemplo financeiro e ferramentas de planejamento.',
    },
    {
      q: 'É indicado para quem está começando?',
      a: 'Sim. A abordagem é introdutória e pode ajudar quem está estruturando o negócio ou reorganizando a operação.',
    },
    {
      q: 'O conteúdo serve apenas para negócios digitais?',
      a: 'Não. Os fundamentos de processos, pessoas e finanças podem ser adaptados a diferentes negócios. O manual também aborda anúncios e vendas digitais.',
    },
    {
      q: 'Em quanto tempo verei resultados?',
      a: 'Isso depende da situação da empresa, das decisões e da execução. O plano de 90 dias organiza as etapas, sem garantir resultados nesse prazo.',
    },
    {
      q: 'Vou aprender a deixar a empresa totalmente automática?',
      a: 'O foco é reduzir a dependência operacional do dono. Pessoas, processos e automações continuam exigindo acompanhamento.',
    },
    {
      q: 'Como recebo o material?',
      a: COMMERCIAL_CONFIG.ENTREGA_TEXTO && COMMERCIAL_CONFIG.ENTREGA_TEXTO.trim()
        ? COMMERCIAL_CONFIG.ENTREGA_TEXTO
        : 'As instruções de entrega serão apresentadas na tela de confirmação do checkout externo.',
    },
    {
      q: 'Como entro em contato?',
      a: COMMERCIAL_CONFIG.SUPORTE_URL && COMMERCIAL_CONFIG.SUPORTE_URL.trim()
        ? `Você pode entrar em contato com o suporte através do canal oficial: ${COMMERCIAL_CONFIG.SUPORTE_URL}`
        : 'O canal oficial de suporte será disponibilizado pelo vendedor na confirmação da compra.',
    },
  ];

  return (
    <div className="landing-page-root">
      {/* Banner de Aviso de Configuração em Modo Prévia */}
      {!commercialStatus.isReadyForSale && (
        <div className="config-preview-banner" role="status">
          <AlertTriangle size={15} />
          <span>
            <strong>Modo de Prévia:</strong> Para ativar a venda real, preencha os campos{' '}
            <code>PRECO_EBOOK</code> e <code>CHECKOUT_URL</code> em <code>src/config/commercial.ts</code>.
          </span>
        </div>
      )}

      {/* 1. CABEÇALHO */}
      <header className="site-header">
        <div className="container nav-container">
          <a href="#" className="brand-logo" aria-label="Liberdade Empresarial - Início da página">
            <img
              src="/Logo.png"
              alt="Liberdade Empresarial"
              className="brand-logo-img"
              width={140}
              height={40}
              loading="eager"
            />
          </a>

          <nav aria-label="Navegação principal">
            <ul className="nav-links">
              <li>
                <a href="#conteudo">O que você vai aprender</a>
              </li>
              <li>
                <a href="#para-quem">Para quem é</a>
              </li>
              <li>
                <a href="#duvidas">Dúvidas</a>
              </li>
            </ul>
          </nav>

          <div className="nav-action">
            <button
              onClick={scrollToOffer}
              className="btn-primary nav-btn-header"
              aria-label="Ir para a seção de oferta"
            >
              Quero o meu e-book
            </button>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Menu Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer" role="navigation" aria-label="Menu mobile">
            <a href="#conteudo" onClick={() => setMobileMenuOpen(false)}>
              O que você vai aprender
            </a>
            <a href="#para-quem" onClick={() => setMobileMenuOpen(false)}>
              Para quem é
            </a>
            <a href="#duvidas" onClick={() => setMobileMenuOpen(false)}>
              Dúvidas
            </a>
            <button
              onClick={scrollToOffer}
              className="btn-primary"
              style={{ width: '100%', marginTop: '8px' }}
            >
              Quero o meu e-book
            </button>
          </div>
        )}
      </header>

      {/* 2. PRIMEIRA DOBRA (HERO) */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="tag-badge tag-badge-gold">
                MANUAL PRÁTICO PARA DONOS DE NEGÓCIOS
              </span>

              <h1 id="hero-heading" className="hero-title">
                Sua empresa precisa de direção. Você precisa de tempo para dirigir.
              </h1>

              <p className="hero-subtitle">
                Aprenda a organizar processos, delegar com clareza e acompanhar os números para
                construir um negócio menos dependente de você.
              </p>

              <div className="hero-cta-group">
                <button onClick={scrollToOffer} className="btn-primary" style={{ width: '100%' }}>
                  <span>Quero organizar meu negócio</span>
                  <ArrowRight size={18} />
                </button>

                <p className="hero-support-text">
                  <span>E-book em PDF</span>
                  <span>•</span>
                  <span>10 módulos</span>
                  <span>•</span>
                  <span>Exercícios práticos</span>
                  <span>•</span>
                  <span>Plano de 90 dias</span>
                </p>
              </div>
            </div>

            {/* Mockup do E-book Digital */}
            <div className="mockup-container" aria-label="Mockup do e-book digital">
              <div className="mockup-frame">
                <div className="mockup-screen">
                  <img
                    src="/assets/ebook-cover.png"
                    alt="Capa do e-book: Do Operacional à Liberdade Empresarial"
                    width={595}
                    height={842}
                    loading="eager"
                  />
                </div>
                <div className="mockup-badge">
                  <FileText size={15} />
                  <span>E-book Digital • PDF 15 páginas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. IDENTIFICAÇÃO COM O PROBLEMA */}
      <section className="section-py section-light" aria-labelledby="problem-heading">
        <div className="container">
          <div className="problem-header">
            <h2 id="problem-heading">Quando tudo passa por você, crescer fica mais difícil.</h2>
            <p className="problem-intro">
              Você começou um negócio para ter mais autonomia. Mas, na prática, sua rotina pode
              estar tomada por tarefas, dúvidas da equipe e decisões que nunca terminam.
            </p>
          </div>

          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon-wrapper">
                <Users size={22} />
              </div>
              <p>A equipe espera sua aprovação para quase tudo.</p>
            </div>

            <div className="problem-card">
              <div className="problem-icon-wrapper">
                <Briefcase size={22} />
              </div>
              <p>Você atende, vende, resolve problemas e ainda cuida do financeiro.</p>
            </div>

            <div className="problem-card">
              <div className="problem-icon-wrapper">
                <Clock size={22} />
              </div>
              <p>Tirar alguns dias de folga exige uma operação inteira.</p>
            </div>

            <div className="problem-card">
              <div className="problem-icon-wrapper">
                <TrendingUp size={22} />
              </div>
              <p>O faturamento aparece, mas o lucro continua pouco claro.</p>
            </div>

            <div className="problem-card">
              <div className="problem-icon-wrapper">
                <FileText size={22} />
              </div>
              <p>As informações importantes estão na sua cabeça.</p>
            </div>
          </div>

          <div className="problem-conclusion">
            O caminho começa com responsabilidades claras, processos utilizáveis e números
            confiáveis.
          </div>
        </div>
      </section>

      {/* 4. BENEFÍCIOS PRÁTICOS */}
      <section className="section-py section-warm" aria-labelledby="benefits-heading">
        <div className="container">
          <div className="section-header">
            <span className="tag-badge tag-badge-gold" style={{ marginBottom: '12px' }}>
              FOCO EM EXECUÇÃO
            </span>
            <h2 id="benefits-heading">Mais clareza para gerir. Mais estrutura para delegar.</h2>
            <p>
              Benefícios práticos desenhados para tirar você do sufoco do dia a dia e devolver o
              controle estratégico da sua empresa.
            </p>
          </div>

          <div className="benefits-grid">
            {benefits.map((b, idx) => (
              <div key={idx} className="benefit-card">
                <div className="benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTEÚDO DOS 10 MÓDULOS */}
      <section id="conteudo" className="section-py section-dark" aria-labelledby="modules-heading">
        <div className="container">
          <div className="section-header">
            <span className="tag-badge tag-badge-gold" style={{ marginBottom: '12px' }}>
              GRADE DO E-BOOK
            </span>
            <h2 id="modules-heading" style={{ color: 'var(--color-warm-white)' }}>
              Um caminho prático da operação à gestão.
            </h2>
            <p style={{ color: 'var(--color-text-secondary-light)' }}>
              Conheça os 10 módulos organizados em sequência lógica para estruturar o seu negócio.
            </p>
          </div>

          <div className="modules-list" role="region" aria-label="Módulos do livro">
            {modules.map((mod, index) => {
              const isActive = activeModuleIndex === index;
              return (
                <div
                  key={mod.num}
                  className={`module-item ${isActive ? 'active' : ''}`}
                >
                  <button
                    className="module-trigger"
                    onClick={() => setActiveModuleIndex(isActive ? null : index)}
                    aria-expanded={isActive}
                    aria-controls={`module-content-${mod.num}`}
                    id={`module-header-${mod.num}`}
                  >
                    <div className="module-trigger-left">
                      <span className="module-num">{mod.num}</span>
                      <div>
                        <div className="module-title">{mod.title}</div>
                        <div
                          style={{
                            fontSize: '0.85rem',
                            color: 'var(--color-text-muted-light)',
                            fontWeight: 400,
                            marginTop: '2px',
                          }}
                        >
                          {mod.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronDown size={20} className="module-icon-chevron" />
                  </button>

                  {isActive && (
                    <div
                      id={`module-content-${mod.num}`}
                      className="module-content"
                      role="region"
                      aria-labelledby={`module-header-${mod.num}`}
                    >
                      <p>{mod.detail}</p>
                      {mod.isIntroductory && (
                        <p
                          style={{
                            marginTop: '8px',
                            fontSize: '0.84rem',
                            fontStyle: 'italic',
                            color: 'var(--color-gold)',
                          }}
                        >
                          * Apresentação introdutória de possibilidades de evolução empresarial, sem
                          sugerir formação especializada.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="modules-note">
            <ShieldCheck size={20} style={{ flexShrink: 0, color: 'var(--color-gold)' }} />
            <span>
              Os módulos 09 (Expansão) e 10 (Governança) são introdutórios e apresentam conceitos
              fundamentais de evolução sustentável para pequenas empresas.
            </span>
          </div>
        </div>
      </section>

      {/* 6. DEMONSTRAÇÃO DO MATERIAL */}
      <section className="section-py section-light" aria-labelledby="preview-heading">
        <div className="container">
          <div className="section-header">
            <span className="tag-badge tag-badge-gold" style={{ marginBottom: '12px' }}>
              PRÉVIA DAS PÁGINAS
            </span>
            <h2 id="preview-heading">Conteúdo direto para colocar em prática.</h2>
            <p>
              Veja páginas reais extraídas diretamente do e-book. Clique em qualquer página para
              ampliar e ler os detalhes.
            </p>
          </div>

          <div className="preview-grid">
            {/* Página de Módulo (Pág 3) */}
            <div className="preview-card">
              <div
                className="preview-thumb-container"
                onClick={() =>
                  openPreview(
                    'Módulo 01: Fundamentos de um negócio escalável',
                    '/assets/ebook-preview-modulo.png',
                    'Página real do Módulo 01 com conceitos de público, economia do negócio e capacidade de expansão.'
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openPreview(
                      'Módulo 01: Fundamentos de um negócio escalável',
                      '/assets/ebook-preview-modulo.png',
                      'Página real do Módulo 01 com conceitos de público, economia do negócio e capacidade de expansão.'
                    );
                  }
                }}
                aria-label="Ampliar página do Módulo 01"
              >
                <img
                  src="/assets/ebook-preview-modulo.png"
                  alt="Prévia do Módulo 01 do e-book"
                  loading="lazy"
                  width={595}
                  height={842}
                />
                <div className="preview-overlay-btn">
                  <ZoomIn size={24} />
                  <span>Clique para ampliar</span>
                </div>
              </div>
              <div className="preview-card-info">
                <span className="preview-card-tag">Página de Módulo</span>
                <h3>Módulo 01: Negócio Escalável</h3>
                <p>Estruture o sistema para que outras pessoas executem com padrão e qualidade.</p>
              </div>
            </div>

            {/* Exemplo Financeiro (Pág 7) */}
            <div className="preview-card">
              <div
                className="preview-thumb-container"
                onClick={() =>
                  openPreview(
                    'Módulo 05: Exemplo Financeiro Comentado',
                    '/assets/ebook-preview-financeiro.png',
                    'Demonstração prática de uma venda de R$ 1.000, detalhando anúncios, execução, taxas, margem de contribuição e resultado real.'
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openPreview(
                      'Módulo 05: Exemplo Financeiro Comentado',
                      '/assets/ebook-preview-financeiro.png',
                      'Demonstração prática de uma venda de R$ 1.000, detalhando anúncios, execução, taxas, margem de contribuição e resultado real.'
                    );
                  }
                }}
                aria-label="Ampliar página do exemplo financeiro"
              >
                <img
                  src="/assets/ebook-preview-financeiro.png"
                  alt="Prévia do Exemplo financeiro de uma venda de R$ 1.000"
                  loading="lazy"
                  width={595}
                  height={842}
                />
                <div className="preview-overlay-btn">
                  <ZoomIn size={24} />
                  <span>Clique para ampliar</span>
                </div>
              </div>
              <div className="preview-card-info">
                <span className="preview-card-tag">Exemplo Financeiro</span>
                <h3>Venda de R$ 1.000 Comentada</h3>
                <p>
                  Por que R$ 200 em anúncios não geram R$ 800 de lucro. Cálculo completo da margem.
                </p>
              </div>
            </div>

            {/* Plano de 90 Dias (Pág 13) */}
            <div className="preview-card">
              <div
                className="preview-thumb-container"
                onClick={() =>
                  openPreview(
                    'Da Leitura à Execução: Plano de 90 Dias',
                    '/assets/ebook-preview-plano-90-dias.png',
                    'Roteiro de implantação em 3 etapas com modelo de compromisso semanal e orientação prática.'
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openPreview(
                      'Da Leitura à Execução: Plano de 90 Dias',
                      '/assets/ebook-preview-plano-90-dias.png',
                      'Roteiro de implantação em 3 etapas com modelo de compromisso semanal e orientação prática.'
                    );
                  }
                }}
                aria-label="Ampliar página do plano de 90 dias"
              >
                <img
                  src="/assets/ebook-preview-plano-90-dias.png"
                  alt="Prévia do Plano de 90 dias"
                  loading="lazy"
                  width={595}
                  height={842}
                />
                <div className="preview-overlay-btn">
                  <ZoomIn size={24} />
                  <span>Clique para ampliar</span>
                </div>
              </div>
              <div className="preview-card-info">
                <span className="preview-card-tag">Plano de Ação</span>
                <h3>Roteiro de Execução de 90 Dias</h3>
                <p>Sequência de 3 etapas com modelo de compromisso semanal e prioridades.</p>
              </div>
            </div>
          </div>

          <div className="preview-highlight">
            15 páginas de leitura objetiva, com exercícios para transformar conceitos em próximos
            passos.
          </div>
        </div>
      </section>

      {/* 7. PARA QUEM É */}
      <section id="para-quem" className="section-py section-warm" aria-labelledby="audience-heading">
        <div className="container">
          <div className="section-header">
            <span className="tag-badge tag-badge-gold" style={{ marginBottom: '12px' }}>
              PERFIL INDICADO
            </span>
            <h2 id="audience-heading">Este manual faz sentido para você?</h2>
            <p>Desenvolvido sob medida para líderes e fundadores que vivem o desafio da gestão real.</p>
          </div>

          <div className="audience-grid">
            <div className="audience-card">
              <div className="audience-check">
                <CheckCircle2 size={18} />
              </div>
              <p>Quem concentra tarefas e decisões no próprio negócio.</p>
            </div>

            <div className="audience-card">
              <div className="audience-check">
                <CheckCircle2 size={18} />
              </div>
              <p>Quem está começando a estruturar uma equipe.</p>
            </div>

            <div className="audience-card">
              <div className="audience-check">
                <CheckCircle2 size={18} />
              </div>
              <p>Quem precisa organizar processos e finanças.</p>
            </div>

            <div className="audience-card">
              <div className="audience-check">
                <CheckCircle2 size={18} />
              </div>
              <p>Quem busca uma introdução prática à gestão empresarial.</p>
            </div>
          </div>

          <div className="audience-disclaimer">
            <strong>Observação importante:</strong> O material é introdutório. Não substitui
            consultoria individual nem formação especializada em contabilidade, direito ou gestão.
          </div>
        </div>
      </section>

      {/* 8. PLANO DE 90 DIAS */}
      <section className="section-py section-dark" aria-labelledby="plan-heading">
        <div className="container">
          <div className="section-header">
            <span className="tag-badge tag-badge-gold" style={{ marginBottom: '12px' }}>
              ROTEIRO DE EXECUÇÃO
            </span>
            <h2 id="plan-heading" style={{ color: 'var(--color-warm-white)' }}>
              Saia da leitura com uma sequência de execução.
            </h2>
            <p style={{ color: 'var(--color-text-secondary-light)' }}>
              Três fases ordenadas para guiar a organização da sua empresa sem paralisações.
            </p>
          </div>

          <div className="plan-timeline">
            {/* Etapa 1 */}
            <div className="plan-card">
              <span className="plan-phase-badge">Dias 1 a 30</span>
              <h3>Entender e organizar</h3>
              <p>Revisar oferta, custos, caixa e gargalos.</p>
            </div>

            {/* Etapa 2 */}
            <div className="plan-card">
              <span className="plan-phase-badge">Dias 31 a 60</span>
              <h3>Padronizar e delegar</h3>
              <p>Documentar processos, treinar responsáveis e definir limites de decisão.</p>
            </div>

            {/* Etapa 3 */}
            <div className="plan-card">
              <span className="plan-phase-badge">Dias 61 a 90</span>
              <h3>Testar e melhorar</h3>
              <p>Avaliar aquisição, qualidade, resultados e autonomia operacional.</p>
            </div>
          </div>

          <div className="plan-observation">
            O roteiro pode ser adaptado ao momento e à capacidade da sua empresa.
          </div>
        </div>
      </section>

      {/* 9. OFERTA */}
      <section
        id="oferta"
        ref={offerSectionRef}
        className="section-py section-light"
        aria-labelledby="offer-heading"
      >
        <div className="container">
          <div className="offer-box">
            <div className="offer-header">
              <span className="tag-badge tag-badge-gold" style={{ marginBottom: '12px' }}>
                ACESSO IMEDIATO AO CONTEÚDO
              </span>
              <h2 id="offer-heading">Dê o próximo passo para organizar seu negócio.</h2>
              <p>
                <strong>Do Operacional à Liberdade Empresarial</strong>
                <br />
                <span style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                  Como estruturar processos, desenvolver pessoas e crescer com controle financeiro.
                </span>
              </p>
            </div>

            {/* Lista dos 6 componentes inclusos */}
            <div className="offer-grid-features">
              <div className="offer-feature-item">
                <span className="offer-feature-bullet"></span>
                <span>E-book digital em PDF com 15 páginas</span>
              </div>
              <div className="offer-feature-item">
                <span className="offer-feature-bullet"></span>
                <span>Os 10 módulos do manual</span>
              </div>
              <div className="offer-feature-item">
                <span className="offer-feature-bullet"></span>
                <span>Exercícios ao longo da leitura</span>
              </div>
              <div className="offer-feature-item">
                <span className="offer-feature-bullet"></span>
                <span>Exemplo financeiro comentado</span>
              </div>
              <div className="offer-feature-item">
                <span className="offer-feature-bullet"></span>
                <span>Plano de ação de 90 dias</span>
              </div>
              <div className="offer-feature-item">
                <span className="offer-feature-bullet"></span>
                <span>Painel essencial de gestão</span>
              </div>
            </div>

            {/* Bloco de Preço */}
            <div className="offer-price-area">
              <div className="offer-price-label">Valor do investimento</div>
              {COMMERCIAL_CONFIG.PRECO_EBOOK && COMMERCIAL_CONFIG.PRECO_EBOOK.trim() ? (
                <div className="offer-price-value">{COMMERCIAL_CONFIG.PRECO_EBOOK}</div>
              ) : (
                <div>
                  <div
                    className="offer-price-value"
                    style={{ fontSize: '1.85rem', color: 'var(--color-primary-blue)' }}
                  >
                    Condições no Checkout Oficial
                  </div>
                  <p style={{ marginTop: '8px', fontSize: '0.92rem', color: 'var(--color-text-secondary)' }}>
                    Consulte o valor atualizado e formas de pagamento diretamente no checkout seguro.
                  </p>
                </div>
              )}
            </div>

            {/* CTA de Compra */}
            <div className="offer-cta-container">
              <button
                onClick={handleCheckoutClick}
                className="btn-primary offer-btn"
                disabled={!commercialStatus.isReadyForSale}
                aria-label="Comprar e-book Do Operacional à Liberdade Empresarial no checkout seguro"
              >
                <span>Comprar meu e-book</span>
                <ArrowRight size={20} />
              </button>

              <div className="offer-security-info">
                <strong>Produto digital. Nenhum material físico será enviado.</strong>
                <span style={{ display: 'block', marginTop: '4px', color: 'var(--color-text-muted)' }}>
                  Ambiente de pagamento seguro e criptografado
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PERGUNTAS FREQUENTES (FAQ) */}
      <section id="duvidas" className="section-py section-warm" aria-labelledby="faq-heading">
        <div className="container">
          <div className="section-header">
            <span className="tag-badge tag-badge-gold" style={{ marginBottom: '12px' }}>
              ESCLARECIMENTOS
            </span>
            <h2 id="faq-heading">Perguntas frequentes</h2>
            <p>Respostas diretas e transparentes sobre o formato, conteúdo e entrega do material.</p>
          </div>

          <div className="faq-list" role="region" aria-label="Perguntas frequentes">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <button
                    className="faq-trigger"
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-btn-${idx}`}
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={20} className="faq-chevron" />
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${idx}`}
                      className="faq-answer"
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. CHAMADA FINAL */}
      <section className="final-cta-section" aria-labelledby="final-cta-heading">
        <div className="container">
          <div className="final-cta-content">
            <span className="tag-badge tag-badge-gold">DECISÃO ESTRATÉGICA</span>
            <h2 id="final-cta-heading">Comece pela próxima decisão que sua empresa precisa.</h2>
            <p>
              Organize o que hoje depende de você e construa uma rotina de gestão com mais clareza,
              responsabilidade e controle.
            </p>
            <button
              onClick={handleCheckoutClick}
              className="btn-primary"
              style={{ padding: '18px 40px', fontSize: '1.15rem' }}
              aria-label="Ir para o checkout seguro e comprar o e-book"
            >
              <span>Quero o meu e-book</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 12. RODAPÉ */}
      <footer ref={footerRef} className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo-card">
                <img
                  src="/Logo.png"
                  alt="Liberdade Empresarial"
                  className="footer-logo-img"
                  width={140}
                  height={40}
                  loading="lazy"
                />
              </div>
              <p>
                Como estruturar processos, desenvolver pessoas e crescer com controle financeiro.
                Manual prático e direto para empresários.
              </p>

              {(COMMERCIAL_CONFIG.VENDEDOR_NOME || COMMERCIAL_CONFIG.VENDEDOR_DOCUMENTO) && (
                <div className="footer-seller-details">
                  {COMMERCIAL_CONFIG.VENDEDOR_NOME && (
                    <div>Vendedor: {COMMERCIAL_CONFIG.VENDEDOR_NOME}</div>
                  )}
                  {COMMERCIAL_CONFIG.VENDEDOR_DOCUMENTO && (
                    <div>Documento: {COMMERCIAL_CONFIG.VENDEDOR_DOCUMENTO}</div>
                  )}
                </div>
              )}
            </div>

            <div className="footer-links-col">
              <h5>Atendimento & Legal</h5>
              <ul className="footer-links-list">
                <li>
                  {COMMERCIAL_CONFIG.SUPORTE_URL && COMMERCIAL_CONFIG.SUPORTE_URL.trim() ? (
                    <a
                      href={COMMERCIAL_CONFIG.SUPORTE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Suporte ao Cliente
                    </a>
                  ) : (
                    <span style={{ color: 'var(--color-text-muted-light)' }}>
                      Suporte: a configurar em SUPORTE_URL
                    </span>
                  )}
                </li>
                <li>
                  {COMMERCIAL_CONFIG.PRIVACIDADE_URL &&
                  COMMERCIAL_CONFIG.PRIVACIDADE_URL.trim() ? (
                    <a
                      href={COMMERCIAL_CONFIG.PRIVACIDADE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Política de Privacidade
                    </a>
                  ) : (
                    <span style={{ color: 'var(--color-text-muted-light)' }}>
                      Política de Privacidade: a configurar em PRIVACIDADE_URL
                    </span>
                  )}
                </li>
                <li>
                  {COMMERCIAL_CONFIG.TERMOS_URL && COMMERCIAL_CONFIG.TERMOS_URL.trim() ? (
                    <a href={COMMERCIAL_CONFIG.TERMOS_URL} target="_blank" rel="noopener noreferrer">
                      Termos de Compra
                    </a>
                  ) : (
                    <span style={{ color: 'var(--color-text-muted-light)' }}>
                      Termos de Compra: a configurar em TERMOS_URL
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} Liberdade Empresarial. Todos os direitos reservados.
              Produto digital disponibilizado em PDF.
            </p>
          </div>
        </div>
      </footer>

      {/* CTA Fixo Mobile (visível após a primeira dobra, oculto na oferta e rodapé) */}
      {showStickyBar && (
        <div className="sticky-mobile-bar" role="complementary" aria-label="Ação rápida de compra">
          <div className="sticky-mobile-info">
            <span className="sticky-mobile-title">Do Operacional à Liberdade</span>
            <span className="sticky-mobile-price">
              {COMMERCIAL_CONFIG.PRECO_EBOOK && COMMERCIAL_CONFIG.PRECO_EBOOK.trim()
                ? COMMERCIAL_CONFIG.PRECO_EBOOK
                : 'E-book em PDF'}
            </span>
          </div>
          <button onClick={handleCheckoutClick} className="btn-primary sticky-mobile-btn">
            Quero meu e-book
          </button>
        </div>
      )}

      {/* Modal de Visualização Ampliada das Páginas */}
      {modalData.isOpen && (
        <div
          className="modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-preview-title"
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 id="modal-preview-title">{modalData.title}</h3>
              <button
                ref={modalCloseBtnRef}
                className="modal-close-btn"
                onClick={closeModal}
                aria-label="Fechar visualização"
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <img src={modalData.imageSrc} alt={modalData.title} />
            </div>
            {modalData.description && (
              <div
                style={{
                  padding: '12px 20px',
                  backgroundColor: 'var(--color-warm-white)',
                  fontSize: '0.85rem',
                  color: 'var(--color-text-secondary)',
                  borderTop: '1px solid var(--color-border-light)',
                  textAlign: 'center',
                }}
              >
                {modalData.description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
