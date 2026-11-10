window.TEEMOBOT_COMMAND_CATEGORIES = [
  {
    id: 'economia',
    label: 'Economia',
    description: 'Carteira, banco, recompensas, loja e ranking.'
  },
  {
    id: 'diversao',
    label: 'Diversão',
    description: 'Apostas e perguntas para passar o tempo.'
  },
  {
    id: 'moderacao',
    label: 'Moderação',
    description: 'Ações de moderação com verificação de permissões.'
  },
  {
    id: 'administracao',
    label: 'Administração',
    description: 'Ferramentas para organizar canais e avisos.'
  },
  {
    id: 'utilidade',
    label: 'Utilidade',
    description: 'Ajuda e consulta rápida.'
  }
];

window.TEEMOBOT_COMMANDS = [
  {
    name: 'saldo',
    category: 'economia',
    description: 'Mostra a carteira, o banco e o total de moedas de um membro.',
    syntax: '/saldo [usuario]',
    cooldown: 'Sem cooldown.',
    permissions: 'Nenhuma permissão específica.',
    params: [
      {
        name: 'usuario',
        type: 'usuário',
        required: false,
        description: 'Membro cujo saldo será consultado. Se omitido, mostra o seu.'
      }
    ],
    examples: ['/saldo', '/saldo usuario:@Membro'],
    notes: [
      'O saldo de outro membro é exibido publicamente no canal.'
    ]
  },
  {
    name: 'diario',
    category: 'economia',
    description: 'Resgata uma recompensa diária aleatória entre 500 e 1.000 moedas.',
    syntax: '/diario',
    cooldown: '24 horas por membro.',
    permissions: 'Nenhuma permissão específica.',
    params: [],
    examples: ['/diario'],
    notes: [
      'A recompensa vai para a carteira.',
      'O cooldown é controlado separadamente em cada servidor.',
      'Ao tentar resgatar antes do prazo, o bot informa quanto tempo falta em uma resposta visível apenas para você.'
    ]
  },
  {
    name: 'trabalhar',
    category: 'economia',
    description: 'Trabalha em um emprego aleatório e recebe entre 150 e 350 moedas.',
    syntax: '/trabalhar',
    cooldown: '1 hora por membro.',
    permissions: 'Nenhuma permissão específica.',
    params: [],
    examples: ['/trabalhar'],
    notes: [
      'O pagamento vai para a carteira.',
      'Os empregos são sorteados.',
      'A mensagem de espera aparece apenas para quem executou o comando.'
    ]
  },
  {
    name: 'depositar',
    category: 'economia',
    description: 'Move moedas da carteira para o banco.',
    syntax: '/depositar <quantia>',
    cooldown: 'Sem cooldown.',
    permissions: 'Nenhuma permissão específica.',
    params: [
      {
        name: 'quantia',
        type: 'inteiro',
        required: true,
        description: 'Quantidade de moedas a depositar. Valor mínimo: 1.'
      }
    ],
    examples: ['/depositar quantia:250'],
    notes: [
      'O depósito só acontece se a carteira tiver saldo suficiente.'
    ]
  },
  {
    name: 'sacar',
    category: 'economia',
    description: 'Move moedas do banco para a carteira.',
    syntax: '/sacar <quantia>',
    cooldown: 'Sem cooldown.',
    permissions: 'Nenhuma permissão específica.',
    params: [
      {
        name: 'quantia',
        type: 'inteiro',
        required: true,
        description: 'Quantidade de moedas a sacar. Valor mínimo: 1.'
      }
    ],
    examples: ['/sacar quantia:250'],
    notes: [
      'O saque só acontece se o banco tiver saldo suficiente.'
    ]
  },
  {
    name: 'transferir',
    category: 'economia',
    description: 'Transfere moedas da sua carteira para outro membro.',
    syntax: '/transferir <usuario> <quantia>',
    cooldown: 'Sem cooldown.',
    permissions: 'Nenhuma permissão específica.',
    params: [
      {
        name: 'usuario',
        type: 'usuário',
        required: true,
        description: 'Membro que receberá as moedas.'
      },
      {
        name: 'quantia',
        type: 'inteiro',
        required: true,
        description: 'Quantidade a transferir. Valor mínimo: 1.'
      }
    ],
    examples: ['/transferir usuario:@Membro quantia:100'],
    notes: [
      'Não é possível transferir para si mesmo ou para bots.',
      'A transferência usa a carteira, não o banco.',
      'Não há taxa cobrada pelo comando.'
    ]
  },
  {
    name: 'loja',
    category: 'economia',
    description: 'Lista os itens cadastrados na loja do servidor.',
    syntax: '/loja',
    cooldown: 'Sem cooldown.',
    permissions: 'Nenhuma permissão específica.',
    params: [],
    examples: ['/loja'],
    notes: [
      'Cada servidor tem sua própria lista de itens.',
      'Se a loja estiver vazia, o bot avisa que ainda não há itens cadastrados.',
      'Todos os itens cadastrados na loja aparecem.'
    ]
  },
  {
    name: 'comprar',
    category: 'economia',
    description: 'Compra um item da loja do servidor e registra no inventário.',
    syntax: '/comprar <item>',
    cooldown: 'Sem cooldown.',
    permissions: 'Nenhuma permissão específica.',
    params: [
      {
        name: 'item',
        type: 'texto',
        required: true,
        description: 'ID do item na loja do servidor, como exibido em /loja.'
      }
    ],
    examples: ['/comprar item:vip'],
    notes: [
      'O valor é debitado da carteira.',
      'O item é somado ao inventário; comprar o mesmo item novamente aumenta a quantidade.',
      'A compra não entrega cargos automaticamente.'
    ]
  },
  {
    name: 'inventario',
    category: 'economia',
    description: 'Mostra os itens que um membro possui.',
    syntax: '/inventario [usuario]',
    cooldown: 'Sem cooldown.',
    permissions: 'Nenhuma permissão específica.',
    params: [
      {
        name: 'usuario',
        type: 'usuário',
        required: false,
        description: 'Membro cujo inventário será consultado. Se omitido, mostra o seu.'
      }
    ],
    examples: ['/inventario', '/inventario usuario:@Membro'],
    notes: [
      'Ao consultar o inventário de outra pessoa, a resposta é visível apenas para você.',
      'Itens sem cadastro na loja aparecem pelo ID.'
    ]
  },
  {
    name: 'ranking',
    category: 'economia',
    description: 'Exibe os dez maiores saldos do servidor, somando carteira e banco.',
    syntax: '/ranking',
    cooldown: 'Sem cooldown.',
    permissions: 'Nenhuma permissão específica.',
    params: [],
    examples: ['/ranking'],
    notes: [
      'O ranking é por servidor, não global.',
      'A ordenação usa carteira + banco e mostra até dez membros.',
      'Os saldos exibidos são públicos no canal.'
    ]
  },
  {
    name: 'caraoucoroa',
    category: 'diversao',
    description: 'Aposta moedas no cara ou coroa.',
    syntax: '/caraoucoroa <lado> <aposta>',
    cooldown: 'Sem cooldown.',
    permissions: 'Nenhuma permissão específica.',
    params: [
      {
        name: 'lado',
        type: 'escolha',
        required: true,
        description: 'Cara ou coroa.',
        choices: ['cara', 'coroa']
      },
      {
        name: 'aposta',
        type: 'inteiro',
        required: true,
        description: 'Moedas apostadas. Valor mínimo: 10.'
      }
    ],
    examples: ['/caraoucoroa lado:cara aposta:50'],
    notes: [
      'Em caso de vitória, o membro recebe o valor apostado. Em caso de derrota, perde o valor apostado.',
      'A aposta sai da carteira, não do banco.'
    ]
  },
  {
    name: '8ball',
    category: 'diversao',
    description: 'Responde uma pergunta com uma frase aleatória da bola mágica.',
    syntax: '/8ball <pergunta>',
    cooldown: 'Sem cooldown.',
    permissions: 'Nenhuma permissão específica.',
    params: [
      {
        name: 'pergunta',
        type: 'texto',
        required: true,
        description: 'Pergunta que será enviada à bola mágica.'
      }
    ],
    examples: ['/8ball pergunta:Vale a pena apostar no cara ou coroa?'],
    notes: [
      'A resposta é sorteada.',
      'Perguntas muito longas são cortadas para caber no embed.'
    ]
  },
  {
    name: 'banir',
    category: 'moderacao',
    description: 'Bane um membro do servidor e pode apagar mensagens recentes.',
    syntax: '/banir <usuario> [motivo] [dias]',
    cooldown: 'Sem cooldown.',
    permissions: 'Banir Membros.',
    params: [
      {
        name: 'usuario',
        type: 'usuário',
        required: true,
        description: 'Membro que será banido.'
      },
      {
        name: 'motivo',
        type: 'texto',
        required: false,
        description: 'Motivo do banimento. Padrão: “Não especificado”.'
      },
      {
        name: 'dias',
        type: 'inteiro',
        required: false,
        description: 'Dias de mensagens a apagar. Aceita de 0 a 7. Padrão: 0.'
      }
    ],
    examples: ['/banir usuario:@Membro motivo:Quebrou as regras dias:1'],
    notes: [
      'Não é possível banir a si mesmo, o dono do servidor ou alguém com cargo igual/superior ao seu.',
      'O bot precisa conseguir banir o membro.',
      'O motivo é enviado ao registro de auditoria do Discord.'
    ]
  },
  {
    name: 'expulsar',
    category: 'moderacao',
    description: 'Expulsa um membro do servidor.',
    syntax: '/expulsar <usuario> [motivo]',
    cooldown: 'Sem cooldown.',
    permissions: 'Expulsar Membros.',
    params: [
      {
        name: 'usuario',
        type: 'usuário',
        required: true,
        description: 'Membro que será expulso.'
      },
      {
        name: 'motivo',
        type: 'texto',
        required: false,
        description: 'Motivo da expulsão. Padrão: “Não especificado”.'
      }
    ],
    examples: ['/expulsar usuario:@Membro motivo:Conduta inadequada'],
    notes: [
      'Não é possível expulsar a si mesmo, o dono do servidor ou alguém com cargo igual/superior ao seu.',
      'O bot precisa conseguir expulsar o membro.',
      'O motivo é enviado ao registro de auditoria do Discord.'
    ]
  },
  {
    name: 'silenciar',
    category: 'moderacao',
    description: 'Aplica um castigo temporário (timeout) em um membro.',
    syntax: '/silenciar <usuario> <tempo> [motivo]',
    cooldown: 'Sem cooldown.',
    permissions: 'Castigar Membros.',
    params: [
      {
        name: 'usuario',
        type: 'usuário',
        required: true,
        description: 'Membro que será silenciado.'
      },
      {
        name: 'tempo',
        type: 'texto',
        required: true,
        description: 'Duração no formato 10m, 1h ou 1d. Mínimo de 1 segundo e máximo de 28 dias.'
      },
      {
        name: 'motivo',
        type: 'texto',
        required: false,
        description: 'Motivo do silenciamento. Padrão: “Não especificado”.'
      }
    ],
    examples: ['/silenciar usuario:@Membro tempo:10m motivo:Spam no chat'],
    notes: [
      'Não é possível silenciar a si mesmo, o dono do servidor ou alguém com cargo igual/superior ao seu.',
      'O bot precisa conseguir aplicar o castigo no membro.',
      'O motivo é enviado ao registro de auditoria do Discord.'
    ]
  },
  {
    name: 'limpar',
    category: 'administracao',
    description: 'Apaga mensagens do canal atual, com opção de filtrar por autor.',
    syntax: '/limpar <quantidade> [usuario]',
    cooldown: 'Sem cooldown.',
    permissions: 'Gerenciar Mensagens.',
    params: [
      {
        name: 'quantidade',
        type: 'inteiro',
        required: true,
        description: 'Quantidade de mensagens a apagar. Aceita de 1 a 100.'
      },
      {
        name: 'usuario',
        type: 'usuário',
        required: false,
        description: 'Apaga apenas mensagens deste membro.'
      }
    ],
    examples: ['/limpar quantidade:20', '/limpar quantidade:50 usuario:@Membro'],
    notes: [
      'O comando busca até 100 mensagens recentes do canal antes de filtrar.',
      'O Discord não permite exclusão em massa de mensagens com mais de 14 dias.',
      'O bot também precisa da permissão Gerenciar Mensagens no canal.',
      'A resposta de confirmação é visível apenas para você.'
    ]
  },
  {
    name: 'anuncio',
    category: 'administracao',
    description: 'Publica um anúncio em embed em um canal de texto.',
    syntax: '/anuncio <titulo> <mensagem> <canal> [cor] [mencao]',
    cooldown: 'Sem cooldown.',
    permissions: 'Gerenciar Servidor.',
    params: [
      {
        name: 'titulo',
        type: 'texto',
        required: true,
        description: 'Título do embed.'
      },
      {
        name: 'mensagem',
        type: 'texto',
        required: true,
        description: 'Corpo do anúncio.'
      },
      {
        name: 'canal',
        type: 'canal',
        required: true,
        description: 'Canal de texto ou de anúncios que receberá a mensagem.'
      },
      {
        name: 'cor',
        type: 'texto',
        required: false,
        description: 'Cor em hexadecimal, como #C7A24A. Padrão: #5865F2.'
      },
      {
        name: 'mencao',
        type: 'menção',
        required: false,
        description: 'Cargo ou usuário mencionado junto ao anúncio.'
      }
    ],
    examples: [
      '/anuncio titulo:Manutenção mensagem:O bot volta às 22h canal:#avisos',
      '/anuncio titulo:Evento mensagem:Encontro no canal de voz canal:#eventos cor:#C7A24A mencao:@Todos'
    ],
    notes: [
      'O bot precisa de Ver Canal, Enviar Mensagens e Inserir Links no canal de destino.',
      'Quem executa precisa de Ver Canal e Enviar Mensagens no canal de destino.',
      'A confirmação é visível apenas para você.'
    ]
  },
  {
    name: 'ajuda',
    category: 'utilidade',
    description: 'Mostra uma lista resumida dos comandos disponíveis.',
    syntax: '/ajuda',
    cooldown: 'Sem cooldown.',
    permissions: 'Nenhuma permissão específica.',
    params: [],
    examples: ['/ajuda'],
    notes: [
      'O /ajuda mostra um resumo dos comandos disponíveis.'
    ]
  }
];
